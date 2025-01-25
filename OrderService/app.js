require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')

const orderRouter = require('./routes/orderRoute')
const app = express();

app.use(express.json())

//routes
app.use('/api/order', orderRouter)

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(process.env.PORT,()=>{
        console.log("conncet to db & listen to port",process.env.PORT); 
    })
})