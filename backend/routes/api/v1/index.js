const express = require("express");
const router = express.Router();

const userRoutes = require("./users");
const watchlistRoutes = require("./watchlists");
const stockRoutes = require("./stocks");

router.use("/users", userRoutes);
router.use("/watchlists", watchlistRoutes);
router.use("/stocks", stockRoutes);

module.exports = router;
