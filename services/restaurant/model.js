const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    location: String,
    avgRating: Number,
    userRatings: [{
        userId: String,
        rating: Number
    }],
    restaurantImgUrl: String
});

const DishesSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    restaurantId: mongoose.Schema.Types.ObjectId,
    restaurantName: String,
    type: String,
    price: Number,
    dishImgUrl: String
});

const RestaurantModel = mongoose.model('restaurant', RestaurantSchema);
const DishesModel = mongoose.model('dishes', DishesSchema);

module.exports = {
    RestaurantModel,
    DishesModel
};
