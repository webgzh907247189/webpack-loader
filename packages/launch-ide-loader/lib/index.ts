import * as fs from 'fs';
import * as loadUtils from 'loader-utils';
import { launchIDEConfig } from 'cus-utils';
// import * as vm from "vm";

export = function normal(source: string) {
    // @ts-ignore
    const _this: LoaderCTX = this;

    _this.cacheable && _this.cacheable();

    const cb = _this.async();

    const options = loadUtils.getOptions(_this) ?? {};
    const { filename, userGetUrl } = options;

    // 默认唤起 vscode
    let data = { ideName: 'vscode' };

    if (filename && typeof filename !== 'string') {
        throw new Error('filename 是监控文件 的路径');
    }

    if (userGetUrl && typeof userGetUrl !== 'function') {
        throw new Error('userGetUrl 必须要是一个 function');
    }

    // 如果存在需要被监控的文件, require 进来 且加载文件 替换默认 唤起的ide 配置
    if (filename && fs.existsSync(filename as string)) {
        // 加载 监控 自定义文件
        _this.addDependency(filename as string);

        delete require.cache[filename as string];
        data = require(filename as string);

        if (!data.ideName) {
            throw new Error(`${filename} 里面没有包含字段 ideName, ideName 是需要被唤起的 IDE 名字`);
        }

        // const context = vm.createContext({
        //   require,
        //   module,
        //   exports,
        // });
        // const script = new vm.Script(data);
        // const vmReturnData = script.runInContext(context);
    }

    const launchIdeStrScript = launchIDEConfig(data.ideName ?? 'vscode', userGetUrl as any as (a: string) => string);

    const str = ` 
        let script = document.createElement("script");
        script.type = 'text/javascript';
        script.innerHTML = ${JSON.stringify(launchIdeStrScript)};
        document.body.appendChild(script);
      `;

    cb(null, `${str};${source}`);
};
