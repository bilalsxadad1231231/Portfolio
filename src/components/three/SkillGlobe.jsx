import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import skills from '../../data/Skillicon';

const RADIUS = 3.5;
const DRAG_SENSITIVITY = 0.0055;
const FRICTION = 0.94;
const IDLE_SPIN = 0.055;

/** Even coverage of the sphere — a lat/long grid would clump at the poles. */
const useSpherePoints = (count) =>
  useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / Math.max(count - 1, 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      return new THREE.Vector3(
        Math.cos(theta) * r * RADIUS,
        y * RADIUS,
        Math.sin(theta) * r * RADIUS
      );
    });
  }, [count]);

function Icon({ skill, position, dimmed, onHover }) {
  const ref = useRef();
  const texture = useTexture(skill.skillicon);
  const [hovered, setHovered] = useState(false);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
  }, [texture]);

  useFrame(() => {
    const s = ref.current;
    if (!s) return;

    // Fade with depth so the far side of the globe reads as behind, not on top.
    const depth = THREE.MathUtils.clamp(
      (s.getWorldPosition(WORLD).z + RADIUS) / (RADIUS * 2),
      0,
      1
    );
    const targetOpacity = (dimmed ? 0.12 : 0.35 + depth * 0.65) * (hovered ? 1.6 : 1);
    const targetScale = (0.62 + depth * 0.28) * (hovered ? 1.5 : 1);

    s.material.opacity += (Math.min(targetOpacity, 1) - s.material.opacity) * 0.15;
    s.scale.x += (targetScale - s.scale.x) * 0.18;
    s.scale.y = s.scale.x;
  });

  return (
    <sprite
      ref={ref}
      position={position}
      scale={[0.8, 0.8, 1]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(skill);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      <spriteMaterial map={texture} transparent opacity={0.8} toneMapped={false} depthWrite={false} />
    </sprite>
  );
}

const WORLD = new THREE.Vector3();

function Globe({ activeCategory, onHover, reducedMotion }) {
  const groupRef = useRef();
  const velocity = useRef({ x: IDLE_SPIN, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  const points = useSpherePoints(skills.length);

  useEffect(() => {
    const el = gl.domElement;

    const down = (e) => {
      dragging.current = true;
      last.current = { x: e.clientX, y: e.clientY };
      el.setPointerCapture?.(e.pointerId);
    };
    const move = (e) => {
      if (!dragging.current) return;
      velocity.current = {
        x: (e.clientX - last.current.x) * DRAG_SENSITIVITY * 12,
        y: (e.clientY - last.current.y) * DRAG_SENSITIVITY * 12,
      };
      last.current = { x: e.clientX, y: e.clientY };
    };
    const up = (e) => {
      dragging.current = false;
      el.releasePointerCapture?.(e.pointerId);
    };

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
  }, [gl]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;

    if (reducedMotion) return;

    if (!dragging.current) {
      // Spin down after a throw, then settle back to the idle drift.
      velocity.current.x *= FRICTION;
      velocity.current.y *= FRICTION;
      velocity.current.x += (IDLE_SPIN - velocity.current.x) * 0.012;
      velocity.current.y *= 0.9;
    }

    g.rotation.y += velocity.current.x * delta * 3;
    g.rotation.x = THREE.MathUtils.clamp(
      g.rotation.x + velocity.current.y * delta * 3,
      -0.9,
      0.9
    );
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <Icon
          key={`${skill.name}-${i}`}
          skill={skill}
          position={points[i]}
          dimmed={activeCategory !== 'all' && skill.category !== activeCategory}
          onHover={onHover}
        />
      ))}
    </group>
  );
}

function Rig() {
  const { camera, size } = useThree();
  useEffect(() => {
    // Pull back on narrow canvases so the sphere never crops.
    const aspect = size.width / Math.max(size.height, 1);
    const fit = RADIUS * 1.35;
    const tanHalf = Math.tan((camera.fov * Math.PI) / 360);
    camera.position.z = Math.max(fit / tanHalf, fit / (tanHalf * aspect));
    camera.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

export default function SkillGlobe({ activeCategory, onHover }) {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 11], fov: 45 }}
      onPointerMissed={() => onHover(null)}
    >
      <Rig />
      <Suspense fallback={null}>
        <Globe
          activeCategory={activeCategory}
          onHover={onHover}
          reducedMotion={reducedMotion}
        />
      </Suspense>
    </Canvas>
  );
}
