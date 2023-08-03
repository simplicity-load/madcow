let
  pkgs =
    import (
      fetchTarball {
        name = "nixos-23.05_2023-06-30";
        url = "https://github.com/NixOS/nixpkgs/archive/b72aa95f7f096382bff3aea5f8fde645bca07422.tar.gz";
        sha256 = "1ndnsfzff0jdxvjnjnrdm74x8xq2c221hfr7swdnxm7pkmi5w9q5";
      }
    )
    {};
  unstable = import (
      fetchTarball {
        url="https://github.com/NixOS/nixpkgs/archive/nixos-unstable.tar.gz";
      }
    ) {};
in
  pkgs.mkShell {
    packages = [
      pkgs.bashInteractive
      pkgs.git
      pkgs.neovim

      pkgs.poppler_utils
      pkgs.yarn
      pkgs.go
      unstable.typst
    ];
  }
