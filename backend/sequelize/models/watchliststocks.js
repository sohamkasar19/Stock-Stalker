module.exports = (sequelize, DataTypes) => {
  const WatchlistStock = sequelize.define(
    "WatchlistStock",
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

  WatchlistStock.associate = (models) => {
    WatchlistStock.belongsTo(models.Watchlist, { foreignKey: "watchlist_id" });
    WatchlistStock.belongsTo(models.Stock, {
      foreignKey: "symbol",
      targetKey: "symbol",
    });
  };

  return WatchlistStock;
};
