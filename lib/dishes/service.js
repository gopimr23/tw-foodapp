const DishesModel = require('./model');

class DishService {
    static addDishForRestaurant(restaurantId, newDishInfo) {
        console.log(restaurantId, newDishInfo);

        const res = new DishesModel({
            name: newDishInfo.name,
            type: newDishInfo.type,
            restaurantId
        });

        return res.save();
    }

    static getDishes(restaurantId) {
        return DishesModel.find({
            restaurantId
        });
    }
}

module.exports = DishService;