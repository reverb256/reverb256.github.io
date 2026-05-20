{
  description = "Reverb256 Portfolio — Declarative Astro 5 + React 19 + GSAP + Tailwind";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs = inputs@{ self, nixpkgs, flake-parts }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];

      perSystem = { config, self', inputs', pkgs, system, ... }:
        let
          nodejs = pkgs.nodejs_22;

          # Playwright browsers from nixpkgs — version MUST match @playwright/test in package.json
          # nixpkgs playwright-driver 1.59.1 ↔ @playwright/test@^1.59.1
          playwrightBrowsers = pkgs.playwright-driver.browsers;

          # Shared development tools
          devTools = [
            # Core (npm is bundled with nodejs_22, no separate package needed)
            nodejs
            pkgs.typescript
            pkgs.tsx

            # Linting & Formatting
            pkgs.eslint
            pkgs.prettier

            # Browser Testing (Playwright)
            # IMPORTANT: Pin @playwright/test@1.59.1 in package.json to match nixpkgs
            pkgs.playwright-driver.browsers

            # CLI utilities (fast Rust alternatives)
            pkgs.fd
            pkgs.ripgrep
            pkgs.bat
            pkgs.eza
            pkgs.jq
            pkgs.watchexec

            # Git
            pkgs.git
            pkgs.gh
          ];

        in {
          # ── Development shell ──────────────────────────────────────────
          devShells.default = pkgs.mkShell {
            name = "reverb256-portfolio";

            buildInputs = devTools;

            shellHook = ''
              export PATH="$PWD/node_modules/.bin:$PATH"
              export NODE_ENV=development

              # Playwright — NixOS needs these env vars to find system browsers
              export PLAYWRIGHT_BROWSERS_PATH=${playwrightBrowsers}
              export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true

              echo ""
              echo "╔══════════════════════════════════════════════╗"
              echo "║  Reverb256 Portfolio (Astro 5)              ║"
              echo "╠══════════════════════════════════════════════╣"
              printf "║  Node: %-35s║\n" "$(node --version)"
              printf "║  NPM:  %-35s║\n" "$(npm --version)"
              echo "║  Playwright: 1.59.1 (NixOS)                 ║"
              echo "╚══════════════════════════════════════════════╝"
              echo ""
              echo "Commands:"
              echo "  npm run dev        Start dev server (localhost:4321)"
              echo "  npm run build      Build for production"
              echo "  npm run preview    Preview production build"
              echo "  npx playwright test  Run Playwright tests"
              echo "  npx astro check    Type-check Astro components"
              echo ""
              echo "Playwright browsers: $PLAYWRIGHT_BROWSERS_PATH"
              echo ""
            '';
          };

          # ── Formatter ─────────────────────────────────────────────────
          formatter = pkgs.nixfmt-classic;

          # ── Apps ──────────────────────────────────────────────────────
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
                npm ci --prefer-offline --no-audit 2>/dev/null || npm install
                npm run build
                echo "Built to dist/"
              '');
            };

            preview = {
              type = "app";
              program = toString (pkgs.writeShellScript "preview" ''
                cd ${self}
                npm run preview
              '');
            };

            test = {
              type = "app";
              program = toString (pkgs.writeShellScript "test" ''
                cd ${self}
                export PLAYWRIGHT_BROWSERS_PATH=${playwrightBrowsers}
                export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
                npx playwright test "$@"
              '');
            };

            check = {
              type = "app";
              program = toString (pkgs.writeShellScript "check" ''
                cd ${self}
                npx astro check
              '');
            };

            install = {
              type = "app";
              program = toString (pkgs.writeShellScript "install" ''
                cd ${self}
                npm ci --prefer-offline --no-audit 2>/dev/null || npm install
                echo "Dependencies installed"
              '');
            };
          };
        };
    };
}
