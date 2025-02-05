const router = require("express").Router();
const {womenCollection, menCollection, electronicCollection,bagCollection, mobileCollection, bookCollection} = require("../../models/models");
const auth = require("../../middleware/auth");
const isSignUp = require("../../middleware/isSignup");

router.get("/women",isSignUp,auth,async(req,res)=>{
    try {        
        const women = await womenCollection.aggregate([
            {
                $project: {
                    category: 1,
                    img: 1,
                    sale: 1,
                    products: { $slice: ['$products', 8] }
                }
            }
        ]).exec();
          
        if(women){
            res.json({women});
        }else{
            res.json({msg:"data is no more"});
        }
    } catch (error) {
        res.json({msg:error});
    }
})

router.get("/bags",isSignUp,auth,async(req,res)=>{
    try {        
        const bags = await bagCollection.aggregate([
            {
                $project: {
                    category: 1,
                    img: 1,
                    sale: 1,
                    products: { $slice: ['$products', 8] }
                }
            }
        ]).exec();
        
        if(bags){
            res.json({bags});
        }else{
            res.json({msg:"data of bag is not exist"})
        }
    } catch (error) {
        res.json({e:error});
    }
})

router.get("/men",isSignUp,auth,async(req,res)=>{
    try {        
        const men = await menCollection.aggregate([
            {
                $project: {
                    category: 1,
                    img: 1,
                    sale: 1,
                    products: { $slice: ['$products', 8] }
                }
            }
        ]).exec();
        
        if(men){
            res.json({men});
        }else{
            res.json({msg:"data of bag is not exist"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/electronics",isSignUp,auth,async(req,res)=>{
    try {        
        const electronics = await electronicCollection.aggregate([
            {
                $project: {
                    category: 1,
                    img: 1,
                    sale: 1,
                    products: { $slice: ['$products', 8] }
                }
            }
        ]).exec();
        if(electronics){
            res.json({electronics});
        }else{
            res.json({msg:"data of bag is not exist"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/mobile",isSignUp,auth,async(req,res)=>{
    try {        
        const mobile = await mobileCollection.aggregate([
            {
                $project: {
                    category: 1,
                    img: 1,
                    sale: 1,
                    products: { $slice: ['$products', 8] }
                }
            }
        ]).exec();
        if(mobile){
            res.json({mobile});
        }else{
            res.json({msg:"data of bag is not exist"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/book",isSignUp,auth,async(req,res)=>{
    try {        
        const book = await bookCollection.aggregate([
            {
                $project: {
                    category: 1,
                    img: 1,
                    sale: 1,
                    products: { $slice: ['$products', 8] }
                }
            }
        ]).exec();

        if(book){
            res.json({book});
        }else{
            res.json({msg:"data of bag is not exist"})
        }
    } catch (error) {
        res.json({e:error});
    }
})

module.exports = router;