const { request, response } = require('express');
const Product = require('../models/Product');
const Message = require('../models/Message');

const homeProducts = async (req = request, res = response) => {
  try {
    let products = await Product.find({}).lean();
    return res.render('home', {
      layout: false,
      pageTitle: 'home page',
      products,
      count: products.length,
    });
  } catch (err) {
    return res.status(400).send(`Error: ${err.message}`);
  }
};

const realtimeProducts = async (req, res) => {
  try {
    let products = await Product.find({}).lean();
    return res.render('realtime', {
      layout: false,
      pageTitle: 'realtime page',
      products,
      count: products.length,
    });
  } catch (err) {
    return res.status(400).send(`Error: ${err.message}`);
  }
};

const chatPage = async (req, res) => {
  try {
    let messages = await Message.find({}).lean();
    return res.render('chat', {
      layout: false,
      pageTitle: 'chat page',
      messages,
    });
  } catch (err) {
    return res.status(400).send(`Error: ${err.message}`);
  }
};

module.exports = {
  homeProducts,
  realtimeProducts,
  chatPage,
};
