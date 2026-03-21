import { useEffect, useRef, useState } from 'react';
import type { Host } from '../../lib/infrastructure-data';

interface Cluster3DProps {
  hosts: Host[];
}

interface Particle {
  id: number;
  x: number;
  y: number;
  z: number;
  fromHost: string;
  toHost: string;
  progress: number;
}

export default function Cluster3D({ hosts }: Cluster3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Initialize particles
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
      z: Math.random() * 400 - 200,
      fromHost: hosts[Math.floor(Math.random() * hosts.length)].name,
      toHost: hosts[Math.floor(Math.random() * hosts.length)].name,
      progress: Math.random()
    }));
    setParticles(newParticles);

    // Rotation animation
    let animationFrameId: number;
    const animate = () => {
      setRotation(prev => prev + 0.005);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [hosts]);

  // Calculate 3D positions
  const radius = 180;
  const angleStep = (2 * Math.PI) / hosts.length;

  const hostPositions = hosts.map((host, i) => {
    const angle = i * angleStep + rotation;
    return {
      ...host,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.6,
      z: Math.sin(angle) * radius
    };
  });

  // Animate particles
  const animatedParticles = particles.map(particle => {
    const fromHost = hosts.find(h => h.name === particle.fromHost);
    const toHost = hosts.find(h => h.name === particle.toHost);

    if (!fromHost || !toHost) return null;

    const fromIndex = hosts.indexOf(fromHost);
    const toIndex = hosts.indexOf(toHost);

    const fromAngle = fromIndex * angleStep + rotation;
    const toAngle = toIndex * angleStep + rotation;

    const fromX = Math.cos(fromAngle) * radius;
    const fromY = Math.sin(fromAngle) * radius * 0.6;
    const fromZ = Math.sin(fromAngle) * radius;

    const toX = Math.cos(toAngle) * radius;
    const toY = Math.sin(toAngle) * radius * 0.6;
    const toZ = Math.sin(toAngle) * radius;

    particle.progress += 0.002;
    if (particle.progress > 1) particle.progress = 0;

    const x = fromX + (toX - fromX) * particle.progress;
    const y = fromY + (toY - fromY) * particle.progress;
    const z = fromZ + (toZ - fromZ) * particle.progress;

    return { ...particle, x, y, z };
  }).filter(Boolean) as Particle[];

  return (
    <div
      ref={containerRef}
      className="cluster-3d"
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        perspective: '1000px',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: `rotateX(20deg) rotateZ(${rotation * 10}deg)`
        }}
      >
        {/* Render hosts as nodes */}
        {hostPositions.map((host) => (
          <div
            key={host.name}
            className="cluster-node"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate3d(${host.x}px, ${host.y}px, ${host.z}px) translate(-50%, -50%)`,
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
              border: '2px solid rgba(168, 85, 247, 0.5)',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              zIndex: Math.round(host.z + 200)
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = `translate3d(${host.x}px, ${host.y}px, ${host.z}px) translate(-50%, -50%) scale(1.2)`;
              e.currentTarget.style.boxShadow = '0 0 30px rgba(168, 85, 247, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `translate3d(${host.x}px, ${host.y}px, ${host.z}px) translate(-50%, -50%) scale(1)`;
              e.currentTarget.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.3)';
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div>{host.name}</div>
              <div style={{ fontSize: '10px', opacity: 0.8 }}>{host.specs.gpus.length} GPUs</div>
            </div>
          </div>
        ))}

        {/* Render particles */}
        {animatedParticles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: `rgba(168, 85, 247, ${0.5 + Math.sin(particle.progress * Math.PI) * 0.5})`,
              transform: `translate3d(${particle.x}px, ${particle.y}px, ${particle.z}px) translate(-50%, -50%)`,
              boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
              pointerEvents: 'none',
              zIndex: Math.round(particle.z + 200)
            }}
          />
        ))}
      </div>

      <style>{`
        .cluster-node {
          user-select: none;
        }
        .particle {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
