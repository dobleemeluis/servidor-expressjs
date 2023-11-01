const { v4: uuidv4 } = require('uuid');

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

module.exports = Product;
