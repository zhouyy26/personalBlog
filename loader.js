let fs = require('fs');
let globalConf = require('./config.js');
let dirs = fs.readdirSync(globalConf['web_path']);
let pathMap = new Map();

dirs.forEach(ele => {
    var tempObj = require('./' + globalConf['web_path'] + '/' + ele);
    var path = tempObj.path
    if (path) {
        for (let [key,val] of path) {
            if (pathMap.get(key) == null) {
                pathMap.set(key, val);
            } else {
                throw new Error('url path异常，url：' + key);
            }
        }
    }
});

module.exports = pathMap;