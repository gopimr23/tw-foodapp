const router = require('express').Router();

const { RestaurantController, DishesController }= require('./controller');
const request = require('request');


function promiseRequest(params) {
    return new Promise((resolve, reject) => {
        request(params, function (err, data) {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

// Verify token for all other endpoint
router.use((req, res, next) => {
    promiseRequest({
        method: 'GET',
        url: 'http://localhost:3001/token' + req.headers.token
    }).then((result) => {
            if (result.user) {
                req.user = user;
                next();
            }
            res.status(401).send('Auth error');
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Token validation error',
                err
            });
        });
});

router.get('/dishes/:restaurantId', RestaurantController.getRestaurantWithDishes);
router.post('/dishes/:restaurantId/', DishesController.createDish);

router.get('/list', RestaurantController.listRestaurants);
router.post('/', RestaurantController.createRestaurant);
router.put('/', RestaurantController.updateRatingForRestaurant);

module.exports = router;