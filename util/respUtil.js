// 返回指定的格式
function writeResult(status, msg, data) {
    return JSON.stringify({ // 把对象转为json格式的字符串
        status,
        msg,
        data
    });
}

module.exports = {
    'writeResult': writeResult,
}