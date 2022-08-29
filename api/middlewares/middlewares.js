require("dotenv").config();
const jwt = require('jsonwebtoken')

exports.checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({msg: 'Acesso negado!'})
    }
    try{
        const secret = process.env.SECRET

        jwt.verify(token, secret)
        next()

    }catch(error){
        res.status(400).json({msg: 'Token inválido'})
    }
}

exports.CORS = function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  }