const mongoose = require('mongoose');

const url = "mongodb+srv://Dream_catcher:vWtsvxZvkWuGkRS3@cluster0.cu0avmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



mongoose.connect(url).then(()=>console.log("mongodb connect")).catch((error) => {
    console.log("connected");
    console.log(error.message);
})