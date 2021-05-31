// 用于路由模块处理
const express = require('express')
// 创建路由模块
const router = express.Router()

const controller = require('./controller')

// 挂载路由配置
// 获取所有数据  get  /api/getPolice
router.get('/api/getPolice', (req, res) => {
    controller.getPolice(req, res)
})

// 数据的新增 post  /addPolice  
router.post('/api/addPolice', (req, res) => {
    controller.addPolice(req, res)
})

// 实现编辑功能 post  /editHero 
router.post('/api/editPolice', (req, res) => {
    controller.editPolice(req, res)
})

// 实现导数数据为excel get  /exportExcel 
router.get('/api/exportExcel', (req, res) => {
    controller.exportExcel(req, res)
})

// 实现删除数据 post  /delPolice
router.post('/api/delPolice', (req, res) => {
    controller.delPolice(req, res)
})

// 暴露
module.exports = router