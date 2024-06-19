import * as fs from 'fs';
import * as path from 'path';
import * as loadUtils from 'loader-utils';
import { beforeExitHook } from 'cus-loader-utils';
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
                try {
                    fs.unlinkSync(filePath);
                } catch {
                    console.log('\x1B[41;30m 删除文件失败  \x1B[0m');
                }
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

export = function (source: any) {
    type LoaderCTX = webpack.loader.LoaderContext;
    // @ts-ignore
    const _this: LoaderCTX = this;

    const { writerPath, clean = true, match } = loadUtils.getOptions(_this) ?? {};

    if (writerPath) {
        const streamData = getStreamData!({
            // @ts-ignore
            writerPath,
            // @ts-ignore
            clean,
        });
        const logger = new console.Console(streamData);

        // 添加 match 匹配逻辑， 在实际 vue 项目，发现没有 match，.vue 文件也会匹配到 .js 里面， 所以加上 匹配逻辑
        if (match) {
            const resourcePath = _this.resourcePath;
            let flag = true;
            if (typeof match === 'string') {
                flag = resourcePath.endsWith(match);
            } else if (Array.isArray(match)) {
                flag = match.some((item) => resourcePath.endsWith(item));
            } else {
                flag = false;
                console.log('\x1B[41;30m 不支持的 macth 格式  \x1B[0m');
            }
            if (flag) {
                logger.log(resourcePath);
                return source;
            }
        } else {
            logger.log(_this.resourcePath);
        }
    }

    return source;
};
