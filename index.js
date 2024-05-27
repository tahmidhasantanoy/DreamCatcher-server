const express = require("express");
const app = express();
const port = 3000;
const dbConnect = require('./src/Connect/dbConnect')
const mongoose = require("mongoose");
require("./src/Connect/dbConnect");

app.get("/", (req, res) => {
  res.send("Dream catcher is running");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  dbConnect();
});