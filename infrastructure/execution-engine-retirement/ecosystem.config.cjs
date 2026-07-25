/**
 * Dependency-free retirement process for the former Execution Engine funnel.
 * All traffic is handed to the canonical Beacon Venture curriculum page.
 */
module.exports = {
  apps: [
    {
      name: "execution-engine",
      script: "/var/www/execution-engine/server/index.mjs",
      cwd: "/var/www/execution-engine",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: "3011",
      },
    },
  ],
};
