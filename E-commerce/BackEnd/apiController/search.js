const {electronicCollection,menCollection,mobileCollection,womenCollection,bagCollection,bookCollection} = require("../models/models");

async function searchCollection(req,res){
    const collectionArr = ["bag","book","men","man","boy","women","woman","girl","electronic","mobile"];
    let str = req.query.search;
    str = str.trim();
    newStr = str.split(" ");

    if(newStr.length>2){
        return;
    }else{
        newStr.map((elem)=>{
            if(elem[elem.length-1] =="s"){
                elem = elem.slice(0,elem.length-1);
            }
            if(collectionArr.includes(elem)){
                str = elem;
            }
        })
        // str = newStr[0];
        str = str.toLowerCase();
    }

    if(str[str.length-1] === "s"){
        str = str.slice(0,str.length-1);
    }
    let found;

    collectionArr.map((elem)=>{
        let  val = elem.search(str);
        if(val !== -1){
            found = true;
        }
        return val !== -1;
    })

    if(found){
        if(str[str.length-1] != "s"){
            str+="s"
        }
        switch(str){
            case "mans": case "mens": case "boys":
                try {
                    const result = await menCollection.find();
                    res.json(result);
                    return true;
                } catch (error) {
                    console.log(error);
                    res.json({error:error});
                    return false;
                }
            case "womens": case "womans": case "girls":
                try {
                    const result = await womenCollection.find();
                    res.json(result);
                    return true;
                } catch (error) {
                    console.log(error);
                    res.json({error:error});
                    return false;
                }
            case "bags":
                try {
                    const result = await bagCollection.find();
                    res.json(result);
                    return true;
                } catch (error) {
                    console.log(error);
                    res.json({error:error});
                    return false;
                }
            case "books":
                try {
                    const result = await bookCollection.find();
                    res.json(result);
                    return true;
                } catch (error) {
                    console.log(error);
                    res.json({error:error});
                    return false;
                }
            case "electronics":
                try {
                    const result = await electronicCollection.find()
                    res.json(result);
                    return true;
                } catch (error) {
                    console.log(error);
                    res.json({error:error});
                    return false;
                }
            case "mobiles":
                try {
                    const result = await mobileCollection.find()
                    res.json(result);
                    return true;
                } catch (error) {
                    console.log(error);
                    res.json({error:error});
                    return false;
                }
            default:
                return false;    
        }
    }else{
        return false;
    }
}

async function searchCategory(req,res){
    const menWomenArr = ["shirt","shoe","tShirt","tshirt","t-Shirt","t-shirt","t Shirt","t shirt","jean","blazer","jacket","saree","top","lehenga"];
    const electronicArr = ["television","headphone","speaker","gamingConsole","laptop"];
    const mobileArr = ["samsung","vivo","realme","poco","iPhone"];

    let str = req.query.search;
    str = str.trim();
    let newStr,str1,str2,str3,str4;

    if(str.includes("t shirts")){
        str1 = str.split(" ")[0];
        str2 = str.split(" ")[1];
        str3 = str.split(" ")[2];
        str4 = str.split(" ")[3];
        str1 = str1+str2;
        newStr  = str1+" "+str3+" "+str4;    
    }else{
        str1 = str.split(" ")[0];
        str2 = str.split(" ")[1];
        str3 = str.split(" ")[2];
        newStr  = str1+" "+str2+" "+str3;
    }
    //jackets,jeans,shirts
    if(newStr.includes("for")){
        const st = newStr.split(" ");
        let lastW = st[st.length-1];
        let firstW = st[0];
        if(firstW[firstW.length-1] != "s"){
            firstW+="s";
        }
        if(lastW[lastW.length-1] != "s"){
            lastW+="s";
        }

        if(lastW == "mens" || lastW =="mans" || lastW == "boys"){
            if(str1[str1.length-1] != "s"){
                str1+="s";
            }
            if(firstW == "bags"){
                try {
                    const result = await bagCollection.findOne({"category":"menBags"});
                    res.json(result);
                    return true;
                } catch (error) {
                    console.log(error);
                    res.json({error:error});
                    return false;
                }
            }else{
                if(str1 == "tshirts" || str1 == "t-shirts" || str1 == "tShirts"){
                    try {
                        const result = await menCollection.findOne({"category":"tShirtsMen"});
                        res.json(result);
                        return true;
                    } catch (error) {
                    console.log(error);
                        res.json({error:error});
                        return false;
                    }
                }else{
                    try {
                        const result = await menCollection.findOne({"category":`${str1}Men`});
                        res.json(result);
                        return true;
                    } catch (error) {
                    console.log(error);
                        res.json({error:error});
                        return false;
                    }
                }
            }
        }else if(lastW == "womens" || lastW == "womans" || lastW == "girls"){
            if(str1[str1.length-1] != "s"){
                str1+="s";
            }
            if(firstW == "bags"){
                try {
                    const result = await bagCollection.findOne({"category":"womenBags"});
                    res.json(result);
                    return true;
                } catch (error) {
                    console.log(error);
                    res.json({error:error});
                    return false;
                }
            }else{
                switch(str1){
                    case "jackets": 
                    case "shirts": 
                    case "jeans":
                        try {                            
                            const result1 = await womenCollection.findOne({"category":`${str1}Women`});
                            res.json(result1);
                            return true;
                        } catch (error) {
                    console.log(error);
                        
                            res.json({error:error});
                            return false;
                        }
                    default:
                        try {                                
                            const result2 = await womenCollection.findOne({"category":`${str1}`});
                            res.json(result2);
                            return true;
                        } catch (error) {
                    console.log(error);
                           
                            res.json({error:error});
                            return false;
                        }
                    }
            }
        }
        return false;
    }else{
        // let newStr2;
        str = str.toLowerCase();
        let newStr = str.split(" ");
        // newStr2 = str.split(" ")[0].toLowerCase();
        // let newStr4 = str.split(" ")[1].toLowerCase();

        if(newStr.length>2){
            return;
        }

        let found,subCategory ="",subCategoryElem="";
        let x=[];
        newStr.map((elem)=>{
            if(elem[elem.length-1]=="s"){
                x.push(elem.slice(0,elem.length-1));
            }else{
                x.push(elem);
            }
        })
        newStr.length =0;
        newStr.push(...x);

            newStr.map((st)=>{
                if(menWomenArr.includes(st)){
                    subCategory = "menWomen"
                    subCategoryElem = st+"s";
                    found = true;
                    return;
                }
            })

        if(!found){
            if(newStr.includes("gaming") || newStr.includes("console") || newStr.includes("gamingconsole") || newStr.includes("gaming console")){
                subCategory = "electronic";
                subCategoryElem = "gamingConsoles";
                found = true;
            }else{                
                newStr.map((st)=>{
                    if(electronicArr.includes(st)){
                        subCategory = "electronic";
                        subCategoryElem = st+"s";
                        found = true;
                        return;
                    }
                })
            }
        }
        if(!found){
            if(newStr.includes("iphone") || newStr.includes("iPhone") || newStr.includes("Apple") || newStr.includes("apple")){
                subCategory = "mobile";
                subCategoryElem = "iPhone";
            }else{
                newStr.map((st)=>{
                    if(mobileArr.includes(st)){
                        subCategory = "mobile";
                        subCategoryElem = st;
                        found = true;
                        return;
                    }
                }) 
            }
        }

        if(found && subCategory !="" && subCategoryElem!=""){
            switch(subCategory){
                case "menWomen":
                    if(subCategoryElem == "sarees" || subCategoryElem == "lehengas" || subCategoryElem == "tops"){
                        try {
                            const result = await womenCollection.findOne({"category":`${subCategoryElem}`})
                            res.json(result);
                            return true;
                        } catch (error) {
                    console.log(error);
                        
                            res.json({error:error});
                            return false;
                        }
                    }else{
                        try {
                            if(subCategoryElem == "t shirts" || subCategoryElem == "t-shirts" || subCategoryElem == "tShirts" || subCategoryElem == "tshirts" ){
                                const result = await menCollection.findOne({"category":"tShirtsMen"});
                                res.json(result);
                                return true;
                            }else{
                                const result = await menCollection.findOne({"category":`${subCategoryElem}Men`});
                                res.json(result);
                                return true;
                            }
                        } catch (error) {
                    console.log(error);
                           
                            res.json({error:error});
                            return false;
                        }
                    }
                case "electronic":
                    try {
                        const result1 = await electronicCollection.findOne({"category":`${subCategoryElem}`})
                        res.json(result1);
                        return true;
                    } catch (error) {
                    console.log(error);
                        
                        res.json({error:error});
                        return false;
                    }
                case "mobile":
                    try {
                        const result2 = await mobileCollection.findOne({"category":`${subCategoryElem}`})
                        res.json(result2);
                        return true;
                    } catch (error) {
                    console.log(error);
                       
                        res.json({error:error})
                        return false;
                    }  
                    default:
                        return false;  
            }
        }else{
            return false;
        }
    }

}
  
async function prodComName(req,res){
    const electronicArr = ["televisions","tvs","headphones","speakers","gamingConsoles","gaming","console","laptops"];
    const mobileArr = ["samsung","vivo","realme","poco","iphone"];
    const menWomenArr = ["shirts","shoes","tShirts","tshirts","t-Shirts","t-shirts","t Shirts","t shirts","jeans","blazers","jackets","sarees","tops","lehengas"];

    let str = req.query.search;
    let found = false;
    let newStr = str;
    newStr = newStr.toLowerCase();

    if(newStr.includes("men") || newStr.includes("mens") || newStr.includes("man") || newStr.includes("mans") || newStr.includes("boy") || newStr.includes("boys") 
    || newStr.includes("shoe") || newStr.includes("shoes") || newStr.includes("blazer") || newStr.includes("blazers") || newStr.includes("sneaker") || newStr.includes("sneakers")
    || newStr.includes("tShirts") || newStr.includes("tshirts") || newStr.includes("t-Shirts") || newStr.includes("t-shirts") || newStr.includes("t Shirts") || newStr.includes("t shirts")

    || (newStr.includes("jeans") && newStr.includes("men")) || (newStr.includes("jeans") && newStr.includes("man")) || (newStr.includes("jeans") && newStr.includes("boy"))
    || (newStr.includes("jeans") && newStr.includes("mens")) || (newStr.includes("jeans") && newStr.includes("mans")) || (newStr.includes("jeans") && newStr.includes("boys"))
    || (newStr.includes("jean") && newStr.includes("mens")) || (newStr.includes("jean") && newStr.includes("mans")) || (newStr.includes("jean") && newStr.includes("boys"))

    || (newStr.includes("shirts") && newStr.includes("men")) || (newStr.includes("shirts") && newStr.includes("man")) || (newStr.includes("shirts") && newStr.includes("boy"))
    || (newStr.includes("shirts") && newStr.includes("mens")) || (newStr.includes("shirts") && newStr.includes("mans")) || (newStr.includes("shirts") && newStr.includes("boys"))
    || (newStr.includes("shirt") && newStr.includes("mens")) || (newStr.includes("shirt") && newStr.includes("mans")) || (newStr.includes("shirt") && newStr.includes("boys"))

    || (newStr.includes("jackets") && newStr.includes("men")) || (newStr.includes("jackets") && newStr.includes("man")) || (newStr.includes("jackets") && newStr.includes("boy"))
    || (newStr.includes("jackets") && newStr.includes("mens")) || (newStr.includes("jackets") && newStr.includes("mans")) || (newStr.includes("jackets") && newStr.includes("boys"))
    || (newStr.includes("jacket") && newStr.includes("mens")) || (newStr.includes("jacket") && newStr.includes("mans")) || (newStr.includes("jacket") && newStr.includes("boys"))
    )
    {        
        newStr.split(" ").map(async(elem)=>{
            if(elem[elem.length-1] !="s"){
                elem = elem+"s";
            }
            if(menWomenArr.includes(elem)){
                if(elem == "tshirts" || elem == "t-Shirts" || elem == "t-shirts" || elem == "t Shirts" || elem == "t shirts" ){
                    elem = "tShirts";
                }
                elem = elem+"Men";
                let arr=[];
                try {
                    const result = await menCollection.findOne({category:elem},{products:1,_id:0,sale:1})           
                    str = str.toLowerCase();
                    const words = str.split(" ");
                    const category = elem;
                    const sale = result.sale;
                    delete result["sale"];
                    result.products.forEach((elem)=>{
                        const compareString = elem.name.toLowerCase();
                        const allWordsPresent = words.every((st) => compareString.includes(st));

                        if(allWordsPresent){
                            elem.category = category;
                            elem.sale = sale;
                            arr.push(elem);
                        }
                    })
                    if(result.length==0){
                        found = false;
                    }else{
                        res.json(arr);
                        found = true;
                    }
                    return;
                } catch (error) {
                    console.log(error);
                        res.json({error});
                }
            }
        })
    }

    if(!found){
        if(newStr.includes("women") || newStr.includes("womens") || newStr.includes("woman") || newStr.includes("womans") || newStr.includes("girl") || newStr.includes("girls") 
        || newStr.includes("saree") || newStr.includes("sarees") || newStr.includes("top") || newStr.includes("tops") || newStr.includes("lehenga") || newStr.includes("lehengas")
        || (newStr.includes("jeans") && newStr.includes("women")) || (newStr.includes("jeans") && newStr.includes("woman")) || (newStr.includes("jeans") && newStr.includes("girl"))
        || (newStr.includes("jeans") && newStr.includes("womens")) || (newStr.includes("jeans") && newStr.includes("womans")) || (newStr.includes("jeans") && newStr.includes("girls"))
        || (newStr.includes("jean") && newStr.includes("womens")) || (newStr.includes("jean") && newStr.includes("womans")) || (newStr.includes("jean") && newStr.includes("girls"))
    
        || (newStr.includes("shirts") && newStr.includes("women")) || (newStr.includes("shirts") && newStr.includes("woman")) || (newStr.includes("shirts") && newStr.includes("girl"))
        || (newStr.includes("shirts") && newStr.includes("womens")) || (newStr.includes("shirts") && newStr.includes("womans")) || (newStr.includes("shirts") && newStr.includes("girls"))
        || (newStr.includes("shirt") && newStr.includes("womens")) || (newStr.includes("shirt") && newStr.includes("womans")) || (newStr.includes("shirt") && newStr.includes("girls"))

        || (newStr.includes("jackets") && newStr.includes("women")) || (newStr.includes("jackets") && newStr.includes("woman")) || (newStr.includes("jackets") && newStr.includes("girl"))
        || (newStr.includes("jackets") && newStr.includes("womens")) || (newStr.includes("jackets") && newStr.includes("womans")) || (newStr.includes("jackets") && newStr.includes("girls"))
        || (newStr.includes("jacket") && newStr.includes("womens")) || (newStr.includes("jacket") && newStr.includes("womans")) || (newStr.includes("jacket") && newStr.includes("girls"))
        )
        {
            newStr.split(" ").map(async(elem)=>{
                if(elem[elem.length-1] !="s"){
                    elem = elem+"s";
                }
                if(menWomenArr.includes(elem)){
                    if(elem == "jackets"){
                        elem = elem+"Women";
                    }
                    if(elem == "jeans"){
                        elem = elem+"Women";
                    }
                    if(elem == "shirts"){
                        elem = elem+"Women";
                    }
                    let arr=[];
                    try {
                        const result = await womenCollection.findOne({category:elem},{products:1,_id:0})           
                        str = str.toLowerCase();
                        const words = str.split(" ");
                        result.products.forEach((elem)=>{
                            const compareString = elem.name.toLowerCase();
                            const allWordsPresent = words.every((st) => compareString.includes(st));
    
                            if(allWordsPresent){
                                arr.push(elem);
                            }
                        })
                        if(result.length==0){
                            found = false;
                        }else{
                            res.json(arr);
                            found = true;
                        }
                        return;
                    } catch (error) {
                    console.log(error);
                            res.json({error});
                    }
                }
            })
        }
    }


    if(!found){
        if(newStr.includes("ps5") || newStr.includes("playstation") || newStr.includes("ps4")){
            let arr=[];
            try {
                const result = await electronicCollection.findOne({category:"gamingConsoles"},{products:1,_id:0,sale:1})           
                str = str.toLowerCase();
                const words = str.split(" ");
                const category = "gamingConsoles";
                const sale = result.sale;

                delete result["sale"];
                result.products.forEach((obj)=>{
                    const compareString = obj.name.toLowerCase();
                    const allWordsPresent = words.every((st) => compareString.includes(st));

                    if(allWordsPresent){
                        arr.push(obj);
                    }
                })
                if(result.products.length==0){
                    found = false;
                }else{
                    const responseArr = arr.map(obj => (
                        {
                        _id:+obj.id,    
                        category: category,
                        sale: sale,
                        name: obj.name,
                        img: obj.img,
                        keyfeatures: obj.keyfeatures,
                        rating: obj.rating,
                        reviews: obj.reviews,
                        price: obj.price
                        // Add other properties you want to include in the response
                    }));
                
                    res.json(responseArr);
                    found = true;
                }
                return;
            } catch (error) {
                console.log(error);
                res.json({error});
            }
        }else{
            newStr.split(" ").map(async(elem)=>{
                if(elem[elem.length-1] !="s"){
                    elem = elem+"s";
                }
                if(electronicArr.includes(elem)){
                    if(elem == "gamings" || elem == "consoles"){
                        elem = "gamingConsoles";
                    }
                    if(elem == "tvs"){
                        elem = "televisions";
                    }
                    let arr=[];
                    try {
                        const result = await electronicCollection.findOne({category:elem},{products:1,_id:0,sale:1})           
                        str = str.toLowerCase();
                        const words = str.split(" ");
                        const category = elem;
                        const sale = result.sale;

                        // delete result["sale"];
                        result.products.forEach((obj)=>{
                            const compareString = obj.name.toLowerCase();
                            const allWordsPresent = words.every((st) => compareString.includes(st));

                            if(allWordsPresent){
                                arr.push(obj);
                            }
                        })
                        if(result.products.length==0){
                            found = false;
                        }else{
                            const responseArr = arr.map(obj => (
                                {
                                _id:+obj.id,    
                                category: category,
                                sale: sale,
                                name: obj.name,
                                img: obj.img,
                                keyfeatures: obj.keyfeatures,
                                rating: obj.rating,
                                reviews: obj.reviews,
                                price: obj.price
                                // Add other properties you want to include in the response
                            }));
                        
                            res.json(responseArr);
                            found = true;
                        }
                        return;
                    } catch (error) {
                    console.log(error);
                            res.json({error});
                    }
                }
            })
        }
    }

    if(!found){
        newStr.split(" ").map(async(elem)=>{
            if(elem[elem.length-1] =="s"){
                elem = elem.slice(0,elem.length-1);
            }
            if(mobileArr.includes(elem)){
                let arr=[];
                elem=="iphone"?elem="iPhone":elem;

                try {                    
                    const result = await mobileCollection.findOne({category:elem},{products:1,_id:0,sale:1})           
                    str = str.toLowerCase();
                    const words = str.split(" ");
                    const category = elem;
                    const sale = result.sale;

                    result.products.forEach((elem)=>{
                        const compareString = elem.name.toLowerCase();
                        const allWordsPresent = words.every((st) => compareString.includes(st));

                        if(allWordsPresent){
                            arr.push(elem);
                        }
                    })
                    if(result.products.length==0){
                        found = false;
                    }else{
                        const responseArr = arr.map(obj => (
                            {
                            _id:+obj.id,    
                            category: category,
                            sale: sale,
                            name: obj.name,
                            img: obj.img,
                            keyfeatures: obj.keyfeatures,
                            rating: obj.rating,
                            reviews: obj.reviews,
                            price: obj.price,
                            companyName:obj.companyName
                            // Add other properties you want to include in the response
                        }));
                        res.json(responseArr);
                        found = true;
                    }
                    return;
                } catch (error) {
                    console.log(error);
                        res.json({error});
                }
            }
        })
    }
    if(!found){
        if(str.includes("bag") || str.includes("bags")){
            let arr=[];
            try {
                const result = await bagCollection.findOne({category:elem},{products:1,_id:0})           
                str = str.toLowerCase();
                const words = str.split(" ");
                result.products.forEach((elem)=>{
                    const compareString = elem.name.toLowerCase();
                    const allWordsPresent = words.every((st) => compareString.includes(st));

                    if(allWordsPresent){
                        arr.push(elem);
                    }
                })
                if(result.length==0){
                    found = false;
                }else{
                    res.json(arr);
                    found = true;
                }
                return;
            } catch (error) {
                console.log(error);
                    res.json({error});
            }
        }
    }
    if(!found){
        if(str.includes("book") || str.includes("books")){
            let arr=[];
            try {
                const result = await bookCollection.findOne({category:elem},{products:1,_id:0})           
                str = str.toLowerCase();
                const words = str.split(" ");
                result.products.forEach((elem)=>{
                    const compareString = elem.name.toLowerCase();
                    const allWordsPresent = words.every((st) => compareString.includes(st));

                    if(allWordsPresent){
                        arr.push(elem);
                    }
                })
                if(result.length==0){
                    found = false;
                }else{
                    res.json(arr);
                    found = true;
                }
                return;
            } catch (error) {
                console.log(error);
                    res.json({error});
            }
        }
    }
}
async function search(req,res){
    const bool = await searchCollection(req,res);

    if(bool){
        return;
    }else{
      const bool2 = await searchCategory(req,res);

      if(bool2){
            return;
        }else{
            prodComName(req,res);
        }
    }
}

module.exports = search;