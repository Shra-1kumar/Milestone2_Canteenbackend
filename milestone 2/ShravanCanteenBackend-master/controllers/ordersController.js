const { default: mongoose } = require("mongoose");
const orders = require("../db/models/ordersSchema");
const users = require("../db/models/userSchema");
const { generateToken, generateQRCode } = require("../helpers/orderHelper");

// Create a new product
const addOrder = async (req, res) => {
  try {
    const { userId } = req;
    const { productOrdered } = req.body;

    //place order in queue
    const newOrder = new orders({ userId,productOrdered:productOrdered });
    const { _id } = await newOrder.save();

    //generate token using order id
    const token = await generateQRCode(JSON.stringify(_id));

    //store token for user
    await users.findByIdAndUpdate(userId,{ $push:{ ordersPlaced:token }});

    res.status(201).json({data:token,message:"order added successfully"});
  } catch (err) {
    console.log("order",err);
    res.status(500).json({message:"an error occurred in adding order"});
  }
};

const redeemOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    //find order
    const _id = orderId.trim().replace(/"/g, '');

    const userOrder = await orders.findById({_id:_id});
    //console.log(userOrder);
    if (!userOrder) {
      return res.status(200).json({message:"order not available"}); 
    }
    if (!userOrder.isTokenValid) {
      return res.status(200).json({message:"order already pickedup"}); 
    }

    if (userOrder.status === 'ready') {
      //redeem the token and expire the token
      await orders.findByIdAndUpdate({_id:_id},{ isTokenValid:false,status:'pickedup' });
      //remove token from user
      await users.findByIdAndUpdate({_id:userOrder.userId},{ ordersPlaced:[] });
      res.status(200).json({data:userOrder,message:"order received successfully"});
    }else{
      return res.status(200).json({message:"order not ready to pickup"}); 
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"an error occurred in adding order"});
  }
};

// Get all products
const getFirstNOrders = async (req, res) => {
    try {
      const { status } = req.query;
      const firstNOrders = 10;
      const statusWiseOrders = await orders.find({ status:status },{ productOrdered:1,userId:1 }).populate({path:'userId',select:"name"}).limit(firstNOrders);
      //console.log(statusWiseOrders);
      res.status(200).json({data:statusWiseOrders,message:`orders received first ${firstNOrders}`});
    } catch (err) {
      console.log("an error occurred:",err);
      res.status(500).json({message:"an error occurred in getting orders"});
    }
  };

// Update a product by ID
const updateOrderForUser = async (req, res) => {
    //const statusListBySequence = ["paid","ready"];
  try {
    const { id } = req.params;
    const { status } = req.query;

    if(status !== 'paid'){
      return res.status(200).json({message:"Invalid order"});
    }else{
      const userOrder = await orders.find({_id:id});  
      if(!userOrder) throw new Error("Invalid order id");  
      await orders.findByIdAndUpdate({_id:id}, { status:'ready' });
      res.status(200).json({message:"order updated successfully"});
    }
  } catch (err) {
    console.log("an error occurred:",err);
    res.status(500).json({message:"an error occurred in updating menu"});
  }
};

// Update a product by ID
const updateProductInOrder = async (req, res) => {
  try {
    const { id,productId } = req.params;
    const updatedProductOrder = await orders.findOneAndUpdate({ _id:id,"productOrdered":{$elemMatch:{productId:productId}} }, { $set:{"productOrdered.$.productStatus":true} });
    //console.log(updatedProductOrder);
    if(updatedProductOrder){
        res.status(200).json({message:"product in order updated successfully"});
    }else throw new Error("Invalid product id");
  } catch (err) {
    console.log("an error occurred:",err);
    res.status(500).json({message:"an error occurred in updating product in order"});
  }
};

const removeOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const deletedOrders = await orders.deleteMany({ status:status });
    res.status(200).json({deletedOrders,message:"orders deleted successfully"});
  } catch (err) {
    res.status(500).json({message:"an error occurred in deleting orders"});
  }
};

module.exports = { addOrder,getFirstNOrders,updateOrderForUser,updateProductInOrder,removeOrdersByStatus,redeemOrder };