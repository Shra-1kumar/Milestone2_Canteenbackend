const users = require("../db/models/userSchema");

const getCoins = async (req,res) => {
  try {
      const { userId } = req;
      const { amount } = req.body;
      await users.findByIdAndUpdate(userId,{ $inc:{ coinBalance:amount }});
      res.status(200).json({data:{coinBalance:100 },message:"coins received successfully"});
  } catch (err) {
    console.log(err);
    res.status(500).json({data:{coinBalance:0 },message:"an error occurred in receiving coins"});
  }
}

const paymentByCoins = async (req,res,next) => {
    try {
        const { userId } = req;
        const { amount } = req.body;
        const paymentDone = await users.findByIdAndUpdate(userId,{ $inc:{ coinBalance:-amount }});
        if (paymentDone) {
          next();
        }else res.status(200).json({message:"payment failed"});
    } catch (err) {
      console.log(err);
      res.status(500).json({message:"an error occurred in payment"});
    }
}

module.exports = { paymentByCoins,getCoins };