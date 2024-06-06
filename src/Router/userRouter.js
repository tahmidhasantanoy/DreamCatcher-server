const express = require("express");
const router = express.Router();
const User = require("../Model/User");
const PhotographerSchemaModel = require("../Model/photographerScema");



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
router.get("/users", async (req, res) => {
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
router.put("/users_to_request_photographer/:email", async (req, res) => {
  try {
    const email = req.params.email;
    // get data form user
    const body = req.body
    const userDetails = await User.findOne({ email: email });
    // update on user database
    const updateUser = await User.updateOne(
      { email: email },
      {
        $set: {
          role: "request",
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

    // update on photographer database
    const updatePhotographer = await PhotographerSchemaModel.updateOne(
      { email: email },
      {
        $set: {
          name: body.name,
          age: body.age,
          gender: body.gender,
          experiment: body.experiment,
          email: body.email,
          location: body.location,
          photoURL: body.photoURL,
          role:"requested"
        }
      }
    )
    if (updatePhotographer) {
      res.status(200).send({
        success: updatePhotographer.acknowledged,
        message: "Request for photographer",
        data: updatePhotographer,
      });
    } else {
      res.status(404).send("User not found");
    }

  } catch (error) {
    res.status(500).send(error.message);
  }
});

//user to photographer
router.put("/users_to_photographer/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const userDetails = await User.findOne({ email: email });
    if (userDetails.role != "confirm") {
      const updateUser = await User.updateOne(
        { email: email },
        {
          $set: {
            role: "confirm",
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

      const updatePhotographer = await PhotographerSchemaModel.updateOne(
        { email: email },
        {
          $set: {        
            role:"confirm"
          }
        }
      )
      if (updatePhotographer) {
        res.status(200).send({
          success: updatePhotographer.acknowledged,
          message: "Promoted as a photographer",
          data: updatePhotographer,
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
  
})
// user to admin 
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

module.exports = router;
