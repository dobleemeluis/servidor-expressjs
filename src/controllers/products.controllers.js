const { request, response } = require('express');
const Product = require('./../models/Product');

const getAllProducts = async (req = request, res = response) => {
  try {
    const { limit } = req.query;
    let products = await Product.find({});
    if (limit) products = products.slice(0, limit);
    return res.json({ count: products.length, products });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getProduct = async (req = request, res = response) => {
  try {
    const { pid } = req.params;
    const product = await Product.findById(pid);
    return res.json({ product });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

const createProduct = async (req = request, res = response) => {
  try {
    const product = new Product(req.body);
    const codeExists = await Product.findOne({ code: product.code });
    if (codeExists) {
      return res.status(400).json({ error: 'Code already in use' });
    }
    await product.save();
    return res.json({ product });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const updateProduct = async (req = request, res = response) => {
  try {
    const { pid } = req.params;
    const { _id, ...rest } = req.body;
    const product = await Product.findByIdAndUpdate(pid, rest, { new: true });
    return res.json({ message: 'product updated successfully', product });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const deleteProduct = async (req = request, res = response) => {
  try {
    const { pid } = req.params;
    const product = await Product.findByIdAndDelete(pid);
    return res.json({ message: 'product deleted successfully', product });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
