const { User } = require("../sequelize/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const userForToken = {
      id: user.id,
      username: user.username,
    };

    const accessToken = jwt.sign(userForToken, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Return success response
    res.status(201).json({
      token: accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if the password is correct
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // User authenticated, generate a token
    const userForToken = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Return success response with token and user info
    res.status(200).json({
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ error: "An error occurred during the login process." });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    // The user's id should be attached to the request in the authentication middleware
    const userId = req.user.id;

    // Fetch the user from the database
    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "email"],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user profile
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("GetUserProfile error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user profile." });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's username and/or email if provided
    if (username) user.username = username;
    if (email) user.email = email;

    // Update the password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    // Return a success response
    res.status(200).json({
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.error("UpdateUserProfile error:", error);
    res
      .status(400)
      .json({ error: "An error occurred while updating the profile." });
  }
};
