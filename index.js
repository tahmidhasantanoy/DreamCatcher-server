const express = require("express");
const app = express();
const port = 3000;
const dbConnect = require("./src/Connect/dbConnect");
require("./src/Connect/dbConnect");
const cors = require("cors");
require("dotenv").config();
const userRouter= require("./src/Router/userRouter")
const userSchema = require("./src/Model/User");

// middleware
app.use(express.json())
app.use(userRouter);
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.get("/", (req, res) => {
  res.send("Dream catcher  running");
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  dbConnect();
});
