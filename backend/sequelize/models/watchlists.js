module.exports = (sequelize, DataTypes) => {
  const Watchlist = sequelize.define(
    "Watchlist",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: DataTypes.UUID,
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "watchlists",
    }
  );

  Watchlist.associate = (models) => {
    Watchlist.hasMany(models.WatchlistStock, { foreignKey: "watchlist_id" });
  };
  return Watchlist;
};
