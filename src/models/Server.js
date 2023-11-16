const path = require('path');
const express = require('express');
const cors = require('cors');
const hbs = require('hbs');

const exphbs = require('express-handlebars');

const { createServer } = require('http');
const { Server: WSServer } = require('socket.io');
const colors = require('colors');
const { dbConnection } = require('./../db/config.db');
const { socketController } = require('./../websockets/controller.websockets');

class Server {
  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new WSServer(this.server);
    this.port = process.env.PORT || 8080;
    this.dbConnection();
    this.middlewares();
    this.handlebars();
    this.routes();
    this.websockets();
  }

  async dbConnection() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, './../public')));
  }

  handlebars() {
    // this.app.set('view engine', 'hbs');
    // this.app.set('views', path.join(__dirname, './../views'));
    // hbs.registerPartials(path.join(__dirname, './../views/partials'));
    this.app.set('views', path.join(__dirname, './../views'));
    this.app.engine(
      'handlebars',
      exphbs.engine({
        defaultLayout: 'main',
        extname: '.handlebars',
        partialsDir: path.join(this.app.get('views'), 'partials'),
      }),
    );
    this.app.set('view engine', 'handlebars');
  }

  routes() {
    this.app.use('/websockets', require('../routes/websockets.routes'));
    this.app.use('/api/products', require('../routes/products.routes'));
    this.app.use('/api/carts', require('../routes/carts.routes'));
  }

  websockets() {
    this.io.on('connection', (socket) => {
      socketController(socket, this.io);
    });
  }

  listen() {
    this.server.listen(this.port, (err) => {
      if (err) console.log(`ERROR: ${err.message}`.white.bgRed);
      console.log(
        `server up and running at http://localhost:${this.port}`.green,
      );
    });
  }
}

module.exports = Server;
