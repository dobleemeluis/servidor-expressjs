const path = require('path');
const fs = require('fs').promises;
const colors = require('colors');
const Product = require('./Product');

class ProductManager {
  static #path;
  static #products;

  /**
   * @param {String} filePath
   */
  static set path(filePath) {
    ProductManager.#path = filePath
      ? filePath
      : path.join(__dirname, './../db/data.json');
  }

  static get path() {
    return ProductManager.#path;
  }

  /**
   * @param {Object} data
   */
  static set products(data) {
    ProductManager.#products = data;
  }

  static async loadData() {
    try {
      const data = await fs.readFile(ProductManager.#path, 'utf-8');
      ProductManager.#products = data === '' ? [] : JSON.parse(data).products;
    } catch (err) {
      console.log(`An error ocurred: ${err.message}`.white.bgRed);
      throw new Error(err.message);
    }
  }

  static async products() {
    try {
      await this.loadData();
      return ProductManager.#products;
    } catch (err) {
      console.log(`An error ocurred: ${err.message}`.white.bgRed);
      throw new Error(err.message);
    }
  }

  static async getProductById(id) {
    try {
      await ProductManager.loadData();
      const result = ProductManager.#products.find(
        (product) => product.id === id,
      );
      if (result) return result;
      throw new Error('Product not found');
    } catch (err) {
      console.log(`An error ocurred: ${err.message}`.white.bgRed);
      throw new Error(err.message);
    }
  }
}

module.exports = ProductManager;
