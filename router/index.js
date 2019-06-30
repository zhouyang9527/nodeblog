const express = require('express')

const ctrls = require('../controllers/index.js')


const router1 = express.Router()

router1.get('/', ctrls.showIndexPage)

router1.get('/register', ctrls.showRegisterPage)

router1.get('/login', ctrls.showLoginPage)

module.exports = router1