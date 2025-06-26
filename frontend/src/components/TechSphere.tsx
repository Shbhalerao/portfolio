import React, { JSX, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  FaReact, FaNodeJs, FaDocker, FaGitAlt, FaHtml5, FaCss3Alt,
  FaJsSquare, FaPython, FaDatabase, FaGithub, FaJava, FaAws, FaCloud
} from 'react-icons/fa';
import {
  SiMongodb, SiPostgresql, SiTailwindcss, SiTypescript, SiVisualstudiocode,
  SiC, SiCplusplus, SiNextdotjs, SiVercel, SiPrisma, SiFramer
} from 'react-icons/si';
import { Html } from '@react-three/drei';

const iconData = [
  { icon: <FaReact />, color: '#61DAFB' },
  { icon: <SiNextdotjs />, color: '#000000' },
  { icon: <FaJsSquare />, color: '#F7DF1E' },
  { icon: <SiTypescript />, color: '#3178C6' },
  { icon: <FaNodeJs />, color: '#339933' },
  { icon: <SiTailwindcss />, color: '#38B2AC' },
  { icon: <SiPostgresql />, color: '#336791' },
  { icon: <SiPrisma />, color: '#0C344B' },
  { icon: <SiMongodb />, color: '#47A248' },
  { icon: <SiC />, color: '#A8B9CC' },
  { icon: <SiCplusplus />, color: '#00599C' },
  { icon: <FaPython />, color: '#3776AB' },
  { icon: <FaGitAlt />, color: '#F05032' },
  { icon: <SiVisualstudiocode />, color: '#007ACC' },
  { icon: <FaDocker />, color: '#2496ED' },
  { icon: <FaHtml5 />, color: '#E34F26' },
  { icon: <FaCss3Alt />, color: '#1572B6' },
  { icon: <FaGithub />, color: '#181717' },
  { icon: <FaJava />, color: '#007396' },
  { icon: <FaAws />, color: '#FF9900' },
];

const SphereTag: React.FC<{ icon: JSX.Element; position: [number, number, number]; color: string }> = ({ icon, position, color }) => {
  return (
    <Html position={position} center style={{ pointerEvents: 'none' }}>
      <div style={{ fontSize: '32px', color }}>{icon}</div>
    </Html>
  );
};

const RotatingSphere = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  const radius = 3;
  const total = iconData.length;
  const positions: [number, number, number][] = [];

  for (let i = 0; i < total; i++) {
    const phi = Math.acos(-1 + (2 * i) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;

    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    positions.push([x, y, z]);
  }

  return (
    <group ref={groupRef} rotation={[0.3, 0, 0]}>
      {iconData.map((data, i) => (
        <SphereTag key={i} icon={data.icon} position={positions[i]} color={data.color} />
      ))}
    </group>
  );
};

const TechSphere: React.FC = () => {
  return (
    <div className="w-full aspect-square md:w-[350px] md:h-[350px] flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 7], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <RotatingSphere />
      </Canvas>
    </div>
  );
};

export default TechSphere;
