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
}) => (
  <article className="card-container group relative project-tile" style={{ maxWidth: "350px", minWidth: "300px" }}>
    <header className="mb-6">
      <h3
        className="font-semibold mb-3 flex items-center gap-3"
        style={{ fontSize: "clamp(1.375rem, 3vw, 1.75rem)", color: colorClass }}
      >
        <span style={{ fontSize: "1.75rem" }}>{icon}</span>
        {title}
      </h3>
      <span className="status-badge status-badge--production">{status}</span>
    </header>
    <p className="mb-8 leading-relaxed" style={{ color: "var(--neutral-300)", fontSize: "1rem" }}>
      {description}
    </p>
    {link && external ? (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--primary w-full min-h-[48px] flex items-center justify-center gap-2
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
        className="btn btn--primary w-full min-h-[48px] flex items-center justify-center gap-2
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
          className="progress-container"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Development progress"
        >
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-sm" style={{ color: "var(--neutral-400)" }}>
          Development Progress: {progress}%
        </p>
      </div>
    )}
  </article>
);

export default ProjectTile;
