![](https://z3.ax1x.com/2021/11/25/oAVJSA.png)

> 每期周报都会推送到以下的渠道：

- [Telegram Channel](https://t.me/simpread/364)
- [RSS](https://rss.simpread.pro/feed)
- **简悦扩展端 → 选项页 → 通知中心**
- [竹白上的简悦专栏](https://simpread.zhubai.love)
- [知乎专栏](https://zhuanlan.zhihu.com/p/488399474)
- 微信 / 订阅时的信箱（通过竹白推送）

# 本期内容

> 因为基于 Local first，所以简悦跟本地双链笔记有很多 [联动方式](https://link.zhihu.com/?target=https%3A//github.com/Kenshin/simpread/discussions/2085)，简悦已经集合了 Hazel、DropIt、Keyboard Maestro、Quicker、uTools、Alfred、DEVONthink 并涵盖 Windows、Mac 下的大多数自动化流程工具。

## 利用 Pandoc 让简悦支持更多导出格式

![img](https://imgs.zhubai.love/7f7e9274e5eb45e7ae8bc4993b57e5f6.png)

简悦内置 Pandoc 方案，可以将正文导出任意 Pandoc 支持的格式，通过此方式可以支持更多的导出格式，尤其是需要 .docx 的用户。

使用场景

- [利用 Vivaldi + 微信读书 + 文件传输助手 + 简悦让你脱离微信体系](https://zhuanlan.zhihu.com/p/466532702)
- 配合 [批量导出](https://zhuanlan.zhihu.com/p/481352299) 可将任意的内容导出为需要的文件格式

> 详细说明请看 [利用 Pandoc + 简悦导出你想要的任何格式](https://zhuanlan.zhihu.com/p/483269257) 。 

## 利用 DropIt 的文件夹监控功能，助力简悦标注自动导出到你需要的双链笔记

![img](https://imgs.zhubai.love/0f45c1f04c4a4a6b8129e33376ff8a53.png)

Mac 用户 [利用 Hazel 可以做很多事情](https://link.zhihu.com/?target=https%3A//github.com/Kenshin/simpread/discussions%3Fdiscussions_q%3Dhazel)，如果你是 Windows 用户的话，可以试试 DropIt 能实现 Hazel 做到的效果。

通过 DropIt 监控简悦的输出目录（默认是 output 目录），当该目录中的内容发生变化时，自动触发复制动作，将新生成的 .md 标注文档从 SimpRead（output 目录）拷贝至 Logseq（pages 目录）。

> 此方式是 [简悦社区](https://t.me/simpread) 用户 [YazidLee](https://github.com/YazidLee) 的自动化方案，细节 [请看这里](https://zhuanlan.zhihu.com/p/485408070)  。

## 利用 Keyboard Maestro 的文件夹监控功能，将简悦标注导入到 Logseq

![img](https://imgs.zhubai.love/4a00d8facfae44c38c2412d01cceb2ef.png)

Keyboard Maestro 是 macOS 上非常卓越且老牌的自动化 App，它能将键盘的功能发挥到极致，同时还能代替很多软件，它通过一系列条件来触发一个个 Macro 藉此实现操作自动化的软件。

在简悦标注，标注后会将这个标注 md 自动转移到 Logseq 文件夹，就会出现下图所示的效果。

![img](https://imgs.zhubai.love/2666a5913c8c44c988256303ba72189a.png)

> 来自 [简悦社区](https://t.me/simpread) 用户 [Kun](https://link.zhihu.com/?target=https%3A//github.com/kchen0x) 的自动化方案，细节 [请看这里](https://zhuanlan.zhihu.com/p/485912750)  。

## 使用技巧

![img](https://imgs.zhubai.love/9f785fadc89e4363be99eef3a439f8ba.png)

如果你是印象笔记用户，使用它的剪藏会发现在正文识别上有一定的失败率，即便正常识别正文，但也可能包含一些不必要的内容，这时可以使用 [Live Editor](https://github.com/Kenshin/simpread/discussions?discussions_q=label%3A"live+editor") 来改善印象笔记的剪藏功能。

> 详细请看 [使用简悦改善印象笔记剪藏的正文识别能力以及适配印象笔记](https://zhuanlan.zhihu.com/p/474243241)  。

![img](https://imgs.zhubai.love/5621facd783f40a19c4cf4328d9af7b8.png)

很多产品都具有 Deeplink 功能，跟简悦相比来说，大部分的 App 使用了 URL Scheme 方案，因此只能在 Mac 上使用，且需要安装对应 App，不利于嵌入其中双链笔记的「传播」，而简悦的方式拥有如下优势：

1. 不依赖于 URL Scheme 方案，而使用了 http or https标准方案。
2. 无论是 **内部链接** 或 **外部链接**，对应的都是你本地（坚果云）的文件，可以做到真正意义的快照。

> 详细请看 [在简悦中标注，然后将标注的 Deeplink 一键复制到任意双链笔记](https://zhuanlan.zhihu.com/p/461605365)  。

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