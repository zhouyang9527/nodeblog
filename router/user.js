const express = require('express')


const router2 = express.Router()

const ctrls = require('../controllers/user.js');

router2.post('/register', ctrls.register)

router2.post('/login', ctrls.login)

router2.get('/logout', ctrls.logout)

router2.get('/article/add', ctrls.addArtcle)

module.exports = router2