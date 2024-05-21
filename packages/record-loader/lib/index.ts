import * as fs from 'fs';
import * as path from 'path';
import * as loadUtils from 'loader-utils';
import beforeExitHook from 'cus-loader-utils';
import webpack = require('webpack');

type TypeOption = { writerPath: string; clean: boolean };

// 单列模式获取 streamData 只创建一次 writeStream
const getStreamDataWrapper = () => {
    let streamData: null | fs.WriteStream = null;
    return (options: TypeOption) => {
        if (!streamData) {
            if (options.clean) {
                const filePath = path.resolve(__dirname, options.writerPath);

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

let getStreamData: null | ((options: TypeOption) => fs.WriteStream) = getStreamDataWrapper();

// 执行结束，释放内存
beforeExitHook(() => {
    getStreamData = null;
});

module.exports = function (source: any) {
    type LoaderCTX = webpack.loader.LoaderContext;
    // @ts-ignore
    const _this: LoaderCTX = this;

    const { writerPath, clean } = loadUtils.getOptions(_this) || {};

    if (writerPath) {
        const streamData = getStreamData!({
            // @ts-ignore
            writerPath,
            // @ts-ignore
            clean,
        });

        const logger = new console.Console(streamData);
        logger.log(_this.resourcePath);
    }

    return source;
};
