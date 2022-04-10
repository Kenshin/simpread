![](https://z3.ax1x.com/2021/11/25/oAVJSA.png)

> 每期周报都会推送到以下的渠道：

- [Telegram Channel](https://t.me/simpread/373)

- [RSS](https://rss.simpread.pro/feed)

- **简悦扩展端 → 选项页 → 通知中心**

- [竹白上的简悦专栏](https://simpread.zhubai.love)

- [知乎专栏](https://zhuanlan.zhihu.com/p/496081396)

- 微信 / 订阅时的信箱（通过竹白推送）

# 本期内容

> 本期周报以插件用法为主，仅介绍两个插件，它们均具有：不使用同步助手，无门槛上手的特点。

## 自动化辅助增强插件

![img](https://imgs.zhubai.love/813b7dd81e574c21a30dbdde547b1f59.png)

### 下载地址

https://simpread.ksria.cn/plugins/details/DH9l5jblPH

### 插件说明

简悦 2.2.0 版的自动化方案，只能监控：

- 加入稍后读
- 新建、更改、删除标注

这两个场景，此插件增加了新的监控模块：

- 稍后读标签变化
- 稍后读内容改变（监控稍后读编辑框的保存，包括：标题、描述、备注、外部引用）
- 标注的内容改变（监标注读编辑框的保存，包括：备注、外部引用）

以及

- 加入稍后读时对快捷键的支持
- 加入标注时（包括：删除和标注色的改变）对快捷键的支持

至此，自动化辅助增强基本上涵盖了简悦在稍后读、标注时的全部变化（增 / 删 / 改）。

### 使用场景

1. 加入稍后读 **自动导出到 Obsidian**
2. 对加入的稍后读更改标签时 **自动调用** [**Notion 辅助增强**](https://github.com/Kenshin/simpread/discussions/3572) 更新 Notion Page
3. 对标注的标签、备注修改时 **自动调用设置好的自动化方案**，如：导出 HTML
4. 对稍后读备注、外链修改时 **自动触发 XXXX**
5. 修改稍后读的标题后 **自动触发 XXXX**

更多使用场景例子 [请看这里](https://zhuanlan.zhihu.com/p/493691743)。

### 更多介绍

- [简悦插件：自动化辅助增强](https://zhuanlan.zhihu.com/p/490737372)
- [利用自动化辅助增强插件覆盖更多使用场景](https://zhuanlan.zhihu.com/p/493691743)

## 导入到 Notion 辅助增强

![img](https://imgs.zhubai.love/23ded8ad884a428383d8241697a3d3ba.png)

### 下载地址

https://simpread.ksria.cn/plugins/details/g60jwZEeqU

### 插件说明

增强导入到 Notion 的内容，包括：增加 favicon、题图、同步稍后读标签、添加自定义标签等功能。

![img](https://imgs.zhubai.love/7b161d86b7244b18b8991310f2a6376a.png)

### 导入标注

简悦支持将标注导入到 Notion，但此插件提供了比简悦导入服务更强大的导入方案，包括：

1. 原标注页面的结构
2. 标签、备注、外部引用的同步
3. 标注图片与代码段的同步
4. 稍后读元数据的同步

![img](https://imgs.zhubai.love/2640b13dfbb245e39d4821872b0c4a4f.png)

### 使用场景

1. 结合 [自动化辅助增强插件](https://github.com/Kenshin/simpread/discussions/3596)，当标注时自动导入到 Notion 中，如何配置 [请看这里](https://github.com/Kenshin/simpread/discussions/3596#discussioncomment-2441614)。
2. 将一篇文章通过标注将重点内容导入到 Notion，示例 [请看这里](https://simpreadpublish.notion.site/2-2-annote-89570bd0a78d4e848b6e4e9b56950432)。

### 更多介绍

关于此插件的更多介绍可以看：

- [导入到 Notion 辅助增强：从简悦导入到 Notion 后自动添加标签、来源等](https://zhuanlan.zhihu.com/p/486247311)
- [导入到 Notion 辅助增强 1.1.0 - 自动导入简悦的标注到 Notion](https://zhuanlan.zhihu.com/p/493864845)

## Live Editor 1.1.3 简易模式

![img](https://imgs.zhubai.love/1e97a9158dc4437fa548cdc37495fc5f.png)

### 地址

https://simpread.ksria.cn/plugins/details/y8Mai5IBwN

### 插件说明

简易模式，不改变正文结构，包括：代码高亮、图片对齐方案，仅提供最基本的文本编辑能力。

### 使用场景

- 存在代码高亮的情况时
- 只是想简单修改界面内容时

### 更多介绍

- [使用简悦改善印象笔记剪藏的正文识别能力以及适配印象笔记（同样适用于 Evernote 用户）](https://zhuanlan.zhihu.com/p/474243241)
- [阅读模式常用技巧汇总：重新高亮、手动模式、删除任意元素、Live Editor 等](https://zhuanlan.zhihu.com/p/460634483)
- [使用 Live Editor 助力任意 Web Cliper 的剪藏能力](https://zhuanlan.zhihu.com/p/458355807)
- [将需要的任意内容生成阅读模式并使用 Live Editor 进一步整理](https://zhuanlan.zhihu.com/p/448986968)
- [利用简悦插件 Live Editor 来助力你的双向链接笔记剪藏流程](https://zhuanlan.zhihu.com/p/412710060)

## 总结

利用自动化辅助增强插件，能将网页的信息更容易的导入到你需要的生产力工具，基本上覆盖了简悦的全部自动化使用场景。

作为 Notion 用户来说，自动化导入标注完全可以替代 Readwise.io 的导入 Notion 功能，将稍后读 / 页面的元数据以及 Notion 图床功能，基本上可以胜任某绿色笔记。

当阅读模式的页面仅需要简单修改时，使用 Live Editor · 简易编辑模式，可以不破坏页面结构，具有更轻量级的编辑特点。

***

# 小提示

1. 竹白上的简悦周报仅负责周报，而简悦大版本更新推送，不定期推送简悦技巧，用法，工作流等，仍以 [官方 Newsletter](http://newsletter.simpread.pro/ ) 为主，且永不改变。
2. 竹白上的内容除了每周的简悦周报外，也会聊聊其它的生产力工具。

# 如何订阅

> 建议使用微信订阅，请扫码下方二维码，邮箱订阅方式 [请看这里](https://simpread.zhubai.love/)。

![](https://cdn.jsdelivr.net/gh/23784148/upload-images@main/simpered/notice/weekly@zhubai_small.png)

# 订阅中心

> 包括：RSS / Telegram Channel 等多种订阅方案，欢迎 [前往订阅](https://simpread.pro/subscribe)。

![img](https://imgs.zhubai.love/d0e806ddd44c42018b77780e3e0f1e64.png)