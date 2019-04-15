let url = require('url');
let blogDao = require('../dao/blogDao.js');
let tagDao = require('../dao/tagDao.js');
let tagBlogMappingDao = require('../dao/tagBlogMappingDao.js');
let timeUtil = require('../util/timeUtil.js');
let respUtil = require('../util/respUtil.js');
let path = new Map();

// 查询随机标签
function queryRandomTags(request, response) {
    tagDao.queryAllTag(result => {
        result.sort(() => { // 给数组随机排序
            return Math.random() - 0.5;
        });
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result)); // 返回数据
        response.end();
    });
}
path.set("/queryRandomTags", queryRandomTags);

// 查询与tag对应的博客
function queryBlogByTag(request, response) {
    var params = url.parse(request.url, true).query;
    // 查询tag
    tagDao.queryTag(params.tag, result => {
        if (result != null || result.length != 0) {
            // 根据tagId查询
            tagBlogMappingDao.queryByTagId(result[0].id, parseInt(params.page), parseInt(params.pageSize), result => {
                var blogList = [];
                result.forEach((ele, index) => {
                    blogDao.queryBlogById(ele.blog_id, result => {
                        blogList.push(result[0]);
                    });
                });
                getResult(blogList, result.length, response);
            });
        }
    })
}
path.set("/queryBlogByTag", queryBlogByTag);

function getResult(blogList, len, response) {
    if (blogList.length < len) {
        setTimeout(() => {
            getResult(blogList, len, response);
        }, 10);
    } else {
        blogList.forEach(ele => { // 处理content内容
            ele.content = ele.content.replace(/<img[\w\W]*">|<[\w\W]{1,10}>/g, ''); // 过滤图片和标签
            ele.content = ele.content.substring(0, 300); // 只截取前300个字符串
        });
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", blogList));
        response.end();
    }
}

// 查询与tag对应的博客数
function queryBlogCountByTag(request, response) {
    var params = url.parse(request.url, true).query;
    // 查询tag
    tagDao.queryTag(params.tag, result => {
        if (result != null || result.length != 0) {
            tagBlogMappingDao.queryByTagIdCount(result[0].id, result => {
                response.writeHead(200);
                response.write(respUtil.writeResult("success", "添加成功", result));
                response.end();
            });
        }
    })
}
path.set("/queryBlogCountByTag", queryBlogCountByTag);

module.exports.path = path;