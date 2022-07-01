require("dotenv").config();

const { PORT, SECRET_KEY, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } =
  process.env;

module.exports = {
  PORT,
  SECRET_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
};
