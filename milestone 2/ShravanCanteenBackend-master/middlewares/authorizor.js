const authorizor = (checkRole) => {
    return async (req,res,next) => {
        try {
        const { role } = req;
        if (checkRole.includes(role)) {
            next();
        }else{
            console.log(`Authorizer:not an Authorized user`);
            return res.status(401).json({msg:"Authorizer:not an Authorized user",authenticate:false});
        }
    } catch (err) {
        console.log(`Authorizer:an error occurred:${err}`);
        res.status(500).json({msg:"an server error in authorization",authenticate:false});
    }
}
}

module.exports = authorizor;