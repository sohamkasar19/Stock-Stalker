module.exports = (sequelize, DataTypes) => {
  const WatchlistStock = sequelize.define(
    "WatchlistStocks",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      watchlist_id: DataTypes.UUID,
      symbol: DataTypes.STRING,
      createdAt: DataTypes.DATE,
    },

    {
      tableName: "watchlist_stocks",
    }
  );

  return WatchlistStock;
};
