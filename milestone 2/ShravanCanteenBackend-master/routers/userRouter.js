const express = require('express');
const { userSignup, userLogin, userLogout, userProfile, changeAvatar } = require('../controllers/userController');
const authenticator = require('../middlewares/authenticator');
const authorizor = require('../middlewares/authorizor');
//const tester = require('../middlewares/tester');
//const { uploader } = require('../helpers/uploadImage');
const userRouter = express.Router();

userRouter.post('/signup', userSignup);
userRouter.post('/login', userLogin);
userRouter.post('/logout', authenticator, authorizor(['user','staff','admin']), userLogout);
userRouter.get('/profile', authenticator, authorizor(['user','staff','admin']), userProfile);
//userRouter.get('/auth', authenticator);
// userRouter.get('/vote', authenticator,);
// userRouter.patch('/profile/avatar', uploader.single("avatar"),authenticator,changeAvatar);

module.exports = userRouter;