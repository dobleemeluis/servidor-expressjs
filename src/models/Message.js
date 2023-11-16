const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  user: {
    type: String,
    required: [true, "message's user is required"],
  },
  text: {
    type: String,
    require: [true, "message's text is required"],
  },
});

const Message = model('Message', messageSchema);

module.exports = Message;
