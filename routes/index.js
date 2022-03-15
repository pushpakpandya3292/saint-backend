const routes = require('express').Router();
const userRoutes = require('./user.route');

console.log('routes');

routes.use('/user', userRoutes);

module.exports = routes;
