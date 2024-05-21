'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var fs = require('fs');
var path = require('path');
var loadUtils = require('loader-utils');
var cus_loader_utils_1 = require('cus-loader-utils');
// 单列模式获取 streamData 只创建一次 writeStream
var getStreamDataWrapper = function () {
    var streamData = null;
    return function (options) {
        if (!streamData) {
            if (options.clean) {
                var filePath = path.resolve(__dirname, options.writerPath);
                // 同步删除
                fs.unlinkSync(filePath);
            }
            // 每次脚本执行清空上一次执行 记录的 信息
            streamData = fs.createWriteStream(options.writerPath, {
                flags: 'a',
            });
            return streamData;
        }
        return streamData;
    };
};
var getStreamData = getStreamDataWrapper();
// 执行结束，释放内存
(0, cus_loader_utils_1.default)(function () {
    getStreamData = null;
});
module.exports = function (source) {
    // @ts-ignore
    var _this = this;
    var _a = loadUtils.getOptions(_this) || {},
        writerPath = _a.writerPath,
        clean = _a.clean;
    if (writerPath) {
        var streamData = getStreamData({
            // @ts-ignore
            writerPath: writerPath,
            // @ts-ignore
            clean: clean,
        });
        var logger = new console.Console(streamData);
        logger.log(_this.resourcePath);
    }
    return source;
};
