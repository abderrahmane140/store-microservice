const {loginUser, signupUser} = require('../controller/userController')
const express = require('express')

const router = express.Router()

//logom route

router.post('/login',loginUser)

//signup routre

router.post('/signup',signupUser)


module.exports = router