const Product = require('../models/product');

const getAllProductsStatic= async(req,res)=>{
    

  const products  = await Product.find({}).select("name price").limit(10).skip(5);
    res.status(200).json({products, nbHits: products.length});
}
const getAllProducts= async(req,res)=>{

const {featured,company,name,sort,fields} = req.query;
const queryObject = {};
if(featured){
    queryObject.featured = featured === 'true' ? true : false;
}
if(company){
    queryObject.company  = company;
}
if(name){
    queryObject.name  = {$regrex :name , $options : 'i'} ;
}

let result = Product.find(queryObject);
if(sort){
    const sortList = sort.split(',').join(" ");
    result= result.sort(sortList);
}
else{
    result = result. sort('createdAt');
}

if(fields){
    const fieldList= fields.split(',').join(" ");
    result = result.select(fieldList);
}
const pageno = Number(req.query.page)||1;
const limitno= Number(req.query.limit)||10;
const skipno= (pageno-1)*limitno;
result= result.skip(skipno).limit(limitno);

const products= await result;




    
    res.status(200).json({products});
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}