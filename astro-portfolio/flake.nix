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
        # nodejs_20 is EOL in this nixpkgs revision and refuses to instantiate
        # ("Package 'nodejs-20.20.2' is marked as insecure"), which is the third
        # reason `nix flake check` failed on this flake. The repo targets Node 24+
        # (DESIGN.md 11.1), so the default `nodejs` attribute is the right pin.
        nodejs = pkgs.nodejs;
        
        # Playwright browsers from nixpkgs (version 1.57.0)
        playwrightBrowsers = pkgs.playwright-driver.browsers;
        
        # Declarative Node.js environment
        nodeEnv = {
          buildInputs = [ nodejs pkgs.bun ];
          shellHook = ''
            export PATH="$PWD/node_modules/.bin:$PATH"
            export NODE_ENV=development
          '';
        };
        
        # Shared development tools
        # bun is the only supported installer: bun.lock is the lockfile the
        # Cloudflare deploy installs (bun install --frozen-lockfile) and the npm
        # lockfile was deleted with the 2026-10-16 installer change, so every
        # command below that called the npm client was already dead.
        # scripts/check-bun-entry-points.sh fails a PR if npm comes back.
        #
        # nodePackages was removed from nixpkgs (2026-03-03) and now throws, which
        # is why this shell stopped evaluating; the tools below are the top-level
        # attributes that replaced it. ts-node has no top-level package any more
        # and nothing in this repo used it.
        devTools = with pkgs; [
          # Core
          nodejs
          bun
          typescript

          # Linting & Formatting
          eslint
          prettier
          
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
              printf "║  Bun:  %-35s║\n" "$(bun --version)"
              echo "║  Playwright: 1.57.0 (NixOS)                ║"
              echo "╚════════════════════════════════════════════╝"
              echo ""
              echo "Commands:"
              echo "  bun run dev          - Start dev server (localhost:4321)"
              echo "  bun run build        - Build for production"
              echo "  bun run preview      - Preview production build"
              echo "  bunx playwright test - Run Playwright tests (all browsers)"
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
              bun run dev
            '');
          };
          
          build = {
            type = "app";
            program = toString (pkgs.writeShellScript "build" ''
              cd ${self}
              bun install --frozen-lockfile
              bun run build
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
              bunx playwright test
            '');
          };
          
          # Install dependencies declaratively
          install = {
            type = "app";
            program = toString (pkgs.writeShellScript "install" ''
              cd ${self}
              bun install --frozen-lockfile
              echo "Dependencies installed from bun.lock (frozen)"
            '');
          };
        };
      }
    );
}
