const express = require("express");
const router = express.Router();

const userRoutes = require("./users");
// const stockRoutes = require('./stocks');
const watchlistRoutes = require("./watchlists");

router.use("/users", userRoutes);
// router.use('/stocks', stockRoutes);
router.use("/watchlists", watchlistRoutes);

module.exports = router;
