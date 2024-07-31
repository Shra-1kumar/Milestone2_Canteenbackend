const sales = require("../db/models/salesSchema");

const getDatewiseSales = async (req, res) => {
    try {
    const { year, month } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
  
    const allSales = await sales.find({ date: { $gte: startDate, $lt: endDate } });

    const totalAmount = allSales.reduce((sum, sale) => sum + sale.total, 0);
    const platesServed = allSales.reduce((sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
  
    res.status(200).json({ totalAmount, platesServed, message:"sales received successfully" });
    } catch (error) {
        res.status(500).json({message:"an error occurred in getting sales"});
   }
}

module.exports = { getDatewiseSales };