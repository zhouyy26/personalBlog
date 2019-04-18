let fs = require('fs');
let conf = fs.readFileSync('./server.conf');
let confArr = conf.toString().split('\n');
let globalConf = {}

confArr.forEach(ele => {
    if (ele.indexOf('=') != -1) {
        var tempArr = ele.split('=');
        globalConf[tempArr[0]] = tempArr[1];
    }
});

module.exports = globalConf;


