const mongoose = require("mongoose");
require("dotenv").config();
// const url =`mongodb+srv://marchandise:${process.env.DB_PASS}@cluster0.yqs7g8k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const url = `mongodb+srv://marchandise:${process.env.DB_PASS}@cluster0.yqs7g8k.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Connection with mongoDB is established....");
}).catch((error)=>{
    console.log(error);
    console.log("No Connection")
})

// mongoose.connect("mongodb://127.0.0.1:27017/ecommerce").then(()=>{
//     console.log("Connection with mongoDB is established....");
// }).catch(()=>{
//     console.log("No Connection")
// })