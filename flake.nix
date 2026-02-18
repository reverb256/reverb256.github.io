{
  description = "Reverb256 Portfolio - Static site built with Astro, GSAP, and Tailwind";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        
        nodejs = pkgs.nodejs_20;
        
        buildTools = with pkgs; [
          nodejs
          nodePackages.npm
        ];
        
        devTools = with pkgs; [
          nodePackages.typescript
          nodePackages.eslint
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
            echo "╚════════════════════════════════════════════╝"
            echo ""
            echo "Commands:"
            echo "  npm run dev      - Start dev server"
            echo "  npm run build    - Build for production"
            echo "  npm run preview  - Preview build"
            echo "  npm run test     - Run Playwright tests"
            echo ""
          '';
        };
        
        apps.build = {
          type = "app";
          program = toString (pkgs.writeShellScript "build" ''
            cd ${self}/astro-portfolio
            npm ci --prefer-offline --no-audit
            npm run build
            echo "Built to dist/"
          '');
        };
        
        apps.preview = {
          type = "app";
          program = toString (pkgs.writeShellScript "preview" ''
            cd ${self}/astro-portfolio
            npm run preview
          '');
        };
      }
    );
}
