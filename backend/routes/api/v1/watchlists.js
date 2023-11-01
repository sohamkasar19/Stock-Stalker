const express = require("express");
const router = express.Router();
const authenticateToken = require("../../../middlewares/authenticateToken");
const watchlistController = require("../../../controllers/watchlistController");

// Add a stock to the authenticated user's watchlist
router.post("/", authenticateToken, watchlistController.createWatchlist);

router.post("/addStock", authenticateToken, watchlistController.addStock);

router.get("/", authenticateToken, watchlistController.getWatchlist);

router.delete("/", authenticateToken, watchlistController.deleteWatchlist);

router.delete(
  "/deleteStock",
  authenticateToken,
  watchlistController.deleteStockFromWatchlist
);

module.exports = router;
