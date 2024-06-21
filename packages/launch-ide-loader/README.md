# launch-ide-loader

### Installation

`npm i launch-ide-loader -D`

## Usage

### 在 webpack 编译阶段 通过自定义 loader 唤起 IDE(vscode，webstorm ....)

##### options.filename: 监控的文件，此文件维护 唤起的 ide 名字

```javascript
module.exports = {
    ....
    module: {
        rules: [
             {
                test: require.resolve("../xxx.js"),
                use: [
                    {
                        loader: "launch-ide-loader",
                        options: {
                            filename: path.resolve(__dirname, "./launchIde.js"),
                        },
                    }
                ],
            },
        ]
    }
    ...
}
```
