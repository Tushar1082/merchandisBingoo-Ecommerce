const router = require("express").Router();
const {bookCollection} = require("../../../models/models");
const auth = require("../../../middleware/auth");
const isSignUp = require("../../../middleware/isSignup");

router.get("/books",isSignUp,auth,async(req,res)=>{
    try {
        const books = await bookCollection.findOne({category:"books"});
        if(books){
            res.json({books});
        }else{
            res.json({msg:"Data is no more"})
        }
    } catch (error) {
        res.json({e:error});
    }
})
module.exports = router;