const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'user'
    },
    productOrdered:[
        {
           productId:mongoose.SchemaTypes.ObjectId, 
           name:mongoose.SchemaTypes.String,
           quantity:mongoose.SchemaTypes.Number,
           orderPlacedAt:{
            type:mongoose.SchemaTypes.Date,
            default:new Date()
           },
           productStatus:{
            type:mongoose.SchemaTypes.Boolean,
            required:true,
            default:false
           }
           
        }
    ],
    status:{
        type:mongoose.SchemaTypes.String,
        required:true,
        default:'paid'
    },
    // token:{
    //     type:mongoose.SchemaTypes.String,
    //     required:true
    // },
    isTokenValid:{
        type:mongoose.SchemaTypes.Boolean,
        required:true,
        default:true
    }
},{ timestamps:true });

const orders = mongoose.model('order',orderSchema);

module.exports = orders;