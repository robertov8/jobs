const express = require('express');
const cors = require('cors');

const routes = require('./routes');

require('./database');

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    const corsOptionsDelegate = (req, callback) => {
      callback(null, { origin: true, exposedHeaders: ['X-Count-Total'] });
    };
    this.server.use(cors(corsOptionsDelegate));
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
