const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    productId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'product'
    },
    platesAvailable:{
        type:mongoose.SchemaTypes.Number,
        required:true,
    }
});

const menu = mongoose.model('menu',menuSchema);

module.exports = menu;