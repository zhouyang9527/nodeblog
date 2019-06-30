const express = require('express')

const ctrls = require('../controllers/article.js')

const router3 = express.Router()

router3.post('/addArticleContent', ctrls.addArticleContent)

router3.get('/article/info/:id', ctrls.showArticle)

router3.get('/article/edit/:id', ctrls.editArticle)

router3.post('/updateArticleContent', ctrls.updateArticleContent)

module.exports = router3