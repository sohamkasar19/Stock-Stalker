const express = require("express");
const router = express.Router();
const StockController = require("../../../controllers/StockController");

router.get("/filterStocks", StockController.filterStocks);
router.get("/searchStocks", StockController.searchStocks);

module.exports = router;
