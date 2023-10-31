const { Watchlist } = require("../sequelize/models");
const { WatchlistStock } = require("../sequelize/models/");

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
    const { watchlist_id, symbol } = req.body;
    console.log(watchlist_id, symbol);
    // Check if user with the same email already exists
    const existingWatchlist = await Watchlist.findOne({
      where: { id: watchlist_id },
    });
    if (!existingWatchlist) {
      return res.status(400).json({ error: "Watchlist does not exist." });
    }

    const watchlistStock = await WatchlistStock.create({
      watchlist_id: watchlist_id,
      symbol: symbol,
    });
    // Return success response
    res.status(201).json({
      watchlist_id,
      symbol,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
