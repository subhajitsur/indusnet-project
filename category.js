const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({

    name: { type: String, required: true },
    createdAt: Date,
    createdAt: { type: Date, default: Date.now },
    isActive:Boolean
})
categorySchema.virtual('product',
{
    ref:'product',
    localField:'_id',
    foreignField:'categoryId'
})
categorySchema.virtual('expensive',
{
    ref:'product',
    localField:'_id',
    foreignField:'categoryId',
    options:{sort:{price:-1},limit:2}
})

categorySchema.set('toObject', { virtuals: true })
categorySchema.set('toJSON', { virtuals: true })

const Category = mongoose.model('Category', categorySchema);

module.exports = Category