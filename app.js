require('dotenv').config();
require ('express-async-errors');
const express = require('express');
const app= express();
const connectDB = require('./db/connect');
const notFoundMiddleWare  = require('./middleware/not-found');
const errorMiddleware= require('./middleware/error-handler');
const url = process.env.MONGO_URL;
const productsRouter= require('./routes/products')
app.use (express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.send('<h1>Store Api</h1> <a href="/api/v1/products">Products route </a>')
})
app.use('/api/v1/products' ,productsRouter);
app.use(notFoundMiddleWare);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

const start = async()=>{
    try{
 //connectDb
 await connectDB(url);
 app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}...`);
 })
    }
    catch(error){
     console.log(error);
    }
}

start();







