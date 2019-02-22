const { RestaurantService, DishService } = require('./service');

class RestaurantController {
    static listRestaurants(req, res) {
        RestaurantService.listRestaurant(req.query)
            .then((restaurants) => {
                res.status(200).send({
                    noOfRestaurants: restaurants.length,
                    restaurants
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Failed when trying to fetch list of restaurant',
                    error: err
                });
            })

    }

    static createRestaurant(req, res) {

        RestaurantService.createRestaurant(req.body)
            .then((restaurants) => {
                res.status(200).send(restaurants)
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Failed when trying to fetch list of restaurant',
                    error: err
                });
            });
    }

    static updateRatingForRestaurant(req, res) {
        RestaurantService.updateRatingForRestaurant(req.body)
            .then((restaurants) => {
                res.status(200).send(restaurants)
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Failed when trying to fetch list of restaurant',
                    error: err
                });
            });
    }

    static getRestaurant(req, res) {
        RestaurantService.getRestaurant(req.params.restaurantId)
            .then((restaurants) => {
                res.status(200).send(restaurants)
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Failed when trying to fetch list of restaurant',
                    error: err
                });
            });
    }
    static getRestaurantWithDishes(req, res) {
        RestaurantService.getRestaurantWithDishes(req.params.restaurantId)
            .then((restaurants) => {
                res.status(200).send(restaurants)
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Failed when trying to fetch list of restaurant',
                    error: err
                });
            });
    }
}

class DishesController {

    static createDish(req, res) {

        DishService.addDishForRestaurant(req.params.restaurantId, req.body)
            .then((restaurants) => {
                res.status(200).send(restaurants)
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Failed when trying to add dish for a restaurant',
                    error: err
                });
            });
    }
}

module.exports = {
    RestaurantController,
    DishesController
};