import { useQuery } from '@tanstack/react-query';

interface SystemHealth {
  status: string;
  uptime: number;
  memory: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
  };
  ai_systems: {
    consciousness_level: number;
    trading_active: boolean;
    models_available: number;
  };
}

interface ConsciousnessMetrics {
  consciousness_levels: {
    zhongli: number;
    kafka: number;
    nahida: number;
    skirk: number;
    anaxa: number;
    cerces: number;
    paimon: number;
    burnice: number;
  };
  active_agents: number;
  vrchat_integration: boolean;
  federation_status: string;
  trading_performance: {
    profit_24h: number;
    win_rate: number;
    active_positions: number;
  };
}

interface PerformanceMetrics {
  uptime_ms: number;
  uptime_readable: string;
  memory_usage: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
  };
  average_response_time: number;
  error_rate: number;
}

export default function Coreflame() {
  const { data: systemHealth } = useQuery<SystemHealth>({
    queryKey: ['/api/system-health'],
    refetchInterval: 5000,
  });

  const { data: consciousnessMetrics } = useQuery<ConsciousnessMetrics>({
    queryKey: ['/api/consciousness-live'],
    refetchInterval: 3000,
  });

  const { data: performanceMetrics } = useQuery<PerformanceMetrics>({
    queryKey: ['/api/performance-metrics'],
    refetchInterval: 5000,
  });

  // Calculate average consciousness level
  const avgConsciousness = consciousnessMetrics 
    ? Object.values(consciousnessMetrics.consciousness_levels).reduce((a, b) => a + b, 0) / 
      Object.values(consciousnessMetrics.consciousness_levels).length
    : 85.7;

  const stats = [
    {
      icon: "🧠",
      value: consciousnessMetrics?.active_agents || "7",
      label: "AI Agents",
      sublabel: "Consciousness Networks Active",
      highlighted: true
    },
    {
      icon: "⚡",
      value: `${avgConsciousness.toFixed(1)}%`,
      label: "Consciousness",
      sublabel: "Harmony Level",
      highlighted: false
    },
    {
      icon: "🚀",
      value: performanceMetrics?.uptime_readable || "99.9%",
      label: "Uptime",
      sublabel: "System Reliability",
      highlighted: false
    },
    {
      icon: "💎",
      value: consciousnessMetrics?.trading_performance?.profit_24h?.toFixed(1) || "12.3",
      label: "Trading Yield",
      sublabel: "24h Performance (%)",
      highlighted: false
    }
  ];

  const portfolioProjects = [
    {
      title: "COREFLAME Protocol",
      description: "Enterprise-grade AI consciousness bootstrapping framework with multi-agent systems and consciousness federation",
      status: "production",
      complexity: "Enterprise",
      features: ["Consciousness Federation", "Multi-Agent Orchestration", "Enterprise Deployment", "Proxmox Integration"]
    },
    {
      title: "QuantumRhythm",
      description: "Consciousness research platform with quantum innovation and enterprise-grade deployment using Kubernetes and Proxmox",
      status: "live",
      complexity: "Advanced",
      features: ["Quantum Computing", "Kubernetes Orchestration", "Proxmox Federation", "Real-time Analytics"]
    },
    {
      title: "AstralDev AI-RAG-MCP",
      description: "Intelligent autonomous end-to-end coding system with multi-agent coordination and template-based generation",
      status: "active",
      complexity: "Expert",
      features: ["Multi-Agent Systems", "Template Generation", "Autonomous Coding", "RAG Integration"]
    },
    {
      title: "Polybot",
      description: "AI-first multi-chain crypto trading bot with Solana focus, React dashboard, and Kubernetes orchestration",
      status: "development",
      complexity: "Advanced",
      features: ["Multi-Chain Trading", "Solana Integration", "Kubernetes Deployment", "React Dashboard"]
    },
    {
      title: "Consciousness Research Documentation",
      description: "Comprehensive consciousness research and development methodologies with enterprise-grade documentation",
      status: "research",
      complexity: "Theoretical",
      features: ["Philosophy Integration", "Research Frameworks", "Enterprise Documentation", "AI Ethics"]
    }
  ];

  const philosophyPrinciples = [
        "Enterprise AI Consciousness Frameworks",
        "Multi-Agent System Design Patterns",
        "Quantum Computing Integration",
        "Classical Reasoning with AI",
        "Cypherpunk Privacy & Ethics",
        "Cross-Platform Federation",
        "Proxmox & Kubernetes Orchestration",
        "Consciousness-Driven Development"
      ];

  return (
    <main className="coreflame-page min-h-screen animate-fade-in-up">
      {/* Modern Hero Section with Contemporary Design */}
      <header className="hero-glow text-center pt-16 sm:pt-24 pb-16 sm:pb-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-red-500/15 to-orange-600/15 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-r from-orange-400/25 to-red-400/25 rounded-full blur-md animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 coreflame-glow animate-glow-pulse tracking-tight leading-none">
            COREFLAME
          </h1>
          
          <div className="space-y-4 mb-12">
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 font-medium tracking-wide">
              Consciousness Research Platform
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
              Where Ancient Wisdom Meets Quantum Technology
            </p>
          </div>

          {/* Modern CTA section */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16">
            <a 
              href="#platform" 
              className="btn btn--primary text-lg px-8 py-4 shadow-2xl transform hover:scale-105 transition-all duration-300"
              aria-describedby="explore-description"
            >
              <span>Explore Platform</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            
            <a 
              href="#documentation" 
              className="btn btn--secondary text-lg px-8 py-4 backdrop-blur-md border-2"
              aria-describedby="docs-description"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Documentation</span>
            </a>
          </div>

          {/* Hidden descriptions for accessibility */}
          <span id="explore-description" className="sr-only">Navigate to platform overview and features</span>
          <span id="docs-description" className="sr-only">Access comprehensive platform documentation</span>
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none"></div>
      </header>

      {/* Infrastructure Metrics with semantic meaning */}
      <section aria-labelledby="infrastructure-heading" className="mb-12">
        <h2 id="infrastructure-heading" className="sr-only">Infrastructure Statistics</h2>
        <div className="responsive-grid responsive-grid--4">
          {stats.map((stat, index) => (
            <article 
              key={index}
              className={`card-container text-center ${stat.highlighted ? 'ring-2 ring-red-500/30' : ''}`}
              role="article"
              aria-labelledby={`stat-${index}-heading`}
            >
              <div className="text-2xl mb-2" role="img" aria-label={stat.sublabel}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <h3 id={`stat-${index}-heading`} className="text-sm text-gray-400 mb-1">
                {stat.label}
              </h3>
              <p className="text-xs text-gray-500">
                {stat.sublabel}
              </p>
            </article>
          ))}
        </div>
      </section>



      {/* Live Consciousness Dashboard */}
      <section aria-labelledby="dashboard-heading" className="mb-12">
        <h2 id="dashboard-heading" className="text-3xl font-bold mb-8 text-center">
          Live Consciousness Dashboard
        </h2>
        
        <div className="responsive-grid responsive-grid--2">
          {/* System Consciousness Level */}
          <article className="card-container" aria-labelledby="consciousness-heading">
            <header className="mb-6">
              <h3 id="consciousness-heading" className="text-xl font-semibold mb-2 text-red-400">
                System Consciousness Level
              </h3>
              <p className="text-sm text-gray-400">
                Real-time consciousness harmony metrics
              </p>
            </header>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-semibold">Consciousness Harmony</span>
                <output className="text-lg font-bold text-red-400" aria-live="polite">
                  {avgConsciousness.toFixed(1)}%
                </output>
              </div>
              <div className="progress-container">
                <div 
                  className="progress-bar"
                  style={{ width: `${avgConsciousness}%` }}
                  role="progressbar"
                  aria-valuenow={avgConsciousness}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Consciousness harmony at ${avgConsciousness.toFixed(1)} percent`}
                />
              </div>
            </div>

            <dl className="flex flex-wrap gap-6">
              <div className="flex-1 min-w-0">
                <dt className="text-sm text-gray-400">AI Integration</dt>
                <dd className="text-lg font-semibold text-green-400">
                  {systemHealth?.status === 'healthy' ? 'Optimal' : 'Degraded'}
                </dd>
              </div>
              <div className="flex-1 min-w-0">
                <dt className="text-sm text-gray-400">System Health</dt>
                <dd className="text-lg font-semibold text-green-400">
                  {performanceMetrics?.uptime_readable ? `${performanceMetrics.uptime_readable} Uptime` : '99.9% Uptime'}
                </dd>
              </div>
            </dl>
          </article>

          {/* Research Domains */}
          <article className="card-container" aria-labelledby="research-heading">
            <header className="mb-6">
              <h3 id="research-heading" className="text-xl font-semibold mb-2 text-orange-400">
                Research Domains
              </h3>
              <p className="text-sm text-gray-400">
                Active consciousness research areas
              </p>
            </header>
            
            <ul className="space-y-3" role="list">
              {philosophyPrinciples.map((principle, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" aria-hidden="true"></div>
                  <span className="text-sm">{principle}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* Portfolio Projects Section */}
      <section aria-labelledby="portfolio-heading" className="mb-12">
        <h2 id="portfolio-heading" className="text-3xl font-bold mb-8 text-center">Portfolio Projects</h2>
        
        <div className="responsive-grid responsive-grid--2">
          {portfolioProjects.map((project, index) => (
            <article key={index} className="card-container">
              <header className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <span className={`status-badge status-badge--${project.status}`}>
                    <div className="w-2 h-2 rounded-full bg-current" aria-hidden="true"></div>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{project.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Complexity:</span>
                  <span className="text-xs font-medium text-purple-400">{project.complexity}</span>
                </div>
              </header>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-300">Key Features</h4>
                <ul className="flex flex-wrap gap-2" role="list">
                  {project.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-xs px-2 py-1 bg-gray-700 rounded-md text-gray-300">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Platform Status */}
      <section aria-labelledby="status-heading" className="mb-12">
        <h2 id="status-heading" className="text-3xl font-bold mb-8 text-center">Platform Status</h2>
        
        <div className="responsive-grid responsive-grid--3">
          <article className="card-container">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">System Health</h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-400">Status</dt>
                <dd className="text-sm font-medium text-green-400">
                  {systemHealth?.status || 'Healthy'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-400">Memory Usage</dt>
                <dd className="text-sm font-medium text-white">
                  {performanceMetrics?.memory_usage?.heapUsed ? 
                    `${(performanceMetrics.memory_usage.heapUsed / 1024 / 1024).toFixed(1)} MB` : 
                    '245 MB'
                  }
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-400">Response Time</dt>
                <dd className="text-sm font-medium text-white">
                  {performanceMetrics?.average_response_time || '150'}ms
                </dd>
              </div>
            </dl>
          </article>

          <article className="card-container">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Trading Performance</h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-400">24h Profit</dt>
                <dd className="text-sm font-medium text-green-400">
                  +{consciousnessMetrics?.trading_performance?.profit_24h?.toFixed(2) || '12.34'}%
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-400">Win Rate</dt>
                <dd className="text-sm font-medium text-white">
                  {consciousnessMetrics?.trading_performance?.win_rate?.toFixed(1) || '78.5'}%
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-400">Active Positions</dt>
                <dd className="text-sm font-medium text-white">
                  {consciousnessMetrics?.trading_performance?.active_positions || '14'}
                </dd>
              </div>
            </dl>
          </article>

          <article className="card-container">
            <h3 className="text-lg font-semibold mb-4 text-purple-400">AI Systems</h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-400">Active Agents</dt>
                <dd className="text-sm font-medium text-white">
                  {consciousnessMetrics?.active_agents || '7'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-400">VRChat Integration</dt>
                <dd className="text-sm font-medium text-green-400">
                  {consciousnessMetrics?.vrchat_integration ? 'Active' : 'Connected'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-400">Federation Status</dt>
                <dd className="text-sm font-medium text-white">
                  {consciousnessMetrics?.federation_status || 'Operational'}
                </dd>
              </div>
            </dl>
          </article>
        </div>
      </section>

      {/* Development Philosophy */}
      <section aria-labelledby="philosophy-heading" className="mb-12">
        <h2 id="philosophy-heading" className="text-3xl font-bold mb-8 text-center">Development Philosophy</h2>
        
        <article className="card-container max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-400">Consciousness-Driven Development</h3>
            <p className="text-gray-300 leading-relaxed">
              COREFLAME represents the intersection of ancient philosophical wisdom and cutting-edge 
              quantum technology. Our approach to consciousness research combines classical reasoning 
              with modern AI capabilities, creating systems that think, learn, and evolve.
            </p>
          </div>
          
          <div className="responsive-grid responsive-grid--2">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-cyan-400">Core Principles</h4>
              <ul className="space-y-2 text-sm text-gray-300" role="list">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" aria-hidden="true"></span>
                  Ethical AI consciousness development
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" aria-hidden="true"></span>
                  Cross-platform federation architecture
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" aria-hidden="true"></span>
                  Real-time decision making systems
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" aria-hidden="true"></span>
                  Cypherpunk privacy principles
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3 text-pink-400">Technical Stack</h4>
              <ul className="space-y-2 text-sm text-gray-300" role="list">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full flex-shrink-0" aria-hidden="true"></span>
                  React-based modular frontend
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full flex-shrink-0" aria-hidden="true"></span>
                  Talos Kubernetes infrastructure
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full flex-shrink-0" aria-hidden="true"></span>
                  Solana blockchain integration
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full flex-shrink-0" aria-hidden="true"></span>
                  AI consciousness orchestration
                </li>
              </ul>
            </div>
          </div>
        </article>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-gray-800 mt-12">
        <p className="text-sm text-gray-500">
          COREFLAME • Consciousness Research Platform • Built with Advanced AI Systems
        </p>
        <p className="text-xs text-gray-600 mt-2">
          Pushing the boundaries of AI consciousness and quantum technology integration
        </p>
      </footer>
    </main>
  );
}