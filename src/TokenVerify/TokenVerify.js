var jwt = require('jsonwebtoken');
require("dotenv").config();

const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.send({ Error : "Token not found"})
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        res.send({message:err})
        console.log(err)
    });
    next()
}
module.exports = verifyJWT;