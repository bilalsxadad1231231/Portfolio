import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { projectsData } from '../../data/projectData';
import { DOMAINS, getDomain } from '../../data/projectDomains';
import useThemeTokens from '../../hooks/useThemeTokens';

const GROUPS = DOMAINS.filter((d) => d.id !== 'all').map((d) => d.id);
const CLUSTER_RADIUS = 2.4;
const SPREAD = 0.88;

// Deterministic jitter — the layout must be identical on every render, but a
// perfect lattice would read as a diagram rather than a cluster.
const hash = (n) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

function useLayout() {
  return useMemo(() => {
    // Centres sit on a sphere, not a ring: a ring projects to a flat band and
    // loses the depth that makes this worth rendering in 3D at all.
    const centers = {};
    const golden = Math.PI * (3 - Math.sqrt(5));
    GROUPS.forEach((id, i) => {
      const y = 1 - (i / (GROUPS.length - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      centers[id] = new THREE.Vector3(
        Math.cos(theta) * r * CLUSTER_RADIUS,
        y * CLUSTER_RADIUS * 0.82,
        Math.sin(theta) * r * CLUSTER_RADIUS
      );
    });

    const nodes = projectsData.map((project, i) => {
      const domain = getDomain(project.id);
      const c = centers[domain];
      return {
        id: project.id,
        name: project.name,
        domain,
        position: new THREE.Vector3(
          c.x + (hash(i * 3.1) - 0.5) * SPREAD * 2,
          c.y + (hash(i * 5.7 + 1) - 0.5) * SPREAD * 2,
          c.z + (hash(i * 9.3 + 2) - 0.5) * SPREAD * 2
        ),
      };
    });

    return { centers, nodes };
  }, []);
}

function Node({ node, color, active, onHover }) {
  const ref = useRef();
  const target = useMemo(() => new THREE.Color(), []);

  useFrame(() => {
    if (!ref.current) return;
    const s = active ? 1.35 : 1;
    ref.current.scale.lerp({ x: s, y: s, z: s }, 0.15);
    ref.current.material.color.lerp(target.set(color), 0.15);
    ref.current.material.opacity = THREE.MathUtils.lerp(
      ref.current.material.opacity,
      active ? 1 : 0.55,
      0.15
    );
  });

  return (
    <mesh
      ref={ref}
      position={node.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(node.domain);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        onHover(null);
        document.body.style.cursor = '';
      }}
    >
      <sphereGeometry args={[0.17, 18, 18]} />
      <meshBasicMaterial transparent opacity={0.55} toneMapped={false} />
    </mesh>
  );
}

function Spokes({ layout, activeDomain, tokens }) {
  const ref = useRef();

  const { positions, colors } = useMemo(() => {
    const pos = [];
    const col = [];
    layout.nodes.forEach((node) => {
      const c = layout.centers[node.domain];
      pos.push(c.x, c.y, c.z, node.position.x, node.position.y, node.position.z);
      col.push(0, 0, 0, 0, 0, 0);
    });
    return {
      positions: new Float32Array(pos),
      colors: new Float32Array(col),
    };
  }, [layout]);

  // Recolour per frame so spokes track the hovered cluster with the nodes.
  useFrame(() => {
    const attr = ref.current?.geometry?.attributes?.color;
    if (!attr) return;

    const tmp = new THREE.Color();
    layout.nodes.forEach((node, i) => {
      const lit = !activeDomain || node.domain === activeDomain;
      tmp.set(lit ? tokens.domainColors[node.domain] : tokens.nodeIdle);
      for (let v = 0; v < 2; v++) {
        const o = (i * 2 + v) * 3;
        attr.array[o] += (tmp.r - attr.array[o]) * 0.15;
        attr.array[o + 1] += (tmp.g - attr.array[o + 1]) * 0.15;
        attr.array[o + 2] += (tmp.b - attr.array[o + 2]) * 0.15;
      }
    });
    attr.needsUpdate = true;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.5} toneMapped={false} />
    </lineSegments>
  );
}

function Scene({ activeDomain, onHover, reducedMotion, tokens }) {
  const groupRef = useRef();
  const layout = useLayout();
  const { size } = useThree();

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;

    // Idle rotation stops while a cluster is held, so it can be read.
    if (!reducedMotion && !activeDomain) g.rotation.y += delta * 0.14;

    const tiltX = reducedMotion ? 0 : state.pointer.y * 0.25;
    const tiltZ = reducedMotion ? 0 : state.pointer.x * 0.12;
    g.rotation.x += (tiltX - g.rotation.x) * 0.04;
    g.rotation.z += (tiltZ - g.rotation.z) * 0.04;
  });

  // Keep the whole cluster in frame on narrow canvases.
  const scale = Math.min(1, size.width / 460);

  return (
    <group ref={groupRef} scale={scale}>
      <Spokes layout={layout} activeDomain={activeDomain} tokens={tokens} />
      {layout.nodes.map((node) => {
        const lit = !activeDomain || node.domain === activeDomain;
        return (
          <Node
            key={node.id}
            node={node}
            color={lit ? tokens.domainColors[node.domain] : tokens.nodeIdle}
            active={activeDomain === node.domain}
            onHover={onHover}
          />
        );
      })}
    </group>
  );
}

export default function WorkConstellation({ activeDomain, onHover }) {
  const tokens = useThemeTokens();
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.3, 6.4], fov: 45 }}
      onPointerMissed={() => onHover(null)}
    >
      <Scene
        activeDomain={activeDomain}
        onHover={onHover}
        reducedMotion={reducedMotion}
        tokens={tokens}
      />
    </Canvas>
  );
}
