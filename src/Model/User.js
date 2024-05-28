const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "This email already exists"],
  },
  phone: {
    type: String, // Changed from Number to String
    required: [true, "Phone number is required"],
    minLength: [11, "Phone number must be 11 digits"],
    maxLength: [11, "Phone number must be 11 digits"],
    unique: [true, "This phone number already exists"],
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
