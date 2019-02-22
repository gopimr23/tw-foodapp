const router = require('express').Router();
const RestaurantController = require('./restaurant/controller');
const DishController = require('./dishes/controller');

router.get('/restaurants', RestaurantController.listRestaurants);

router.post('/restaurants', RestaurantController.createRestaurant);

router.put('/restaurants', RestaurantController.updateRatingForRestaurant);


router.get('/restaurants/:restaurantId', RestaurantController.getRestaurant);

router.get('/restaurants/:restaurantId/dishes', DishController.createDish);

module.exports = router;