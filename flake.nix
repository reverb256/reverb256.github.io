{
  description = "Reverb256 Portfolio - Static site built with Astro, GSAP, and Tailwind";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  # flake.lock IS committed (added 2026-10-16). Without it every evaluation of
  # this flake resolved nixos-unstable HEAD, so this shell and the
  # astro-portfolio one drifted apart on their own: on 2026-10-16 this one
  # floated to rev 55bfb4d (bun-1.4.2, nodejs-24.21.0) while
  # astro-portfolio/flake.lock was pinned to b5aa0fb (bun-1.3.13,
  # nodejs-24.16.0). Two dev shells in one repo must not build with two
  # toolchains by accident.
  #
  # Policy:
  #   - refresh with `nix flake update` (or `nix flake update nixpkgs`) here and
  #     in astro-portfolio/, and commit both flake.lock files together;
  #   - keep the two nixpkgs revs equal: scripts/check-nix-flake-pins.sh fails a
  #     PR when they differ, and .github/workflows/nix-flake-check.yml runs
  #     `nix flake check --no-build` on both flakes.

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        
        # nodejs_20 is EOL in this nixpkgs revision and refuses to instantiate
        # ("Package 'nodejs-20.20.2' is marked as insecure"), so `nix flake check`
        # failed here too. The repo targets Node 24+ (DESIGN.md 11.1).
        nodejs = pkgs.nodejs;
        
        # bun is the only supported installer. astro-portfolio/bun.lock is the
        # lockfile the Cloudflare deploy installs (bun install --frozen-lockfile);
        # the npm lockfile was deleted with the 2026-10-16 installer change, so
        # anything here that called the npm client was already dead.
        # scripts/check-bun-entry-points.sh fails a PR if npm comes back.
        #
        # nodePackages was removed from nixpkgs (2026-03-03) and now throws, so the
        # old nodePackages.typescript / nodePackages.eslint names made this shell
        # unevaluable. Both are top-level attributes today.
        buildTools = with pkgs; [
          nodejs
          bun
        ];
        
        devTools = with pkgs; [
          typescript
          eslint
          git
          jq
          fd
          ripgrep
          bat
          eza
        ];
        
      in {
        devShells.default = pkgs.mkShell {
          name = "reverb256-portfolio";
          
          buildInputs = buildTools ++ devTools;
          
          shellHook = ''
            cd astro-portfolio
            export PATH="$PWD/node_modules/.bin:$PATH"
            
            echo ""
            echo "╔════════════════════════════════════════════╗"
            echo "║  Reverb256 Portfolio (Astro)               ║"
            echo "╠════════════════════════════════════════════╣"
            printf "║  Node: %-35s║\n" "$(node --version)"
            printf "║  Bun:  %-35s║\n" "$(bun --version)"
            echo "╚════════════════════════════════════════════╝"
            echo ""
            echo "Commands:"
            echo "  bun run dev      - Start dev server"
            echo "  bun run build    - Build for production"
            echo "  bun run preview  - Preview build"
            echo "  bun run test     - Run Playwright tests"
            echo ""
          '';
        };
        
        apps.build = {
          type = "app";
          program = toString (pkgs.writeShellScript "build" ''
            cd ${self}/astro-portfolio
            bun install --frozen-lockfile
            bun run build
            echo "Built to dist/"
          '');
        };
        
        apps.preview = {
          type = "app";
          program = toString (pkgs.writeShellScript "preview" ''
            cd ${self}/astro-portfolio
            bun run preview
          '');
        };
      }
    );
}
