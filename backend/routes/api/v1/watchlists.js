const express = require("express");
const router = express.Router();
const authenticateToken = require("../../../middlewares/authenticateToken");
const watchlistController = require("../../../controllers/watchlistController");

// Add a stock to the authenticated user's watchlist
router.post("/", authenticateToken, watchlistController.createWatchlist);

router.post("/addStock", authenticateToken, watchlistController.addStock);

// router.get("/watchlist", authenticateToken, watchlistController.getWatchlist);

// router.delete(
//   "/watchlist",
//   authenticateToken,
//   watchlistController.deleteWatchlist
// );

// router.delete(
//   "/watchlist/deleteStock",
//   authenticateToken,
//   watchlistController.deleteStock
// );

module.exports = router;
