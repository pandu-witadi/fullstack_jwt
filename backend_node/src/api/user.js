//
//
// const bcrypt = require('bcryptjs')

const CF = require('../config/default')
const User = require('../model/User')
const {
    hashPassword,
    comparePassword,
    createToken,
    checkToken
} = require('../util/authentication')


const register = async (req, res) => {
    const { email, password, name } = req.body

    if (!(email && password))
        return res.status(401).json({ "error": "parameters incomplete" })

    let user = await User.findOne({ email: email })
    if (user)
        return res.status(401).json({ "error": "email already register" })
    else {
        try {
            let user = await User.create({
                email: email,
                password: await hashPassword(password),
                name: name
            })
            return res.status(200).json({ "user": user})
        } catch (err) {
            return res.status(500).json({ "error": "register" })
        }
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!(email && password))
        return res.status(401).json({ "error": "parameters incomplete" })

    let user = await User.findOne({ email: email })
    if (!user)
        return res.status(401).json({ "error": "email not register" })

    let isPassword = await comparePassword(password, user.password)
    if (isPassword) {
        accessToken = createToken({
            email: user.email,
            name: user.name
        })
        res.set('accessToken', accessToken)
        const { password, __v, ...others } = user._doc
        return res.status(200).json({
            ...others,
            accessToken: accessToken
        })
    } else
        return res.status(500).json({ "error": "login" })
}

module.exports = {
    register,
    login
}
