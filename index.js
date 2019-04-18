const express = require('express');
const globalConf = require('./config.js');
const loader = require('./loader.js');
const app = new express();

// 设置静态文件的路径，实现页面跳转
app.use(express.static('./page/'));

// 编辑每日一句
app.post('/editEveryday', loader.get('/editEveryday'));

// 获取每日一句
app.get('/queryEveryday', loader.get('/queryEveryday'));

// 编辑博客
app.post('/editBlog', loader.get('/editBlog'));

// 查询与分页相对应的博客
app.get('/queryBlogByPage', loader.get('/queryBlogByPage'));

// 查询博客总数
app.get('/queryBlogCount', loader.get('/queryBlogCount'));

// 查询与id相对应的博客
app.get('/queryBlogById', loader.get('/queryBlogById'));

// 新增评论
app.post('/addComment', loader.get('/addComment'));

// 验证码
app.get('/queryRandomCode', loader.get('/queryRandomCode'));

// 获取与blogId对应的评论
app.get('/queryCommentByBlogId', loader.get('/queryCommentByBlogId'));

// 查询与blogId对应的评论总数
app.get('/queryCommentCountByBlogId', loader.get('/queryCommentCountByBlogId'));

// 查询所有博客
app.get('/queryAllBlog', loader.get('/queryAllBlog'));

// 查询随机标签
app.get('/queryRandomTags', loader.get('/queryRandomTags'));

// 查询热门文章
app.get('/queryHotBlog', loader.get('/queryHotBlog'));

// 查询最新评论
app.get('/queryNewComment', loader.get('/queryNewComment'));

// 查询与tag相对应的博客
app.get('/queryBlogByTag', loader.get('/queryBlogByTag'));

// 查询与tag对应的博客数
app.get('/queryBlogCountByTag', loader.get('/queryBlogCountByTag'));

// 监听端口
app.listen(globalConf['port'], function () {
   console.log('服务已启动');
});