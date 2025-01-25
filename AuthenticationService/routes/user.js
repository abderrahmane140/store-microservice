const {loginUser, signupUser} = require('../controller/userController')
const express = require('express')

const router = express.Router()

//login route

router.post('/login',loginUser)

//signup routre

router.post('/signup',signupUser)


module.exports = router