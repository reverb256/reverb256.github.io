{
  description = "Reverb256 Portfolio - Declarative Astro + GSAP + Tailwind";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        nodejs = pkgs.nodejs_20;
        
        # Playwright browsers from nixpkgs (version 1.57.0)
        playwrightBrowsers = pkgs.playwright-driver.browsers;
        
        # Declarative Node.js environment
        nodeEnv = {
          buildInputs = [ nodejs pkgs.nodePackages.npm ];
          shellHook = ''
            export PATH="$PWD/node_modules/.bin:$PATH"
            export NODE_ENV=development
          '';
        };
        
        # Shared development tools
        devTools = with pkgs; [
          # Core
          nodejs
          nodePackages.npm
          nodePackages.typescript
          nodePackages.ts-node
          
          # Linting & Formatting
          nodePackages.eslint
          nodePackages.prettier
          
          # Browser Testing (Playwright - use @playwright/test@1.57.0 in package.json!)
          playwright-driver.browsers
          
          # CLI utilities (fast Rust alternatives)
          fd        # find replacement
          ripgrep   # grep replacement
          bat       # cat replacement
          eza       # ls replacement
          jq        # JSON processor
          watchexec # file watcher
          
          # Git
          git
          gh        # GitHub CLI
        ];

      in {
        # Development shell - pure declarative environment
        devShells = {
          default = pkgs.mkShell {
            name = "reverb256-portfolio";
            buildInputs = devTools;
            
            shellHook = ''
              export PATH="$PWD/node_modules/.bin:$PATH"
              export NODE_ENV=development
              
              # Playwright configuration for NixOS
              # IMPORTANT: Use @playwright/test@1.57.0 in package.json to match nixpkgs version
              export PLAYWRIGHT_BROWSERS_PATH=${playwrightBrowsers}
              export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
              
              # Welcome message
              echo ""
              echo "╔════════════════════════════════════════════╗"
              echo "║  Reverb256 Portfolio (Astro)               ║"
              echo "╠════════════════════════════════════════════╣"
              printf "║  Node: %-35s║\n" "$(node --version)"
              printf "║  NPM:  %-35s║\n" "$(npm --version)"
              echo "║  Playwright: 1.57.0 (NixOS)                ║"
              echo "╚════════════════════════════════════════════╝"
              echo ""
              echo "Commands:"
              echo "  npm run dev          - Start dev server (localhost:4321)"
              echo "  npm run build        - Build for production"
              echo "  npm run preview      - Preview production build"
              echo "  npx playwright test  - Run Playwright tests (all browsers)"
              echo ""
              echo "Playwright browsers: $PLAYWRIGHT_BROWSERS_PATH"
              echo ""
            '';
          };
        };

        # Nix fmt for code formatting
        formatter = pkgs.nixfmt-classic;

        # Apps for running commands
        apps = {
          dev = {
            type = "app";
            program = toString (pkgs.writeShellScript "dev" ''
              cd ${self}
              npm run dev
            '');
          };
          
          build = {
            type = "app";
            program = toString (pkgs.writeShellScript "build" ''
              cd ${self}
              npm ci --prefer-offline --no-audit
              npm run build
              echo "Built to dist/"
            '');
          };
          
          # Test with Playwright
          test = {
            type = "app";
            program = toString (pkgs.writeShellScript "test" ''
              cd ${self}
              export PLAYWRIGHT_BROWSERS_PATH=${playwrightBrowsers}
              export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
              npx playwright test
            '');
          };
          
          # Install dependencies declaratively
          install = {
            type = "app";
            program = toString (pkgs.writeShellScript "install" ''
              cd ${self}
              npm ci --prefer-offline --no-audit
              echo "Dependencies installed"
            '');
          };
        };
      }
    );
}
