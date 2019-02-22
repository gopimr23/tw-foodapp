const { RestaurantModel, DishesModel } = require('./model');

class RestaurantService {
    static listRestaurant(query) {
        const dbQuery = {};
        if(query.name) {
            dbQuery.name =  {'$regex': query.name, '$options' : 'i'};
        }
        return RestaurantModel.find(dbQuery);
    }

    static createRestaurant(newRestaurantInfo) {
        const res = new RestaurantModel({
             name: newRestaurantInfo.name,
             dishes: newRestaurantInfo.dishes
         });

         return res.save()
             .then(() => {
                 return RestaurantModel.find({name: newRestaurantInfo.name});
             });


    }

    static updateRatingForRestaurant(restInfo) {

        return RestaurantModel.update({
            _id: restInfo.restaurantId,
        },{
            $set: {
                "rating": restInfo.rating
            }
        });
    }

    static getRestaurant(restaurantId) {
        return RestaurantModel.find({
            _id: restaurantId
        });
    }
    static getRestaurantWithDishes(restaurantId) {
        const promises = [
            RestaurantService.getRestaurant(restaurantId),
            DishService.getDishes(restaurantId)
        ];

        return Promise.all(promises)
            .then(([[restaurant], dishes]) => {
               return Object.assign(restaurant.toJSON(), { dishes });
            });
    }
}

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
module.exports = {
    RestaurantService,
    DishService
};