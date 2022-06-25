const authServices = require('../services/auth.services')

const register = async (req, res, next) => {
    try {
        const user = await authServices.registerUser(req.body)
        res.status(201).json({
            email: user.email,
            subscription: user.subscription,
            avatarURL: user.avatarURL
        })
    } catch (error) {
        next(error)
    }
}
const login = async (req, res, next) => {
    try {
        const token = await authServices.loginUser(req.body)
        res.status(200).json(token)
    } catch (error) {
        next(error)
    }
}
 
const logout = async (req, res, next) => {
    try {
        await authServices.logoutUser(req.user._id)
        res.status(204)
    } catch (error) {
        next(error)
    }

}

const currentUser = (req, res) => {
    const { email, subscription } = req.user
    res.json({
        user: {
            email,
            subscription
        }
    })
}
  

module.exports = {
    register, login, logout, currentUser
}