const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth.js");
const validator = require("../middlewares/validator.js");
const { registerBody, loginBody } = require("../validations/users.js");

//rotta per registrate un utente
router.post("/register", validator(registerBody), register);

//rotta per autenticare un utente
router.post("/login", validator(loginBody), login);

module.exports = router;
