import * as fs from 'fs';
import * as path from 'path';
const removeRepeatByList = (list: string[]) => {
    return list.reduce((result, item) => {
        const flag = result.find((_) => _ === item);
        if (!flag) {
            result.push(item);
        }
        return result;
    }, <string[]>[]);
};

const getDiffByDirAndLogFile = () => {
    return {
        writeResultToFile: (writePath: string, list: string[]) => {
            try {
                fs.writeFileSync(writePath, JSON.stringify(list));
            } catch {
                throw new Error('写入最终结果失败');
            }
        },

        removeSameItemByList: (liata: string[], listb: string[]) => {
            return liata.reduce((result, item) => {
                const matched = listb.find((i) => i === item);

                if (!matched) {
                    result.push(item);
                }
                return result;
            }, <string[]>[]);
        },

        getListByLogFile: function (logPath: string | Buffer) {
            try {
                const logFile = fs.readFileSync(logPath, 'utf8');
                const list = logFile.split('\n');
                return removeRepeatByList(list);
            } catch {
                throw new Error('logFile 不存在');
            }
        },

        getAllFileByDir: function getAllFileByDir(dirPath: string, endsWith: string) {
            if (!endsWith) {
                throw new Error('endsWith 不能为空');
            }
            const files = fs.readdirSync(dirPath);

            return files.reduce((result, filename) => {
                const filedir = path.join(dirPath, filename);
                const stats = fs.statSync(filedir);

                const isFile = stats.isFile();
                const isDir = stats.isDirectory();

                if (isFile && filedir.endsWith(endsWith)) {
                    result.push(filedir);
                }
                if (isDir) {
                    const childResult = getAllFileByDir(filedir, endsWith); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                    result = [...result, ...childResult];
                }

                return result;
            }, <string[]>[]);
        },
    };
};

export default getDiffByDirAndLogFile;
