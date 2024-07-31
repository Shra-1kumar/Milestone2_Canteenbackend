const express = require('express');
const { getFirstNOrders, addOrder, updateOrderForUser, updateProductInOrder, removeOrdersByStatus, redeemOrder } = require('../controllers/ordersController');
const authenticator = require('../middlewares/authenticator');
const { paymentByCoins } = require('../controllers/walletController');
const authorizor = require('../middlewares/authorizor');
const orderRouter = express.Router();

orderRouter.get('/', authenticator,authorizor(['staff','admin']), getFirstNOrders);  //include query parameters: status
orderRouter.post('/', authenticator,authorizor(['user','staff','admin']),paymentByCoins,addOrder);
orderRouter.post('/redeem', authenticator,authorizor(['staff','admin']), redeemOrder);
orderRouter.patch('/:id', authenticator,authorizor(['staff','admin']), updateOrderForUser);   //include query parameters: status
orderRouter.patch('/:id/:productId', authenticator,authorizor(['staff','admin']), updateProductInOrder);
orderRouter.delete('/', authenticator,authorizor(['admin']), removeOrdersByStatus); //include query parameters: status

module.exports = orderRouter;