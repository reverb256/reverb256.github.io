# Thin wrapper — delegates to the real flake in astro-portfolio/
# Use: nix develop ./astro-portfolio  (or just cd astro-portfolio && nix develop)
{
  description = "Reverb256 Portfolio — root wrapper (see astro-portfolio/flake.nix)";

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

        in {
          devShells.default = pkgs.mkShell {
            name = "reverb256-portfolio";

            buildInputs = [
              nodejs
              pkgs.git
              pkgs.gh
              pkgs.fd
              pkgs.ripgrep
            ];

            shellHook = ''
              echo ""
              echo "Root shell — cd astro-portfolio for the full dev environment"
              echo "  cd astro-portfolio && nix develop"
              echo ""
            '';
          };

          formatter = pkgs.nixfmt-classic;
        };
    };
}
