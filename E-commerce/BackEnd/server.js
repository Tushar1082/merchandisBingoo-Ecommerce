const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./db/conn");
const express = require("express");
const app = express();
const Port = process.env.PORT||4000;
const bodyParser = require("body-parser");
const cors = require('cors');

//api controllers
const {sendMailPost,sendMailPut} = require("./apiController/forgotPassword");
const {signupGet,signupPost} = require("./apiController/signup");
const {loginPost} = require("./apiController/login");
const topDeals = require("./apiController/topDeals");
const {getBuyPage,postBuyPage} = require("./apiController/buyPage");
const {userGet,userPost,userPut,userDelete} = require("./apiController/user");
const search = require("./apiController/search");
const Razorpay = require('razorpay');
const crypto = require("crypto");
const {userCollection, specialProductCollection, menCollection, womenCollection, electronicCollection, mobileCollection, bagCollection, bookCollection} = require("./models/models");
const auth = require("./middleware/auth");
const isSignUp = require("./middleware/isSignup");

//routers
const routerCatgories = require("./routers/categories/category");
const routerWomen = require("./routers/categories/women/women");
const routerMen = require("./routers/categories/men/men");
const routerMobile = require("./routers/categories/mobile/mobile");
const routerElectronics = require("./routers/categories/electronic/electronic");
const routerBags = require("./routers/categories/bag/bag");
const routerBooks = require("./routers/categories/book/book");

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));//This line is to parse the request body
app.use(cookieParser());

app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use("/category",routerCatgories);
app.use("/category/women",routerWomen);
app.use("/category/men",routerMen);
app.use("/category/mobile",routerMobile);
app.use("/category/electronics",routerElectronics);
app.use("/category/bags",routerBags);
app.use("/category/book",routerBooks);

app.get("/",topDeals);
app.delete("/",async(req,res)=>{
    if(req.query.cart=="true"){
        const {remCartList,isUserLog} = req.body;
    
        if(Array.isArray(remCartList)){
            try {
                const promises = remCartList.map(async(obj)=>{
                    const deleteItem = await userCollection.updateOne({email:isUserLog},{$pull:{cartList:obj}})
                })
                Promise.all(promises);
            } catch (error) {
                console.log(error);        
            }
        }
    }else if(req.query.like=="true"){
        const {remLikeList,isUserLog} = req.body;
    
        if(Array.isArray(remLikeList)){
            try {
                const promises = remLikeList.map(async(obj)=>{
                    const deleteItem = await userCollection.updateOne({email:isUserLog},{$pull:{wishList:obj}})
                })
                Promise.all(promises);
            } catch (error) {
                console.log(error);        
            }
        }
    } 
});
app.post("/",async(req,res)=>{
    if(req.query.cart ==="true"){
        const {list,isUserLog} = req.body;
       if(list && isUserLog){
           try{
             const existCartList = await userCollection.find({email:isUserLog},{cartList:1});//Get existing user cartlist
             
             function productExist(obj){ //productExist return an boolean value that tell which product not exists in old user cart.
              return existCartList.some(item=> item.id != obj.id && item.category != obj.category);
             }
   
           const filterList = list.filter(obj => productExist(obj));//by getting boolean value, here we can filter objects that does not exists in user old cartlist. 
           
           const promises = filterList.map(async(elem)=>{
               await userCollection.findOneAndUpdate({email:isUserLog},{$push:{cartList:elem}},{ new: true });
            })
            const newCartList = await Promise.all(promises);

            if(newCartList){
                  res.json({msg:"items insert in cart"})
              }else{
               res.json({msg:"items is not insert in cart"});
              } 
           }catch(e){
               console.log(e)
               res.json({e:"error"});
           }
       }
    }else if(req.query.like=="true"){
        const {likeList,isUserLog} = req.body;

        if(likeList && isUserLog){
            try{
                const existWishList = await userCollection.find({email:isUserLog},{wishList:1});//Get existing user wishlist
                
                function productExist(obj){ //productExist return an boolean value that tell which product not exists in old user wishList.
                 return existWishList.some(item=> item.id != obj.id && item.category != obj.category);
                }
      
              const filterLikeList = likeList.filter(obj => productExist(obj));//by getting boolean value, here we can filter objects that does not exists in user old wishlist. 
              
              const promises = filterLikeList.map(async(elem)=>{
                await userCollection.findOneAndUpdate({email:isUserLog},{$push:{wishList:elem}},{ new: true });
              })
              const newWishList = Promise.all(promises);

                 if(newWishList){
                     res.json({msg:"items insert in wishlist"})
                 }else{
                  res.json({msg:"items is not insert in wishlist"});
                 } 
              }catch(e){
                  console.log(e)
                  res.json({e:e});
              }
        }
    }
    else{
        try{
            const user = await userCollection.findOne({email:req.body.isUserLog})
            if(user){
                res.json({user});
            }else{
                res.json({msg:"user is not exist"});
            }
        }catch(e){
            res.json({e});
        }
    }
})
app.post("/login",loginPost);
app.get("/signup",signupGet);
//signuped
app.post("/signup",signupPost);

//forgetPassword
app.post("/forgotpassword",sendMailPost);
app.put("/forgotpassword",sendMailPut);

app.get("/buyPage",isSignUp,auth,getBuyPage);
app.post("/buyPage",postBuyPage);

app.get("/user",isSignUp,auth,userGet)
app.post("/user",userPost)
app.put("/user",userPut)
app.delete("/user",userDelete)

app.get("/search",isSignUp,auth,search);

function query(id,category){
    return [
     { $match: { "category":category } },
     { $unwind: "$products" },  // Deconstruct the array
     {
         $match: {
           "products._id":+id
         }
     },
     {
        $project:{
            category:1,
            products:1,
            sale:1,
        }
     }
    ]
 }
app.post("/cart",async(req,res)=>{
    const menArr = ["shirtsMen","shoesMen","tShirtsMen","jeansMen","blazersMen","jacketsMen"];
    const womenArr = ["sarees","tops","lehengas","shirtsWomen","jeansWomen","jacketsWomen"];
    const electronicArr = ["televisions","headphones","speakers","gamingConsoles","laptops"];
    // const mobileArr = ["samsung","vivo","realme","poco","iPhone"];
    const arr = [];
    try {
        const response = req.body; //response from frontend
        for(let key in response){
            arr.push(req.body[key]);
        }
        const data = await Promise.all( arr.map(async(elem)=>{
            if(menArr.includes(elem.category)){
                const res =await menCollection.aggregate(query(elem.id,elem.category));
                return res;
            }else if(womenArr.includes(elem.category)){
                const res = await womenCollection.aggregate(query(elem.id,elem.category));
                return res;
            }else if(electronicArr.includes(elem.category)){
                const res = await electronicCollection.aggregate(query(elem.id,elem.category));
                return res;
            }else{
                const res = await mobileCollection.aggregate(query(elem.id,elem.category));
                return res;
            }
        }))
        const cartItems = data.flat();
        if(data){
            res.json({cartItems})
        }else{
            res.json({msg:"data is no more.."})
        }
    } catch (error) {
        res.json({e:error});
    }
    
})
app.post("/wishlist",async(req,res)=>{
    const menArr = ["shirtsMen","shoesMen","tShirtsMen","jeansMen","blazersMen","jacketsMen"];
    const womenArr = ["sarees","tops","lehengas","shirtsWomen","jeansWomen","jacketsWomen"];
    const electronicArr = ["televisions","headphones","speakers","gamingConsoles","laptops"];
    // const mobileArr = ["samsung","vivo","realme","poco","iPhone"];
    const arr = [];
    try {
        const response = req.body; //response from frontend
        for(let key in response){
            arr.push(req.body[key]);
        }
        const data = await Promise.all( arr.map(async(elem)=>{
            if(menArr.includes(elem.category)){
                const res =await menCollection.aggregate(query(elem.id,elem.category));
                return res;
            }else if(womenArr.includes(elem.category)){
                const res = await womenCollection.aggregate(query(elem.id,elem.category));
                return res;
            }else if(electronicArr.includes(elem.category)){
                const res = await electronicCollection.aggregate(query(elem.id,elem.category));
                return res;
            }else{
                const res = await mobileCollection.aggregate(query(elem.id,elem.category));
                return res;
            }
        }))
        const wishlistItems = data.flat();
        if(data){
            res.json({wishlistItems})
        }else{
            res.json({msg:"data is no more.."})
        }
    } catch (error) {
        res.json({e:error});
    }  
})
app.post("/orderlist",auth,async(req,res)=>{
    const {orderL} = req.body;
    const arr = orderL;
    const menArr = ["shirtsMen","shoesMen","tShirtsMen","jeansMen","blazersMen","jacketsMen"];
    const womenArr = ["sarees","tops","lehengas","shirtsWomen","jeansWomen","jacketsWomen"];
    const electronicArr = ["televisions","headphones","speakers","gamingConsoles","laptops"];
    const bagArr = ["womenBags","menBags"];
    const bookArr = ["books"]

    try {
        const data = await Promise.all( arr.map(async(elem)=>{

            if(menArr.includes(elem.category)){
                return await menCollection.aggregate(query(elem.id,elem.category));
            }else if(womenArr.includes(elem.category)){
                return await womenCollection.aggregate(query(elem.id,elem.category));
            }else if(electronicArr.includes(elem.category)){
                return await electronicCollection.aggregate(query(elem.id,elem.category));
            }else if(bagArr.includes(elem.category)){
                console.log("herer");
                return await bagCollection.aggregate(query(elem.id,elem.category));
            }else if(bookArr.includes(elem.category)){
                return await bookCollection.aggregate(query(elem.id,elem.category));
            }else{
                return await mobileCollection.aggregate(query(elem.id,elem.category));
            }
        }))
        const products = data.flat();
        products.map((elem)=>{
            elem.products.category = elem.category;
            elem.products.sale = elem.sale;
        })
        if(data){
            res.json({products});
        }else{
            res.json({msg:"data is no more.."})
            }
    } catch (error) {
        console.log(error);
        res.json({e:error})
    }
})
app.post("/specialProducts",async(req,res)=>{
    const menArr = ["shirtsMen","shoesMen","tShirtsMen","jeansMen","blazersMen","jacketsMen"];
    const womenArr = ["sarees","tops","lehengas","shirtsWomen","jeansWomen","jacketsWomen"];
    const electronicArr = ["televisions","headphones","speakers","gamingConsoles","laptops"];
    // const mobileArr = ["samsung","vivo","realme","poco","iPhone"];
    const arr = [];
    try {
        const response = req.body; //response from frontend
        for(let key in response){
            arr.push(req.body[key]);
        }
        const data = await Promise.all( arr.map(async(elem)=>{
            if(menArr.includes(elem.category)){
                const res =await menCollection.aggregate(query(elem._id,elem.category));
                return res;
            }else if(womenArr.includes(elem.category)){
                const res = await womenCollection.aggregate(query(elem._id,elem.category));
                return res;
            }else if(electronicArr.includes(elem.category)){
                const res = await electronicCollection.aggregate(query(elem._id,elem.category));
                return res;
            }else{
                const res = await mobileCollection.aggregate(query(elem._id,elem.category));
                return res;
            }
        }))
        const specialProdItems = data.flat();
        if(data){
            res.json({specialProdItems})
        }else{
            res.json({msg:"data is no more.."})
        }
    } catch (error) {
        res.json({e:error});
    }  
})
//payment gateway

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

app.post("/payment/checkout",async(req,res)=>{
    const {totalAmount,invoiceNo} = req.body;
    const amount = parseFloat(totalAmount.toFixed(2));

    var options = {
        amount: amount * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: invoiceNo+""
    };
    await instance.orders.create(options, function(err, order) {
        if(order){
            res.json({orderId:order.id,key:process.env.RAZORPAY_API_KEY});
        }else if(err){
            console.log(err)
            res.send(err)
        }else{
            console.log("something wrong");
        }
    });
})
app.post("/payment/verification",async (req, res) => {
    const {response,invoiceNo,selectedAdd,orderL,user} =  req.body;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const insertData = await userCollection.updateOne({email:user},{$push:{
        orderList:{
           address:selectedAdd,
           userOrders:orderL,
           invoiceNo:invoiceNo,
           orderId:razorpay_order_id,
           invoiceDate:new Date().toLocaleString(),
           orderStatus:"Order Confirmed" 
        }
    }});
    res.json({success:true,insertData:insertData.acknowledged});
  } else {
    res.status(400).json({
      success: false,
    });
  }
})
app.get("/user/orderInvoice",async(req,res)=>{
    const order = await userCollection.findOne(
        {email:req.query.userEmail, "orderList.invoiceNo": req.query.invoiceNo},
        {"orderList.$": 1, _id: 0}
    );
    // const {orderList} = user;
    if(order){
        return res.json({order});
    }
    return res.json({fail:true});
    // const order = orderList.filter((obj)=> obj.invoiceNo === +req.query.invoiceNo);
})

app.post("/productOrderPage",async(req,res)=>{
    const {invoiceNo,userEmail} =req.body;
    try {
        const orderData = await userCollection.findOne({email:userEmail,"orderList.invoiceNo": Number(invoiceNo)},{"orderList.$":1,_id:0});

        if(!orderData){
            return res.json({fail:true});
        }

        res.json({orderData: orderData.orderList});
    } catch (error) {
        console.log(error);
        return res.json({fail:true});
    }
})

app.post("/cancelOrder",async(req,res)=>{
    const {invoiceNo,userEmail} = req.body;    
    
    try {
        const updateUserData = await userCollection.updateOne(
            {email:userEmail},
            {
                $set:{
                    "orderList.$[element].orderStatus" : 'Cancelled'
                }
            },
            {
                arrayFilters:[{"element.invoiceNo":Number(invoiceNo)}]
            }
        );
        if(updateUserData.modifiedCount>0){
            res.json({success:"Success to update order status"})
        }else{
            res.json({fail:"fail to update order status"})    
        }
    } catch (error) {
        console.log(error);
        res.json({fail:"error occur while updating order status"})
    }
})
app.listen(Port,()=>{
    console.log(`Server is listening at port ${Port}...`);
})