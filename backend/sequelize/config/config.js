require("dotenv").config({ path: __dirname + "/../../.env" });

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // added to handle some common AWS RDS issues
      },
    },
  },
  // ... other environments like test, production, etc.
};
