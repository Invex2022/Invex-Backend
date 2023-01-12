const express = require("express");
const router = express.Router();
const AuthController = require("./controllers/authControllers.js");
const authorization = require("./authorization");
const stocksController = require("./controllers/stocksController.js");

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/buyStocks/:id", stocksController.buyStocks);
router.post("/sellStocks/:id", stocksController.sellStocks);

module.exports = router;
