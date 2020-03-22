const mongoose = require('mongoose');

const { mongoURL, mongoUSER, mongoPASS } = require('../.env.js');

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      auth: { authSource: 'admin' },
      user: mongoUSER,
      pass: mongoPASS,
    });
  }
}

module.exports = new Database();
