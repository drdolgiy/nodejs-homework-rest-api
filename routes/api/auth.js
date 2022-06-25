const express = require('express')
const router = express.Router()
const {register, login, logout, currentUser} = require('../../controllers')
const {schemaRegister, schemaLogin} = require('../../models/user')
const { validateRequest } = require('../../middlewares/validateRequest')
const { auth } = require('../../middlewares/auth')

router.post('/signup',validateRequest(schemaRegister), register)
router.post('/login',validateRequest(schemaLogin), login)
router.post('/logout',auth, logout)
router.get('/current',auth, currentUser)

module.exports = router