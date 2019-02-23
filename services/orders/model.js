const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    restaurantId: {
        type: String,
        index: true
    },
    dishes: [
        {
            dishId: mongoose.Schema.Types.ObjectId,
            count: Number
        }
    ],
    status: String,
    paymentType: String,
    time: Date,
    userId: mongoose.Schema.Types.ObjectId,
    price: Number,
    date: Date,
    deliveryFee: Number,
    couponId: String
});

module.exports = mongoose.model('orders', OrderSchema);
