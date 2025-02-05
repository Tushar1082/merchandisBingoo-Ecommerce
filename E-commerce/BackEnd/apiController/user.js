const {userCollection} = require("../models/models");
const bcryptjs = require("bcryptjs");

const userGet = async(req,res)=>{
    try {
        const user = await userCollection.findOne({email:req.query.user});
        
        if(user){
            res.json(user);
        }else{
            res.json({msg:"user is not exist"});
        }
    } catch (error) {
        console.log(error);
        res.json({e:"error from server"})
    }
}

const userPost = async(req,res)=>{
    if(req.body.invoiceNo){
        const {pdfUrl, userEmail, invoiceNo} = req.body;
        try {         
            const operation = await userCollection.updateOne(
                {email:userEmail},
                {
                    $set:{
                        "orderList.$[element].invoicePdf": pdfUrl
                    }
                },
                {
                    arrayFilters:[
                        {"element.invoiceNo":invoiceNo}
                    ]
                }
            );   
            if(operation.modifiedCount>0){
                return res.json({success:operation.acknowledged });
            }
            else{
                return res.json({fail:"fail to insert pdf link"})
            }
        } catch (error) {
            console.log(error);
            res.json({error:"Error comes while inserting pdf link"})
        }

    }else{
        try {
            const result = await userCollection.updateOne({email:req.query.user},{$push:{addAddressList:req.body}}) ;
    
            if(result){
                res.json({ok:"address is inserted"});
            }else{
                res.json({msg:"address is not inserted"});
            }
        } catch (error) {
            console.log(error);
            res.json({error:error});
        }
    }  
}

const userDelete = async(req,res)=>{
    try {
        const result = await userCollection.updateOne({email:req.query.user},{$pull:{addAddressList:req.body}}) ;

        if(result){
            res.json({ok:"address is deleted"});
        }else{
            res.json({msg:"address is not deleted"});
        }
    } catch (error) {
        res.json({error:error});
    }
}

const userPut = async(req,res)=>{
    const {profileImg,name,email,phoneNo,gender,newPass,isChangePass} = req.body;
    try {
        let document = {
            profileImg:profileImg,
            name:name,
            email:email,
            phoneNo:Number(phoneNo),
            gender:gender,
        }
        if(isChangePass){
            const salt = await bcryptjs.genSalt(5);
            document.password = await bcryptjs.hash(newPass,salt);
        }
        const result = await userCollection.updateOne(
            {email:req.query.user},
            {
                $set:document
            }
        ) ;

        if(result){
            res.json({success:"Your details are updated"});
        }else{
            res.json({fail:"Your details are not updated"});
        }
    } catch (error) {
        console.log(error);
        res.json({error:error});
    }
}

module.exports = {userGet,userPost,userPut,userDelete};