const express = require('express');
const { getAllStaff, addStaff, updateStaffDetails, removeStaff } = require('../controllers/staffController');
const authenticator = require('../middlewares/authenticator');
const authorizor = require('../middlewares/authorizor');
const staffRouter = express.Router();

staffRouter.get('/', authenticator,authorizor(['admin']), getAllStaff);  //include query parameters: category amd page no.
staffRouter.post('/', authenticator,authorizor(['admin']), addStaff);
staffRouter.patch('/:id', authenticator,authorizor(['admin']), updateStaffDetails);
staffRouter.delete('/:id', authenticator,authorizor(['admin']), removeStaff);

module.exports = staffRouter;