import { useState, useCallback, useEffect } from 'react';

type TabId = 'overview' | 'patterns' | 'deep-dive';

interface CodeTab {
  id: TabId;
  label: string;
  code: string;
}

// Constants extracted for maintainability
const COPY_FEEDBACK_DURATION = 2000; // 2 seconds
const CODE_TABS: CodeTab[] = [
  {
    id: 'overview',
    label: 'Overview',
    code: `# NixOS Configuration Pattern
{
  # Declarative system configuration
  boot.loader.systemd-boot.enable = true;

  # Network setup
  networking.networkmanager.enable = true;

  # User management
  users.users.jkro = {
    isNormalUser = true;
    extraGroups = [ "wheel" "networkmanager" ];
  };

  # System packages
  environment.systemPackages = with pkgs; [
    vim git curl wget
  ];
}`
  },
  {
    id: 'patterns',
    label: 'Key Patterns',
    code: `# Module Composition Pattern
{ config, pkgs, ... }:
{
  imports = [
    ./hardware-configuration.nix
    ./modules/gpu.nix
    ./modules/networking.nix
  ];

  # Service configuration with options
  services.nginx = {
    enable = true;
    virtualHosts."example.com" = {
      forceSSL = true;
      enableACME = true;
      root = "/var/www/example";
    };
  };

  # GPU passthrough for ML workloads
  hardware.nvidia.package = config.boot.kernelPackages.nvidiaPackages.beta;
}`
  },
  {
    id: 'deep-dive',
    label: 'Deep Dive',
    code: `# Advanced NixOS Patterns
{ config, pkgs, lib, ... }:
{
  # Service configuration with systemd
  systemd.services.myservice = {
    description = "Custom Service";
    wantedBy = [ "multi-user.target" ];
    serviceConfig = {
      ExecStart = "/usr/bin/myservice";
      Restart = "on-failure";
    };
  };

  # System activation scripts
  system.activationScripts.setup-dirs.text = ''
    mkdir -p /var/lib/myservice
    chown myservice:myservice /var/lib/myservice
  '';
}`
  }
];

export default function CodeExplorer() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [copiedTab, setCopiedTab] = useState<TabId | null>(null);

  // Auto-reset copy feedback after delay
  useEffect(() => {
    if (copiedTab) {
      const timer = setTimeout(() => setCopiedTab(null), COPY_FEEDBACK_DURATION);
      return () => clearTimeout(timer);
    }
  }, [copiedTab]);

  const copyToClipboard = useCallback(async (code: string, tabId: TabId) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedTab(tabId);
    } catch (err) {
      console.error('Failed to copy code to clipboard:', err);
    }
  }, []);

  const handleTabChange = useCallback((tabId: TabId) => {
    setActiveTab(tabId);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, tabId: TabId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTabChange(tabId);
    }
  }, [handleTabChange]);

  return (
    <div className="code-explorer">
      {/* Tab Navigation */}
      <div className="tabs" role="tablist">
        {CODE_TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id)}
            tabIndex={activeTab === tab.id ? 0 : -1}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code Panels */}
      {CODE_TABS.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          className={`code-content ${activeTab === tab.id ? 'active' : ''}`}
          tabIndex={0}
          hidden={activeTab !== tab.id}
        >
          <div className="code-header">
            <span className="code-filename">{tab.label}.nix</span>
            <button
              className="copy-button"
              onClick={() => copyToClipboard(tab.code, tab.id)}
              aria-label={`Copy ${tab.label} code to clipboard`}
              aria-live="polite"
              aria-atomic="true"
            >
              {copiedTab === tab.id ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="code-block">
            <code>{tab.code}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}
