const path = require('path');
const express = require('express');
const cors = require('cors');
const colors = require('colors');
const { dbConnection } = require('./../db/config.db');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, './../public')));
  }

  routes() {
    this.app.use('/api/products', require('../routes/products.routes'));
    this.app.use('/api/carts', require('../routes/carts.routes'));
  }

  listen() {
    this.app.listen(this.port, (err) => {
      if (err) console.log(`ERROR: ${err.message}`.white.bgRed);
      console.log(
        `server up and running at http://localhost:${this.port}`.green,
      );
    });
  }
}

module.exports = Server;
