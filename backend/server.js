const express = require("express");
const app = express();
const v1Routes = require("./routes/api/v1");

require("dotenv").config();

const PORT = process.env.PORT || 8080;

// Body parser middleware
app.use(express.json());

// Use routes
app.use("/api/v1", v1Routes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
