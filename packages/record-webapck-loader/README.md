# record-webapck-loader

### Installation

`npm i record-webapck-loader -D`

## Usage

### 在 webpack 编译阶段 通过自定义 loader 记录特定被编译的文件信息，并且写入到指定文件

##### options.writerPath 文件写入的路径

##### options.clean 每次启动 webpack 时，是否清空文件， 默认为 true， 每次新启动 webpack 不追加写入 (但是一次编译是追加写入的)

```javascript
module.exports = {
    ....
    module: {
        rules: [
             {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                enforce: "pre",
                exclude: /node_modules/,
                use: [
                    {
                        loader: "record-webapck-loader",
                        options: {
                            writerPath: path.join(__dirname, "./test1.log"),
                            clean: true,
                        },
                    }
                ],
            },
        ]
    }
    ...
}
```
