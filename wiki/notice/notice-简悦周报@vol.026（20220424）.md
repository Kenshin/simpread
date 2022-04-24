![](https://z3.ax1x.com/2021/11/25/oAVJSA.png)

> 每期周报都会推送到以下的渠道：

- [Telegram Channel](https://t.me/simpread/381)

- [RSS](https://rss.simpread.pro/feed)

- **简悦扩展端 → 选项页 → 通知中心**

- [竹白上的简悦专栏](https://simpread.zhubai.love)

- [知乎专栏](https://zhuanlan.zhihu.com/p/504186032)

- 微信 / 订阅时的信箱（通过竹白推送）

# 本期内容

## 一个预告

因为下周会陆续发一些好玩的功能，因此开发时间占比较多，导致本周周报的内容较少。

你可以通过 [订阅中心的发布汇总](https://simpread.pro/subscribe) 或 [简悦的知乎专栏](https://www.zhihu.com/column/kenshin) 订阅最新简悦内容。（自然也包含下周的新功能）

## 新用户建议：如何更好的调教简悦的配置项

![img](https://imgs.zhubai.love/9f63c1f004ea4073a5866aac75d5f411.png)

用好「官方指导」让你的配置项事半功倍，解决当反复更改配置无故不生效的「问题」。

偶尔会在 Github Issues 上面看到有提问为什么配置项不生效的问题，经过我的调查大多数提问者都存在下面的情况：

- 开了 nnnn Tab，反复的在不同的 Tab 上修改。
- 频繁改动。（尤其是使用同步助手的自动同步时）

### 问题原因

1. 每个阅读模式都保存同一份配置文件，当修改后自动保存，就会出现反复覆盖配置项的情况，类似「同一个文本被不同的编辑器同一时间反复修改」的情况。
2. 为了提高同步助手的配置文件保存性能，不是每次操作都会保存，每次保存有个时间差的间隔（很短， 0.2m 左右且有算法支持），但还是存在一定误保存率，正常使用完全没问题，仅出现在频率保存配置项时。

### 解决方案

1. 不要同时多开多个 Tab 同时操作配置项，因为会互相覆盖配置。
2. 只开两个：一个选项页（A）；一个进入阅读模式的页面（B），即可。当 A 改动后刷新 B使其使用最新的数据；反之也一样。
3. 使用同步助手后，如果非常频繁的保存和设置项，就先关闭自动同步功能，等配置稳定了（毕竟不需要随时改动，只是配置一次），在开启自动同步，然后覆盖本地配置文件。

![img](https://imgs.zhubai.love/c18f05aa90934ee9b4e9836e6968db58.png)

### 进阶建议

1. 如果经常在输入框修改内容的话，尤其是多行输入框（常见场景：Markdown 模板）建议在其它文本编辑器修改，然后在粘贴回去，且要在输入框改动一次，刷新页面后确保生效。
2. 使用同步助手的用户，建议常开坚果云，当出现任何配置的问题时，利用坚果云的历史记录，可以确保还原到任意节点。

### 插件不生效（或没有插件触发器的用户）

这是一个简悦的 Bug，仅当使用同步助手的自动同步时出现，但并不会影响每个使用同步助手的用户，当出现此问题时：

1. 通过 [此教程](https://github.com/Kenshin/simpread/discussions/2342) 解决。
2. 暂时关闭自动同步，等插件设置完毕后再开启此功能。

> 详细说明请看 [新用户建议：如何更好的调教简悦的配置项（当反复更改配置无故不生效的解决方案）](https://zhuanlan.zhihu.com/p/502321961)⤴️

## 导入到 Obsdian 插件 1.2.0 · 自动导入标注

![img](https://imgs.zhubai.love/f25a13fc44fd4b529a285c456f7ded35.png)

### 特点

不使用 [同步助手](http://ksria.com/simpread/docs/#/Sync?id=导出服务) 方案，即可将标注导入到 Obsidian 指定位置，适合轻量级用户使用。

### 视频

欢迎关注在知乎或 B站上面关注简悦官方账户。

- [知乎视频](https://www.zhihu.com/zvideo/1500058891551858688)
- [B站](https://www.bilibili.com/video/BV19i4y1U7jQ/)

### 监控事件

当下面的操作被触发时，调用此插件。

1. 稍后读的加入、稍后读元数据的改变。
2. 标注的加入、删除。
3. 标注色、标注元数据的改变。

> 详细配置教程请看 [自动导入标注到 Obsidian · 不使用同步助手方案](https://simpread.zhubai.love/posts/2128393555537739776) ⤴️

## 使用计划任务将简悦导入到 Logseq 的文件汇总到当天日记

![img](https://imgs.zhubai.love/a746f8f99bd245dd88bec22a956aa5a0.png)

当导出时，复制文件到 Logseq 的文件夹中，然后追加标题信息到当天日记中去。若当天日记不存在，就新建一个再追加。

### 事情起源

事情起源于配置简悦与 Logseq 联动自动化的过程中。由简悦定制导出的 Markdown ，为了能够添加到 Logseq 的日记中，往往时使用反链接的方式，对于有精神洁癖的人而言，未免有些难受。

于是开始寻找更好的方式，比如导出的 Markdown 可以自动将文件放入 Logseq ，且把标题记录在当天日记中去。

查看 Logseq 的日记文件可以发现， Logseq 仅保存当天有内容的日记，且名称就是当天的日期。而没有内容的日记是没有对应的文件。

因此我们的自动化操作就很简单了：当导出时，复制文件到 Logseq 的文件夹中，然后追加标题信息到当天日记中去。若当天日记不存在，就新建一个再追加。

![img](https://imgs.zhubai.love/252a66ff199b486aaa5e6130f1e4c348.png)

> 来自 [简悦社区 ](https://link.zhihu.com/?target=https%3A//t.me/simpread)用户 [Guan810](https://link.zhihu.com/?target=https%3A//github.com/Guan810) 提供的自动化方案，详细请看 [使用计划任务将简悦导入到 Logseq 的文件汇总到当天日记](https://zhuanlan.zhihu.com/p/501044205)  ⤴️

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