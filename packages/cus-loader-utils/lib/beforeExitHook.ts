import * as process from 'node:process';

type TypeBeforeExitHook = (cb: () => void) => void;
const beforeExitHook: TypeBeforeExitHook = (cb) => {
    // 执行结束，释放内存
    process.on('beforeExit', function () {
        cb();
        console.log('执行结束，释放内存');
    });
};

export default beforeExitHook;
