const everydayDao = require('../dao/everydayDao.js');
const timeUtil = require('../util/timeUtil.js');
const respUtil = require('../util/respUtil.js');
const path = new Map();

// 编辑每日一句
function editEveryday(request, response) {
    request.on("data", data => { // 获取参数
        everydayDao.insertEveryday(data.toString().trim(), timeUtil.getNow(), result => {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null)); // 返回数据
            response.end();
        });
    })
}
path.set("/editEveryday", editEveryday);

// 获取每日一句
function queryEveryday(request, response) {
    everydayDao.queryEveryday(result => {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", result)); // 返回数据
        response.end();
    });
}
path.set("/queryEveryday", queryEveryday);

module.exports.path = path;