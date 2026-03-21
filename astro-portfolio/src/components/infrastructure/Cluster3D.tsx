import { useEffect, useMemo, useState } from 'react';
import type { Host } from '../../lib/infrastructure-data';

interface Cluster3DProps {
  hosts: Host[];
}

interface Particle {
  id: number;
  fromHostIndex: number;
  toHostIndex: number;
  progress: number;
}

// Constants extracted for maintainability
const CONSTANTS = {
  PARTICLE_COUNT: 20,
  ROTATION_SPEED: 0.005,
  PARTICLE_SPEED: 0.002,
  RADIUS: 180,
  NODE_SIZE: 80,
  PARTICLE_SIZE: 6,
  ANIMATION_INTERVAL: 16, // ~60fps
} as const;

export default function Cluster3D({ hosts }: Cluster3DProps) {
  const [rotation, setRotation] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Initialize particles once
    const newParticles: Particle[] = Array.from(
      { length: CONSTANTS.PARTICLE_COUNT },
      (_, i) => ({
        id: i,
        fromHostIndex: Math.floor(Math.random() * hosts.length),
        toHostIndex: Math.floor(Math.random() * hosts.length),
        progress: Math.random(),
      })
    );
    setParticles(newParticles);

    // Simplified animation loop - only update rotation
    const interval = setInterval(() => {
      setRotation(prev => prev + CONSTANTS.ROTATION_SPEED);
    }, CONSTANTS.ANIMATION_INTERVAL);

    return () => clearInterval(interval);
  }, [hosts.length]); // Only depend on hosts.length

  // Memoize expensive calculations
  const angleStep = useMemo(
    () => (2 * Math.PI) / hosts.length,
    [hosts.length]
  );

  const hostPositions = useMemo(
    () =>
      hosts.map((host, i) => {
        const angle = i * angleStep + rotation;
        return {
          ...host,
          x: Math.cos(angle) * CONSTANTS.RADIUS,
          y: Math.sin(angle) * CONSTANTS.RADIUS * 0.6,
          z: Math.sin(angle) * CONSTANTS.RADIUS,
          angle,
        };
      }),
    [hosts, rotation, angleStep]
  );

  // Simplified particle calculations
  const animatedParticles = useMemo(
    () =>
      particles.map(particle => {
        const { x: fromX, y: fromY, z: fromZ } = hostPositions[particle.fromHostIndex];
        const { x: toX, y: toY, z: toZ } = hostPositions[particle.toHostIndex];

        // Animate progress using time-based calculation
        const time = Date.now() / 1000;
        const animatedProgress = (particle.progress + time * CONSTANTS.PARTICLE_SPEED) % 1;

        return {
          ...particle,
          x: fromX + (toX - fromX) * animatedProgress,
          y: fromY + (toY - fromY) * animatedProgress,
          z: fromZ + (toZ - fromZ) * animatedProgress,
          progress: animatedProgress,
        };
      }),
    [particles, hostPositions]
  );

  return (
    <div className="cluster-3d" aria-label="3D cluster visualization">
      <div
        className="cluster-scene"
        style={{
          transform: `rotateX(20deg) rotateZ(${rotation * 10}deg)`,
        }}
      >
        {/* Render hosts as nodes */}
        {hostPositions.map((host) => (
          <div
            key={host.name}
            className="cluster-node"
            style={{
              transform: `translate3d(${host.x}px, ${host.y}px, ${host.z}px) translate(-50%, -50%)`,
              zIndex: Math.round(host.z + 200),
            }}
            role="img"
            aria-label={`${host.name} host with ${host.specs.gpus.length} GPUs`}
          >
            <div className="cluster-node-content">
              <div className="cluster-node-name">{host.name}</div>
              <div className="cluster-node-gpus">{host.specs.gpus.length} GPUs</div>
            </div>
          </div>
        ))}

        {/* Render particles */}
        {animatedParticles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              transform: `translate3d(${particle.x}px, ${particle.y}px, ${particle.z}px) translate(-50%, -50%)`,
              opacity: 0.5 + Math.sin(particle.progress * Math.PI) * 0.5,
              zIndex: Math.round(particle.z + 200),
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
