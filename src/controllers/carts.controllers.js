const { request, response } = require('express');
const Cart = require('./../models/Cart');
const Product = require('./../models/Product');

const createCart = async (req = request, res = response) => {
  try {
    const cart = new Cart({});
    await cart.save();
    res.json({ cart });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const getCart = async (req = request, res = response) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid);
    res.json({ cart });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const getAllCarts = async (req = request, res = response) => {
  try {
    const carts = await Cart.find({});
    res.json({ count: carts.length, carts });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const addProductToCart = async (req = request, res = response) => {
  try {
    const { cid, pid } = req.params;
    const productExists = await Cart.findOne({
      _id: cid,
      'products.product': pid,
    });
    if (productExists) {
      await Cart.findOneAndUpdate(
        {
          _id: cid,
          'products.product': pid,
        },
        {
          $inc: { 'products.$.quantity': 1 },
        },
      );
    } else {
      await Cart.findOneAndUpdate(
        {
          _id: cid,
        },
        {
          $push: { products: { product: pid } },
        },
      );
    }
    const cart = await Cart.findById(cid);
    return res.json({ cart });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = { createCart, getCart, getAllCarts, addProductToCart };
