目录
---
- [离线安装](#离线安装)

- [白名单](#白名单)

- [排除列表](#排除列表)

- [黑名单](#黑名单)

- [快捷键](#快捷键)

- [阅读模式无法正常](#%E6%9F%90%E4%BA%9B%E7%AB%99%E7%82%B9%E5%B7%B2%E7%BB%8F%E9%80%82%E9%85%8D%E4%BA%86%E9%98%85%E8%AF%BB%E6%A8%A1%E5%BC%8F%E4%BD%86%E6%97%A0%E6%B3%95%E6%AD%A3%E5%B8%B8%E6%98%BE%E7%A4%BA%E7%9A%84%E9%97%AE%E9%A2%98)

- [阅读模式/快捷键的冲突](#%E9%98%85%E8%AF%BB%E6%A8%A1%E5%BC%8F%E5%BF%AB%E6%8D%B7%E9%94%AE%E7%9A%84%E5%86%B2%E7%AA%81)

- [自定义样式](#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A0%B7%E5%BC%8F)

- [授权服务](#%E6%8E%88%E6%9D%83%E6%9C%8D%E5%8A%A1)

- [发送到 Kindle](#%E5%8F%91%E9%80%81%E5%88%B0-kindle)

- [更新](#更新)

***

离线安装
---

进入 http://ksria.com/simpread/#downloads 选择 `离线下线`

![2018-09-06_111734.png](https://i.loli.net/2018/09/06/5b909cbfa516c.png)

- Widows  & Mac OS 系统

  > 将下载的 `simpread.crx` 拖拽到  `chrome://extensions/` 即可。

- 在线下载 Chrome Webstore 方式

  >  进入 https://chrome-extension-downloader.com/ 复制 `https://chrome.google.com/webstore/detail/simpread-reader-view/ijllcpnolfcooahcekpamkbidhejabll` 到输入框，下载后拖拽到 `chrome://extensions` 即可。

白名单
---
> 含义跟黑名单相反，当关闭 `如果当前页面适配阅读模式，是否自动进入阅读模式？` 选项后会启动此功能，加入到列表中的 URL 将自动进入阅读模式。（ 但不影响手动操作 ）

添加规则
- 支持 URL 如： http://www.jianshu.com/p/2917e4e0169d
- 支持 [minimatch](https://github.com/isaacs/minimatch) 方案的 URL，如：`http://*.cnbeta.com/articles/*/*.htm`
- 支持 [站点编辑器 的 name](站点编辑器#对应字段)，如：  

![Imgur](https://i.imgur.com/DgQYFsn.png)

排除列表
---

> 即：黑名单。当选中 `如果当前页面适配阅读模式，是否自动进入阅读模式？` 会启动此功能，加入到列表中的 URL 将不会自动进入阅读模式。（ 但不影响手动操作 ）
![Imgur](http://i.imgur.com/dyROEBi.png) → 右键 → 选项 → 高级设定 → 排除列表` ，如图：
![Imgur](http://i.imgur.com/CdoZOkUl.png)

添加规则：
- 支持 URL 如： http://www.jianshu.com/p/2917e4e0169d
- 支持 [minimatch](https://github.com/isaacs/minimatch) 方案的 URL，如：`http://*.cnbeta.com/articles/*/*.htm`
- 支持 [站点编辑器 的 name](站点编辑器#对应字段)，如：  
![Imgur](http://i.imgur.com/IFc5kAEl.png) 

黑名单
---
> 有别于排除列表，加入到黑名单中的网页将不会载入简悦的代码，而前者仅仅是无法自动进入阅读模式；

黑名单仅支持 URL 与 hostname，如：http://ksria.com/simpread/ 或者 ksria.com 或者 xxx.ksria.com

快捷键
---
关于 快捷键支持 的FAQ，请 [访问这里](快捷键)

某些站点已经适配了阅读模式，但无法正常显示的问题
---

[站点编辑器](站点编辑器) 使用了 URL 适配规则，加入相同规则的 URL 对应页面的结构如果不相同，如：  

> http://www.jianshu.com/p/2917e4e0169d  
> http://www.jianshu.com/p/2917e4e0169de

就会出现如下界面：  
![2018-09-06_112547.png](https://i.loli.net/2018/09/06/5b909e9e8e34f.png)

目前这种情况的解决办法：

- 【更新】 -  点击后会自动查找更新（但不一定能成功，查找失败后，会建议提交此站）
- 【高亮】 -  点击会通过高亮区域，进入 [临时阅读模式](临时阅读模式)

阅读模式/快捷键的冲突
---
> 由于简悦的 `阅读模式` 为了防止 `CSS 干扰`，所以并没有在 `<body>` 而是在 `<html>` 节点下，所以基于判断 `<body>` 节点下的扩展在阅读模式下都不好用，这些扩展包括：
- 划词搜索类（主要是翻译类为主）
- 快捷键类，如 `cVim` `vimium` 等；

解决方案：
> 可以去 [插件中心](https://simpread.ksria.cn/plugins)，看看是否有替代的，例如：[划词翻译](https://simpread.ksria.cn/plugins/details/ohnTKVHz4a) [Lightbox](https://simpread.ksria.cn/plugins/details/VQOZdNET2d) 等，同时简悦支持了大量的 [快捷键](快捷键) 操作，也能在一定程度上解决快捷键的问题。

更新
---

包含了：扩展、配置文件、适配列表、插件等全部的更新，请 [访问这里](更新)

自定义样式
---
关于 自定义样式 的FAQ，请 [访问这里](%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A0%B7%E5%BC%8F)

授权服务
---
关于 授权服务 的FAQ，请 [访问这里](%E6%8E%88%E6%9D%83%E6%9C%8D%E5%8A%A1)

发送到 Kindle
---
关于 发送到 Kindle 的FAQ，请 [访问这里](%E5%8F%91%E9%80%81%E5%88%B0-Kindle)
