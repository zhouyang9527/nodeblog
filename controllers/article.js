const moment = require('moment')
const conn = require('../db/db.js')
const marked = require('marked')

const addArticleContent = (req, res) => {
    const body = req.body
    body.authorId = req.session.user.id

    body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')

    const sql = 'insert into blog_article set ?'

    conn.query(sql, body, (err, result) => {
        if (err) return res.send({ msg: '文章添加失败', status: 501 })
        res.send({ msg: 'ok', status: 200, insertId: result.insertId })
    })
}

const updateArticleContent = (req, res) => {
    const body = req.body
    console.log(body);
    const sql = 'update blog_article set ? where id = ?'

    conn.query(sql, [body, body.id], (err, result) => {
        if (err) return res.send({ msg: '文章修改失败', status: 501 })
        console.log(result);
        res.send({ msg: 'ok', status: 200 })
    })
}

const showArticle = (req, res) => {
    // res.render('./article/articledetil.ejs', {
    //     user: req.session.user,
    //     islogin: req.session.islogin
    // })
    // if (!req.session.islogin) {
    //     res.redirect('/')
    // }
    const id = req.params.id

    const sql = 'select * from blog_article where id = ? '
    conn.query(sql, id, (err, result) => {
        if (err) return res.send(err.message)
            // res.send({ msg: 'ok', status: 200, data: result })

        if (result.length) {
            // 再调用render方法喧嚷页面的时候，需要把markdown转换成html
            let html = marked(result[0].content)
            console.log(html);
            result[0].content = html
            res.render('./article/articledetil.ejs', {
                user: req.session.user,
                islogin: req.session.islogin,
                data: result[0]
            })
        }

    })

}
const editArticle = (req, res) => {
    const id = req.params.id
        // const authorId = req.params.authorId
    if (!req.session.islogin) {
        return res.redirect('/')
    }
    const sql = 'select * from blog_article where id = ? '
    conn.query(sql, id, (err, result) => {
        if (err) return res.send(err.message)

        if (req.session.user.id != result[0].authorId) {
            return res.redirect('/')
        }

        if (result.length) {
            res.render('./article/edit.ejs', {
                user: req.session.user,
                islogin: req.session.islogin,
                data: result[0]
            })
        }
    })
}

module.exports = {
    addArticleContent,
    showArticle,
    editArticle,
    updateArticleContent
}