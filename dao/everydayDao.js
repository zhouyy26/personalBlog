const dbutil = require('./dbUtil.js');

// 增加每日一句
function insertEveryday(content, ctime, callback) {
    let insertSql = 'insert into everyday (`content`, `ctime`) values (?, ?);';
    let params = [content, ctime];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, (error, result) => {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    });
    connection.end();
}

// 查询每日一句
function queryEveryday(callback) {
    let querySql = 'select * from everyday order by id desc limit 1';
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, (error, result) => {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    });
    connection.end();
}

module.exports = {
    'insertEveryday': insertEveryday,
    'queryEveryday': queryEveryday
}