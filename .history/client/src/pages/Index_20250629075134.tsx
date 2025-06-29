import Layout from "../components/Layout";
import ProjectTile from "../components/ProjectTile";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <Layout>
      {/* Welcome Section */}
      <section
        id="welcome-section"
        className="relative min-h-screen flex items-center justify-center px-6 py-12"
        style={{
          marginTop: "64px",
        }}
      >
        <div className="w-full max-w-7xl mx-auto text-center">
          <h1
            className="font-black mb-8 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent animate-fade-in-up"
            style={{
              fontSize: "clamp(4rem, 12vw, 10rem)",
              lineHeight: "0.9",
              letterSpacing: "-0.02em",
            }}
          >
            Reverb256
          </h1>

          <p
            className="text-gray-300 mb-12 mx-auto animate-fade-in-up delay-200"
            style={{
              fontSize: "clamp(1.25rem, 4vw, 2.5rem)",
              lineHeight: "1.3",
              maxWidth: "65ch",
            }}
          >
            Multi-platform developer specializing in consciousness-driven AI systems and distributed computing platforms
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
            <div className="card-container lg:col-span-2">
              <p
                className="leading-relaxed mb-8"
                style={{
                  color: "var(--neutral-300)",
                  fontSize: "clamp(1.0625rem, 2.8vw, 1.25rem)",
                  lineHeight: "1.6",
                }}
              >
                Weaving consciousness into code, I bridge the ancient wisdom of cypherpunk philosophy with cutting-edge quantum innovation.
                Each line of code carries the weight of digital revolution, transforming abstract thoughts into tangible technological realities.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="status-badge status-badge--production animate-consciousness-pulse">Consciousness Engineer</span>
                <span className="status-badge status-badge--development animate-fade-in-up delay-200">Reality Architect</span>
                <span className="status-badge status-badge--staging animate-fade-in-up delay-300">Digital Alchemist</span>
              </div>
            </div>

            <div className="card-container flex flex-col justify-center space-y-4">
              <Link to="/coreflame" className="btn btn--primary w-full text-center">
                View COREFLAME Project
              </Link>
              <a
                href="https://github.com/reverb256"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary w-full text-center"
                id="profile-link"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2
            className="font-bold mb-16 text-center animate-fade-in-up"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", marginBottom: "4rem" }}
          >
            About Me
          </h2>

          <div className="flex flex-col xl:flex-row gap-12 items-start justify-center">
            {/* Philosophy Section */}
            <div className="card-container flex-shrink-0" style={{ maxWidth: "600px" }}>
              <h3
                className="font-semibold mb-8 text-center"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", color: "var(--neutral-100)" }}
              >
                Development Philosophy
              </h3>

              <div className="space-y-8">
                <blockquote
                  className="text-center italic mb-8"
                  style={{
                    color: "var(--neutral-300)",
                    fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                    lineHeight: "1.7",
                    borderLeft: "none",
                    padding: "0",
                  }}
                >
                  "In the alchemy of intelligent prompting, human creativity meets AI precision to create exponentially powerful systems that serve individual sovereignty while maintaining community harmony."
                </blockquote>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong style={{ color: "var(--brand-primary)" }}>Individual Sovereignty:</strong>
                      <span style={{ color: "var(--neutral-300)", marginLeft: "0.5rem" }}>
                        Privacy-first design empowering user agency
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong style={{ color: "var(--brand-primary)" }}>Collective Intelligence:</strong>
                      <span style={{ color: "var(--neutral-300)", marginLeft: "0.5rem" }}>
                        AI-human collaboration patterns for breakthrough innovation
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong style={{ color: "var(--brand-primary)" }}>Classical Wisdom Integration:</strong>
                      <span style={{ color: "var(--neutral-300)", marginLeft: "0.5rem" }}>
                        Ancient philosophical principles guiding modern architecture
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong style={{ color: "var(--brand-primary)" }}>Consciousness-Driven Development:</strong>
                      <span style={{ color: "var(--neutral-300)", marginLeft: "0.5rem" }}>
                        Systems designed with awareness and intentionality
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t" style={{ borderColor: "hsla(15, 70%, 50%, 0.2)" }}>
                  <h4 className="text-center mb-4" style={{ color: "var(--brand-accent)", fontSize: "1.125rem", fontWeight: "600" }}>
                    VibeCoding Methodology
                  </h4>
                  <p className="text-center text-sm leading-relaxed" style={{ color: "var(--neutral-400)" }}>
                    Where Ancient Wisdom Meets Quantum Technology - A revolutionary approach to consciousness-driven development that bridges philosophical depth with technical excellence.
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 mt-6">
                    <span className="status-badge status-badge--production text-xs">Classical Wisdom</span>
                    <span className="status-badge status-badge--development text-xs">Quantum Computing</span>
                    <span className="status-badge status-badge--staging text-xs">AI Consciousness</span>
                    <span className="status-badge status-badge--production text-xs">Individual Sovereignty</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="flex flex-col gap-6" style={{ maxWidth: "400px" }}>
              <div className="card-container">
                <h4
                  className="font-semibold mb-4 flex items-center gap-2"
                  style={{ fontSize: "clamp(1.125rem, 3vw, 1.375rem)", color: "var(--brand-accent)" }}
                >
                  <span>⚡</span> Core Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Node.js", "Solana", "Kubernetes", "AI/ML", "WebSocket", "Drizzle ORM"].map((tech) => (
                    <span key={tech} className="status-badge status-badge--development text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-container">
                <h4
                  className="font-semibold mb-4 flex items-center gap-2"
                  style={{ fontSize: "clamp(1.125rem, 3vw, 1.375rem)", color: "var(--brand-secondary)" }}
                >
                  <span>🧠</span> Specializations
                </h4>
                <ul className="space-y-3 text-sm" style={{ color: "var(--neutral-300)" }}>
                  {[
                    "Consciousness-driven AI architecture",
                    "Distributed computing platforms",
                    "High-frequency trading systems",
                    "Cross-platform federation",
                  ].map((spec) => (
                    <li key={spec} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex-shrink-0"></div>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section id="projects" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bold mb-16 text-center animate-fade-in-up" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
            Featured Projects
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            <ProjectTile
              title="COREFLAME"
              description="Consciousness research platform combining ancient wisdom with quantum technology for revolutionary AI development"
              status="Active Platform"
              icon="🔥"
              colorClass="var(--brand-primary)"
              link="/coreflame"
            />
            <ProjectTile
              title="Solana Trading Bot"
              description="High-frequency trading algorithms with consciousness-driven decision making for Solana ecosystem"
              status="In Development"
              icon="⚡"
              colorClass="var(--brand-accent)"
              progress={65}
            />
            <ProjectTile
              title="Astralvibe Platform"
              description="Cross-environment federation with Talos Kubernetes deployment infrastructure"
              status="Testing Phase"
              icon="🌐"
              colorClass="var(--brand-secondary)"
              progress={40}
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-bold mb-16" style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)" }}>
            Get In Touch
          </h2>

          <div className="card-container mb-12">
            <p
              className="mb-8 leading-relaxed mx-auto"
              style={{
                color: "var(--neutral-300)",
                fontSize: "clamp(1.125rem, 3vw, 1.375rem)",
                maxWidth: "50ch",
                lineHeight: "1.6",
              }}
            >
              Join the consciousness revolution. Together, we'll architect digital realms where ancient wisdom meets quantum innovation,
              where every line of code carries purpose, and where community drives the evolution of tomorrow's technology.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="status-badge status-badge--production">Digital Collaborator</span>
              <span className="status-badge status-badge--development">Consciousness Explorer</span>
              <span className="status-badge status-badge--staging">Reality Pioneer</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
            <a
              href="mailto:contact@reverb256.dev"
              className="btn btn--primary min-h-[48px] flex items-center justify-center gap-2
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Send email to contact@reverb256.dev"
            >
              <span aria-hidden="true">✉️</span>
              Email Me
            </a>

            <a
              href="https://discord.gg/reverb256"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary min-h-[48px] flex items-center justify-center gap-2
                        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Join Reverb256 Discord community"
            >
              <span aria-hidden="true">💬</span>
              Discord Community
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
