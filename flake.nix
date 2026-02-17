{
  description = "Reverb256 Portfolio - Static site built with React, Vite, and Tailwind";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        
        nodejs = pkgs.nodejs_20;
        
        # Core build tools
        buildTools = with pkgs; [
          nodejs
          nodePackages.npm
        ];
        
        # Development utilities
        devTools = with pkgs; [
          # TypeScript
          nodePackages.typescript
          nodePackages.ts-node
          
          # Code quality
          nodePackages.eslint
          
          # Build tools
          vite
          
          # Git
          git
          
          # Useful CLI tools
          jq      # JSON processing
          fd      # fast find
          ripgrep # fast grep
          bat     # better cat
          eza     # better ls
        ];
        
      in {
        # Development shell - use with: nix develop
        devShells.default = pkgs.mkShell {
          name = "reverb256-portfolio";
          
          buildInputs = buildTools ++ devTools;
          
          shellHook = ''
            export PATH="$PWD/node_modules/.bin:$PATH"
            
            # Setup prompt
            echo ""
            echo "╔════════════════════════════════════════════╗"
            echo "║  Reverb256 Portfolio Dev Environment       ║"
            echo "╠════════════════════════════════════════════╣"
            echo "║  Node: $(node --version)                       ║"
            echo "║  NPM:  $(npm --version 2>/dev/null || echo 'N/A')                        ║"
            echo "╚════════════════════════════════════════════╝"
            echo ""
            echo "Commands:"
            echo "  npm run dev          - Start dev server (port 5173)"
            echo "  npm run build:static - Build for GitHub Pages"
            echo "  npm run preview      - Preview production build"
            echo ""
          '';
        };
        
        # Build the static site
        apps.build = {
          type = "app";
          program = toString (pkgs.writeShellScript "build" ''
            set -e
            npm ci --prefer-offline --no-audit
            npm run build:static
            echo "Built to dist-static/"
          '');
        };
        
        # Preview the built site
        apps.preview = {
          type = "app";
          program = toString (pkgs.writeShellScript "preview" ''
            npx serve dist-static -p 5173
          '');
        };
      }
    );
}
