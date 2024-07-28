{ pkgs }: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.postgresql_14
    pkgs.corepack
    pkgs.openssl
  ];
  env = {
    DATABASE_URL = "postgres://postgres:@localhost:5432/edu?connection_limit=5&pool_timeout=0";
  };
  idx.extensions = [

  ];
  idx.previews = {
    enable = false;
    previews = {
      web = {
        command = [
          "pnpm"
          "dev"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
  idx.workspace.onStart = {
    postgre-start = "mkdir /run/postgresql && /usr/bin/pg_ctl -D .data -l logfile start";
  };
}