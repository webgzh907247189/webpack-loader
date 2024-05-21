'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var process = require('node:process');
var beforeExitHook = function (cb) {
    // 执行结束，释放内存
    process.on('beforeExit', function () {
        console.log('执行结束，释放内存');
        cb();
    });
};
exports.default = beforeExitHook;
