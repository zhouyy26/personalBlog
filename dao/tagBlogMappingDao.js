const dbutil = require('./dbUtil.js');

// 增加
function insertTagBlogMapping(tagId, blogId, ctime, utime, callback) {
    let insertSql = 'insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) values (?, ?, ?, ?);';
    let params = [tagId, blogId, ctime, utime];
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

// 通过tagId查询
function queryByTagId(tagId, page, pageSize, callback) {
    let selectSql = 'select * from tag_blog_mapping where tag_id = ? limit ?, ?;';
    let params = [tagId, page * pageSize, pageSize];
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

// 通过tagId查询总数
function queryByTagIdCount(tagId, callback) {
    let selectSql = 'select count(*) as count from tag_blog_mapping where tag_id = ?;';
    let params = [tagId];
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

module.exports = {
    'insertTagBlogMapping': insertTagBlogMapping,
    'queryByTagId': queryByTagId,
    'queryByTagIdCount': queryByTagIdCount
}