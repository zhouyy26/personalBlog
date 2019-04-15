let dbutil = require('./dbUtil.js');

// 增加
function insertTagBlogMapping(tagId, blogId, ctime, utime, callback) {
    var insertSql = 'insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) values (?, ?, ?, ?);';
    var params = [tagId, blogId, ctime, utime];
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

// 通过tagId查询
function queryByTagId(tagId, page, pageSize, callback) {
    var selectSql = 'select * from tag_blog_mapping where tag_id = ? limit ?, ?;';
    var params = [tagId, page * pageSize, pageSize];
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

// 通过tagId查询总数
function queryByTagIdCount(tagId, callback) {
    var selectSql = 'select count(*) as count from tag_blog_mapping where tag_id = ?;';
    var params = [tagId];
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

module.exports = {
    'insertTagBlogMapping': insertTagBlogMapping,
    'queryByTagId': queryByTagId,
    'queryByTagIdCount': queryByTagIdCount
}