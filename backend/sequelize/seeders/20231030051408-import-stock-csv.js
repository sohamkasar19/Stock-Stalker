"use strict";
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const records = [];

    // Stream and parse the CSV data
    await new Promise((resolve, reject) => {
      fs.createReadStream(
        path.resolve(
          __dirname,
          "/Users/milan/Downloads/constituents-financials_csv 2.csv"
        )
      )
        .pipe(csv())
        .on("data", (row) => {
          // Parse and convert each field as necessary
          records.push({
            id: uuidv4(), // Generate a UUID for each record
            Symbol: row.Symbol,
            Stockname: row.Stockname,
            Sector: row.Sector,
            Price: row.Price !== "" ? parseFloat(row.Price) : null,
            PriceEarning:
              row.PriceEarning !== "" ? parseFloat(row.PriceEarning) : null,
            DividendYeild:
              row.DividendYeild !== "" ? parseFloat(row.DividendYeild) : null,
            EarningsShare:
              row.EarningsShare !== "" ? parseFloat(row.EarningsShare) : null,
            YearLow: row.YearLow !== "" ? parseFloat(row.YearLow) : null,
            YearHigh: row.YearHigh !== "" ? parseFloat(row.YearHigh) : null,
            MarketCap: row.MarketCap !== "" ? parseFloat(row.MarketCap) : null,
            EBITDA: row.EBITDA !== "" ? parseFloat(row.EBITDA) : null,
            PriceSales:
              row.PriceSales !== "" ? parseFloat(row.PriceSales) : null,
            PriceBook: row.PriceBook !== "" ? parseFloat(row.PriceBook) : null,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        })
        .on("end", resolve)
        .on("error", reject);
    });

    // Bulk insert the parsed records into the database
    await queryInterface.bulkInsert("stocks", records);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stocks", null, {});
  },
};
