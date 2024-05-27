const mongoose = require("mongoose");
const Schema = mongoose.Schema;

  const userSchema =new Schema({
      name: {
          type: String,
          required: true,
          minLength:3,
          maxLength: 20,
          trim: true,

      },
      email: {
          type: String,
          required: true,
          unique:[true,"This email already exits"]
      },
      phone: {
          type: Number,
          required: true,
          minLength: 11,
          maxLength:11,
          unique:[true, " This phone number already exits"]
      },

      password: {
          type: String,
          required:true,
      }

    
})

const User = mongoose.model('User', userSchema);
module.exports = User;