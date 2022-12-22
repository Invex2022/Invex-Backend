const express = require("express");
const app = express();
const cors = require("cors");
const AuthRouter = require("./auth");
// const fetch = require("node-fetch"); for fetching api
// const AuthRouter = require("./auth");

//middleware
app.use(cors());
app.use(express.json());
app.use(AuthRouter);
//Routes
app.get("/", (req, res) => {
  res.status(200).json("hello");
});

const port = 4000;
app.listen(port, () => {
  console.log("the server is working");
});
