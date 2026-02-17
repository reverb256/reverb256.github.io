import React from "react";
import { Link } from "react-router-dom";

interface ProjectTileProps {
  title: string;
  description: string;
  status: string;
  icon?: React.ReactNode;
  colorClass?: string;
  link?: string;
  progress?: number;
  external?: boolean;
  gradient?: number;
  featured?: boolean;
}

const ProjectTile: React.FC<ProjectTileProps> = ({
  title,
  description,
  status,
  icon,
  colorClass = "var(--brand-primary)",
  link,
  progress,
  external = false,
  gradient = 1,
  featured = false,
}) => {
  const gradientClass = `quantum-gradient-${gradient}`;
  
  return (
    <article
      className={`glass-card group relative project-tile animate-fade-in-up ${featured ? 'quantum-glow' : ''}`}
      style={{ maxWidth: "350px", minWidth: "300px" }}
    >
      <div className={`absolute inset-0 ${gradientClass} opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`}></div>
      
      <header className="relative mb-6">
        <h3
          className="font-bold mb-3 flex items-center gap-3"
          style={{ fontSize: "clamp(1.375rem, 3vw, 1.75rem)", color: colorClass }}
        >
          <span style={{ fontSize: "1.75rem" }}>{icon}</span>
          {title}
        </h3>
        <span className={`glass-badge glass-badge--${status.toLowerCase()}`}>{status}</span>
      </header>
      
      <p className="mb-8 leading-relaxed text-neutral-300" style={{ fontSize: "1rem" }}>
        {description}
      </p>
      
      {link && external ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-button w-full min-h-[48px] flex items-center justify-center gap-2
                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900
                    hover:transform hover:scale-105 transition-all duration-300"
          aria-label={`Explore ${title}`}
        >
          Explore
          <span aria-hidden="true">→</span>
        </a>
      ) : link ? (
        <Link
          to={link}
          className="glass-button w-full min-h-[48px] flex items-center justify-center gap-2
                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900
                    hover:transform hover:scale-105 transition-all duration-300"
          aria-label={`Explore ${title}`}
        >
          Explore
          <span aria-hidden="true">→</span>
        </Link>
      ) : null}
      
      {typeof progress === "number" && (
        <div className="space-y-3 mt-4">
          <div
            className="glass-progress"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Development progress"
          >
            <div className="glass-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm text-neutral-400">
            Development Progress: {progress}%
          </p>
        </div>
      )}
    </article>
  );
};

// Enhanced Card Variations
const QuantumCard = ({ children, gradient = 1, className = "" }: { children: React.ReactNode; gradient?: number; className?: string }) => {
  const gradientClass = `quantum-gradient-${gradient}`;
  
  return (
    <div className={`glass-card quantum-card-${gradient} ${className}`}>
      <div className={`absolute inset-0 ${gradientClass} opacity-5 rounded-lg`}></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const GlassmorphicCard = ({ children, className = "", shadow = "md" }: { children: React.ReactNode; className?: string; shadow?: string }) => {
  const shadowClass = `--shadow-${shadow}`;
  
  return (
    <div 
      className={`glass-card ${className}`}
      style={{
        boxShadow: `var(${shadowClass})`
      }}
    >
      {children}
    </div>
  );
};

export { ProjectTile, QuantumCard, GlassmorphicCard };

export default ProjectTile;
