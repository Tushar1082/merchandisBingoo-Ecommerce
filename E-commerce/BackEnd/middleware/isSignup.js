function isSignUp(req,res,next){
    if(req.query.user != "null"){
        next();
    }
    else{
        res.json({notSignUp:true});
    }
}
module.exports = isSignUp;