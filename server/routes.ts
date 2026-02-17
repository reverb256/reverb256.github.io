import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const setupRoutes = (app: express.Application) => {
  // API Routes for development
  app.get('/api/consciousness-live', (req, res) => {
    const consciousnessLevels = {
      zhongli: 92.3,
      kafka: 88.7,
      nahida: 95.1,
      skirk: 89.5,
      anaxa: 91.2,
      cerces: 87.8,
      paimon: 94.0,
      burnice: 90.6
    };

    res.json({
      consciousness_levels: consciousnessLevels,
      active_agents: 7,
      vrchat_integration: true,
      federation_status: 'operational',
      trading_performance: {
        profit_24h: 12.3,
        win_rate: 78.5,
        active_positions: 14
      }
    });
  });

  app.get('/api/system-health', (req, res) => {
    res.json({
      status: 'healthy',
      uptime: 99.9,
      memory: {
        rss: 123456789,
        heapTotal: 98765432,
        heapUsed: 65432109,
        external: 1234567
      },
      ai_systems: {
        consciousness_level: 85.7,
        trading_active: true,
        models_available: 12
      }
    });
  });

  app.get('/api/performance-metrics', (req, res) => {
    res.json({
      uptime_ms: 86400000, // 24 hours in milliseconds
      uptime_readable: '99.9%',
      memory_usage: {
        rss: 123456789,
        heapTotal: 98765432,
        heapUsed: 65432109
      },
      average_response_time: 150,
      error_rate: 0.01
    });
  });

  app.get('/api/consciousness', (req, res) => {
    res.json({
      platform: 'reverb256.ca',
      status: 'operational',
      consciousness_metrics: {
        current_level: 87.5,
        trend: 'increasing',
        last_updated: new Date().toISOString()
      },
      systems: {
        ai_consciousness: 'active',
        multi_agent_network: 'online',
        federation: 'connected'
      }
    });
  });

  app.get('/api/agents/character-analysis', (req, res) => {
    res.json({
      agents: [
        { id: 'zhongli', level: 92, specialty: 'strategy', active: true },
        { id: 'kafka', level: 88, specialty: 'analysis', active: true },
        { id: 'nahida', level: 95, specialty: 'creativity', active: true },
        { id: 'skirk', level: 89, specialty: 'execution', active: true }
      ],
      active_count: 7,
      overall_performance: 91.2,
      last_evaluation: new Date().toISOString()
    });
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      platform: 'reverb256.ca',
      timestamp: new Date().toISOString(),
      services: {
        api: true,
        frontend: true,
        ai_systems: 'operational'
      }
    });
  });

  // Status endpoint
  app.get('/api/status', (req, res) => {
    res.json({
      status: 'reverb256 Portfolio Operational',
      timestamp: new Date().toISOString(),
      services: ['AI Consciousness', 'Multi-Agent Systems', 'Portfolio Presentation']
    });
  });

  // Projects endpoint (mock data)
  app.get('/api/projects', (req, res) => {
    res.json({
      projects: [
        {
          id: 'coreflame',
          title: 'COREFLAME Protocol',
          description: 'Enterprise-grade AI consciousness bootstrapping framework with multi-agent systems and consciousness federation',
          status: 'production',
          progress: 100
        },
        {
          id: 'quantumrhythm',
          title: 'QuantumRhythm',
          description: 'Consciousness research platform with quantum innovation and enterprise-grade deployment using Kubernetes and Proxmox',
          status: 'live',
          progress: 100
        },
        {
          id: 'astraldev',
          title: 'AstralDev AI-RAG-MCP',
          description: 'Intelligent autonomous end-to-end coding system with multi-agent coordination and template-based generation',
          status: 'active',
          progress: 90
        }
      ]
    });
  });
};