const { Router } = require('express');
const {
  getProducts,
  getProductById,
} = require('./../controllers/products.controllers');
const isValidId = require('./../middlewares/id.middlewares');

const router = Router();

router.get('/', getProducts);
router.get('/:pid', isValidId, getProductById);

module.exports = router;
