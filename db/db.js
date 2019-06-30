const mysql = require('mysql')

//创建 mysql 连接

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog',
    // 开启多条语句查询
    multipleStatements: true
})

module.exports = conn