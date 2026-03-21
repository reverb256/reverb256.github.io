import { useState, useRef, useEffect } from 'react';

interface CodeTab {
  id: string;
  label: string;
  code: string;
}

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
let
  # Custom package set
  customPkgs = import ./pkgs { inherit pkgs; };

  # Module options
  options = {
    myservice.enable = lib.mkEnableOption "My Custom Service";
  };
in
{
  # Conditional configuration
  config = lib.mkIf config.myservice.enable {
    systemd.services.myservice = {
      description = "Custom Service";
      wantedBy = [ "multi-user.target" ];
      serviceConfig = {
        ExecStart = "\${customPkgs.myservice}/bin/myservice";
        Restart = "on-failure";
      };
    };
  };

  # Imperative-style commands with nixos-rebuild
  system.activationScripts = {
    setup-dirs = {
      text = ''
        mkdir -p /var/lib/myservice
        chown myservice:myservice /var/lib/myservice
      '';
    };
  };
}`
  }
];

export default function CodeExplorer() {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout on unmount to prevent memory leak
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const copyToClipboard = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);

      // Clear existing timeout if any
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Store timeout ID and set new timeout
      timeoutRef.current = setTimeout(() => {
        setCopiedIndex(null);
        timeoutRef.current = null;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="code-explorer">
      <div className="tabs">
        {CODE_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {CODE_TABS.map((tab, index) => (
        <div
          key={tab.id}
          className={`code-content ${activeTab === tab.id ? 'active' : ''}`}
        >
          <div className="code-header">
            <span className="code-filename">{tab.label}.nix</span>
            <button
              className="copy-button"
              onClick={() => copyToClipboard(tab.code, index)}
              aria-label="Copy to clipboard"
            >
              {copiedIndex === index ? 'Copied!' : 'Copy'}
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
