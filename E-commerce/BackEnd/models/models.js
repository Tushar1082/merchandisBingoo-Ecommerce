const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    cusProfileImg:String,
    cusName:String,
    title:String,
    description:String,
    cusRating:Number,
    ratingMood:String,
    imgInFeedback:[String],
    uploadTime:String
})
const productSchema = new mongoose.Schema({
    _id:Number,
    name:{
        type:String,
        required:true
    },
    img:{
        type:[String],
        required:true
    },
    reviews:{
        type:[reviewSchema]
    },
    keyFeatures:{
        type:Object
    },
    companyName:{
        type:String,
        requried:true
    },
    price:{
        type:Number,
        required:true
    }
})
const userSchema = new mongoose.Schema({
    profileImg:{
        type:String
    },
    name:{
        type:String,
        // required:true
    },
    address:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        // required:true
    },
    phoneNo:{
        type:Number
    },
    gender:{
        type:String
    },
    password:{
        type:String,
        // required:true
    },
    cartList:{
        type:Array
    },
    wishList:{
        type:Array
    },
    orderList:{
        type:Array
    },
    addAddressList:{
        type:Array
    }
})
const categorySchema = new mongoose.Schema({
    category:{
        type:String
    },
    img:{
        type:String
    },
    sale:{
        type:Number
    },
    products:[productSchema]
}) 
const specialProductSchema = new mongoose.Schema({
    _id:Number,
    category:String,
    sale:Number,
})
const electronicCollection = mongoose.model("electronics",categorySchema,"electronics");
const menCollection = mongoose.model("mens",categorySchema,"mens");
const mobileCollection = mongoose.model("mobiles",categorySchema,"mobiles");
const userCollection = mongoose.model("user",userSchema,'user');
const specialProductCollection = mongoose.model("specialProducts",specialProductSchema,'specialProducts');
const bagCollection = mongoose.model("bags",categorySchema,'bags');
const bookCollection = mongoose.model("books",categorySchema,'books');
const womenCollection = mongoose.model("womens",categorySchema,'womens');/*The first argument is use to create new collection,
second is use to provide schema of collection and last argument is use to specfiy the collection that already exist in database but
it must be required to pass first argument.Mean,So if want to use already exist collection then set its name in both last and first same else set 
first argument and second only for create new collection*/
module.exports = {electronicCollection,menCollection,mobileCollection,womenCollection,userCollection,specialProductCollection,bagCollection,bookCollection};