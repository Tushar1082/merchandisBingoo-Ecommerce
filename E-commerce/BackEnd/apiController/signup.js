const bcryptjs = require("bcryptjs");
const {userCollection} = require("../models/models");

const signupGet = async(req,res)=>{
    const users = await userCollection.find({},{email:1,_id:0});
    res.json(users);
}
const signupPost = async(req,res)=>
{
    const {user,profile} = req.body;
    try{
        const salt = await bcryptjs.genSalt(5);
        const hashPass = await bcryptjs.hash(user.password,salt);
        const newDoc = new userCollection({
            profileImg: profile,
            name: user.name,
            address: user.address,
            email: user.email,
            phoneNo: user.phoneNo,
            gender: user.gender,
            password: hashPass
        })
        const result = await newDoc.save();
        if(result){
            res.json({ success: "Signup successful" });
        }else{
            res.json({fail:"Signup is not successful"})
        }
    }catch(e){
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
module.exports={signupGet,signupPost};