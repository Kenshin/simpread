## 简悦 2.2.0.520 正在审核中

> 因 2.2.0 发布后产生了一些特殊情况下的通用性问题，所以我发布了 **520 补丁版**，用来解决这些通用性问题，520 版本正式发布后，我会在这里通知大家。

## 通用性问题

> 关于通用性错误的细节也可以看 **选项页 → 右下角 → 通知中心** 或 [这里](http://ksria.com/simpread/changelog.html#2.2.0)

- [如果你因为升级到简悦 2.2.0，但无法使用同步助手导出 PDF 的话，请看这里](https://github.com/Kenshin/simpread/issues/2154)
- [使用同步助手 1.0.1 导致 PDF 导出效果不佳的解决方案](https://github.com/Kenshin/simpread/issues/2191)
- [在使用导出服务时发生只导出了标题和描述（附解决方案）](https://github.com/Kenshin/simpread/discussions/2225)
- [任意页面自动进入阅读模式（附解决方案）](https://github.com/Kenshin/simpread/issues/2159)
- [有可能会引起无法使用维基百科的问题（附解决方案）](https://github.com/Kenshin/simpread/issues/2163)
- [如果发现无法使用导出功能（附解决方案）](https://github.com/Kenshin/simpread/issues/2178)
- [未启用标注模式无法复制的问题（附解决方案）](https://github.com/Kenshin/simpread/issues/2199)

## 一些 2.2.0 相关性的教程

> 下面的教程涵盖了：稍后读 · 导出的定制化 · 自动化 · 如何与双链笔记联动 等，下面列举一些，更多 [请看这里](https://github.com/Kenshin/simpread/discussions/categories/服务)。

- [如何让稍后读支持读取本地缓存](https://github.com/Kenshin/simpread/discussions/2146)

- [当产生标注时，如何自动同步到本地](https://github.com/Kenshin/simpread/discussions/2220)

- [通过定制化导出功能支持导入到任意双链笔记（如：将标注导入到 Obsidian 中）](https://github.com/Kenshin/simpread/discussions/2222)

- [当简悦变成你的知识库（离线且具有永久链接）](https://github.com/Kenshin/simpread/discussions/2221)

- [巧用浮动标注栏的导出功能，可方便与双链的笔记工具联动](https://github.com/Kenshin/simpread/discussions/1851)

- [将自动化服务变成你的导出服务](https://github.com/Kenshin/simpread/discussions/2151)

- [当产生标注时，如何同时下载标注与原文](https://github.com/Kenshin/simpread/discussions/2147)

- [利用此功能可方便在双链笔记中做永久的原文链接](https://github.com/Kenshin/simpread/discussions/2152)


## 更新日志

> 如果你想看 2.2.0 到底增加了哪些功能的话，可以看

1. [http://ksria.com/simpread/welcome/version_2.2.0.html](http://ksria.com/simpread/welcome/version_2.2.0.html)
2. [http://ksria.com/simpread/changelog.html](http://ksria.com/simpread/changelog.html)

## API 失败的情况

> 如果你在使用 API 导致失败的话，请做以下修改：

1. 请不要使用 Dropbox 作为同步盘
2. 请使用严格的目录结构 \`<支持的网盘>/SimpRead/simpread_config.json\` 👉  [如何开通](https://simpread.pro/api/#/README?id=如何开通)
3. 如果无法访问 [https://simpread.pro/developer](https://simpread.pro/developer) 请确保网络畅通即可。

**关于第一条的补充**

> 如果你仅使用 Telegram Bot 的话，可以设置 Dropbox 为同步盘。

## 后续

> Edge 版预计明后天提交，且直接为 **[2.2.0.520](http://ksria.com/simpread/changelog.html#2.2.0)**
