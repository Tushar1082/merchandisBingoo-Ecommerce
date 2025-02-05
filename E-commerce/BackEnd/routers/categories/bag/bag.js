const router = require("express").Router();
const {bagCollection} = require("../../../models/models");
const auth = require("../../../middleware/auth");
const isSignUp = require("../../../middleware/isSignup");

router.get("/women",isSignUp,auth,async(req,res)=>{
    try {
        const womenBags = await bagCollection.findOne({category:"womenBags"});
        if(womenBags){
            res.json({womenBags});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
router.get("/men",isSignUp,auth,async(req,res)=>{
    try {
        const menBags = await bagCollection.findOne({category:"menBags"});
        if(menBags){
            res.json({menBags});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
module.exports = router;