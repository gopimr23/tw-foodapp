const router = require('express').Router();

const RestaurantController = require('./restaurant/controller');
const DishController = require('./dishes/controller');
const AuthController = require('./auth/controller');

router.post('/login', AuthController.login);

router.post('/register', AuthController.register);

// Verify token for all other endpoint
router.use(AuthController.verifyToken);

router.get('/restaurants', RestaurantController.listRestaurants);

router.post('/restaurants', RestaurantController.createRestaurant);

router.put('/restaurants', RestaurantController.updateRatingForRestaurant);


router.get('/restaurants/:restaurantId', RestaurantController.getRestaurantWithDishes);

router.post('/restaurants/:restaurantId/dishes', DishController.createDish);

module.exports = router;