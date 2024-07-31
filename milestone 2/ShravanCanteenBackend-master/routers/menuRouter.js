const express = require('express');
const { getAllProductsInMenu, addProductToMenu, updateProductInMenu, deleteProductFromMenu, getMenu, getParticularProduct, searchMenu } = require('../controllers/menuController');
const authenticator = require('../middlewares/authenticator');
const authorizor = require('../middlewares/authorizor');
const menuRouter = express.Router();

menuRouter.post('/products', getAllProductsInMenu);  //include query parameters: category amd page no.
menuRouter.get('/', authenticator,authorizor(['admin']), getMenu); 
menuRouter.get('/search', searchMenu);  
menuRouter.get('/:id', getParticularProduct); 
menuRouter.post('/', authenticator,authorizor(['admin']), addProductToMenu);
menuRouter.patch('/:id', authenticator,authorizor(['admin']), updateProductInMenu);
menuRouter.delete('/:id', authenticator,authorizor(['admin']), deleteProductFromMenu);

module.exports = menuRouter;