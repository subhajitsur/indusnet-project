const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true  },
    name: { type: String, required: true },
    
    price: { type: Number, required: true },
    isActive:Boolean,
    createdAt: { type: Date, default: Date.now }
})

const Product = mongoose.model('product', productSchema);

module.exports = Product