require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = await jwt.verify(token,process.env.SECRET_KEY);

        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ Unauthorized: true });
    }
}
module.exports = auth;