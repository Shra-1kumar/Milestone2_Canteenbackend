const express = require('express');
const { getDatewiseSales } = require('../controllers/salesController');
const salesRouter = express.Router();

salesRouter.get('/sales/:year/:month', getDatewiseSales);  //include query parameters: status

module.exports = salesRouter;