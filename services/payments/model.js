const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    paymentStatus: String,
    orderId: mongoose.Schema.ObjectId,
    paymentType: String,
    time: Date,
    userId: mongoose.Schema.Types.ObjectId,
    price: Number,
    date: Date
});

module.exports = mongoose.model('payment', paymentSchema);
