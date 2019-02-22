const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const restaurantRoutes = require('./restaurant-routes');
const orderRoutes = require('./order-routes');

const auth = require('./auth-routes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.post('/login', auth.login);
app.post('/logout', auth.logout);
app.post('/register', auth.signup);

app.use('/restaurant', restaurantRoutes);
app.use('/order', orderRoutes);

app.listen(3000, function () {
    console.log('listening http://localhost:3000');
});