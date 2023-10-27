module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define(
    "Stock",
    {
      Symbol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Stockname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Sector: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      PriceEarning: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      DividendYeild: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      EarningsShare: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      YearLow: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      YearHigh: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      MarketCap: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      EBITDA: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      PriceSales: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      PriceBook: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      tableName: "stocks", // Define the table name
    }
  );

  return Stock;
};
