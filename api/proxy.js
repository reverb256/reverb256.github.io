// API Proxy for reverb256.github.io
// This file handles API requests for the static GitHub Pages site
// It acts as serverless function that proxies requests to various services

// For static deployment on GitHub Pages, we need to create mock data
// that simulates the API responses the frontend expects

export default async function handler(req, res) {
  const { pathname, query } = req;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Mock API responses based on the expected frontend calls
  if (pathname.startsWith('/api/consciousness-live')) {
    // Consciousness metrics endpoint
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

    return res.status(200).json({
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
  }

  if (pathname.startsWith('/api/system-health')) {
    // System health endpoint
    return res.status(200).json({
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
  }

  if (pathname.startsWith('/api/performance-metrics')) {
    // Performance metrics endpoint
    return res.status(200).json({
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
  }

  if (pathname.startsWith('/api/consciousness')) {
    // General consciousness endpoint
    return res.status(200).json({
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
  }

  if (pathname.startsWith('/api/agents/character-analysis')) {
    // Character analysis endpoint
    return res.status(200).json({
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
  }

  // Fallback for other API endpoints
  if (pathname.startsWith('/api/')) {
    // Return mock response for other API endpoints
    return res.status(200).json({
      status: 'success',
      message: `Mock response for ${pathname}`,
      timestamp: new Date().toISOString(),
      data: {}
    });
  }

  // For non-API routes, return a 404
  res.status(404).json({
    error: 'Not Found',
    message: `The requested endpoint ${pathname} was not found`
  });
}