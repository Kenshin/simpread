> 此功能最低要求 2.1.0 版本，如低于此版本，[请升级](http://ksria.com/simpread/) 到最新版本。使用此此功能的前提是：**安装并激活 [简悦 ·  同步助手](Sync)的 [简悦 · 高级账户](高级账户)**。

***

目录
---
- [描述](#描述)

- [支持服务](#支持服务)

- [如何使用](#如何使用)

- [功能](#功能)

- [配置](#配置)

- [已知问题](#已知问题)

- [一些技巧](#一些技巧)


描述
---

> 为你的 RSS 阅读器 提供：**基于简悦的全文输出** 以及 **一键保存到简悦 · 稍后读**。

注意：**基于简悦的全文输出** 包括：**动态加载的页面** 及 **含有 LateX 的页面**，甚至 **代码高亮** 均可支持。

支持服务
---

1. https://feedly.com/
2. https://www.inoreader.com/  https://www.innoreader.com/
3. https://feedbin.com/

如何使用
---

> 此功能会自动识别上述支持的服务，并 **将两个 icon 注入到这些 RSS Reader 的工具栏**，融入其中。

1. Feedly

  [![BHQkPe.png](https://s1.ax1x.com/2020/11/09/BHQkPe.png)](https://imgchr.com/i/BHQkPe)
  
2. inoreader

  [![BHQYMn.png](https://s1.ax1x.com/2020/11/09/BHQYMn.png)](https://imgchr.com/i/BHQYMn)

3. Feedbin

  [![BHQcs1.png](https://s1.ax1x.com/2020/11/09/BHQcs1.png)](https://imgchr.com/i/BHQcs1)
  
功能
---

#### 全文输出（第一个 icon ）

> 结合简悦强大的词法分析引擎，可以将当前 RSS 的全部内容抓取并显示在支持的 RSS Reader 中。

注意：**基于简悦的全文输出** 包括：**动态加载的页面** 及 **含有 LateX 的页面**，甚至 **代码高亮** 均可支持，如下图：

[![BHhpLj.png](https://s1.ax1x.com/2020/11/09/BHhpLj.png)](https://imgchr.com/i/BHhpLj)

#### 发送到简悦的稍后读（第二个 icon ）

> 点击后可以将当前页面发送到简悦的稍后读


已知问题
---

1. 由于需要解析动态加载页面，所以全文抓取时间稍长。
2. 注入的 icons 会出现偶尔无法显示的问题（请重新加入这个 RSS Field 即可解决
3. Inoreader 中视图模式选择 **列表视图** 正常，选择其它视图，如 **扩展视图** 则无法显示，如下图：
   [![DaRSCF.jpg](https://s3.ax1x.com/2020/11/25/DaRSCF.jpg)](https://imgchr.com/i/DaRSCF)

一些技巧
---

可以将 [小书签](Bookmarklet) 加入到 Inoreader ，详细说明 [请看这里](https://github.com/Kenshin/simpread/issues/1421)