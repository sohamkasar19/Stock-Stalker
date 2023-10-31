const express = require("express");
const router = express.Router();
const UserController = require("../../../controllers/UserController");
const authenticateToken = require("../../../middlewares/authenticateToken");

// Register user route
router.post("/register", UserController.register);
// Login route
router.post("/login", UserController.login);
// User profile route
router.get("/me", authenticateToken, UserController.getUserProfile);
// Update user profile route
router.put("/me", authenticateToken, UserController.updateUserProfile);

module.exports = router;
