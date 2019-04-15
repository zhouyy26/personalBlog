let dbutil = require('./dbUtil.js');

// 增加每日一句
function insertEveryday(content, ctime, callback) {
    var insertSql = 'insert into everyday (`content`, `ctime`) values (?, ?);';
    var params = [content, ctime];
    var connection = dbutil.createConnection();
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
    var querySql = 'select * from everyday order by id desc limit 1';
    var connection = dbutil.createConnection();
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