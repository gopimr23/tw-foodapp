const mongoose = require("mongoose");

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

module.exports = mongoose.model('dishes', DishesSchema);