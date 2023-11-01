const { Op } = require("sequelize");
const { Stock } = require("../sequelize/models");

exports.filterStocks = async (req, res) => {
  try {
    // Retrieve query parameters from the request
    const { symbol, stockname, marketCap, price, priceEarning } = req.query;

    // Build a filter object based on the provided query parameters
    const filter = {};

    if (symbol) {
      filter.symbol = symbol;
    }

    if (stockname) {
      filter.stockname = stockname;
    }

    if (marketCap) {
      const [min, max] = marketCap.split("-").map(parseFloat);
      if (!isNaN(min)) {
        filter.marketCap = { [Op.gte]: min };
      }
      if (!isNaN(max)) {
        filter.marketCap = { ...filter.marketCap, [Op.lte]: max };
      }
    }

    if (price) {
      const [min, max] = price.split("-").map(parseFloat);
      if (!isNaN(min)) {
        filter.price = { [Op.gte]: min };
      }
      if (!isNaN(max)) {
        filter.price = { ...filter.price, [Op.lte]: max };
      }
    }

    if (priceEarning) {
      const [min, max] = priceEarning.split("-").map(parseFloat);
      if (!isNaN(min)) {
        filter.priceEarning = { [Op.gte]: min };
      }
      if (!isNaN(max)) {
        filter.priceEarning = { ...filter.priceEarning, [Op.lte]: max };
      }
    }

    console.log(filter);

    const stocks = await Stock.findAll({ where: filter });

    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
