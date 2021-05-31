// 实现业务处理
const model = require('./model')
const xlsx = require('node-xlsx')

module.exports = {
    //获取所有数据  get  /api/getPolice
    getPolice(req, res) {
        //req.query 前端传递的数据对象
        model.getPolice(req.query, (err, data) => {
            if (err) {
                // 服务器响应到客户端的数据只能是字符串
                // res.end(JSON.stringify(obj))
                // json会转换类型，并响应
                res.json({
                    code: 50001,
                    msg: '数据查询失败'
                })
            } else {
                res.json({
                    code: 20000,
                    msg: '查询成功',
                    data // 返回的数据
                })
            }
        })
    },
    //实现数据的新增 post  /api/addPolice  
    addPolice(req, res) {
        //req.body 前端传递的数据对象
        model.addPolice(req.body, (err) => {
            if (err) {
                res.json({
                    code: 50001,
                    msg: '新增失败'
                })
            } else {
                res.json({
                    code: 20000,
                    msg: '新增成功'
                })
            }
        })
    },

    // 实现编辑功能 post  /editPolice
    editPolice(req, res) {
        model.editPolice(req.body, (err) => {
            if (err) {
                res.json({
                    code: 50001,
                    msg: '修改失败'
                })
            } else {
                res.json({
                    code: 20000,
                    msg: '修改成功'
                })
            }
        })
    },

    // 实现导数数据为excel
    exportExcel(req, res) {
        model.exportExcel(req.query, (err, data) => {
            let excelData = [];
            const title = ['采集时间', '数据来源', '咋骗类型', '预警单位', '预留手机', '预警级别', '关联信息', '预警状态', '是否见面', '是否被骗', '是否照相', '入库时间', '下发时间', '备注', '操作员'];
            const options = { '!cols': [{ wch: 18 }, { wch: 14 }, { wch: 14 }, { wch: 18 }, { wch: 20 }, { wch: 14 }, { wch: 14 }, { wch: 16 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 18 }, { wch: 18 }, { wch: 14 }, { wch: 14 }] };
            excelData.push(title);
            data.forEach(item => {
                let arrInner = []
                for (const key in item) {
                    if (key != 'id' && key != 'isDelete') {
                        arrInner.push(item[key])
                    }
                }
                excelData.push(arrInner)
            })

            let buffer = xlsx.build([
                {
                    name: 'sheet1',
                    data: excelData
                }
            ], options);
            if (err) {
                res.json({
                    code: 50001,
                    msg: '导出失败'
                })
            } else {
                res.send(buffer);
            }
        })
    },

    //删除数据
    delPolice(req, res) {
        model.delPolice(req.body, (err) => {
            if (err) {
                res.json({
                    code: 50001,
                    msg: '删除失败'
                })
            } else {
                res.json({
                    code: 20000,
                    msg: '删除成功',
                })
            }
        })
    },
}
