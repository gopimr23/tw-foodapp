const DishService = require('./service');

class Dishes {

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

module.exports = Dishes;