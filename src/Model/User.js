const mongoose = require("mongoose");
const Schema = mongoose.Schema;

  const userSchema =new Schema({
      name: {
          type: String,
          require: true,
          minLength:3,
          maxLength: 20,
          trim: true,

      },
      email: {
          type: String,
          require: true,
          unique:[true,"This email already exits"]
      },

    
})
