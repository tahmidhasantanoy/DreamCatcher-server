const express = require("express");
const router = express.Router();
const User = require("../Model/User");

router.post("/user", async (req, res) => {
    try {
      const data =req.body
    // data store using model
    const newUser = new User(data);
    const userData = await newUser.save();
    res.status(201).send({ userData });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = router;
