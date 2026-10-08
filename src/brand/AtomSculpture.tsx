import React, { useLayoutEffect, useMemo, useEffect } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { useCurrentFrame, useVideoConfig } from "remotion";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { beat, ease, smooth } from "./rhythm";
const Studio = () => {
  const { gl, scene, camera } = useThree();
  const { fps } = useVideoConfig();
  const f = (useCurrentFrame() * 30) / fps;
  const t = (beat(f) - 8) / 6;
  const environment = useMemo(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = pmrem.fromScene(room, 0.035);
    room.dispose();
    pmrem.dispose();
    return target;
  }, [gl]);
  useLayoutEffect(() => {
    scene.environment = environment.texture;
    scene.environmentIntensity = 1.2;
    camera.position.set(
      Math.sin(t * 2.1) * 1.45,
      0.45 + Math.sin(t * Math.PI) * 0.32,
      8.6 - t * 0.9,
    );
    camera.lookAt(0, 0.08, 0);
  }, [camera, scene, environment, t]);
  useEffect(() => () => environment.dispose(), [environment]);
  return (
    <group
      rotation={[0.1 + t * 0.16, -0.35 + t * 0.65, -0.16 + t * 0.15]}
      position={[0, 0.35, 0]}
      scale={0.74 + 0.14 * ease(t * 5)}
    >
      {[0, 1, 2].map((i) => (
        <group
          key={i}
          rotation={[
            i === 0 ? 0.95 : i === 1 ? -0.95 : 0.05,
            i === 2 ? 1.25 : 0,
            i * 0.7 + t * 0.5,
          ]}
        >
          <mesh rotation={[0, 0, t * 0.5 + i]}>
            <torusGeometry
              args={[
                2.12,
                0.15,
                28,
                144,
                Math.PI * (1.62 + 0.15 * smooth(t * 2)),
              ]}
            />
            <meshStandardMaterial
              color={i === 1 ? "#c0c9d4" : "#0758fc"}
              metalness={i === 1 ? 1 : 0.45}
              roughness={i === 1 ? 0.18 : 0.22}
            />
          </mesh>
          <mesh
            position={[
              Math.cos(t * 3.1 + i * 2) * 2.12,
              Math.sin(t * 3.1 + i * 2) * 2.12,
              0,
            ]}
          >
            <sphereGeometry args={[0.27, 32, 24]} />
            <meshStandardMaterial
              color={i === 2 ? "#0a1730" : "#afc4ea"}
              metalness={0.9}
              roughness={0.16}
            />
          </mesh>
        </group>
      ))}
      <mesh rotation={[t * 0.8, t, 0]}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#0a183b"
          metalness={0.8}
          roughness={0.14}
        />
      </mesh>
    </group>
  );
};
export const AtomSculpture = () => (
  <ThreeCanvas
    width={1920}
    height={1080}
    dpr={1}
    camera={{ fov: 40, near: 0.1, far: 60, position: [0, 0, 8] }}
    gl={{
      antialias: true,
      alpha: true,
      toneMapping: THREE.ACESFilmicToneMapping,
      toneMappingExposure: 1.25,
    }}
    style={{ position: "absolute", inset: 0 }}
  >
    <ambientLight intensity={0.6} />
    <directionalLight position={[-3, 6, 5]} intensity={3} />
    <directionalLight position={[5, -1, 3]} intensity={2} color="#c2dbff" />
    <Studio />
  </ThreeCanvas>
);
