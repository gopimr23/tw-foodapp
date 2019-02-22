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

module.exports = mongoose.model('restaurant', RestaurantSchema);
