let fs = require('fs');
let globalConf = require('./config.js');
let dirs = fs.readdirSync(globalConf['web_path']); // 读取路径
let pathMap = new Map();

dirs.forEach(ele => {
    var tempObj = require('./' + globalConf['web_path'] + '/' + ele);
    if (tempObj.path) {
        for (let [key,val] of tempObj.path) {
            if (pathMap.get(key) == null) {
                pathMap.set(key, val);
            } else {
                throw new Error('url path异常，url：' + key);
            }
        }
    }
});

module.exports = pathMap;