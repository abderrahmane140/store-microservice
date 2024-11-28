const  User = require('../model/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '3d'})
}


const loginUser = async (req,res) => {
    const {email, password} = req.body

    try{
        const user = await User.login(email,password)
        const username = user.username
        const avtare = user.avtare
        const id = user._id

        //create a token
        const token = createToken(user._id)
        
        res.status(200).json({email, username, token ,avtare,id })
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const signupUser = async (req, res) => {
    const {email, password, username} = req.body

    try{
        const user = await User.signup(email,password,username);
        const avtare = user.avtare
        const id = user._id
        //create a token
        const token = createToken(user._id);

        res.status(200).json({email, username, token , avtare , id})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUser, signupUser}