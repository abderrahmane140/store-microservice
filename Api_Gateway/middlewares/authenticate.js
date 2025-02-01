require('dotenv').config();
const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];


    if(!token) {
        return res.status(401).json({error: "Unauthorized"})
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET)
        req.user = decoded;
        next();
    }catch(err) {
        return res.status(403).json({err: "Invalid token"})
    }
}

module.exports = authenticate;