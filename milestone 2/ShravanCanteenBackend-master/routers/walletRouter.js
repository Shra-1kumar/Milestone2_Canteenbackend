const express = require('express');
const { getCoins } = require('../controllers/walletController');
const authenticator = require('../middlewares/authenticator');
const authorizor = require('../middlewares/authorizor');
const walletRouter = express.Router();

walletRouter.post('/',authenticator,authorizor(['user','staff','admin']),getCoins);

module.exports = walletRouter;