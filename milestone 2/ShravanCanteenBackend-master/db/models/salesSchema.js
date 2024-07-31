const mongoose = require('mongoose');

const salesSchema = mongoose.Schema({
  date: { 
    type: Date,
    default: Date.now 
},
  productsSold: [
    {
      productId:mongoose.SchemaTypes.ObjectId,  
      name: mongoose.SchemaTypes.String,
      quantity: mongoose.SchemaTypes.Number,
      ref:'product'
    }
  ],
  totalAmount: mongoose.SchemaTypes.Number
});

const sales = mongoose.model('menu',salesSchema);

module.exports = sales;