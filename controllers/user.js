const moment = require('moment')
const conn = require('../db/db.js')
    // 导入加密模块
const bcrypt = require('bcrypt')
    // 定义一个加密的幂次
const saltRounds = 10

const register = (req, res) => {
    let body = req.body
    if (body.username.trim().length < 1 || body.password.trim().length < 1 || body.nickname.trim().length < 1) {
        return res.send({ msg: '请填写完整的表单数据后再注册新用户！', status: 501 })
    }
    let sql = 'select count(*) as count from blog_user where username= ?'
    body.isdel = 0
    body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')


    conn.query(sql, body.username, (err, result) => {
        if (result[0].count != 0) {
            return res.send({ msg: '用户名重复，请重新输入用户名', status: 503 })
        }
        // 在执行sql语句之前，首先对用户提供的密码，进行加密
        // bcrypt.hash('要加密的密码','循环幂次','回调函数')
        bcrypt.hash(body.password, saltRounds, (err, pwd) => {
            // 加密失败
            if (err) return res.send({ masg: '加密失败', status: 506 })
            body.password = pwd
            console.log(body);
            let sql2 = ' insert into blog_user set ? '
            conn.query(sql2, body, (err) => {
                if (err) return res.send(err.message)
                res.send({ msg: '用户注册成功', status: 200 })
            })
        })
    })
}

const login = (req, res) => {
    // // 监听用户的登录信息
    // const body = req.body
    //     // 非空校验
    // if (body.username.trim().length < 1 || body.password.trim().length < 1) {
    //     return res.send({ msg: '请填写正确的用户名及密码', status: 502 })
    // }
    // // 判断数据库中的用户名及密码是否一致
    // const sql = 'select * from blog_user where username= ? and password = ?'
    // conn.query(sql, [body.username, body.password], (err, result) => {
    //     if (err) res.send(err.message)
    //     if (result.length) {
    //         req.session.user = result[0]
    //         req.session.islogin = true
    //         res.send({ msg: '登录成功', status: 200 })
    //     } else {
    //         return res.send({ msg: '登录信息有误', status: 502 })
    //     }
    // })

    // 监听用户的登录信息
    const body = req.body
        // 非空校验
    if (body.username.trim().length < 1 || body.password.trim().length < 1) {
        return res.send({ msg: '请填写正确的用户名及密码', status: 502 })
    }
    // 判断数据库中的用户名及密码是否一致
    const sql = 'select * from blog_user where username= ?'
    conn.query(sql, body.username, (err, result) => {
        if (err) res.send(err.message)
        if (result.length) {
            bcrypt.compare(body.password, result[0].password, (err, res1) => {
                if (err) return res.send({ msg: '登录信息有误', status: 502 })
                if (res1) {
                    req.session.user = result[0]
                    req.session.islogin = true
                    console.log(result);
                    res.send({ msg: '登录成功', status: 200 })
                }
            })
        }
    })
}

const logout = (req, res) => {
    req.session.islogin = false;
    req.session.destroy(err => {
        if (err) throw err
        console.log('用户退出成功！');
        res.redirect('/');
    })

}


const addArtcle = (req, res) => {
    // console.log(req.session);
    if (!req.session.islogin) {
        return res.redirect('/')
    }
    res.render('article/add.ejs', {
        user: req.session.user,
        islogin: req.session.islogin
    })
}


module.exports = {
    register,
    login,
    logout,
    addArtcle,
}