'use strict';

module.exports = {
  apps: [{
    name: 'expressjs-boilerplate',
    script: 'app.js',
    watch: true,
    ignore_watch: ['.git', 'node_modules', 'logs', 'package-lock.json', 'uploads']
  }]
};
