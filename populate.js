

require('dotenv').config();
const { connect } = require('mongoose');
const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonproducts= require('./products.json');

const start =async ()=>{
    try{
       await connectDB(process.env.MONGO_URL);
      
       await Product.deleteMany();
       await Product.create(jsonproducts);
        console.log('success');
        process.exit(0);
    }
    catch(error){
      console.log(error); 
      process.exit(1);
    }
}

start();









