const dbutil = require('./dbUtil.js');

// 增加评论
function insertComment(blogId, parent, parentName, userName, comments, email, ctime, utime, callback) {
    let insertSql = 'insert into comments (`blog_id`, `parent`, `parent_name`, `user_name`, `comments`, `email`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?, ?, ?);';
    let params = [blogId, parent, parentName, userName, comments, email, ctime, utime];
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

// 通过bid查询评论
function queryCommentByBlogId(blogId, callback) {
    let querySql = 'select * from comments where blog_id = ?;';
    let params = [blogId];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    });
    connection.end();
}

// 通过blogId查询评论总数
function queryCommentCountByBlogId(blogId, callback) {
    let querySql = 'select count(*) as count from comments where blog_id = ?;';
    let params = [blogId];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    });
    connection.end();
}

// 获取最新评论
function queryNewComment(size, callback) {
    let querySql = 'select * from comments order by id desc limit ?;';
    let params = [size];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    });
    connection.end();
}

module.exports = {
    'insertComment': insertComment,
    'queryCommentByBlogId': queryCommentByBlogId,
    'queryCommentCountByBlogId': queryCommentCountByBlogId,
    'queryNewComment': queryNewComment
}