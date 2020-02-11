const jwt = require('jsonwebtoken')

const confirmAccess = (req, res, next) => {
    const token = req.header('x-auth')
    if (token) {
        jwt.verify(token,process.env.TOKEN_SECRET, (err, token) => {
            if(err) res.status('401').send(err)
            else next()
        })
    } else {
        res.sendStatus('401')
    }
}

module.exports = confirmAccess