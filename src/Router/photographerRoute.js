const express = require("express");
const photographer_route = express.Router();
const photographerSchemaModel = require("../Model/photographerScema");

photographer_route.get("/photographer-route", async (req, res) => {
  try {
    const photographerAllInfo = await photographerSchemaModel.find(); //kmne holo without db & coll
    res.status(201).send(photographerAllInfo);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

photographer_route.post("/photographer-route", async (req, res) => {
  try {
    const photographerInformation = req.body;
    const photographerScemaValidation = new photographerSchemaModel(
      photographerInformation
    );

    const photographerData = await photographerScemaValidation.save(); //Save to DB
    res.status(200).send({ photographerData });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = photographer_route;
