const express = require("express");
const router = express.Router();
const StockController = require("../../../controllers/StockController");

router.get("/filterStocks", StockController.filterStocks);

module.exports = router;
