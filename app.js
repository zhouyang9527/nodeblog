//导入express模块
const express = require('express')
    //创建express的服务器案例
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const session = require('express-session')

app.set('view engine', 'ejs')
app.set('views', './views')

app.use('/node_modules', express.static('./node_modules'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
        session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false
        })
    )
    //write your code here...
    //调用 app.listen 方法, 指定端口号并启动web服务器

// const router1 = require('./router/index.js')
// app.use(router1)

// const router2 = require('./router/user.js')
// app.use(router2)

// 使用循环的方式，进行路由的自动注册
fs.readdir(path.join(__dirname, './router'), (err, filename) => {
    if (err) return console.log('读取router目录中的路由失败！');
    filename.forEach(file => {
        const router = require(path.join(__dirname, './router', file))
        app.use(router)
    })
})

app.listen(3001, () => {
    console.log('Express server runing at http://localhost:3001')
})