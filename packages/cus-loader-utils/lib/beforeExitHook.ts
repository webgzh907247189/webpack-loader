import * as process from 'node:process';

type TypeBeforeExitHook = (cb: () => void) => void;
const beforeExitHook: TypeBeforeExitHook = (cb) => {
    // 执行结束，释放内存
    process.on('beforeExit', function () {
        console.log('执行结束，释放内存');
        cb();
    });
};

export default beforeExitHook;
