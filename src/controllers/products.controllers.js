const path = require('path');
const { request, response } = require('express');
const ProductManager = require('./../models/ProductManager');
const isPositiveInteger = require('./../helpers/validate.helpers');

ProductManager.path = path.join(__dirname, './../db/data.json');

const getProducts = async (req = request, res = response) => {
  try {
    const { limit } = req.query;
    const products = await ProductManager.products();
    if (isPositiveInteger(limit)) return res.json(products.slice(0, limit));
    return res.json(products);
  } catch (err) {
    return res.json({ err: err.message });
  }
};

const getProductById = async (req = request, res = response) => {
  try {
    const { pid } = req.params;
    const product = await ProductManager.getProductById(parseInt(pid, 10));
    return res.json(product);
  } catch (err) {
    return res.json({ err: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
};
