const jwt = require("jsonwebtoken");
require("dotenv").config();
const createError = require("../utils/createError.js");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        throw createError("Token non fornito", 401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            throw createError("Token non valido", 403);
        }
        req.user = data;
        next();
    });
};
