const url = require('url');
const captcha = require('svg-captcha');
const commentDao = require('../dao/commentDao.js');
const timeUtil = require('../util/timeUtil.js');
const respUtil = require('../util/respUtil.js');
const path = new Map();

// 添加评论
function addComment(request, response) {
    request.on("data", data => { // 获取参数
        data = JSON.parse(data);
        commentDao.insertComment(data.bid, data.parent, data.parentName, data.userName, data.content, data.email, timeUtil.getNow(), timeUtil.getNow(), result => {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null)); // 返回数据
            response.end();
        });
    })
}
path.set("/addComment", addComment);

// 生成验证码
function queryRandomCode(request, response) {
    let img = captcha.create({
        width: 100,
        height: 36,
        fontSize: 50,
        size: 4,
    });
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "添加成功", img)); // 把svg返回
    response.end();
}
path.set("/queryRandomCode", queryRandomCode);

// 获取与blogId相对应的评论
function queryCommentByBlogId(request, response) {
    let params = url.parse(request.url, true).query;
    commentDao.queryCommentByBlogId(parseInt(params.bid), result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result)); // 返回数据
        response.end();
    });
}
path.set("/queryCommentByBlogId", queryCommentByBlogId);

// 通过blogId获取评论总数
function queryCommentCountByBlogId(request, response) {
    let params = url.parse(request.url, true).query;
    commentDao.queryCommentCountByBlogId(parseInt(params.bid), result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result)); // 返回数据
        response.end();
    });
}
path.set("/queryCommentCountByBlogId", queryCommentCountByBlogId);

// 获取最新评论
function queryNewComment(request, response) {
    let params = url.parse(request.url, true).query;
    commentDao.queryNewComment(parseInt(params.size), result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result)); // 返回数据
        response.end();
    });
}
path.set("/queryNewComment", queryNewComment);

module.exports.path = path;