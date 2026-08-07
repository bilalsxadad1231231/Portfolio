import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Field } from './LatentField';
import { getProjectImage } from '../../data/projectImages';
import useThemeTokens from '../../hooks/useThemeTokens';

// Radius is set so the arc between neighbours stays wider than a card —
// otherwise adjacent planes intersect the front one.
const RADIUS = 12;
const CARD_W = 3.0;
const CARD_H = 1.9;

const ACCENT = new THREE.Color();
const FRAME_IDLE = new THREE.Color();
const DIM_COLOR = new THREE.Color();
const SCALE = new THREE.Vector3();

function Card({ project, angle, groupRotation, isActive, onSelect, tokens }) {
  const cardRef = useRef();
  const meshRef = useRef();
  const frameRef = useRef();
  const texture = useTexture(getProjectImage(project.id));

  // Fit the artwork inside the card box at its own aspect ratio. Stretching
  // every screenshot to one shape misrepresents the work.
  const [w, h] = useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;

    const image = texture.image;
    const aspect = image?.width && image?.height ? image.width / image.height : 16 / 10;

    let width = CARD_W;
    let height = CARD_W / aspect;
    if (height > CARD_H) {
      height = CARD_H;
      width = CARD_H * aspect;
    }
    return [width, height];
  }, [texture]);

  const position = useMemo(
    () => [Math.sin(angle) * RADIUS, 0, Math.cos(angle) * RADIUS],
    [angle]
  );

  useFrame(() => {
    if (!meshRef.current || !cardRef.current) return;

    // How far this card sits from the front of the ring, in radians.
    const facing = Math.abs(
      Math.atan2(
        Math.sin(angle + groupRotation.current),
        Math.cos(angle + groupRotation.current)
      )
    );
    const nearness = Math.max(0, 1 - facing / 0.55);

    // Scale and lift the card as a whole so the accent frame stays an even
    // border around the artwork.
    const targetScale = 0.82 + nearness * 0.3;
    SCALE.set(targetScale, targetScale, 1);
    cardRef.current.scale.lerp(SCALE, 0.12);
    cardRef.current.position.y = THREE.MathUtils.lerp(
      cardRef.current.position.y,
      nearness * 0.16,
      0.1
    );

    // Dim by multiplying the texture, not by fading opacity. Transparent
    // meshes on a ring sort unreliably and bleed through each other. The floor
    // is themed: on a light ground, dimming to near-black reads as a hole.
    const floor = tokens.dimFloor;
    const dim = floor + nearness * (1 - floor);
    meshRef.current.material.color.lerp(DIM_COLOR.setScalar(dim), 0.12);

    if (frameRef.current) {
      frameRef.current.material.color.lerp(
        isActive ? ACCENT.set(tokens.accent) : FRAME_IDLE.set(tokens.surface),
        0.12
      );
    }
  });

  return (
    <group position={position} rotation={[0, angle, 0]}>
      <group ref={cardRef}>
        {/* Accent frame behind the artwork. Both meshes are opaque so depth
            testing — not transparent sorting — decides what covers what. */}
        <mesh ref={frameRef} position={[0, 0, -0.02]} renderOrder={0}>
          <planeGeometry args={[w + 0.12, h + 0.12]} />
          <meshBasicMaterial color={tokens.surface} toneMapped={false} />
        </mesh>

        <mesh
          ref={meshRef}
          renderOrder={1}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = '')}
        >
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Pulls the camera back on narrow viewports. `fov` is vertical, so a phone-
 * shaped canvas would otherwise crop the front card left and right.
 */
function CameraFit() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const halfCard = (CARD_W * 1.12) / 2 + 0.3;
    const tanHalfH = Math.tan((camera.fov * Math.PI) / 360) * aspect;
    const distance = Math.max(3.2, halfCard / tanHalfH);

    camera.position.z = RADIUS + distance;
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

function Ring({ projects, activeIndex, onSelect, reducedMotion, tokens }) {
  const groupRef = useRef();
  const rotation = useRef(0);
  const target = useRef(0);
  const { gl } = useThree();

  const step = useMemo(
    () => (Math.PI * 2) / Math.max(projects.length, 9),
    [projects.length]
  );

  useEffect(() => {
    // Take the shortest way round rather than unwinding the long way.
    const desired = -activeIndex * step;
    const twoPi = Math.PI * 2;
    let delta = (desired - target.current) % twoPi;
    if (delta > Math.PI) delta -= twoPi;
    if (delta < -Math.PI) delta += twoPi;
    target.current += delta;
  }, [activeIndex, step]);

  // Read the live index through a ref so the listeners never need re-binding —
  // re-binding mid-drag would drop the gesture the moment the index changed.
  const indexRef = useRef(activeIndex);
  indexRef.current = activeIndex;

  // Drag and wheel both advance whole cards; the ring always lands on one.
  useEffect(() => {
    const el = gl.domElement;
    let dragging = false;
    let startX = 0;
    let startIndex = 0;
    let wheelAccum = 0;
    let wheelTimer = null;

    const clampIndex = (i) =>
      Math.max(0, Math.min(projects.length - 1, Math.round(i)));

    const onPointerDown = (e) => {
      dragging = true;
      startX = e.clientX;
      startIndex = indexRef.current;
      el.setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e) => {
      if (!dragging) return;
      const next = clampIndex(startIndex - (e.clientX - startX) / 90);
      if (next !== indexRef.current) onSelect(next);
    };
    const onPointerUp = (e) => {
      dragging = false;
      el.releasePointerCapture?.(e.pointerId);
    };
    const onWheel = (e) => {
      // Only hijack clearly horizontal intent so vertical page scroll survives.
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      wheelAccum += e.deltaX;
      if (Math.abs(wheelAccum) > 60) {
        onSelect(clampIndex(indexRef.current + Math.sign(wheelAccum)));
        wheelAccum = 0;
      }
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => (wheelAccum = 0), 200);
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      el.removeEventListener('wheel', onWheel);
      clearTimeout(wheelTimer);
    };
  }, [gl, projects.length, onSelect]);

  useFrame(() => {
    rotation.current = THREE.MathUtils.lerp(
      rotation.current,
      target.current,
      reducedMotion ? 1 : 0.09
    );
    if (groupRef.current) groupRef.current.rotation.y = rotation.current;
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, i) => (
        <Card
          key={project.id}
          project={project}
          angle={i * step}
          groupRotation={rotation}
          isActive={i === activeIndex}
          onSelect={() => onSelect(i)}
          tokens={tokens}
        />
      ))}
    </group>
  );
}

export default function ProjectRing({ projects, activeIndex, onSelect }) {
  const tokens = useThemeTokens();
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.15, RADIUS + 3.2], fov: 44 }}
    >
      <CameraFit />
      <Suspense fallback={null}>
        <Ring
          projects={projects}
          activeIndex={activeIndex}
          onSelect={onSelect}
          reducedMotion={reducedMotion}
          tokens={tokens}
        />
      </Suspense>
      {/* The same field as the hero, kept faint so the artwork stays dominant. */}
      <group position={[0, 0, -3]} scale={3.2}>
        <Field
          count={1400}
          reducedMotion={reducedMotion}
          intensity={0.45}
          tokens={tokens}
        />
      </group>
    </Canvas>
  );
}
