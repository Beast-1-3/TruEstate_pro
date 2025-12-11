const salesService = require('../services/salesService');

const getSales = async (req, res) => {
  try {
    const sales = await salesService.getAllSales({});
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getSales };
