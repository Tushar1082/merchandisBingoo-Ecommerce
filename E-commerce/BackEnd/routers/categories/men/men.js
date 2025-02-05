const router = require("express").Router();
const {menCollection} = require("../../../models/models");
const auth = require("../../../middleware/auth");
const isSignUp = require("../../../middleware/isSignup");

router.get("/shirts",isSignUp,auth,async(req,res)=>{
    try {
        const shirts = await menCollection.findOne({category:"shirtsMen"});
        if(shirts){
            res.json({shirts});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/shoes",isSignUp,auth,async(req,res)=>{
    try {
        const shoes = await menCollection.findOne({category:"shoesMen"});
        if(shoes){
            res.json({shoes});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/tShirts",isSignUp,auth,async(req,res)=>{
    try {
        const tShirts = await menCollection.findOne({category:"tShirtsMen"});
        if(tShirts){
            res.json({tShirts});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/jeans",isSignUp,auth,async(req,res)=>{
    try {
        const jeans = await menCollection.findOne({category:"jeansMen"});
        if(jeans){
            res.json({jeans});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/blazers",isSignUp,auth,async(req,res)=>{
    try {
        const blazers = await menCollection.findOne({category:"blazersMen"});
        if(blazers){
            res.json({blazers});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/jackets",isSignUp,auth,async(req,res)=>{
    try {
        const jackets = await menCollection.findOne({category:"jacketsMen"});
        if(jackets){
            res.json({jackets});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})

module.exports = router;