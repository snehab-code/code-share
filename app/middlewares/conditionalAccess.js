const jwt = require('jsonwebtoken')

const conditionalAccess = (req, res, next) => {
    const token = req.header('x-auth')
    if (token) {
        jwt.verify(token,process.env.TOKEN_SECRET, (err, token) => {
            if(err) {
                res.status('401').send(err)
            }
            else {
                req.admin = true
                next()
            }
        })
    } else {
        req.admin = false
        next()
    }
}

module.exports = conditionalAccess