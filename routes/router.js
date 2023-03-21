const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authControllers.js");
const authorization = require("../middleware/authorization");
const stocksController = require("../controllers/stocksController.js");

router.get("/user", AuthController.getAllUsers);
router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/buyStocks/:id", authorization, stocksController.buyStocks); //bearer token
router.post("/sellStocks/:id", authorization, stocksController.sellStocks);

module.exports = router;
