const router = require("express").Router();
const {mobileCollection} = require("../../../models/models");
const auth = require("../../../middleware/auth");
const isSignUp = require("../../../middleware/isSignup");

router.get("/samsung",isSignUp,auth,async(req,res)=>{
    try {
        const samsung = await mobileCollection.findOne({category:"samsung"});
        if(samsung){
            res.json({samsung});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/vivo",isSignUp,auth,async(req,res)=>{
    try {
        const vivo = await mobileCollection.findOne({category:"vivo"});
        if(vivo){
            res.json({vivo});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/realme",isSignUp,auth,async(req,res)=>{
    try {
        const realme = await mobileCollection.findOne({category:"realme"});
        if(realme){
            res.json({realme});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/poco",isSignUp,auth,async(req,res)=>{
    try {
        const poco = await mobileCollection.findOne({category:"poco"});
        if(poco){
            res.json({poco});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/iPhone",isSignUp,auth,async(req,res)=>{
    try {
        const iPhone = await mobileCollection.findOne({category:"iPhone"});
        if(iPhone){
            res.json({iPhone});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
module.exports = router;