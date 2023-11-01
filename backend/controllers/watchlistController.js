const { Watchlist } = require("../sequelize/models");
const { WatchlistStock, Stock } = require("../sequelize/models/");

exports.createWatchlist = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    const watchlist = await Watchlist.create({
      user_id: userId,
      name: name,
    });

    // Check if user with the same email already exists
    // Return success response
    res.status(201).json({
      id: watchlist.id,
      userId,
      name,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addStock = async (req, res) => {
  try {
    const { watchlist_id, ticker } = req.body;
    // Check if user with the same email already exists
    const existingWatchlist = await Watchlist.findOne({
      where: { id: watchlist_id },
    });
    if (!existingWatchlist) {
      return res.status(400).json({ error: "Watchlist does not exist." });
    }

    const watchlistStock = await WatchlistStock.create({
      watchlist_id: watchlist_id,
      symbol: ticker,
    });
    // Return success response
    res.status(201).json({
      watchlist_id,
      symbol: ticker,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all watchlists of the user and include associated symbols
    const watchlists = await Watchlist.findAll({
      where: { user_id: userId },
      include: {
        model: WatchlistStock,
        attributes: ["symbol"],
        include: {
          model: Stock,
          attributes: [
            "stockname",
            "sector",
            "price",
            "priceEarning",
            "dividendYeild",
            "earningsShare",
            "yearLow",
            "yearHigh",
            "marketCap",
            "EBITDA",
            "priceSales",
            "priceBook",
          ],
        },
      },
    });

    // Return the result
    res.status(200).json(watchlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteWatchlist = async (req, res) => {
  const { watchlist_id } = req.query;

  if (!watchlist_id) {
    return res
      .status(400)
      .json({ error: "Missing watchlist_id in query parameters" });
  }

  try {
    // Check if the watchlist exists
    const watchlist = await Watchlist.findByPk(watchlist_id);
    if (!watchlist) {
      return res.status(404).json({ error: "Watchlist not found" });
    }

    // Delete associated records in watchlist_stocks
    await WatchlistStock.destroy({
      where: { watchlist_id },
    });

    // Now, delete the watchlist
    await Watchlist.destroy({
      where: { id: watchlist_id },
    });

    res.status(200).send({ message: "Watchlist deleted successfully" }); // Return a 204 No Content response on successful deletion
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStockFromWatchlist = async (req, res) => {
  const { watchlist_id, ticker } = req.query;

  if (!watchlist_id || !ticker) {
    return res.status(400).json({ error: "Missing watchlist_id or ticker" });
  }

  try {
    // Delete the record in watchlist_stocks that matches the watchlist_id and ticker
    await WatchlistStock.destroy({
      where: {
        watchlist_id,
        symbol: ticker,
      },
    });

    res
      .status(200)
      .json({ message: "Stock removed from watchlist successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
