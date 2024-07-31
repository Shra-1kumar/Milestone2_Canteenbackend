const mongoose = require('mongoose');

const productFinanceSchema = mongoose.Schema({
    productId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'products'
    },
    profit:{
        type:mongoose.SchemaTypes.Number,
        required:true,
    },
    costPrice:{
        type:mongoose.SchemaTypes.Number,
        required:true,
    },
    sellingPrice:{
        type:mongoose.SchemaTypes.Number,
        required:true,
    }
});

const productFinances = mongoose.model('productFinance',productFinanceSchema);

module.exports = productFinances;