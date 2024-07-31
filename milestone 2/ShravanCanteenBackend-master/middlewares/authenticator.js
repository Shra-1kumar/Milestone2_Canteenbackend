const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticator = async (req,res,next) => {
    try {
        const cookies = req.headers.cookie;
        console.log(cookies);
        if(cookies.split('=')[0] === process.env.AUTH_TOKEN_NAME){
            const authToken = cookies.split('=')[1];
            if(authToken){
                const userId = await jwt.verify(authToken,process.env.JWT_SECRET_KEY);
                req.userId = userId._id;
                req.role = userId.role;
                next();
            }else{
                console.log(`Authenticator:not an authenticate user`);
                return res.status(401).json({msg:"Authenticator:not an authenticate user",authenticate:false});
            }
        }else{
            console.log(`Authenticator:not an authenticate user`);
            return res.status(401).json({msg:"Authenticator:not an authenticate user",authenticate:false});
        }
    } catch (err) {
        console.log(`Authenticator:an error occurred:${err}`);
        res.status(500).json({data:{},msg:"an server error in authentication",authenticate:false});
    }
}

module.exports = authenticator;