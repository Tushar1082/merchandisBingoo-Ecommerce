const router = require("express").Router();
const {electronicCollection} = require("../../../models/models");
const auth = require("../../../middleware/auth");
const isSignUp = require("../../../middleware/isSignup");

router.get("/televisions",isSignUp,auth,async(req,res)=>{
    try {
        const televisions = await electronicCollection.findOne({category:"televisions"});
        if(televisions){
            res.json({televisions});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/headphones",isSignUp,auth,async(req,res)=>{
    try {
        const headphones = await electronicCollection.findOne({category:"headphones"});
        if(headphones){
            res.json({headphones});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/speakers",isSignUp,auth,async(req,res)=>{
    try {
        const speakers = await electronicCollection.findOne({category:"speakers"});
        if(speakers){
            res.json({speakers});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/gamingConsoles",isSignUp,auth,async(req,res)=>{
    try {
        const gamingConsoles = await electronicCollection.findOne({category:"gamingConsoles"});
        if(gamingConsoles){
            res.json({gamingConsoles});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/laptops",isSignUp,auth,async(req,res)=>{
    try {
        const laptops = await electronicCollection.findOne({category:"laptops"});
        if(laptops){
            res.json({laptops});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})

module.exports = router;