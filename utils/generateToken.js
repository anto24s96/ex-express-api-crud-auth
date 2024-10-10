const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (payload, expiresIn = "8h") =>
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

module.exports = generateToken;
