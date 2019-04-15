let url = require('url');
let blogDao = require('../dao/blogDao.js');
let tagDao = require('../dao/tagDao.js');
let tagBlogMappingDao = require('../dao/tagBlogMappingDao.js');
let timeUtil = require('../util/timeUtil.js');
let respUtil = require('../util/respUtil.js');
let path = new Map();

// 编辑博客
function editBlog(request, response) {
    request.on("data", data => { // 获取参数
        data = JSON.parse(data);
        var tags = data.tags.replace(/ /g, '').replace('，', ','); // 处理tags格式
        blogDao.insertBlog(data.title, data.content, 0, tags, timeUtil.getNow(), timeUtil.getNow(), result => {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null)); // 返回数据
            response.end();
            // 把该博客的tag映射到tags表里
            var blogId = result.insertId; // 获取blogId
            var tagList = tags.split(','); // 拆分tags
            tagList.forEach(ele => {
                if (ele != '') { // 如果tag不为空则查询
                    queryTag(ele, blogId);
                }
            });
        });
    })
}
path.set("/editBlog", editBlog);

// 查询tags表中含有tag的数据
function queryTag(tag, blogId) {
    tagDao.queryTag(tag, result => {
        // 查询tags表中的tag标签，有则映射，没有则插入
        if (result == null || result.length == 0) { // 没有
            insertTag(tag, blogId);
        } else { // 有
            var tagId = result[0].id;
            insertTagBlogMapping(tagId, blogId);
        }
    })
}

// 向tags表中插入数据
function insertTag(tag, blogId) {
    tagDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), result => {
        // 把tags表中的数据映射到tag_blog_mapping表
        var tagId = result.insertId;
        insertTagBlogMapping(tagId, blogId);
    });
}

// 向tag_blog_mapping表中插入数据
function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), result => {

    });
}

//查询与分页相对应的博客
function queryBlogByPage(request, response) {
    var data = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(data.page), parseInt(data.pageSize), result => {
        result.forEach(ele => { // 处理content内容
            ele.content = ele.content.replace(/<img[\w\W]*">|<[\w\W]{1,10}>/g, ''); // 过滤图片和标签
            ele.content = ele.content.substring(0, 300); // 只截取前300个字符串
        });
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result)); // 返回数据
        response.end();
    });
}
path.set("/queryBlogByPage", queryBlogByPage);

// 查询博客总数
function queryBlogCount(request, response) {
    blogDao.queryBlogCount(result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result)); // 返回数据
        response.end();
    });
}
path.set("/queryBlogCount", queryBlogCount);

// 查询与id相对应的博客
function queryBlogById(request, response) {
    var data = url.parse(request.url, true).query;
    blogDao.queryBlogById(parseInt(data.id), result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result)); // 返回数据
        response.end();
    });
    blogDao.updateViewsById(parseInt(data.id), result => {});
}
path.set("/queryBlogById", queryBlogById);

// 查询所有博客
function queryAllBlog(request, response) {
    blogDao.queryAllBlog(result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result)); // 返回数据
        response.end();
    })
}
path.set("/queryAllBlog", queryAllBlog);

// 通过views查询热门文章
function queryHotBlog(request, response) {
    var data = url.parse(request.url, true).query;
    blogDao.queryHotBlogByViews(parseInt(data.size), result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result)); // 返回数据
        response.end();
    });
}
path.set("/queryHotBlog", queryHotBlog);

module.exports.path = path;