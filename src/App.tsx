import React, { useState, useEffect } from 'react';
import { Router, Route, Switch, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Character Analysis', path: '/character-analysis' },
  { name: 'Agents', path: '/agents' },
  { name: 'Consciousness', path: '/consciousness' },
  { name: 'About', path: '/about' },
];

const HomePage = () => {
  const [consciousnessData, setConsciousnessData] = useState<any>(null);
  const [characterData, setCharacterData] = useState<any>(null);
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    // Load consciousness metrics
    const loadConsciousnessMetrics = async () => {
      try {
        const response = await fetch('/api/consciousness');
        const data = await response.json();
        setConsciousnessData(data);
      } catch (error) {
        console.log('Failed to load consciousness metrics:', error);
      }
    };

    // Load character data  
    const loadCharacterData = async () => {
      try {
        const response = await fetch('/api/agents/character-analysis');
        const data = await response.json();
        setCharacterData(data);
      } catch (error) {
        console.log('Failed to load character data:', error);
      }
    };

    loadConsciousnessMetrics();
    loadCharacterData();

    // VRChat WebSocket connection
    const connectVRChat = () => {
      try {
        const ws = new WebSocket(`ws://${window.location.host}/ws/vrchat`);

        ws.onopen = () => {
          setWsConnected(true);
          console.log('🎮 VRChat WebSocket connected');
        };

        ws.onclose = () => {
          setWsConnected(false);
          console.log('VRChat WebSocket disconnected');
        };

        ws.onerror = (error) => {
          console.log('VRChat WebSocket error:', error);
          setWsConnected(false);
        };

        return ws;
      } catch (error) {
        console.log('Failed to connect VRChat WebSocket:', error);
        return null;
      }
    };

    const ws = connectVRChat();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Main content will go here */}
    </div>
  );
};

const Navigation = () => {
  const [location] = useLocation();

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <a className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all cursor-pointer">
                reverb256
              </a>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <div key={item.path}>
                  <Link href={item.path}>
                    <a className={`px-3 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                      location === item.path
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}>
                      {item.name}
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const CharacterAnalysisPage = () => {
  return (
    <div>
      <h2>Character Analysis</h2>
      {/* Character Analysis content here */}
    </div>
  );
};

const AgentsPage = () => {
  return (
    <div>
      <h2>Agents</h2>
      {/* Agents content here */}
    </div>
  );
};

const ConsciousnessPage = () => {
  return (
    <div>
      <h2>Consciousness</h2>
      {/* Consciousness content here */}
    </div>
  );
};

const AboutPage = () => {
  return (
    <div>
      <h2>About</h2>
      {/* About content here */}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="bg-gray-900 text-white font-sans antialiased">
        <Navigation />
        <AnimatePresence>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/character-analysis" component={CharacterAnalysisPage} />
            <Route path="/agents" component={AgentsPage} />
            <Route path="/consciousness" component={ConsciousnessPage} />
            <Route path="/about" component={AboutPage} />
          </Switch>
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;