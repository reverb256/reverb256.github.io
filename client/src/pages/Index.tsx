import Layout from "../components/Layout";
import ProjectTile from "../components/ProjectTile";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <Layout>
      {/* Welcome Section */}
<section
  id="welcome-section"
  className="relative min-h-screen flex items-center justify-center px-6 py-12 spotlight-bg"
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
      <div className="glass-card lg:col-span-2 animate-fade-in-up">
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
          <span className="glass-badge glass-badge--primary animate-consciousness-pulse">Consciousness Engineer</span>
          <span className="glass-badge glass-badge--secondary animate-fade-in-up delay-200">Reality Architect</span>
          <span className="glass-badge glass-badge--accent animate-fade-in-up delay-300">Digital Alchemist</span>
        </div>
      </div>

      <div className="glass-card flex flex-col justify-center space-y-4 animate-fade-in-up delay-200">
        <Link to="/coreflame" className="glass-button w-full text-center">
          View COREFLAME Project
        </Link>
        <a
          href="https://github.com/reverb256"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-button glass-button--secondary w-full text-center"
          id="profile-link"
        >
          GitHub Profile
        </a>
      </div>
    </div>
  </div>
</section>

      {/* About Section */}
<section className="px-6 py-20 spotlight-bg">
  <div className="max-w-7xl mx-auto">
    <h2
      className="font-bold mb-16 text-center animate-fade-in-up"
      style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", marginBottom: "4rem" }}
    >
      About Me
    </h2>

    <div className="flex flex-col xl:flex-row gap-12 items-start justify-center">
      {/* Philosophy Section */}
      <div className="glass-card flex-shrink-0 animate-fade-in-up" style={{ maxWidth: "600px" }}>
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
              <span className="glass-badge glass-badge--primary text-xs">Consciousness Federation</span>
              <span className="glass-badge glass-badge--secondary text-xs">Quantum Innovation</span>
              <span className="glass-badge glass-badge--accent text-xs">Multi-Agent Systems</span>
              <span className="glass-badge glass-badge--primary text-xs">Enterprise Architecture</span>
              <span className="glass-badge glass-badge--secondary text-xs">Cross-Platform Integration</span>
              <span className="glass-badge glass-badge--accent text-xs">Privacy-First Design</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="flex flex-col gap-6" style={{ maxWidth: "400px" }}>
        <div className="glass-card animate-fade-in-up delay-200">
          <h4
            className="font-semibold mb-4 flex items-center gap-2"
            style={{ fontSize: "clamp(1.125rem, 3vw, 1.375rem)", color: "var(--brand-accent)" }}
          >
            <span>⚡</span> Core Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {["React 18", "TypeScript", "Node.js", "Vite", "Tailwind CSS", "Kubernetes", "AI/ML", "Solana", "PostgreSQL", "Drizzle ORM", "Proxmox", "Docker", "OpenAI", "Anthropic", "HuggingFace", "vLLM"].map((tech) => (
              <span key={tech} className="glass-badge glass-badge--secondary text-xs">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card animate-fade-in-up delay-300">
          <h4
            className="font-semibold mb-4 flex items-center gap-2"
            style={{ fontSize: "clamp(1.125rem, 3vw, 1.375rem)", color: "var(--brand-secondary)" }}
          >
            <span>🧠</span> Specializations
          </h4>
          <ul className="space-y-3 text-sm" style={{ color: "var(--neutral-300)" }}>
            {[
              "Enterprise-grade AI consciousness platforms",
              "Multi-agent system orchestration",
              "Quantum innovation integration",
              "Distributed computing with Kubernetes",
              "Cross-platform federation architectures",
              "AI-driven trading algorithm development",
              "Privacy-first architecture design",
              "Consciousness-driven development methodology"
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
<section id="projects" className="px-6 py-20 spotlight-bg">
  <div className="max-w-7xl mx-auto">
    <h2 className="font-bold mb-16 text-center animate-fade-in-up" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
      Featured Projects
    </h2>

    <div className="glass-grid">
      <ProjectTile
        title="COREFLAME Protocol"
        description="Enterprise-grade AI consciousness bootstrapping framework with multi-agent systems and consciousness federation"
        status="Production"
        icon="🔥"
        colorClass="var(--brand-primary)"
        link="/coreflame"
      />
      <ProjectTile
        title="QuantumRhythm"
        description="Consciousness research platform with quantum innovation and enterprise-grade deployment using Kubernetes and Proxmox"
        status="Live"
        icon="🌌"
        colorClass="var(--brand-accent)"
        progress={100}
      />
      <ProjectTile
        title="AstralDev AI-RAG-MCP"
        description="Intelligent autonomous end-to-end coding system with multi-agent coordination and template-based generation"
        status="Active"
        icon="🤖"
        colorClass="var(--brand-secondary)"
        progress={90}
      />
      <ProjectTile
        title="Polybot"
        description="AI-first multi-chain crypto trading bot with Solana focus, React dashboard, and Kubernetes orchestration"
        status="In Development"
        icon="💰"
        colorClass="var(--brand-primary)"
        progress={75}
      />
      <ProjectTile
        title="AstralVibe Platform"
        description="Cross-environment federation with consciousness AI platform integration and Proxmox deployment"
        status="Testing"
        icon="🌐"
        colorClass="var(--brand-accent)"
        progress={85}
      />
      <ProjectTile
        title="VibeCoding Framework"
        description="Consciousness-driven development methodology bridging classical philosophy with quantum technology"
        status="Research"
        icon="⚡"
        colorClass="var(--brand-secondary)"
        progress={100}
      />
    </div>
  </div>
</section>

      {/* Contact */}
<section id="contact" className="px-6 py-20 spotlight-bg">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="font-bold mb-16" style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)" }}>
      Get In Touch
    </h2>

    <div className="glass-card mb-12 animate-fade-in-up">
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
        <span className="glass-badge glass-badge--primary">Digital Collaborator</span>
        <span className="glass-badge glass-badge--secondary">Consciousness Explorer</span>
        <span className="glass-badge glass-badge--accent">Reality Pioneer</span>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
      <a
        href="mailto:contact@reverb256.dev"
        className="glass-button min-h-[48px] flex items-center justify-center gap-2
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
        className="glass-button glass-button--secondary min-h-[48px] flex items-center justify-center gap-2
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
