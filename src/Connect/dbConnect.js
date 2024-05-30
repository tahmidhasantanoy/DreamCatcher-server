const mongoose = require("mongoose");
const { collection } = require("../Model/User");
// const { collection } = require("../Model/photographerScema");

const url =
  `mongodb+srv://Dream_catcher:vWtsvxZvkWuGkRS3@cluster0.cu0avmu.mongodb.net/?retryWrites=true&w=majority`

const dataBaseConnect = async() => {
  try {
  await  mongoose.connect(url,{dbName:"Dream_Catcher"}).then(() => console.log("mongodb connect"));
  } catch (error) {
    console.log("Not Connect");
    console.log(error.message);
  }
};
module.exports = dataBaseConnect;
