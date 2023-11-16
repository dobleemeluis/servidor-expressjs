const Product = require('../models/Product');
const Message = require('../models/Message');

const socketController = (socket, io) => {
  let user;

  // realtime
  socket.on('client:delete-product', async (payload, callback) => {
    const { id } = payload;
    await Product.findByIdAndDelete(id);
    const count = (await Product.find({})).length;
    callback({ id, count });
    socket.broadcast.emit('server:delete-product', { id, count });
  });

  socket.on('client:new-product', async (payload, callback) => {
    try {
      const product = new Product(payload);
      await product.save();
      callback(product);
      socket.broadcast.emit('server:new-product', product);
    } catch (err) {
      socket.emit('server:error', { error: err.message });
    }
  });

  // chat
  socket.on('client:set-user', async (payload, callback) => {
    user = payload.username;
    callback({ user });
  });

  socket.on('client:new-message', async (payload, callback) => {
    const { text } = payload;
    callback({ user, text });
    const message = new Message({ user, text });
    await message.save();
    socket.broadcast.emit('client:new-message', message);
  });
};

module.exports = {
  socketController,
};
