"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Environment,
  Float,
  Icosahedron,
} from "@react-three/drei";
import {
  EffectComposer,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

/* -------- deterministic seeded PRNG (skill: no Math.random in render) -------- */
function seeded(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/* -------------------------- Central dispersion crystal ---------------------- */
function Crystal() {
  const ref = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!ref.current) return;
    // idle rotation
    ref.current.rotation.y += delta * 0.18;
    ref.current.rotation.x += delta * 0.05;
    // cursor-reactive drift (eased)
    ref.current.position.x += (pointer.x * 0.4 - ref.current.position.x) * 0.05;
    ref.current.position.y += (pointer.y * 0.3 - ref.current.position.y) * 0.05;
    void state;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <Icosahedron ref={ref} args={[1.35, 0]}>
        <MeshTransmissionMaterial
          transmission={1}
          thickness={1.2}
          roughness={0.06}
          ior={1.42}
          chromaticAberration={0.35}
          anisotropy={0.3}
          distortion={0.4}
          distortionScale={0.4}
          temporalDistortion={0.15}
          color="#dbe4ff"
          attenuationColor="#8aa2ff"
          attenuationDistance={2.4}
          background={new THREE.Color("#05070f")}
        />
      </Icosahedron>
    </Float>
  );
}

/* ------------------------------ Particle field ------------------------------ */
function Particles({ count = 380 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.2 + seeded(i) * 4.5;
      const theta = seeded(i + 100) * Math.PI * 2;
      const phi = Math.acos(2 * seeded(i + 200) - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#9fb4ff"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* --------------------------------- Scene ------------------------------------ */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 6, 4]} intensity={1.4} color="#aebfff" />
      <directionalLight position={[-6, -3, -4]} intensity={0.8} color="#a06bff" />
      <Suspense fallback={null}>
        <Crystal />
        <Particles />
        <Environment preset="city" />
      </Suspense>
      <EffectComposer>
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0008, 0.0012]}
        />
        <Noise premultiply blendFunction={BlendFunction.SCREEN} opacity={0.18} />
        <Vignette eskil={false} offset={0.25} darkness={0.85} />
      </EffectComposer>
    </>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.8]}
      style={{ position: "absolute", inset: 0 }}
    >
      <Scene />
    </Canvas>
  );
}
