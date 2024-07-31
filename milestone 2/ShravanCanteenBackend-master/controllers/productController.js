const products = require("../db/models/productSchema");

// Create a new product
const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const newProduct = new products(req.body);
    await newProduct.save();
    res.status(201).json({message:"product added successfully"});
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"an error occurred in adding product"});
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const { category,page } = req.query;
    const skipNum = 5;
    let query = {};
    if (category) {
      query = { category:category.trim() };
    }
    const categorizedProducts = await products.find(query).skip((page-1)*skipNum).limit(skipNum);
    res.status(200).json({products:categorizedProducts,message:`products received at page ${page}`});
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"an error occurred in getting products"});
  }
};

// Update a product by ID
const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await products.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json({updatedProduct,message:"product updated successfully"});
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"an error occurred in updating product"});
  }
};

// Delete a product by ID
const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await products.findByIdAndDelete(id);
    res.status(200).json({deletedProduct,message:"product deleted successfully"});
  } catch (err) {
    res.status(500).json({message:"an error occurred in deleting product"});
  }
};

const searchProducts = async (req, res) => {
  try {
      const { query } = req.query;
      const searchedProduct = await products.find({ name: { $regex: query, $options: 'i' }},{ name:1,_id:1 });
      //const filteredProducts = searchedProduct.filter(val => val._id !== null);
      res.status(200).json({data:searchedProduct,message:"product searched successfully"});
  } catch (error) {
      console.error(error);
      res.status(500).json({message:"an error occurred in getting products"});
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const gotProduct = await products.find({_id:id});
    res.status(200).json({data:gotProduct,message:"product received successfully"});
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"an error occurred in receiving product"});
  }
};

module.exports = { createProduct,getAllProducts,updateProductById,deleteProductById,searchProducts,getProductById };