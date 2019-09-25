require("dotenv").config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  environment: process.env.NODE_ENV
};
