const express = require("express");
const app = express();
const cors = require("cors");
const AuthRouter = require("./routes/router");

//middleware
app.use(cors());
app.use(express.json());

//Routes
app.use(AuthRouter);
app.get("/", (req, res) => {
  res.send("hello").status(200);
});

const port = 4000 || process.env.PORT;
app.listen(port, () => {
  console.log("the server is working");
});
