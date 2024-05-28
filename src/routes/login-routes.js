const express = require("express");
const userSchema = require("../Model/User");
// const app = express();
const router = express.Router();

//get router
router.get("/", (req, res) => {
  res.send();
});

router.post("/login", (req, res) => {
  const userData = req.body;
  const userScahemaData = new userSchema(userData);

  res.send({ userScahemaData });
});



module.exports = router;
