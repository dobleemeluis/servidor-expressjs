const { Schema, model } = require('mongoose');

const productOrderSchema = new Schema({
  quantity: {
    type: Number,
    default: 1,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product is required'],
  },
});

const cartSchema = new Schema({
  products: [productOrderSchema],
});

const Cart = model('Cart', cartSchema);

module.exports = Cart;
