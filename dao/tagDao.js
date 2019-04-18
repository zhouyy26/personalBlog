const dbutil = require('./dbUtil.js');

// 增加tag
function insertTag(tag, ctime, utime, callback) {
    let insertSql = 'insert into tags (`tag`, `ctime`, `utime`) values (?, ?, ?);';
    let params = [tag, ctime, utime];
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

// 查询指定tag
function queryTag(tag, callback) {
    let selectSql = 'select * from tags where tag = ?;';
    let params = [tag]
    let connection = dbutil.createConnection();
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
    let selectSql = 'select * from tags;';
    let connection = dbutil.createConnection();
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