const bcryptjs = require("bcryptjs");
const {userCollection} = require("../models/models");

const jwt = require("jsonwebtoken");

const loginPost=async(req,res)=>{
    try {
        const user = await userCollection.findOne({email:req.body.email}, {email: 1,name:1,password:1,profileImg:1,_id: 1 });
        if(user){
            const isMatch = await bcryptjs.compare(req.body.password,user.password);
            if(isMatch){
                const token =  jwt.sign({_id:user._id},process.env.SECRET_KEY);       
                const {name,email,profileImg} = user;
                res.json({name,email,profileImg,token}); // Send the data as JSON
            }else{
                const {email,name,profileImg} = user;
                res.json({wrongPass:"true",email,name,profileImg});
            }
        }
        else{
            res.status(404).json({message:"user is not exist"})
        }
    } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
}
module.exports = {loginPost};