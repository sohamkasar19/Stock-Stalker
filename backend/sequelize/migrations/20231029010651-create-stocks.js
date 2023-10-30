"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("stocks", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      Symbol: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Stockname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Sector: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      PriceEarning: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      DividendYeild: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      EarningsShare: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      YearLow: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      YearHigh: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      MarketCap: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      EBITDA: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      PriceSales: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      PriceBook: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("stocks");
  },
};
