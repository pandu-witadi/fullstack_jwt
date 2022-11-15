
//
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const CF = require('../config/default')


const hashPassword = async(rawPassword) => {
    return await bcrypt.hash(rawPassword, CF.password.saltLength)
}


const comparePassword = async(password, hash) => {
    return await bcrypt.compare(password, hash)
}

const createToken = (payload) => {
    return jwt.sign(
        payload,
        CF.jwt.secret_str,
        { expiresIn: CF.jwt.token_exp },
        { algorithm: 'RS256' }
    )
}


const checkToken = (token) => {
    jwt.verify(token, CF.jwt.secret_str, (err, decodedToken) => {
        if (err) {
            return false
        } else {
            // console.log(decodedToken)
            return true
        }
    })
}

const authRequired = (req, res, next) => {
    try {
        const accessToken = req.get('accessToken')

        if(!accessToken)
            return res.json({ "error": "No authentication token, access denied" })

        const verified = jwt.verify(accessToken, CF.jwt.secret_str)
        if(!verified)
            return res.json({ "error": "Token verification failed, authorization denied" })

        req.user = verified
        next()
    } catch (err) {
        return res.status(500).json({ "error": err.message })
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    createToken,
    checkToken,
    authRequired
}
