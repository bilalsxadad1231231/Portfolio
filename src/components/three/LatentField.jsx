import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import useThemeTokens from '../../hooks/useThemeTokens';

/**
 * The signature element: a drifting point cloud standing in for an embedding
 * space. The same field reappears behind the project gallery, so the two
 * sections read as one continuous space.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uPointer;
  uniform float uSize;

  attribute float aScale;
  attribute float aSeed;

  varying float vMix;
  varying float vAlpha;

  // Cheap pseudo-noise. Real simplex noise is overkill for a drifting field.
  float n3(vec3 p) {
    return sin(p.x * 1.7 + p.y * 2.3) * cos(p.z * 1.9 - p.x * 1.1);
  }

  void main() {
    vec3 p = position;
    float t = uTime * 0.18;

    // Breathing displacement along each point's own radius.
    float d = n3(p * 1.6 + vec3(t, t * 0.7, -t * 0.5));
    p += normalize(position) * d * 0.28;

    // Slow differential swirl: outer shells lag behind inner ones.
    float a = t * 0.35 + length(position) * 0.4;
    mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
    p.xz = rot * p.xz;

    // Pointer parallax, varied per point so the cloud shears rather than slides.
    p.xy += uPointer * (0.35 + aSeed * 0.45);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * (1.0 / -mv.z);

    vMix   = clamp((p.y + 1.6) / 3.2, 0.0, 1.0);
    // Additive blending stacks fast, so cap how bright any single point can be.
    vAlpha = clamp(1.0 - (-mv.z - 2.0) / 7.0, 0.08, 0.7);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3  uColorA;
  uniform vec3  uColorB;
  uniform vec3  uColorC;
  uniform float uIntensity;

  varying float vMix;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float dsq = dot(c, c);
    if (dsq > 0.25) discard;

    float soft = smoothstep(0.25, 0.0, dsq);
    vec3 col = mix(uColorA, uColorB, vMix);
    col = mix(col, uColorC, smoothstep(0.62, 1.0, vMix) * 0.55);

    gl_FragColor = vec4(col, soft * vAlpha * uIntensity);
  }
`;

export function Field({ count, reducedMotion, intensity = 1, tokens }) {
  const pointsRef = useRef();
  const materialRef = useRef();
  const pointer = useRef(new THREE.Vector2(0, 0));
  const { size } = useThree();

  const [positions, scales, seeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    const sd = new Float32Array(count);

    // Fibonacci distribution keeps the shell even; the cubed radius pushes
    // most points toward the surface so the core stays readable.
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const shell = 1.15 + Math.pow(Math.random(), 3) * 0.85;

      pos[i * 3] = Math.cos(theta) * r * shell;
      pos[i * 3 + 1] = y * shell;
      pos[i * 3 + 2] = Math.sin(theta) * r * shell;

      scl[i] = 0.55 + Math.random() * 1.25;
      sd[i] = Math.random();
    }
    return [pos, scl, sd];
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uSize: { value: 1 },
      uIntensity: { value: intensity },
      uColorA: { value: new THREE.Color('#7C5CFF') },
      uColorB: { value: new THREE.Color('#FF8904') },
      uColorC: { value: new THREE.Color('#22D3EE') },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state, delta) => {
    const m = materialRef.current;
    if (!m) return;

    if (!reducedMotion) m.uniforms.uTime.value += delta;

    const target = reducedMotion ? { x: 0, y: 0 } : state.pointer;
    pointer.current.x += (target.x * 0.45 - pointer.current.x) * 0.04;
    pointer.current.y += (target.y * 0.3 - pointer.current.y) * 0.04;
    m.uniforms.uPointer.value.copy(pointer.current);

    if (pointsRef.current && !reducedMotion) {
      pointsRef.current.rotation.y += delta * 0.035;
    }
  });

  // Keep dot size stable across viewport widths. gl_PointSize divides by view
  // depth, so this constant lands points at roughly 2–5px.
  uniforms.uSize.value = Math.min(size.width, size.height) * 0.016;
  uniforms.uIntensity.value = intensity * tokens.fieldOpacity;
  uniforms.uColorA.value.set(tokens.fieldA);
  uniforms.uColorB.value.set(tokens.fieldB);
  uniforms.uColorC.value.set(tokens.fieldC);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        key={tokens.additive ? 'additive' : 'normal'}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={tokens.additive ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

export default function LatentField({ count = 4600, className = '', intensity = 1 }) {
  const tokens = useThemeTokens();
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  return (
    <Canvas
      className={className}
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 4.6], fov: 45 }}
      aria-hidden="true"
    >
      <Field
        count={count}
        reducedMotion={reducedMotion}
        intensity={intensity}
        tokens={tokens}
      />
    </Canvas>
  );
}
