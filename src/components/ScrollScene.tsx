"use client";

/**
 * Persistent scroll-driven 3D canvas spanning the ENTIRE page (not just the
 * hero). One <Canvas> stays mounted the whole scroll; a camera rig + per-
 * section 3D "moments" fade/scale in and out based on scroll progress read
 * from the scrollProgress singleton (lib/scrollProgress.ts) every frame —
 * no React state, no re-renders, just useFrame reads (60fps-safe).
 *
 * Section order must match SmoothScroll's SECTION_IDS:
 *   0 top  1 services  2 work  3 aura  4 process  5 contact
 */

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Environment,
  Float,
  Icosahedron,
  Text,
} from "@react-three/drei";
import {
  EffectComposer,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { getScrollState } from "@/lib/scrollProgress";

/* -------- deterministic seeded PRNG (no Math.random in render) -------- */
function seeded(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** Smooth damp toward a target — avoids snapping when scroll jumps. */
function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.damp(current, target, lambda, dt);
}

/** Visibility helper: 1 near `center` index, fading out ±`spread` sections. */
function sectionWeight(activeFloat: number, center: number, spread = 0.9) {
  const d = Math.abs(activeFloat - center);
  return Math.max(0, 1 - d / spread);
}

/* ---------------------- 01. Hero dispersion crystal ---------------------- */
function Crystal({ activeFloat }: { activeFloat: () => number }) {
  const ref = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const opacity = useRef(1);

  useFrame((state, delta) => {
    if (!ref.current || !group.current) return;
    ref.current.rotation.y += delta * 0.18;
    ref.current.rotation.x += delta * 0.05;
    ref.current.position.x += (pointer.x * 0.4 - ref.current.position.x) * 0.05;
    ref.current.position.y += (pointer.y * 0.3 - ref.current.position.y) * 0.05;

    const w = sectionWeight(activeFloat(), 0, 1.1);
    opacity.current = damp(opacity.current, w, 6, delta);
    group.current.scale.setScalar(0.6 + opacity.current * 0.4);
    group.current.visible = opacity.current > 0.01;
    void state;
  });

  return (
    <group ref={group}>
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
    </group>
  );
}

/* ------------------------------ Particle field (ambient, whole page) ----- */
function Particles({ count = 420 }: { count?: number }) {
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
    if (ref.current) ref.current.rotation.y += delta * 0.035;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.026}
        color="#9fb4ff"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* --------------------- 02. Services: three layered glass panes ----------- */
function ServiceLayers({ activeFloat }: { activeFloat: () => number }) {
  const group = useRef<THREE.Group>(null);
  const p1 = useRef<THREE.Mesh>(null);
  const p2 = useRef<THREE.Mesh>(null);
  const p3 = useRef<THREE.Mesh>(null);
  const opacity = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;
    const w = sectionWeight(activeFloat(), 1, 0.85);
    opacity.current = damp(opacity.current, w, 6, delta);
    group.current.visible = opacity.current > 0.01;
    group.current.position.x = 2.6 - opacity.current * 0.4;
    group.current.rotation.y = damp(
      group.current.rotation.y,
      Math.PI * 0.08 + state.clock.elapsedTime * 0.05,
      3,
      delta
    );
    const t = state.clock.elapsedTime;
    if (p1.current) p1.current.position.z = Math.sin(t * 0.6) * 0.15;
    if (p2.current) p2.current.position.z = Math.sin(t * 0.6 + 2.1) * 0.15 + 0.35;
    if (p3.current) p3.current.position.z = Math.sin(t * 0.6 + 4.2) * 0.15 + 0.7;
  });

  const mat = {
    transmission: 1,
    roughness: 0.12,
    thickness: 0.4,
    ior: 1.3,
    chromaticAberration: 0.06,
    color: "#dbe4ff",
    background: new THREE.Color("#05070f"),
  };

  return (
    <group ref={group} position={[2.6, 0, 0]}>
      <mesh ref={p1} rotation={[0.1, 0.3, 0]}>
        <planeGeometry args={[1.6, 1.9]} />
        <MeshTransmissionMaterial {...mat} attenuationColor="#21d4fd" />
      </mesh>
      <mesh ref={p2} rotation={[-0.05, 0.3, 0]}>
        <planeGeometry args={[1.6, 1.9]} />
        <MeshTransmissionMaterial {...mat} attenuationColor="#6d8bff" />
      </mesh>
      <mesh ref={p3} rotation={[0.03, 0.3, 0]}>
        <planeGeometry args={[1.6, 1.9]} />
        <MeshTransmissionMaterial {...mat} attenuationColor="#a06bff" />
      </mesh>
    </group>
  );
}

/* --------------------- 03. Work/Aura: network node cluster --------------- */
function NetworkNodes({ activeFloat }: { activeFloat: () => number }) {
  const group = useRef<THREE.Group>(null);
  const opacity = useRef(0);
  const NODES = 14;

  const nodePositions = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < NODES; i++) {
      const r = 1.1 + seeded(i + 50) * 0.9;
      const theta = seeded(i + 60) * Math.PI * 2;
      const phi = Math.acos(2 * seeded(i + 70) - 1);
      pts.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }
    return pts;
  }, []);

  const lineGeom = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        if (seeded(i * 31 + j) > 0.78) {
          positions.push(...nodePositions[i].toArray(), ...nodePositions[j].toArray());
        }
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geom;
  }, [nodePositions]);

  useFrame((state, delta) => {
    if (!group.current) return;
    // active across BOTH work (idx 2) and aura (idx 3) — wide spread
    const w = Math.max(
      sectionWeight(activeFloat(), 2, 0.85),
      sectionWeight(activeFloat(), 3, 0.85)
    );
    opacity.current = damp(opacity.current, w, 6, delta);
    group.current.visible = opacity.current > 0.01;
    group.current.position.x = -2.6 + (1 - opacity.current) * 0.4;
    group.current.rotation.y += delta * 0.12;
    group.current.scale.setScalar(0.85 + opacity.current * 0.25);
  });

  return (
    <group ref={group} position={[-2.6, 0, 0]}>
      {nodePositions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.05 + seeded(i) * 0.03, 12, 12]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#7af0ff" : i % 3 === 1 ? "#6d8bff" : "#a06bff"}
            emissive={i % 3 === 0 ? "#7af0ff" : i % 3 === 1 ? "#6d8bff" : "#a06bff"}
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
      <lineSegments geometry={lineGeom}>
        <lineBasicMaterial color="#6d8bff" transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}

/* --------------------- 04. Process: rotating pipeline knot ---------------- */
function PipelineKnot({ activeFloat }: { activeFloat: () => number }) {
  const ref = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  const opacity = useRef(0);

  useFrame((state, delta) => {
    if (!ref.current || !group.current) return;
    const w = sectionWeight(activeFloat(), 4, 0.85);
    opacity.current = damp(opacity.current, w, 6, delta);
    group.current.visible = opacity.current > 0.01;
    group.current.scale.setScalar(0.7 + opacity.current * 0.35);
    ref.current.rotation.x += delta * 0.25;
    ref.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={group} position={[2.4, 0, 0]}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[0.75, 0.22, 160, 24, 2, 3]} />
        <meshPhysicalMaterial
          color="#151b3a"
          metalness={0.4}
          roughness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.15}
          emissive="#6d8bff"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
}

/* --------------------- 05. Contact: WebGL text + soft glow --------------- */
function ContactMark({ activeFloat }: { activeFloat: () => number }) {
  const group = useRef<THREE.Group>(null);
  const opacity = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;
    const w = sectionWeight(activeFloat(), 5, 0.85);
    opacity.current = damp(opacity.current, w, 6, delta);
    group.current.visible = opacity.current > 0.01;
    group.current.position.y = -0.3 + opacity.current * 0.3;
  });

  return (
    <group ref={group} position={[0, -0.3, -1]}>
      <Text
        fontSize={0.9}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.02}
        outlineWidth={0}
      >
        GenOS
      </Text>
    </group>
  );
}

/* ------------------------- Camera rig (scroll-driven dolly) -------------- */
function CameraRig() {
  // Read `camera` from the useFrame state param each tick (not via useThree
  // at the top level) — avoids both the immutability lint rule (mutating a
  // hook-returned binding) and the refs-during-render rule (writing into a
  // ref outside an effect/callback). state.camera is the same live THREE
  // object every frame; mutating it inside the frame callback is exactly
  // what r3f's imperative useFrame escape hatch is for.
  const target = useRef(new THREE.Vector3(0, 0, 6));

  useFrame((state, delta) => {
    const cam = state.camera;
    const s = getScrollState();
    const t = s.docProgress; // 0..1 across whole page

    // Gentle dolly path: pull back and drift laterally as user scrolls.
    target.current.set(
      Math.sin(t * Math.PI * 1.4) * 0.6,
      -t * 0.4,
      6 - t * 1.6
    );
    cam.position.x = damp(cam.position.x, target.current.x, 3, delta);
    cam.position.y = damp(cam.position.y, target.current.y, 3, delta);
    cam.position.z = damp(cam.position.z, target.current.z, 3, delta);
    cam.lookAt(0, -t * 0.4, 0);
  });

  return null;
}

/* --------------------------------- Scene ---------------------------------- */
function Scene() {
  // Continuous "section float" (activeIndex + localProgress) read fresh
  // every frame by each object's own useFrame — avoids re-renders entirely.
  const activeFloat = () => {
    const s = getScrollState();
    return s.activeIndex + s.localProgress;
  };

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 6, 4]} intensity={1.4} color="#aebfff" />
      <directionalLight position={[-6, -3, -4]} intensity={0.8} color="#a06bff" />
      <CameraRig />
      <Suspense fallback={null}>
        <Crystal activeFloat={activeFloat} />
        <ServiceLayers activeFloat={activeFloat} />
        <NetworkNodes activeFloat={activeFloat} />
        <PipelineKnot activeFloat={activeFloat} />
        <ContactMark activeFloat={activeFloat} />
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

export default function ScrollScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.8]}
      style={{ position: "fixed", inset: 0, zIndex: 1 }}
    >
      <Scene />
    </Canvas>
  );
}
