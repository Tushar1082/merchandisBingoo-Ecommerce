const { mobileCollection, bagCollection, bookCollection, electronicCollection, menCollection, womenCollection} = require("../models/models");

function query(id,category){
    return [
     { $match: { "category":category } },
     { $unwind: "$products" },  // Deconstruct the array
     {
         $match: {
           "products._id":+id
         }
     },
     {
         $replaceRoot: { newRoot: "$products" }
     }
    ]
 }
 async function getBuyPage(req,res){
    const bag =["womenBags","menBags"];
    const book =["books"];
    const electronic = ["televisions","headphones","speakers","gamingConsoles","laptops"];
    const men =["shirtsMen","shoesMen","tShirtsMen","jeansMen","blazersMen","jacketsMen"];
    const women = ["sarees","jacketsWomen","jeansWomen","tops","shirtsWomen","lehengas"];
    const mobile = ["samsung","vivo","realme","poco","iPhone"];

    if(bag.includes(req.query.category)){    
        try {
            const product = await bagCollection.aggregate(query(req.query.id,req.query.category)).exec()
            const similarProduct = await bagCollection.aggregate([
                {$match:{
                    "category":req.query.category
                }},
                { $unwind: "$products" },
                { $sample: { size: 10 } },
                {
                    $group: {
                        _id: "$_id",
                        sale: { $first: "$sale" },
                        products: { $push: "$products" }
                    }
                }
            ]).exec();

            if(product[0] && similarProduct){
                res.json({product:product[0],similar:similarProduct});
            }else{
                res.json({msg:"products is no more.."})
            }
        } catch (error) {
            res.json({e:error})
        }
    }
    else if(book.includes(req.query.category)){    
        try {
            const product = await bookCollection.aggregate(query(req.query.id,req.query.category)).exec();
            const similarProduct = await bookCollection.aggregate([
                {$match:{
                    "category":req.query.category
                }},
                { $unwind: "$products" },
                { $sample: { size: 10 } },
                {
                    $group: {
                        _id: "$_id",
                        sale: { $first: "$sale" },
                        products: { $push: "$products" }
                    }
                }
            ]).exec();

            if(product[0] && similarProduct){
                res.json({product:product[0],similar:similarProduct});
            }else{
                res.json({msg:"products is no more.."})
            }
        } catch (error) {
            res.json({e:error})
        }
    }
    else if(electronic.includes(req.query.category)){
        try {
            const product = await electronicCollection.aggregate(query(req.query.id,req.query.category)).exec()
            const similarProduct = await electronicCollection.aggregate([
                {$match:{
                    "category":req.query.category
                }},
                { $unwind: "$products" },
                { $sample: { size: 10 } },
                {
                    $group: {
                        _id: "$_id",
                        sale: { $first: "$sale" },
                        products: { $push: "$products" }
                    }
                }
            ]).exec();

            if(product[0] && similarProduct){
                res.json({product:product[0],similar:similarProduct});
            }else{
                res.json({msg:"products is no more.."})
            }
        } catch (error) {
            res.json({e:error})
        }
    }
    else if(men.includes(req.query.category)){  

        try {
            const product = await menCollection.aggregate(query(req.query.id,req.query.category)).exec();
            const similarProduct = await menCollection.aggregate([
                {$match:{
                    "category":req.query.category
                }},
                { $unwind: "$products" },
                { $sample: { size: 10 } },
                {
                    $group: {
                        _id: "$_id",
                        sale: { $first: "$sale" },
                        products: { $push: "$products" }
                    }
                }
            ]).exec();

            if(product[0] && similarProduct){
                res.json({product:product[0],similar:similarProduct});
            }else{
                res.json({msg:"products is no more.."})
            }
        } catch (error) {
            res.json({e:error})
        }
    }else if(women.includes(req.query.category)){
        try {
            const product = await womenCollection.aggregate(query(req.query.id,req.query.category)).exec();
            const similarProduct = await womenCollection.aggregate([
                {$match:{
                    "category":req.query.category
                }},
                { $unwind: "$products" },
                { $sample: { size: 10 } },
                {
                    $group: {
                        _id: "$_id",
                        sale: { $first: "$sale" },
                        products: { $push: "$products" }
                    }
                }
            ]).exec();

            if(product[0] && similarProduct){
                res.json({product:product[0],similar:similarProduct});
            }else{
                res.json({msg:"products is no more.."})
            }
        } catch (error) {
            res.json({e:error})
        }
    }
    else if(mobile.includes(req.query.category)){    
        try {
            const product = await mobileCollection.aggregate(query(req.query.id,req.query.category)).exec();
            const similarProduct = await mobileCollection.aggregate([
                {$match:{
                    "category":req.query.category
                }},
                { $unwind: "$products" },
                { $sample: { size: 10 } },
                {
                    $group: {
                        _id: "$_id",
                        sale: { $first: "$sale" },
                        products: { $push: "$products" }
                    }
                }
            ]).exec();

            if(product[0] && similarProduct){
                res.json({product:product[0],similar:similarProduct});
            }else{
                res.json({msg:"products is no more.."})
            }
        } catch (error) {
            res.json({e:error})
        }
    }
 }

 async function postBuyPage(req,res){
    const bag =["womenBags","menBags"];
    const book =["books"];
    const electronic = ["televisions","headphones","speakers","gamingConsoles","laptops"];
    const men =["shirtsMen","shoesMen","tShirtsMen","jeansMen","blazersMen","jacketsMen"];
    const women = ["sarees","jacketsWomen","jeansWomen","tops","shirtsWomen","lehengas"];
    const mobile = ["samsung","vivo","realme","poco","iPhone"];

    if(bag.includes(req.body.category)){    
        try {
            const insertReview = await bagCollection.updateOne({category:req.body.category,"products._id":req.body.id},{$push:{"products.$.reviews":req.body.sendRating}});

            if(insertReview){
                res.json({success:"Successfully inserted.."});
            }else{
                res.json({fail:"failed to insert.."})
            }
        } catch (error) {
            console.log(error);
            res.json({e:error})
        }
    }
    else if(book.includes(req.body.category)){    
        try {
            const insertReview = await bookCollection.updateOne({category:req.body.category,"products._id":req.body.id},{$push:{"products.$.reviews":req.body.sendRating}});
     
            if(insertReview){
                res.json({success:"Successfully inserted.."});
            }else{
                res.json({fail:"failed to insert.."})
            }
        } catch (error) {
            console.log(error);
            res.json({e:error})
        }
    }
    else if(electronic.includes(req.body.category)){
        try {
            const insertReview = await electronicCollection.updateOne({category:req.body.category,"products._id":req.body.id},{$push:{"products.$.reviews":req.body.sendRating}});

            if(insertReview){
                res.json({success:"Successfully inserted.."});
            }else{
                res.json({fail:"failed to insert.."})
            }
        } catch (error) {
            console.log(error);
            res.json({e:error})
        }
    }
    else if(men.includes(req.body.category)){  
        try {
            const insertReview = await menCollection.updateOne({category:req.body.category,"products._id":req.body.id},{$push:{"products.$.reviews":req.body.sendRating}});

            if(insertReview){
                res.json({success:"Successfully inserted.."});
            }else{
                res.json({fail:"failed to insert.."})
            }
        } catch (error) {
            console.log(error);
            res.json({e:error})
        }
    }else if(women.includes(req.body.category)){
        try {
            const insertReview = await womenCollection.updateOne({category:req.body.category,"products._id":req.body.id},{$push:{"products.$.reviews":req.body.sendRating}});

            if(insertReview){
                res.json({success:"Successfully inserted.."});
            }else{
                res.json({fail:"failed to insert.."})
            }
        } catch (error) {
            console.log(error);
            res.json({e:error})
        }
    }
    else if(mobile.includes(req.body.category)){    
        console.log("here");
        try {
            const insertReview = await mobileCollection.updateOne({category:req.body.category,"products._id":req.body.id},{$push:{"products.$.reviews":req.body.sendRating}});

            if(insertReview){
                res.json({success:"Successfully inserted.."});
            }else{
                res.json({fail:"failed to insert.."})
            }
        } catch (error) {
            console.log(error);
            res.json({e:error})
        }
    }
}
module.exports = {getBuyPage,postBuyPage};