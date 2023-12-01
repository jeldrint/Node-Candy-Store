const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String, minLength: 3, maxLength: 50,
    }
});

module.exports = mongoose.model('Category', CategorySchema);