
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const prudectItemSchema = new Schema({
    url: {
    type: String,
    required: true
    },
    articlename: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, {timestamps: true})

const PrudectItem = mongoose.model('DesignShop', prudectItemSchema)
module.exports = PrudectItem