const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, './.env'),
});
const Server = require('./models/Server');

const server = new Server();
server.listen();
