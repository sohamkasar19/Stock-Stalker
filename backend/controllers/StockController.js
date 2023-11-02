const { Op } = require("sequelize");
const { Stock } = require("../sequelize/models");

exports.filterStocks = async (req, res) => {
  try {
    // Retrieve query parameters from the request
    const { symbol, stockname, marketCap, price, priceEarning, filterLogic } =
      req.query;

    // Build a filter object based on the provided query parameters
    const filter = {};

    if (symbol) {
      filter.symbol = { [Op.iLike]: `${symbol}%` };
    }

    if (stockname) {
      // Use case-insensitive search for stockname
      filter.stockname = { [Op.iLike]: `${stockname}%` };
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

    if (filterLogic === "OR") {
      // Combine filter conditions using "OR" logic
      const orConditions = Object.keys(filter).map((key) => ({
        [key]: filter[key],
      }));
      filter[Op.or] = orConditions;
      // Remove individual filter conditions
      Object.keys(filter).forEach((key) => delete filter[key]);
    }

    console.log(filter);

    const stocks = await Stock.findAll({ where: filter });

    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.searchStocks = async (req, res) => {
  try {
    const { symbol, stockname } = req.query;

    const filter = {};

    if (symbol) {
      filter.symbol = { [Op.iLike]: `${symbol}%` };
    }
    if (stockname) {
      filter.stockname = { [Op.iLike]: `${stockname}%` };
    }

    const stocks = await Stock.findAll({ where: filter });

    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ error: "Search Error" });
  }
};
