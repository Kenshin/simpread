![Imgur](http://sr.ksria.cn/cover@jsbox.png)

## 官网

- <http://ksria.com/simpread/#jsbox>

## 下载地址

- **简悦** [下载地址](https://xteko.com/redir?url=http://sr.ksria.cn/jsbox/simpread-1.0.0.box?201805251238&name=%E7%AE%80%E6%82%A6) 
- **简悦 · 阅读器** [下载地址](https://xteko.com/redir?url=http://sr.ksria.cn/jsbox/simpread-reader.box?201805251238&name=%E7%AE%80%E6%82%A6%20%C2%B7%20%E9%98%85%E8%AF%BB%E5%99%A8)

## 简悦 iOS with JSBox 是什么

简悦 iOS 版（下称 简悦 ）属于 JSBox 的脚本，所以如果想要运行，需要先 [安装 JSBox](https://itunes.apple.com/cn/app/jsbox-%E5%88%9B%E9%80%A0%E4%BD%A0%E8%87%AA%E5%B7%B1%E7%9A%84%E5%B7%A5%E5%85%B7/id1312014438?mt=8)，关于 JSBox 是什么，请看这几篇文章：

- [JSBox: 一个创造工具的工具](https://sspai.com/post/42361)
- [JSBox 有大更新，带来自定义小组件等功能](https://sspai.com/post/43935)
- [不会写代码也能用 JSBox，我们为你整理了这些实用脚本](https://sspai.com/post/42962)

## 是否收费

简悦是免费产品，但需要安装 JSBox。

## 功能介绍

> 由于 iOS Safari 的一些局限性（浏览尺寸较小），目前简悦只具有 Chrome 版的如下功能：

- 简悦独有的阅读模式（ **主动适配、论坛类页面与分页的支持** ）包括如下情景：
  - 从 Safari 进入阅读模式；
  - 从任意 App 通过分享到 「打开阅读器」进入阅读模式；
- 导出到 Pocket / Evernote / 印象笔记 / Dropbox ；
- 导出 MD 到 Bear / Drafts 4 ( 需要系统已经安装对应的 App )
- 同步适配列表；
- 读取 Dropbox 的配置文件；（需要使用 Dropbox token ）
- 版本升级系统；

## 简悦 · 阅读器是什么

简单点说，通过任意 App 打开 iOS 分享到 **简悦 → 打开「阅读器」** 的话，可以主动进入阅读模式；

> 与 简悦 的区别是什么？

- 阅读器无法单独使用；
- 阅读器没有任何配置选项；
- 简悦只能通过 Safari 打开，但阅读器支持任意 App （通过分享）打开；
- 阅读器支持从剪切板直接进入阅读模式；（拷贝任意有效 URL 后，打开阅读器即可）

## 操作视频

- 初始化设定 [动图](https://i.imgur.com/oTD6Q7F.gif) [视频](http://sr.ksria.cn/setting@jsbox.mov)
- 安装简悦 · 阅读器 [动图](https://i.imgur.com/2qRdMJZ.gif) [视频](http://sr.ksria.cn/reader@jsbox.mov)
- 从 Safari 进入阅读模式 [动图](https://i.imgur.com/6xsd4dZ.gif) [视频](http://sr.ksria.cn/share%20to%20safari@jsbox.mov)
- 从任意 App 通过分享到 「打开阅读器」进入阅读模式 [动图](https://i.imgur.com/rShmzQu.gif) [视频](http://sr.ksria.cn/share%20to%20reader@jsbox.mov)
- 复制 URL 后直接打开 阅读器 [动图](https://i.imgur.com/qRKLCr0.gif) [视频](http://sr.ksria.cn/clipboard%20to%20reader@jsbox.mov)

## 配置指南

- 确保已 [安装 JSBox](https://itunes.apple.com/cn/app/jsbox-%E5%88%9B%E9%80%A0%E4%BD%A0%E8%87%AA%E5%B7%B1%E7%9A%84%E5%B7%A5%E5%85%B7/id1312014438?mt=8)；

- 通过（上面的）地址分别下载 简悦 以及 阅读器；

- 打开简悦的设定选项卡；_点击简悦右侧的 ▶ 并选择 **设定**_

  ![](https://i.imgur.com/EsyO9lDl.png)

- 按照下图步骤进行配置；
  ![](https://i.imgur.com/INY5Gj6l.png)

  1. 粘贴 Dropbox token 到输入框；_获取 Dropbox token 请看本文最下方 **如何获取 Dropbox token**_
  2. 点击 **从 Dropbox 读取你的配置文件** ； _以便获取其它导出服务的token_
  3. 点击 **同步适配列表**； _以便获取最新的适配列表_
  4. 如果已安装「阅读器」的话，请点击 **共享适配列表给阅读器** ；_建议每次同步更新后都需要操作一次_

通过上述步骤即可设置完毕，如何使用请看上面的操作视频。

## 下一步

- 支持更多的配置项，如：字体大小、主题、样式等；
- 支持更多的导出服务；
- 导出服务的配置项；

## 想说的话

非常感谢 JSBox 的缔造者 - 钟颖先生创造出这么有意思的产品，完全使用 JavaScript 就可以实现 iOS 的开发，甚至于都无需理会编译环境。

经过一段时间的使用发现，在 iPhone 上使用简悦的优势并不明显，一来受浏览尺寸所限，所以长时间阅读对眼睛是个考验；二来一些正规的网站在 iPhone 上面的浏览模式还算是「干净」，所以 Safari 自带的阅读模式也能胜任一些简单的阅读诉求；

既然这样的话，**为什么还需要 iOS 版呢？答案在：iPad 上** ，由于 iPad 的尺寸导致在它上面浏览页面的体验趋近于 PC 上面，在这种情况下更适合简悦，而且作为一个生产力工具的话，也非常符合简悦的定位。

所以：

- 如果你只是偶尔使用 Safari 的话，自带的阅读模式有可能够用；
- 如果你有在 iPad 作为生产力工具的话，简悦则是你最好的选择（之一）

***

## 与 Safari 自带的阅读模式区别

- Safari 无法完美的呈现 代码段、论坛类页面，如（知乎、贴吧）而简悦却可以胜任；
- 简悦支持高效的生产力，如导出到：Pocket / Evernote / 印象笔记 / Dropbox / Bear / Drafts 等；
- 简悦未来会支持更多「玩法」；

## 如何获取 Dropbox token

- 安装 [简悦 for Chrome](http://ksria.com/simpread/#download)；
- 打开 选项 → 共通 → 同步到你的 Dropbox _Chrome 版会自动授权_
- 打开 选项 → 高级设定 → 确保勾选 **同步时是否包含授权码** 
- 打开 选项 → 高级设定 → 授权管理 _请授权你常用的服务，目前 iOS 版仅支持：Pocket / Evernote / 印象笔记 / Dropbox_
- 打开 选项 → 共通 → 导出配置文件到本地；
- 同任意文本编辑器打开的导出文件，搜索 `dropbox` 复制对应的 `access_token` 即可；

## 触发器脚本

> JSBox 带有一个叫做 **触发器脚本** 的功能，简单的说就是当通过 点击 ![Imgur](https://i.imgur.com/yeskA2tm.jpg) 分享时自动弹出菜单，具体的设置如下：

![Imgur](https://i.imgur.com/37vkidgh.png)

## 一些对比图
知乎的前后对比  
![Imgur](https://i.imgur.com/xvBuenKm.jpg) ![Imgur](https://i.imgur.com/bxLL8eJm.jpg)

代码段的前后对比（与 Safari 阅读模式的对比）  
![Imgur](https://i.imgur.com/4mYO0shm.png) ![Imgur](https://i.imgur.com/rWK2ejVm.png) 