const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenGenerator = (user_id) => {
  const payload = {
    user: user_id,
  };
  console.log("work");
  return jwt.sign(payload, process.env.JWT_SECRET);
};

module.exports = tokenGenerator;
