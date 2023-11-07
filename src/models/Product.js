const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  code: {
    type: String,
    minlength: 6,
    required: [true, 'Code is required'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    set: (value) => Number.parseFloat(value).toFixed(2),
    get: (value) => Number.parseFloat(value),
  },
  status: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    set: (value) => Number.parseInt(value),
    get: (value) => Number.parseInt(value),
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  thumbnails: {
    type: [String],
    default: [],
  },
});

const Product = model('Product', productSchema);

module.exports = Product;
