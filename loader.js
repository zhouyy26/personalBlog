const fs = require('fs');
const globalConf = require('./config.js');
const dirs = fs.readdirSync(globalConf['web_path']); // 读取web路径
const pathMap = new Map();

dirs.forEach(ele => {
    let tempObj = require('./' + globalConf['web_path'] + '/' + ele);
    let path = tempObj.path;
    if (path) {
        for (let [key, val] of path) {
            if (pathMap.get(key) == null) {
                pathMap.set(key, val);
            } else {
                throw new Error('url path异常，url：' + key);
            }
        }
    }
});

module.exports = pathMap;