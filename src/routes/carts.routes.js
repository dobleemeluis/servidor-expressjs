const { Router } = require('express');
const {
  documentsExist,
} = require('../middlewares/documents-exist.middlewares');

const {
  createCart,
  getCart,
  getAllCarts,
  addProductToCart,
} = require('./../controllers/carts.controllers');

const router = new Router();

router.get('/', getAllCarts);
router.post('/', createCart);
router.get('/:cid', getCart);
router.post('/:cid/product/:pid', [documentsExist], addProductToCart);

module.exports = router;
