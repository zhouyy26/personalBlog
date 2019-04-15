let dbutil = require('./dbUtil.js');

// 增加tag
function insertTag(tag, ctime, utime, callback) {
    var insertSql = 'insert into tags (`tag`, `ctime`, `utime`) values (?, ?, ?);';
    var params = [tag, ctime, utime];
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

// 查询指定tag
function queryTag(tag, callback) {
    var selectSql = 'select * from tags where tag = ?;';
    var params = [tag]
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(selectSql, params, (error, result) => {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    });
    connection.end();
}

// 查询所有tag
function queryAllTag(callback) {
    var selectSql = 'select * from tags;';
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(selectSql, (error, result) => {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    });
    connection.end();
}


module.exports = {
    'insertTag': insertTag,
    'queryTag': queryTag,
    'queryAllTag': queryAllTag
}