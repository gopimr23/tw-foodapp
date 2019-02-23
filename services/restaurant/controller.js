const { RestaurantService, DishService } = require('./service');

class RestaurantController {
    static listRestaurants(req, res) {
        console.log({
            serviceName: 'restaurant-service',
            time: new Date().toISOString(),
            traceId: req.headers.traceId,
            fromSpanId: req.headers.spanId,
            message: 'list restaurant'
        });

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
            });
    }

    static createRestaurant(req, res) {
        console.log({
            serviceName: 'restaurant-service',
            time: new Date().toISOString(),
            traceId: req.headers.traceId,
            spanId: req.headers.spanId,
            message: 'create restaurant'
        });

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
        console.log({
            serviceName: 'restaurant-service',
            time: new Date().toISOString(),
            traceId: req.headers.traceId,
            spanId: req.headers.spanId,
            message: 'update and rating for restaurant'
        });

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
        console.log({
            serviceName: 'restaurant-service',
            time: new Date().toISOString(),
            traceId: req.headers.traceId,
            spanId: req.headers.spanId,
            message: 'get restaurant'
        });

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
        console.log({
            serviceName: 'restaurant-service',
            time: new Date().toISOString(),
            traceId: req.headers.traceId,
            spanId: req.headers.spanId,
            message: 'get restaurant with dishes'
        });

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
        console.log({
            serviceName: 'restaurant-service',
            time: new Date().toISOString(),
            traceId: req.headers.traceId,
            spanId: req.headers.spanId,
            message: 'create dishes'
        });

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