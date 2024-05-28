const express = require("express");
const app = express();
const port = 3000;
const dbConnect = require("./src/Connect/dbConnect");
const mongoose = require("mongoose");
require("./src/Connect/dbConnect");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./src/routes/login-routes");
const userSchema = require("./src/Model/User");

// middleware
app.use(express.json());
app.use(userRouter);
app.use(cors());

app.get("/", (req, res) => {
  res.send("Dream catcher is running");
});

app.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Create a new user instance
  const user = new userSchema({
    name,
    email,
    phone,
    password,
  });

  console.log(req.body);

  res.send({ user });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  dbConnect();
});
