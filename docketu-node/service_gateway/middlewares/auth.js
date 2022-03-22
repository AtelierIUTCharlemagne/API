const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    try {
        if (!req.path.includes('/users'))
            if (req.headers.authorization) {
                const token = req.headers.authorization.split(' ')[1]
                if (jwt.verify(token, process.env.JWT_SECRET))
                    next()
                else
                res.status(401).json({
                    "type": "error",
                    "error": 401,
                    "message": "le token n'est pas bon"
                })
            }
            else
            res.status(401).json({
                "type": "error",
                "error": 401,
                "message": "Vous devez être authentifié pour accéder à cette page"
            })
        else
            next()
    } catch (err) {
        throw new Error(err)
    }

}