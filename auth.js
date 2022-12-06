const express = require("express")
const router = express.Router()
const AuthController = require("./controllers/authControllers.js");
const authorization = require("./authorization");


router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

module.exports = router;
