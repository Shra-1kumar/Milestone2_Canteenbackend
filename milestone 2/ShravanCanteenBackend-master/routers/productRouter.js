const express = require('express');
const { getAllProducts, createProduct, updateProductById, deleteProductById, searchProducts, getProductById } = require('../controllers/productController');
const authenticator = require('../middlewares/authenticator');
const authorizor = require('../middlewares/authorizor');
const productRouter = express.Router();

productRouter.get('/', authenticator,authorizor(['admin']), getAllProducts);  //include query parameters: category amd page no.
productRouter.get('/search', authenticator,authorizor(['admin']), searchProducts);  
productRouter.get('/:id', getProductById);  
productRouter.post('/', authenticator,authorizor(['admin']), createProduct);
productRouter.patch('/:id', authenticator,authorizor(['admin']), updateProductById);
productRouter.delete('/:id', authenticator,authorizor(['admin']), deleteProductById);

module.exports = productRouter;