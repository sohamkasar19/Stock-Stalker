module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define(
    "Stock",
    {
      symbol: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      stockname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sector: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      priceEarning: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      dividendYeild: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      earningsShare: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      yearLow: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      yearHigh: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      marketCap: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      EBITDA: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      priceSales: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      priceBook: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      tableName: "stocks",
    }
  );

  return Stock;
};
