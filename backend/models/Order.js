const mongoose = require("mongoose")


const OrderSchema = new mongoose.Schema({
    userId: String,
    cartId: String,
    cartItems: [{
        productId: String,
        title: String,
        image: String,
        price: String,
        quantity:Number
    }],
    addressInfo: {
        arrdessId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String
    },

    orderStatus: String,
    paymentMeathod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: String,
    PaymentId: String,
    PayerId: String
})  

module.exports = mongoose.model('Order',OrderSchema )