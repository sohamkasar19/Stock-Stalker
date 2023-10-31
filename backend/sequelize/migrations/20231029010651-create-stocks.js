"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("stocks", {
      symbol: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      stockname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sector: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      priceEarning: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      dividendYeild: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      earningsShare: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      yearLow: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      yearHigh: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      marketCap: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      EBITDA: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      priceSales: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      priceBook: {
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
