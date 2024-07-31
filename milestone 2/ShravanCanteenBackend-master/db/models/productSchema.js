const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:mongoose.SchemaTypes.String,
        required:true,
    },
    description:{
        type:mongoose.SchemaTypes.String,
        required:true,
    },
    rating:{
        type:mongoose.SchemaTypes.Number,
        required:true,
        default:5
    },
    category:{
        type:mongoose.SchemaTypes.String,
    },
    price:{
        type:mongoose.SchemaTypes.Number,
        required:true,
        default:0
    },
    tags:[{
        type:mongoose.SchemaTypes.String
    }],
    image:{
        type:mongoose.SchemaTypes.String,
        // required:true
    },
    isVeg:{
        type:mongoose.SchemaTypes.Boolean,
        required:true,
        default:true
    }
},{ timestamps:true });

const products = mongoose.model('product',productSchema);

module.exports = products;