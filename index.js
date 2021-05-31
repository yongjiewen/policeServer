// 创建服务器
const express = require('express')

const app = express()
// 添加端口3002
app.listen(3002, function () {
    console.log('服务启动成功')
    console.log('http://192.168.1.111:3002');
})

// 设置允许跨域
var allow = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
}
app.use(allow)

const bodyParser = require('body-parser')
// post(application/x-www-form-urlencoed)
app.use(bodyParser.urlencoded({ extended: false }))
// json格式字符串 --对象
app.use(bodyParser.json())


// 引入路由模块
const router = require('./models/router')
// 让当前应用使用router进行路由管理
app.use(router)

