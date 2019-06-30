const conn = require('../db/db.js')

const pageSize = 5
const showIndexPage = (req, res) => {
    // console.log('服务器监听器开启成功')
    // console.log(req.session);
    const nowPage = req.query.page || 1
    const sql = `select a.id,a.ctime,title,u.nickname 
    from blog_article a 
    LEFT JOIN blog_user u on authorId = u.id 
    ORDER BY a.id DESC
    LIMIT  ${(nowPage-1)*pageSize},${pageSize};
    select count(*) as count from blog_article`



    conn.query(sql, (err, result) => {
        if (err) return err.message
        const totalPage = Math.ceil(result[1][0].count / pageSize)
            // console.log(result);
        res.render('index.ejs', {
            user: req.session.user,
            islogin: req.session.islogin,
            data: result,
            totalPage: totalPage,
            nowPage: Number(nowPage)
        })
    })


}

const showRegisterPage = (req, res) => {
    res.render('./user/register.ejs', {})
}
const showLoginPage = (req, res) => {
    if (req.session.islogin) {
        return res.redirect('/')
    }
    res.render('./user/login.ejs', {})
}
module.exports = {
    showIndexPage,
    showRegisterPage,
    showLoginPage
}