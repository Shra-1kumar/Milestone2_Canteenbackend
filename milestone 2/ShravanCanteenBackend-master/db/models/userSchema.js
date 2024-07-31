const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:mongoose.SchemaTypes.String,
        required:true,
    },
    email:{
        type:mongoose.SchemaTypes.String,
        required:true,
    },
    password:{
        type:mongoose.SchemaTypes.String,
        required:true
    },
    avatar:{
        type:mongoose.SchemaTypes.String,
        required:false,
        default:"https://res.cloudinary.com/dandihqnb/image/upload/v1710670262/seatq70gmzy8p6imw1le.png"
    },
    role:{
        type:mongoose.SchemaTypes.String,
        required:true,
        default:'user'
    },
    type:{
        type:mongoose.SchemaTypes.String,
        default:'outsider'
    },
    ordersPlaced:[],
    coinBalance:{
        type:mongoose.SchemaTypes.Number,
        required:true,
        default:100
    }
},{ timestamps:true });

const users = mongoose.model('user',userSchema);

module.exports = users;