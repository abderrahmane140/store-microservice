require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const userRouter = require('./routes/user')

const app = express()

app.use(express.json())


//routes
app.use('/api/user',userRouter)


mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT,() => {
        console.log('conncet to db & listen on the port ',process.env.PORT);
    })
}).catch((err) => {
    console.log(err);
})