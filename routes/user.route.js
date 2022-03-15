const userRoutes = require('express').Router();
const { userController } = require('../controller');

userRoutes.post('/contact-us', userController.postContactUs);

module.exports = userRoutes;
