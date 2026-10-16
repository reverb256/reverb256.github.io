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

        packageJson = builtins.fromJSON (builtins.readFile ./package.json);

        # ---------------------------------------------------------------------
        # Playwright: nixpkgs owns the version, and package.json must match it.
        #
        # nixpkgs builds the browser trees itself (pkgs/development/web/playwright,
        # versions in browsers.json) and those are the only Playwright browsers
        # that run on NixOS: browsers fetched by `bunx playwright install` are not
        # patched for the Nix store and abort on missing shared libraries
        # (https://wiki.nixos.org/wiki/Playwright).
        #
        # Playwright resolves a browser by the revision compiled into its own
        # version, so the runner in node_modules must be exactly the version the
        # driver came from. Measured 2026-10-16, before this change:
        #   astro-portfolio/flake.lock rev b5aa0fb -> playwright-driver 1.60.0
        #     (chromium-1223), while bun.lock had @playwright/test 1.64.0, which
        #     looks for chromium-1248 -> "Executable doesn't exist".
        #   nixpkgs nixos-unstable (the rev this flake's lock pins) -> 1.63.0
        #     (chromium-1243), which is what package.json and bun.lock declare now.
        # The assertion below turns the next drift into an evaluation error, in
        # `nix develop` and in `nix flake check`, instead of a broken
        # `bunx playwright test` discovered later.
        # ---------------------------------------------------------------------
        playwrightVersion = pkgs.playwright-driver.version;
        declaredPlaywrightVersion = packageJson.devDependencies."@playwright/test";
        playwrightVersionMatches =
          pkgs.lib.assertMsg (declaredPlaywrightVersion == playwrightVersion) ''
            Playwright version mismatch.
              astro-portfolio/package.json declares: @playwright/test "${declaredPlaywrightVersion}"
              this flake's nixpkgs provides:          playwright-driver ${playwrightVersion}
            PLAYWRIGHT_BROWSERS_PATH points at browser trees built by nixpkgs'
            playwright-driver, and nixpkgs' browsers are the only ones that run
            on NixOS, so the runner and the driver must be the same version.
            Fix it with one of:
              - set "@playwright/test" to exactly "${playwrightVersion}" in
                astro-portfolio/package.json, run `bun install` in
                astro-portfolio/, and commit the updated bun.lock; or
              - move nixpkgs to a revision whose playwright-driver is
                ${declaredPlaywrightVersion}: `nix flake update nixpkgs` in
                astro-portfolio/.
            See https://wiki.nixos.org/wiki/Playwright.
          '';

        # playwright.config.ts enables Chromium projects only (chromium, "Mobile
        # Chrome", "Tablet"); firefox and webkit are commented out there and no
        # test names them. Publishing all five browser trees put ~2.2 GB in this
        # shell's closure -- more than the project can use, and the reason this
        # devShell had never been instantiated or validated. chromium,
        # chromium-headless-shell and ffmpeg are about a quarter of that.
        # Re-enable firefox/webkit here if those projects are uncommented.
        playwrightBrowsers = pkgs.playwright-driver.selectBrowsers {
          withFirefox = false;
          withWebkit = false;
        };
        chromiumRevision = pkgs.playwright-driver.browsersJSON.chromium.revision;

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

          # Browser testing. These are the nixpkgs browser trees; the runner is
          # astro-portfolio/node_modules/@playwright/test, whose version the
          # assertion above keeps equal to playwright-driver.
          playwrightBrowsers

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
          default = assert playwrightVersionMatches; pkgs.mkShell {
            name = "reverb256-portfolio";
            buildInputs = devTools;

            shellHook = ''
              export PATH="$PWD/node_modules/.bin:$PATH"
              export NODE_ENV=development

              # Playwright configuration for NixOS. The browsers come from the
              # same nixpkgs as the driver, and package.json must declare exactly
              # that version (asserted above, so this shell cannot be entered
              # with a browser/runner mismatch).
              export PLAYWRIGHT_BROWSERS_PATH=${playwrightBrowsers}
              export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true

              # Welcome message
              echo ""
              echo "╔════════════════════════════════════════════╗"
              echo "║  Reverb256 Portfolio (Astro)               ║"
              echo "╠════════════════════════════════════════════╣"
              printf "║  Node: %-35s║\n" "$(node --version)"
              printf "║  Bun:  %-35s║\n" "$(bun --version)"
              printf "║  Playwright: %-29s║\n" "${playwrightVersion}"
              printf "║  Browsers: %-31s║\n" "chromium-${chromiumRevision}"
              echo "╚════════════════════════════════════════════╝"
              echo ""
              echo "Commands:"
              echo "  bun run dev          - Start dev server (localhost:4321)"
              echo "  bun run build        - Build for production"
              echo "  bun run preview      - Preview production build"
              echo "  bunx playwright test - Run Playwright tests (Chromium projects)"
              echo ""
              echo "Playwright browsers: $PLAYWRIGHT_BROWSERS_PATH"
              echo ""
            '';
          };
        };

        # Nix fmt for code formatting. `nixfmt-classic` was removed from nixpkgs
        # ("deprecated and unmaintained") between the old pin (b5aa0fb) and this
        # one (55bfb4d), which made `nix flake check` fail on the 'formatter'
        # output until it was replaced. `pkgs.nixfmt` is nixfmt-rfc-style, the
        # formatter nixpkgs itself uses.
        formatter = pkgs.nixfmt;

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
