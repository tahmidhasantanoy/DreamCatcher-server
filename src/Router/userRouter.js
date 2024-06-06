const express = require("express");
const router = express.Router();
const User = require("../Model/User");
var jwt = require('jsonwebtoken');
const verifyJWT = require('../TokenVerify/TokenVerify')
require("dotenv").config();

// create user
router.post("/register", async (req, res) => {

  try {
    const data = req.body;
    // data store using model
    const newUser = new User(data);
    const userData = await newUser.save(); //Save to DB
    res.status(201).send({ userData });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// find all user
router.get("/users",verifyJWT, async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).send(users);
    } else {
      res.status(404).send("Users not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// update user as photographer
router.put("/users_to_photographer/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const userDetails = await User.findOne({ email: email });
    if (userDetails.role != "photographer") {
      const updateUser = await User.updateOne(
        { email: email },
        {
          $set: {
            role: "photographer",
            promotedAt: new Date(),
          },
        }
      );
      if (updateUser) {
        res.status(200).send({
          success: updateUser.acknowledged,
          message: "Promoted as a photographer",
          data: updateUser,
        });
      } else {
        res.status(404).send("User not found");
      }
    }
    else {
      res.status(404).send("User is already a photographer");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.put("/users_to_admin/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const userDetails = await User.findOne({ email: email });
    if (userDetails.role != "admin") {
      const updateUser = await User.updateOne(
        { email: email },
        {
          $set: {
            role: "admin",
            promotedAt: new Date(),
          },
        }
      );
      if (updateUser) {
        res.status(200).send({
          success: updateUser.acknowledged,
          message: "Promoted as a admin",
          data: updateUser,
        });
      } else {
        res.status(404).send("User not found");
      }
    }
    else {
      res.status(404).send("User is already a admin");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  const data = req.body;
 const token = jwt.sign({
    data: data
 },process.env.ACCESS_TOKEN_SECRET , { expiresIn: '1h' });
  res.send({token: token})
})

module.exports = router;
