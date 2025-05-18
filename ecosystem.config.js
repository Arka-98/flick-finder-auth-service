const numCPUs = require('node:os').availableParallelism();

module.exports = {
  apps: [
    {
      name: 'auth-svc',
      script: 'dist/main.js',
      instances: numCPUs / 2,
      vizion: false,
    },
  ],
};
