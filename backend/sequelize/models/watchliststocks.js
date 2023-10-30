module.exports = (sequelize, DataTypes) => {
  const WatchlistStock = sequelize.define("WatchlistStocks", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    watchlist_id: DataTypes.UUID,
    stock_id: DataTypes.UUID,
    createdAt: DataTypes.DATE,
  });

  return WatchlistStock;
};
