// 可以连接mysql服务器实现数据处理
const mysql = require('mysql')
// 创建连接
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
})
// 连接默认会打开

module.exports = {
    //获取所有数据  get  /api/getPolice
    // callback:回调函数
    getPolice(obj, callback) {
        //分页参数：其中pageIndex是页码，pageSize每页显示的数目
        let pageIndex = obj.pageIndex || 1
        let pageSize = obj.pageSize || 10
        let start_time = obj.start_time || "";
        let end_time = obj.end_time || "";
        let warning_status = obj.warning_status || "";
        let data_sources = obj.data_sources || "";
        let phone = obj.phone || "";
        let same_phone = obj.same_phone || "";
        // 创建sql命令
        let sql = `select * from info where 1 = 1 and isDelete=0`
        // 筛选时间段
        if (start_time && end_time) {
            sql += ` and coll_time BETWEEN '${start_time}' and '${end_time + ' 23:59:59'}' `
        }
        // 筛选预警状态
        if (warning_status) {
            sql += ` and warning_status = '${warning_status}' `
        }
        if (data_sources) {
            sql += ` and data_sources = '${data_sources}' `
        }
        if (phone) {
            sql += ` and phone = '${phone}' `
        }
        // 筛选相同手机号
        if (same_phone) {
            sql = `SELECT * FROM info WHERE isDelete=0 and phone IN( SELECT phone FROM info WHERE isDelete=0  GROUP BY phone HAVING COUNT(phone) > 1 ) `
        }
        // SELECT * FROM info WHERE phone IN(SELECT phone FROM info GROUP BY phone HAVING COUNT(phone) > 1);
        connection.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                //查询成功执行分页
                // sql = sql + ` limit ${(pageIndex - 1) * pageSize},${pageSize}`
                sql = sql + ` order by coll_time desc limit ${(pageIndex - 1) * pageSize},${pageSize}` //降序
                connection.query(sql, (err1, results1) => {
                    if (err) {
                        callback(err)
                    } else {
                        callback(null, { list: results1, total: results.length })
                    }
                })

            }
        })
    },

    //数据的新增 post  /api/addPolice
    // obj:当前需要新增的数据，它是一个对象
    // callback新增操作完成后的回调
    addPolice(obj, callback) {
        let sql = 'insert into info set ?'
        connection.query(sql, obj, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    //实现编辑功能 post  
    editPolice(obj, callback) {
        let sql = 'update info set ? where id = ?'
        connection.query(sql, [obj, obj.id], (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },

    // 实现导数数据为excel get
    exportExcel(obj, callback) {
        // 默认导出所有数据
        let start_time = obj.start_time || "";
        let end_time = obj.end_time || "";
        let warning_status = obj.warning_status || "";
        let data_sources = obj.data_sources || "";
        let phone = obj.phone || "";
        let sql = `select * from info where 1 = 1  and isDelete=0 `
        // 筛选时间段
        if (start_time && end_time) {
            sql += ` and coll_time BETWEEN '${start_time}' and '${end_time + ' 23:59:59'}' `
        }
        // 筛选预警状态
        if (warning_status) {
            sql += ` and warning_status = '${warning_status}' `
        }
        if (data_sources) {
            sql += ` and data_sources = '${data_sources}' `
        }
        if (phone) {
            sql += ` and phone = '${phone}' `
        }
        connection.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                callback(null, results)
            }
        })
    },
    delPolice(obj, callback) {
        let id = obj.id
        let sql = 'update info set isDelete = 1 where id=?'
        connection.query(sql, id, (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }
}
