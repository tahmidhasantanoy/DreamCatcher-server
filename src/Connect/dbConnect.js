const mongoose = require("mongoose");

const url =
  "mongodb+srv://Dream_catcher:vWtsvxZvkWuGkRS3@cluster0.cu0avmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const dataBaseConnect = async() => {
  try {
  await  mongoose.connect(url).then(() => console.log("mongodb connect"));
  } catch (error) {
    console.log("Not Connect");
    console.log(error.message);
  }
};
module.exports = dataBaseConnect;
