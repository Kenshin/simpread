> 此功能最低要求 1.1.4 版本，如低于此版本，[请升级](http://ksria.com/simpread/) 到最新版本。

## 白名单

> 含义跟黑名单相反，当关闭 `如果当前页面适配阅读模式，是否自动进入阅读模式？` 选项后会启动此功能，加入到列表中的 URL 将自动进入阅读模式。（ 但不影响手动操作 ）
>
> 支持 [右键菜单](右键菜单) 方式，也可通过 [URL 编辑器](右键菜单?id=url编辑器) 打开进行编辑。

**添加规则**

- 支持 URL 如： http://www.jianshu.com/p/2917e4e0169d
- 支持 [minimatch](https://github.com/isaacs/minimatch) 方案的 URL，如：`http://*.cnbeta.com/articles/*/*.htm`
- 支持主域名，如：  `sspai.com` `google.com` 等
- 支持正则表达式，e.g. `[[/https:\\/\\/movie.douban.com\\/subject\\/\\d+\\/?/]]`

## 排除列表

> 即：黑名单。当选中 `如果当前页面适配阅读模式，是否自动进入阅读模式？` 会启动此功能，加入到列表中的 URL 将不会自动进入阅读模式。（ 但不影响手动操作 ）
>
> 支持 [右键菜单](右键菜单) 方式，也可通过 [URL 编辑器](右键菜单?id=url编辑器) 打开进行编辑。

![Imgur](http://i.imgur.com/dyROEBi.png) → 右键 → 选项 → 高级设定 → 排除列表 ，如图： ![Imgur](http://i.imgur.com/CdoZOkUl.png)

**添加规则**

- 支持 URL 如： http://www.jianshu.com/p/2917e4e0169d
- 支持 [minimatch](https://github.com/isaacs/minimatch) 方案的 URL，如：`http://*.cnbeta.com/articles/*/*.htm`
- 支持主域名，如：  `sspai.com` `google.com` 等
- 支持正则表达式，e.g. `[[/https:\\/\\/movie.douban.com\\/subject\\/\\d+\\/?/]]`

## 黑名单

> 有别于排除列表，加入到黑名单中的网页将不会载入简悦的代码，而前者仅仅是无法自动进入阅读模式；
>
> 支持 [右键菜单](右键菜单) 方式，也可通过 [URL 编辑器](右键菜单?id=url编辑器) 打开进行编辑。

**添加规则**

- 支持正则表达式，e.g. `[[/https:\\/\\/movie.douban.com\\/subject\\/\\d+\\/?/]]`
- 支持 URL，e.g. `http://ksria.com/simpread/` 
- 支持主域名，e.g.   `sspai.com` `google.com` 等

## URL编辑器

在进入阅读模式后，增加一个快捷加入  [黑名单](#黑名单)  [白名单](#白名单)  [排除列表](#排除列表) [延迟加载](词法分析引擎?id=延迟加载) 的界面。

### **如何开启**

> 选中下图所示，即可开启此功能。

[![yr4QQx.png](https://s3.ax1x.com/2021/02/13/yr4QQx.png)](https://imgchr.com/i/yr4QQx)

通过   [右键菜单](右键菜单) 打开后，当使用  [黑名单](FAQ?id=黑名单)  [白名单](FAQ?id=白名单)  [排除列表](FAQ?id=排除列表) [延迟加载](词法分析引擎?id=延迟加载) 时会激活此界面。

![lzrEjJ.png](https://s2.ax1x.com/2020/02/01/18W04P.png)

### **支持**

- 正则表达式  `[[/<正则表达式>/]]`  e.g. `[[/https:\\/\\/movie.douban.com\\/subject\\/\\d+\\/?/]]` 对应了  `movie.douban.com`
- 主域名 `e.g. google.com`
- Minimatch 适配规则 `e.g. https://www.ifanr.com/app/*`
- URL `e.g. https://www.ifanr.com/app/1271889`

