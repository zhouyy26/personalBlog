const fs = require('fs');
const conf = fs.readFileSync('./server.conf');
const confArr = conf.toString().split('\n');
const globalConf = {}

confArr.forEach(ele => {
    if (ele.indexOf('=') != -1) {
        let tempArr = ele.split('=');
        globalConf[tempArr[0].trim()] = tempArr[1].trim();
    }
});

module.exports = globalConf;