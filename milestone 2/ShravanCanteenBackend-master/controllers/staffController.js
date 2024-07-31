const staffs = require("../db/models/staffSchema");

// Create a new product
const addStaff = async (req, res) => {
  try {
    const newstaff = new staffs(req.body);
    await newstaff.save();
    res.status(201).json({message:"staff added successfully"});
  } catch (err) {
    res.status(500).json({message:"an error occurred in adding staff"});
  }
};

// Get all products
const getAllStaff = async (req, res) => {
  try {
    const { page } = req.query;
    const skipNum = 5;
    const staffMembers = await staffs.find({}).skip((page-1)*skipNum).limit(skipNum);
    res.status(200).json({staff:staffMembers,message:`staff received at page ${page}`});
  } catch (err) {
    console.log("an error occurred:",err);
    res.status(500).json({message:"an error occurred in getting staff"});
  }
};

// Update a product by ID
const updateStaffDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStaff = await staffs.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({updatedStaff,message:"staff updated successfully"});
  } catch (err) {
    console.log("an error occurred:",err);
    res.status(500).json({message:"an error occurred in updating staff"});
  }
};

// Delete a product by ID
const removeStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStaff = await staffs.findByIdAndDelete(id);
    res.status(200).json({deletedStaff,message:"staff deleted successfully"});
  } catch (err) {
    res.status(500).json({message:"an error occurred in deleting staff"});
  }
};

module.exports = { addStaff,getAllStaff,updateStaffDetails,removeStaff };