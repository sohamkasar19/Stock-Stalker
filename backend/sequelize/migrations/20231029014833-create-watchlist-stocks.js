"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("watchlist_stocks", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      watchlist_id: {
        type: Sequelize.UUID,
        references: {
          model: "watchlists",
          key: "id",
        },
      },
      stock_id: {
        type: Sequelize.UUID,
        references: {
          model: "stocks",
          key: "id",
        },
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
    await queryInterface.dropTable("watchlist_stocks");
  },
};
