const RestaurantModel = require('./model');
const DishesModel = require('../dishes/model');

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
        const promises = [
            RestaurantModel.find({
                _id: restaurantId
            }),
            DishesModel.find({
                restaurantId
            })
        ];
        return Promise.all(promises)
            .then(([restaurant, dishes]) => {
               return {
                   ...restaurant,
                   dishes
               }
            });
    }
}

module.exports = RestaurantService;