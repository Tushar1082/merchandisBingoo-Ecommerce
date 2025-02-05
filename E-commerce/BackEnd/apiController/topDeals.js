const {electronicCollection,menCollection,mobileCollection,womenCollection,specialProductCollection, userCollection} = require("../models/models");

async function topDeals(req,res){
    const {SpecialProduct,user} = req.query;
    if(SpecialProduct==="true"){
        try{
            const specialProduct = await specialProductCollection.find();
            const userData = await userCollection.findOne({email:user},{cartList:1,wishList:1,email:1,_id:0});

            const {cartList,wishList,email} = userData;

            if(specialProduct){
                res.json({specialProduct,cartData:cartList,likeData:wishList,email});
            }else{
                res.json({msg:"Special products data is not exist in database"})
            }
        }catch(e){
            res.json({err:e});
        }
    }else{
        try {        
            const topElectronics = await electronicCollection.aggregate([
                { $unwind: "$products" },
                { $sample: { size: 20 } },
                {
                    $group: {
                        _id: "$_id",
                        sale: { $first: "$sale" },
                        category:{$first:"$category"},
                        products: { $push: "$products" }
                    }
                }
            ]).exec();
           const topMens = await menCollection.aggregate([
            { $unwind: "$products" },
            { $sample: { size: 20 } },
            {
                $group: {
                    _id: "$_id",
                    sale: { $first: "$sale" },
                    category:{$first:"$category"},
                    products: { $push: "$products" }
                }
            }
            ]).exec();
           const topWomens = await womenCollection.aggregate([
            { $unwind: "$products" },
            { $sample: { size: 20 } },
            {
                $group: {
                    _id: "$_id",
                    sale: { $first: "$sale" },
                    category:{$first:"$category"},
                    products: { $push: "$products" }
                }
            }
            ]).exec();
           const topMobiles = await mobileCollection.aggregate([
            { $unwind: "$products" },
            { $sample: { size: 20 } },
            {
                $group: {
                    _id: "$_id",
                    sale: { $first: "$sale" },
                    category:{$first:"$category"},
                    products: { $push: "$products" }
                }
            }
            ]).exec();
           res.json({topElectronics,topMens,topWomens,topMobiles});
        } catch (error) {
           res.json({error}); 
        }
}
}
module.exports = topDeals;