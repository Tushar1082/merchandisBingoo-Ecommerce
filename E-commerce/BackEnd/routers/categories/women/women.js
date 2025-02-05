const router = require("express").Router();
const {womenCollection} = require("../../../models/models");
const auth = require("../../../middleware/auth");
const isSignUp = require("../../../middleware/isSignup");

router.get("/sarees",isSignUp,auth,async(req,res)=>{
    try {
        const saree = await womenCollection.findOne({category:"sarees"});
        // console.log(saree);
        if(saree){
            res.json({saree});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/jackets",isSignUp,auth,async(req,res)=>{
    try {
        const jackets = await womenCollection.findOne({category:"jacketsWomen"});
        // console.log(saree);
        if(jackets){
            res.json({jackets});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/jeans",isSignUp,auth,async(req,res)=>{
    try {
        const jeans = await womenCollection.findOne({category:"jeansWomen"});
        // console.log(saree);
        if(jeans){
            res.json({jeans});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/tops",isSignUp,auth,async(req,res)=>{
    try {
        const tops = await womenCollection.findOne({category:"tops"});
        // console.log(saree);
        if(tops){
            res.json({tops});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/shirts",isSignUp,auth,async(req,res)=>{
    try {
        const shirts = await womenCollection.findOne({category:"shirtsWomen"});
        // console.log(saree);
        if(shirts){
            res.json({shirts});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/lehengas",isSignUp,auth,async(req,res)=>{
    try {
        const lehengas = await womenCollection.findOne({category:"lehengas"});
        // console.log(saree);
        if(lehengas){
            res.json({lehengas});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})

module.exports = router;