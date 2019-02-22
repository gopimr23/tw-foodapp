const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    dishes: String,
    rating: Number,
    restaurantImgUrl: String
});

const Restaurant = mongoose.model('restaurant', RestaurantSchema);

module.exports = Restaurant;
