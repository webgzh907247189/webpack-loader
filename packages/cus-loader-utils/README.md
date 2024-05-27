# cus-loader-utils

### Installation

`npm i cus-loader-utils`

## Usage

```javascript
const { beforeExitHook, getDiffByDirAndLogFile } = require('cus-loader-utils');

// 退出执行进程前的 清理函数
beforeExitHook();

// getAllFileByDir(dirPath, endsWidth) 执行 从指定目录下获取所有文件 <dirPath 表示从哪个目录开始，endsWidth 表示过滤这个目录下的那些后缀名文件>
// getListByLogFile(logPath) 执行 从指定目录下获取 log 文件 并且进行切割为数组 <logPath 表示 log文件 绝对路径>
// removeSameItemByList(liata, liatb) 执行 两个数组的对比 <liata 表示所有数据源的数组，liatb 表示需要被过滤的数组>
// writeResultToFile(writePath, list) 执行 拿到的数组进行写文件 <writePath 表示从写入路径，list 表示 写入的数组>
const { writeResultToFile, removeSameItemByList, getListByLogFile, getAllFileByDir } = getDiffByDirAndLogFile();
```
