const { cwd } = require("process");

module.exports = {
  apps: [
    {
      name: 'angular-i18next-demo',
      script: 'server.mjs',
      cwd: './dist/angular-i18next-demo/server',
      max_memory_restart: '100M',
      env: {
        PM2: true,
        NODE_ENV: "development",
        PORT: 4000
      },
      env_production: {
        PM2: true,
        NODE_ENV: "production",
        PORT: 4000
      }
    },
  ],
};
