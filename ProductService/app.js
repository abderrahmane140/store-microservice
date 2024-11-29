require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const productRouter = require('./routes/products')

const app = express();

app.use(express.json());

//route
app.use('/api/products',productRouter)

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(process.env.PORT,() => {
        console.log("conncet to db & listen to port ",process.env.PORT);
    })   
}).catch((err)=>{
    console.log(err);
})
