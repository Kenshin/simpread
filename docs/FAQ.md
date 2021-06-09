?> 当你遇到一些奇怪的问题，如：**无法绑定简悦高级账户**，或 **某些功能无法使用等问题**，请 [**访问这里查看**](https://github.com/Kenshin/simpread/discussions/categories/重要通知)。

目录
---

- [离线安装](#离线安装)

- [白名单](#白名单)

- [排除列表](#排除列表)

- [黑名单](#黑名单)

- [快捷键](#快捷键)

- [更新](#更新)

***

离线安装
---

进入 http://ksria.com/simpread/#downloads 选择 `离线下线`

![2018-09-06_111734.png](https://i.loli.net/2018/09/06/5b909cbfa516c.png)

- Widows  & Mac OS 系统

  > 将下载的 `simpread.zip` 解压缩到某个文件夹，再通过 **加载已解压的扩展程序** 来加载。
  >
  > 关联问题 [使用简悦离线版后经常消失的解决方案](https://github.com/Kenshin/simpread/discussions/1645)

- 在线下载 Chrome Webstore 方式

  >  进入 https://chrome-extension-downloader.com/ 复制 `https://chrome.google.com/webstore/detail/simpread-reader-view/ijllcpnolfcooahcekpamkbidhejabll` 到输入框，下载后拖拽到 `chrome://extensions` 即可。

白名单
---
> 含义跟黑名单相反，当关闭 `如果当前页面适配阅读模式，是否自动进入阅读模式？` 选项后会启动此功能，加入到列表中的 URL 将自动进入阅读模式。（ 但不影响手动操作 ）
>
> 支持 [右键菜单](右键菜单) 方式，也可通过 [URL 编辑器](右键菜单?id=url编辑器) 打开进行编辑。

**添加规则**

- 支持 URL 如： http://www.jianshu.com/p/2917e4e0169d
- 支持 [minimatch](https://github.com/isaacs/minimatch) 方案的 URL，如：`http://*.cnbeta.com/articles/*/*.htm`
- 支持 [站点编辑器 的 name](站点编辑器#对应字段)，如：  

![Imgur](https://i.imgur.com/DgQYFsn.png)

排除列表
---

> 即：黑名单。当选中 `如果当前页面适配阅读模式，是否自动进入阅读模式？` 会启动此功能，加入到列表中的 URL 将不会自动进入阅读模式。（ 但不影响手动操作 ）
>
> 支持 [右键菜单](右键菜单) 方式，也可通过 [URL 编辑器](右键菜单?id=url编辑器) 打开进行编辑。

![Imgur](http://i.imgur.com/dyROEBi.png) → 右键 → 选项 → 高级设定 → 排除列表 ，如图：
![Imgur](http://i.imgur.com/CdoZOkUl.png)

**添加规则**

- 支持 URL 如： http://www.jianshu.com/p/2917e4e0169d
- 支持 [minimatch](https://github.com/isaacs/minimatch) 方案的 URL，如：`http://*.cnbeta.com/articles/*/*.htm`
- 支持 [站点编辑器 的 name](站点编辑器#对应字段)，如：  
![Imgur](http://i.imgur.com/IFc5kAEl.png) 

黑名单
---
> 有别于排除列表，加入到黑名单中的网页将不会载入简悦的代码，而前者仅仅是无法自动进入阅读模式；
>
> 支持 [右键菜单](右键菜单) 方式，也可通过 [URL 编辑器](右键菜单?id=url编辑器) 打开进行编辑。

黑名单 **仅支持 URL 与 Host name**，如：`http://ksria.com/simpread/` 或者 `ksria.com` 或 `xxx.ksria.com`

快捷键
---
关于 快捷键支持 的FAQ，请 [访问这里](快捷键)

更新
---

包含了：扩展、配置文件、适配列表、插件等全部的更新，请 [访问这里](更新)