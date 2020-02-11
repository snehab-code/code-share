// const Token = require('../models/Token')
const jwt = require('jsonwebtoken')

module.exports.getAccess = (req,res) => {
    const secretKey = req.body.secret
    if (secretKey == process.env.ADMIN_PASS) {
        jwt.sign({
            admin: true,
            exp: Math.floor(Date.now()/1000 + 15000)
        }, process.env.TOKEN_SECRET, (err, token) => {
            if (err) res.send(err)
            res.send(token)
        })
    } else {
        res.send({notice: 'Invalid key'})
    }
}