const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({
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
        default:'staff'
    },
    phoneNumber:{
        type:mongoose.SchemaTypes.Number,
        required:true,
        min:1000000000,
        max:9999999999
    },
    address:{
        type:mongoose.SchemaTypes.String,
        required:true,
    },
    workType:{
        type:mongoose.SchemaTypes.String,
        required:true,
    },
    age:{
        type:mongoose.SchemaTypes.Number,
        required:true,
        min:18,
        max:100
    }
});

const staffs = mongoose.model('staff',staffSchema);

module.exports = staffs;