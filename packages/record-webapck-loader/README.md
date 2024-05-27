# record-webapck-loader

### Installation

`npm i record-webapck-loader -D`

## Usage

### 在 webpack 编译阶段 通过自定义 loader 记录特定被编译的文件信息，并且写入到指定文件 (记录在 log 文件的 文件路径不会进行去重)

##### options.writerPath: 文件写入的路径 此包不处理二进制数据 (图片资源)， record-webapck-raw-loader 处理二进制数据

##### options.clean: 每次启动 webpack 时，是否清空文件， 默认为 true， 每次新启动 webpack 不追加写入 (但是一次编译是追加写入的)

##### options.match (可选 慎重使用): 匹配逻辑 在实际 vue 项目, 发现没有 match, .vue 文件也会匹配到 .js 里面(因为.vue 文件也会被编译为 .js 文件，所以也就走这个 loader), 所以加上 匹配逻辑 (如果 loader 的 test 规则 和 这里的 match 冲突, 可能会造成 log 文件没有记录，因为是双重匹配，先匹配 loader 的 test 在匹配 match)

```javascript
module.exports = {
    ....
    module: {
        rules: [
             {
                test: /\.vue$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: [
                    {
                        loader: "record-webapck-loader",
                        options: {
                            writerPath: path.join(__dirname, "./record.log"),
                            clean: true,
                            // match?: ['.js']
                        },
                    }
                ],
            },
        ]
    }
    ...
}
```
