const { Router } = require('express');
const { check } = require('express-validator');
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./../controllers/products.controllers');
const { validateFields } = require('./../middlewares/validate.middlewares');

const router = Router();

router.get('/', getAllProducts);
router.post(
  '/',
  [
    check('title', 'Title is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
    check('code', 'Code is required').notEmpty(),
    check('code', 'Code must be at least 6 characters').isLength({ min: 6 }),
    check('price', 'Price is required').notEmpty(),
    check('price', 'Price must be an integer').isNumeric(),
    check('stock', 'Stock is required').notEmpty(),
    check('stock', 'Stock must be an integer').isNumeric(),
    check('category', 'Category is required').notEmpty(),
    validateFields,
  ],
  createProduct,
);
router.get('/:pid', getProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

module.exports = router;
