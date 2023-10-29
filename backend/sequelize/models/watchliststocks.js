module.exports = (sequelize, DataTypes) => {
  const WatchlistStock = sequelize.define("WatchlistStocks", {
    watchlist_stock_id: DataTypes.UUID,
    watchlist_id: DataTypes.UUID,
    stock_id: DataTypes.UUID,
    createdAt: DataTypes.DATE,
  });

  return WatchlistStock;
};
