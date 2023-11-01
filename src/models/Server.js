const path = require('path');
const express = require('express');
const cors = require('cors');
const colors = require('colors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, './../public')));
  }

  routes() {
    this.app.use('/products', require('./../routes/products.routes'));
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
