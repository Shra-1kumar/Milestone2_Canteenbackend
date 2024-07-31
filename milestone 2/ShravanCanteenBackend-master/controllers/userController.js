const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../db/models/userSchema');
const { newDate } = require('../helpers/userHelper');
//const { uploadImage } = require('../helpers/uploadImage');
require('dotenv').config();

//cookie expire time: 7 days refresh
const userLogin = async (req,res) => {
    try {
        const { email,password } = req.body;
        const userInfo = await users.findOne({ email });
        if(userInfo){
            const verified = await bcrypt.compare(password,userInfo.password);
            if(verified){
                const auth_token = await jwt.sign({_id:userInfo._id,role:userInfo.role},process.env.JWT_SECRET_KEY,{ expiresIn:process.env.TOKEN_EXPIRE});
                delete userInfo._doc.password;
                return res.cookie(process.env.AUTH_TOKEN_NAME,auth_token,{ expires:newDate(7),httpOnly:true,secure:true,sameSite:"none"}).status(200).json({msg:"login successful",authenticate:true,userInfo});
            }else{
                console.log('Invalid credentials');
                return res.status(400).json({msg:"Invalid credentials",auth:false});
            }
        }else{
            console.log('not a registered user');
            return res.status(401).json({msg:"user not registered",auth:false});
        }
    } catch (err) {
        console.log(`An error occurred in login:${err}`);
        res.status(500).json({msg:"error in Login",auth:false});
    }
};

const userSignup = async (req,res) => {
    try {
        const { name,email,password,type } = req.body;
        const userExist = await users.findOne({ email });
        if(userExist){
            return res.status(200).json({msg:"user already exists"});
        }else{
            const hashpass = await bcrypt.hash(password,10);
            const userInfo = new users({ name,email,type,password:hashpass });
            const userProfile = await userInfo.save();
            return res.status(201).json({msg:"Signup successful"});
        }
    } catch (err) {
        console.log(`An error occurred in signup:${err}`);
        res.status(500).json({msg:"error in Signup"});
    }
};

const userLogout = async (req,res) => {
    try {
        return res.clearCookie(process.env.AUTH_TOKEN_NAME,{ httpOnly:true,secure:true,sameSite:"none"}).status(200).json({msg:"user logout successful",authenticate:false});
    } catch (err) {
        console.log(`An error occurred in logout:${err}`);
        res.status(500).json({msg:"error in logout"});
    }
};

const userProfile = async (req,res) => {
    try {
        let profile = await users.findOne({ _id:req.userId },{ name:1,avatar:1,coinBalance:1,ordersPlaced:1,role:1,type:1,_id:0 });
        delete profile._doc.password;
        const { ordersPlaced,...rest } = profile._doc;
        const newData = {...rest,tokens:ordersPlaced};
        //console.log(newData);
        res.status(200).json({data:newData,authenticate:true});
    } catch (err) {
        console.log(`An error occurred in getting profile:${err}`);
        res.status(500).json({msg:"error in user profile",authenticate:false});
    }
}

const changeAvatar = async (req,res) => {
    try {
        const { userId } = req;
        const imageURL = await uploadImage(req.file.path);
        console.log("url is :",imageURL);
        await users.findByIdAndUpdate({_id:userId},{ $set:{ avatar:imageURL }});
        res.status(201).json({avatar:imageURL,authenticate:true});
    } catch (err) {
        console.log(`An error occurred in updating user avatar:${err}`);
        res.status(500).json({msg:"error in updating user avatar",avatar:""});
    }
}

module.exports = { userLogin,userSignup,userLogout,userProfile,changeAvatar };