const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    item_name: {
        type: String, required: true, maxLength: 50,
    },
    item_description: {
        type: String, maxLength: 200,
    },
    item_category: [{
        type: Schema.Types.ObjectId, ref: 'Category'
    }],
    item_price: [{
        type: Number, required: true
    }],
    item_number_in_stock: [{
        type: Number, required: true
    }]
})

module.exports = mongoose.model('Item', ItemSchema);