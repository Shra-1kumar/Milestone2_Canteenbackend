const menu = require("../db/models/menuSchema");

// Create a new product
const addProductToMenu = async (req, res) => {
  try {
    await menu.insertMany(req.body);
    res.status(201).json({message:"product added successfully"});
  } catch (err) {
    res.status(500).json({message:"an error occurred in adding product"});
  }
};

const getMenu = async (req, res) => {
  try {
    const query = {};
    const categorizedProducts = await menu.find({}).populate({ path:"productId",match:query,select: "name"});
    const filterProducts = categorizedProducts.filter(val => val.productId !== null);
    res.status(200).json({data:filterProducts,message:`menu received at page`});
  } catch (err) {
    console.log("an error occurred:",err);
    res.status(500).json({message:"an error occurred in getting menu"});
  }
};

const getParticularProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {};
    console.log(id);
    const categorizedProducts = await menu.findById(id).populate({ path:"productId",match:query});
    //const filterProducts = categorizedProducts.filter(val => val.productId !== null);
    res.status(200).json({data:categorizedProducts.productId,message:`menu received at page`});
  } catch (err) {
    console.log("an error occurred:",err);
    res.status(500).json({message:"an error occurred in getting menu"});
  }
};

// // Get all products
const getAllProductsInMenu = async (req, res) => {
  try {
    const { page } = req.query;
    const { category,tags,isVeg,startPrice,endPrice } = req.body;
    const skipNum = 5;
    let query = { };
    
    if (Array.isArray(category) && category.length > 0) {
      query.category = { $in: category };
    }
    if (Array.isArray(tags) && tags.length > 0) {
      query.tags = { $in: tags };
    }
    if (isVeg !== "") {
    query.isVeg = isVeg;
    }
    if (startPrice !== "" && endPrice !== "") {
      query.price = { $gte: startPrice, $lte: endPrice };
    } else if (startPrice !== "") {
      query.price = { $gte: startPrice };
    } else if (endPrice !== "") {
      query.price = { $lte: endPrice };
    }

    console.log(query);
    const categorizedProducts = await menu.find({}).populate({ path:"productId",match:query }).skip((page-1)*skipNum).limit(skipNum);
    let filterProducts = categorizedProducts.filter(val => val.productId !== null);
    filterProducts = filterProducts.map(value => value.productId);
    //console.log(categorizedProducts);
    res.status(200).json({data:filterProducts,message:`menu received at page ${page}`});
  } catch (err) {
    console.log("an error occurred:",err);
    res.status(500).json({message:"an error occurred in getting menu"});
  }
};

// Update a product by ID
const updateProductInMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { platesAvailable } = req.body;
    const updatedProduct = await menu.findByIdAndUpdate(id, { platesAvailable:platesAvailable}, { new: true });
    res.status(201).json({updatedProduct,message:"menu updated successfully"});
  } catch (err) {
    console.log("an error occurred:",err);
    res.status(500).json({message:"an error occurred in updating menu"});
  }
};

// Delete a product by ID
const deleteProductFromMenu = async (req, res) => {
  try {
    const { id } = req.params;
    await menu.findByIdAndDelete(id);
    res.status(200).json({message:"product deleted successfully"});
  } catch (err) {
    res.status(500).json({message:"an error occurred in deleting product"});
  }
};

const searchMenu = async (req, res) => {
  try {
    const { query } = req.query;
    const searchedProduct = await menu.find({},{ productId:1 }).populate({ path:'productId',match:{ name: { $regex: query, $options: 'i' }},select:'name _id'});
    const filteredProducts = searchedProduct.filter(val => val.productId !== null).map(val => {return { _id:val.productId._id,name:val.productId.name }});
    res.status(200).json({data:filteredProducts,message:"product searched successfully"});
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"an error occurred in searching product"});
  }
};



module.exports = { addProductToMenu,getAllProductsInMenu,updateProductInMenu,deleteProductFromMenu,getMenu,getParticularProduct,searchMenu };