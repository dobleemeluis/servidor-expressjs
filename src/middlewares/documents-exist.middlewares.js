const { request, response } = require('express');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

const documentsExist = async (req = request, res = response, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findOne({ _id: cid });
    const product = await Product.findOne({ _id: pid });
    if (!cart)
      return res
        .status(404)
        .json({ error: 'cid does not match with any cart' });
    if (!product) {
      return res
        .status(404)
        .json({ error: 'pid does not match with any product' });
    }
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { documentsExist };
