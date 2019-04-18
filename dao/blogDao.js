const dbutil = require('./dbUtil.js');

// 增加博客
function insertBlog(title, content, views, tags, ctime, utime, callback) {
    let insertSql = 'insert into blog (`title`, `content`, `views`, `tags`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?);';
    let params = [title,  content, views, tags, ctime, utime];
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

// 通过分页查询博客
function queryBlogByPage(page, pageSize, callback) {
    let querySql = 'select * from blog limit ?, ?';
    let params = [page * pageSize, pageSize];
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

// 查询博客总数
function queryBlogCount(callback) {
    let querySql = 'select count(*) as count from blog';
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

// 查询与id相对应的博客
function queryBlogById(id, callback) {
    let querySql = 'select * from blog where id = ?';
    let params = [id];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    });
}

// 查询所有博客
function queryAllBlog(callback) {
    let querySql = 'select * from blog';
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, (error, result) => {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    });
}

// 修改Views,每次请求都+1
function updateViewsById(id, callback) {
    let updateSql = "update blog set views = views + 1 where id = ?;";
    let params = [id];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSql, params, (error, result) => {
        if (error == null) {
            callback(result);
        } else {
            console.log(error)
        }
    });
    connection.end();
}

// 通过views查询热门文章
function queryHotBlogByViews(size, callback) {
    let selectSql = "select * from blog order by views desc limit ?;";
    let params = [size];
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
    'insertBlog': insertBlog,
    'queryBlogByPage': queryBlogByPage,
    'queryBlogCount': queryBlogCount,
    'queryBlogById': queryBlogById,
    'queryAllBlog': queryAllBlog,
    'updateViewsById': updateViewsById,
    'queryHotBlogByViews': queryHotBlogByViews
}