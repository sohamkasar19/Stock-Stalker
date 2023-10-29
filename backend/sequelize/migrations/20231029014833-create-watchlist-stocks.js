"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("watchlist_stocks", {
      watchlist_stock_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      watchlist_id: {
        type: Sequelize.UUID,
        references: {
          model: "watchlists",
          key: "watchlist_id",
        },
      },
      stock_id: {
        type: Sequelize.UUID,
        references: {
          model: "stocks",
          key: "id", // Modify this to match the primary key column name in the stocks table
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("watchlist_stocks");
  },
};
