const mongoose = require("mongoose");

const photographyInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 12,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  experiment: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
});

const photographerSchemaModel = new mongoose.model(
  "photographerSchemaModel",
  photographyInfoSchema
);

module.exports = photographerSchemaModel;
