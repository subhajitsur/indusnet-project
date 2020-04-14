const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userEmail:{type:String, required:true},
    name: { type: String, required: true },

    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true  },
    createdAt: { type: Date, default: Date.now }
})


const Order = mongoose.model('order', orderSchema);

module.exports = Order