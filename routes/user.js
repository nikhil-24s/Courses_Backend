const express = require('express')
const { register, login, logout, authUser } = require('../controller/user')
const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.post('/authUser',authUser)

module.exports = router