<p align="center"><img src="http://sr.ksria.cn/logo%20bigger.png" /></p>
<h1 align="center">简悦 - SimpRead</h1>
<p align="center">让你瞬间进入沉浸式阅读的扩展，还原阅读的本质，提升你的阅读体验。</p>
<p align="center">为了达到完美的阅读模式这个小目标 ，我适配了 <a target="_blank" href="https://simpread.ksria.cn/sites/">数百种类型</a> 的网站，因此诞生了简悦。</p>
<p align="center">
   <a href="https://github.com/kenshin/simpread/releases"><img src="https://img.shields.io/badge/lastest_version-1.1.4-blue.svg"></a>
   <a target="_blank" href="http://ksria.com/simpread"><img src="https://img.shields.io/badge/website-_simpread.ksria.com-1DBA90.svg"></a>
</p>
<p align="center">
   <a target="_blank" href="https://chrome.google.com/webstore/detail/%E7%AE%80%E6%82%A6-simpread/ijllcpnolfcooahcekpamkbidhejabll"><img src="https://img.shields.io/badge/download-_chrome_webstore-brightgreen.svg"></a>
   <a href="http://ksria.com/simpread/crx/1.1.4/simpread.crx"><img src="https://img.shields.io/badge/download-_crx-brightgreen.svg"></a>
   <a target="_blank" href="https://addons.mozilla.org/zh-CN/firefox/addon/simpread"><img src="https://img.shields.io/badge/download-_firefox_addon-DD512A.svg"></a>
   <a target="_blank" href="https://greasyfork.org/zh-CN/scripts/39998"><img src="https://i.imgur.com/JFhxHeR.png"></a>
   <a target="_blank" href="https://xteko.com/redir?url=http://sr.ksria.cn/jsbox/simpread-1.0.2.box?201810231502&name=%E7%AE%80%E6%82%A6"><img src="https://i.imgur.com/zZeOllB.png"></a>
</p>

***

## 目录

* [下载](#马上使用)

* [入门指南](#入门指南)

* [主要功能一览](#主要功能一览)

* [全部功能](#全部功能)

* [如何使用](#如何使用)

* [简悦各平台版本之间的差异](#简悦各平台版本之间的差异)

* [截图](#截图)

* [提交新站](#提交新站)

* [投票](#投票)

* [相关链接](#相关链接)

* [贡献者](#感谢)

* [参与开发](#协作开发)

* [请杯咖啡](#请杯咖啡-)

* [开源列表](#简悦的诞生离不开它们)

* [许可](#许可)

***

## 马上使用
* [Chrome 应用商店](https://chrome.google.com/webstore/detail/%E7%AE%80%E6%82%A6-simpread/ijllcpnolfcooahcekpamkbidhejabll) 或者 [离线下载](http://ksria.com/simpread/crx/1.1.4/simpread.crx)

* [Firefox 扩展中心](https://addons.mozilla.org/zh-CN/firefox/addon/simpread) 

* [支持 UserScript 的浏览器](https://greasyfork.org/zh-CN/scripts/39998) 如：Apple Safari · Microsoft Edge · Opera · Dolphin 详细 [请看这里](https://github.com/Kenshin/simpread-little)

* [iPhone / iPad 版](https://xteko.com/redir?url=http://sr.ksria.cn/jsbox/simpread-1.0.0.box?201805251238&name=%E7%AE%80%E6%82%A6) 详细 [请看这里](http://ksria.com/simpread/docs/#/JSBox)

* [Android 版](http://ksria.com/simpread/docs/#/Android) 详细 [请看这里](http://ksria.com/simpread/docs/#/Android)

## 入门指南

* 简悦的内容较多，汇总到了一个页面 [新闻页](https://simp.red/news)

* 喜欢简悦，但不会用，对新手极度舒适的 [新手入门](http://ksria.com/simpread/guide)

* 参与讨论请加入 [Telegram 群](https://t.me/simpread)

* 想知道简悦的高级玩法，请看简悦的 [文档中心](http://ksria.com/simpread/docs/#)

* 更多联系方式请看 [相关链接](#相关链接)

## 主要功能一览
- [聚焦模式](http://ksria.com/simpread/docs/#/聚焦模式)  
  不改变当前页面的结构，仅仅高亮需要阅读的部分，不分散用户的注意力；适合 `临时阅读` 或者 `未适配阅读模式` 的网站

- [阅读模式](http://ksria.com/simpread/docs/#/阅读模式)  
  简悦 `原创` 功能，逐一适配了 [数百种类型](https://simpread.ksria.cn/sites/) 的网站，自动提取 `标题` `描述` `正文` `媒体资源（ 图片/ 视频 ）` 等，生成 `符合中文阅读` 的页面

  * 支持 [自动生成目录](http://ksria.com/simpread/docs/#/目录)  

  * 支持 [论坛类页面及分页](http://ksria.com/simpread/docs/#/论坛类页面及分页) 如：知乎 · 百度贴吧等

  * ![new纯色.png](https://i.loli.net/2018/09/05/5b8f718046acb.png) 支持 [代码段的高亮](https://github.com/Kenshin/simpread/issues/500)，包含了大部分常见的网站

  * 支持 [TXT 阅读器](http://ksria.com/simpread/docs/#/TXT-阅读器) · 支持 [LaTeX 解析](http://ksria.com/simpread/docs/#/LaTeX-阅读器) · [Markdown 阅读器](http://ksria.com/simpread/docs/#/Markdown-阅读器) 

  * 更符合 `中文阅读` 习惯的设置，包括：`字间距` `行间距` 等 以及 `自定义 CSS` ，详细请看 [自定义样式](http://ksria.com/simpread/docs/#/自定义样式)

- 主动适配  
  通过简单的一个步骤，就可以让 `非适配页面` 支持阅读模式，详细请看 [主动适配](http://ksria.com/simpread/docs/#/主动适配阅读模式) 以及 [操作](http://ksria.com/simpread/welcome/version_1.0.5.html#mate-read-mode)

- ![new纯色.png](https://i.loli.net/2018/09/05/5b8f718046acb.png) 智能适配  

  全新的 `词法分析引擎`，更智能、更精准的提取正文，辅以精准适配，任意网页均「不在话下」，不仅能自动识别出 Wordpress · Hexo · Ghost · Discuz 等博客 / 论坛的页面，甚至于只要是结构良好的页面，（无需适配）自动生成阅读模式，详细请看 [词法分析引擎](http://ksria.com/simpread/docs/#/词法分析引擎)

- ![new纯色.png](https://i.loli.net/2018/09/05/5b8f718046acb.png) 智能感知  

  当生成的阅读模式出现问题时，简悦会自动重新获取正文，详细说明请看 [智能感知](http://ksria.com/simpread/docs/#/智能感知)

- ![new纯色.png](https://i.loli.net/2018/09/05/5b8f718046acb.png) 手动框选适配  
  针对 `未适配` 或 `智能识别` 失败的情况，简悦可以使用手动框选的方式，生成阅读模式，详细请看 [手动框选](http://ksria.com/simpread/docs/#/手动框选) 

- 站点适配源  
  包括：`官方适配源` `第三方适配源` `站点集市适配源` `自定义适配源`，详细请看 [站点适配源](http://ksria.com/simpread/docs/#/站点适配源)

- 站点编辑器  
  页面任意元素，均可隐藏，`可编程，定制化`，详细请看 [站点编辑器](http://ksria.com/simpread/docs/#/站点编辑器)

- 站点管理器  
  可管理全部的适配站点，详细请看 [站点管理器](http://ksria.com/simpread/docs/#/站点管理器)

- 站点集市  
  上传并共享自己的适配站点，一键分享临时阅读模式，适配失败的站一键提交，详细请看 [站点集市](https://simpread.ksria.cn/sites)

- 插件系统  
  现在开始可以使用 JavaScript 编写基于 `简悦` 的插件了，更上线了 [插件中心](https://simpread.ksria.cn/plugins/) ，如何编写插件请看 → [说明文档](http://ksria.com/simpread/docs/#/插件系统)

- 多种主题  
  `白练、白磁、卯之花色、丁子色、娟鼠、月白、百合、紺鼠、黒鸢` 等

- 丰富的导出功能

  - 导出 [Markdown](https://github.com/Kenshin/simpread#感谢) · `HTML` · `PNG` · `PDF` · [epub](http://ksria.com/simpread/docs/#/发送到-Epub)

  - 发送阅读模式优化后的页面到 `Kindle`，详细配置 [请看这里](http://ksria.com/simpread/docs/#/发送到-Kindle)

  - 导出到 `Pocket` `Linnk` `Instapaper` 的功能，包括：`当前页面的链接` `稍后读`

  - 导出到生产力工具，包括：`坚果云` `语雀` `有道云笔记` `为知笔记` `Dropbox` `Notion` `Onenote` `Google Drive` `印象笔记 / Evernote`，详细请看 [导出到生产力](http://ksria.com/simpread/docs/#/导出到生产力工具)

- 同步 · 上传/下载 配置 · 同步适配列表 · [快捷键支持](http://ksria.com/simpread/docs/#/快捷键) 等；

- 高级定制，包括：`右键菜单` `控制栏可隐藏` `阅读进度可隐藏` `自动进入阅读模式` [白名单](http://ksria.com/simpread/docs/#/FAQ?id=白名单) 以及 [排除列表](http://ksria.com/simpread/docs/#/FAQ?id=排除列表) 等

- 稍后读

## 全部功能

<details>
  <img src="http://sr.ksria.cn/feature%201.1.4.png">
</details>

## 截图
![简单阅读，愉悦心情！](http://sr.ksria.cn/welcome-readme-1.png)

<details><summary>更多截图</summary>
  <img src="http://sr.ksria.cn/welcome-readme-2.png"/>
  <img src="http://sr.ksria.cn/welcome-readme-3.png"/>
  <img src="http://sr.ksria.cn/welcome-readme-4.png"/>
  <img src="https://i.loli.net/2019/06/26/5d12e86b976f450493.png"/>
  <img src="https://i.loli.net/2019/06/26/5d12e86bd9d6844696.png"/>
  <img src="https://i.loli.net/2019/06/26/5d12e86bde78615339.png"/>
  <img src="https://i.loli.net/2019/06/26/5d12e86c9468188114.png"/>
</details>

## 如何使用

> 简悦虽然拥有众多功能，但它支持 **开箱即用**，新手（不想折腾党）来说，只需要看懂下面两种操作即可。

### 阅读模式

> `简悦`会自动检测当前页面是否已经适配，如适配则在浏览器右上角显示 ![Imgur](http://i.imgur.com/dyROEBi.png) ，使用以下三种方式启动：

- 点击浏览器右上角 `红色icon`；

- 右键选择 `简悦 - SimpRead` → `阅读模式`；

- 快捷键；（默认为 双击 <kbd>A</kbd> )

- 简悦支持自动进入阅读模式，详细请看 [自动进入阅读模式](http://ksria.com/simpread/docs/#/自动进入阅读模式)

### 聚焦模式

> `聚焦模式` 会自动获取当前鼠标所在的段落并高亮，适合任意页面。

- 在需要高亮的区域，右键选择 `简悦 - SimpRead` → `聚焦模式`；

- 快捷键；（默认为 <kbd>A</kbd> <kbd>S</kbd> )

## 简悦各平台版本之间的差异

> 包括：Chrome / Firefox / 轻阅版（UserScript）/ JSBox ，请访问 [简悦 · 新闻页](https://www.notion.so/9c109ec145134297ab461f5b52dbadc7?v=ce94e37d8a794cfbbd39bf9dfaf9017a)

## 提交新站

* 方式1：通过 **提交到 站点集市** 的方式，详细请看 [站点管理器 · 上传](http://ksria.com/simpread/docs/#/站点管理器?id=上传)

* 方式2：通过 **提交 issues** 的方式（不要使用 `pr` 方式），请提交网址 [到这里](https://github.com/kenshin/simpread/labels/new%20site)；  
  > 当适配完成后关闭此 `issues`，之后通过 `简悦` → `选项` → `手动同步适配列表` 更新；

* 方式3：通过 **新增站点编辑器** 的方式（适合逐一添加单个新站），详细说明 [请看这里](http://ksria.com/simpread/docs/#/站点编辑器?id=如何新增修改)；

* 方式4：通过 **提交适配源** 的方式（适合同时添加多个新站），详细说明请看 [使用自定义适配源](http://ksria.com/simpread/docs/#/如何提交第三方适配源)；

* 更多说明请看 [站点编辑器](http://ksria.com/simpread/docs/#/站点编辑器) [站点管理](http://ksria.com/simpread/docs/#/站点管理器) [站点适配源](http://ksria.com/simpread/docs/#/站点适配源)；

## 投票
简悦是一个免费并开源的项目。如果觉得不错，请给我 [投票](https://chrome.google.com/webstore/detail/%E7%AE%80%E6%82%A6-simpread/ijllcpnolfcooahcekpamkbidhejabll/reviews) 。这样让更多人了解并受用与 `简悦` 带来的便利，你的认可是对我最大的鼓励。

## 相关链接
* [更新日志](http://ksria.com/simpread/changelog.html)

* [帮助中心](http://ksria.com/simpread/docs/#)

* [新手入门](http://ksria.com/simpread/guide)

* [常见问题](http://ksria.com/simpread/docs/#/FAQ)

* [反馈](https://github.com/kenshin/simpread/issues)

* [联系](http://kenshin.wang) · [邮件](kenshin@ksria.com) · [微博](http://weibo.com/23784148) · [Telegram 群](https://t.me/simpread)

## 感谢

[ksky521](https://github.com/ksky521) · [airycanon](https://github.com/airycanon) · [mikelei8291](https://github.com/mikelei8291) · [chenhbc](https://github.com/chenhbc) · [Nihility](https://github.com/NihilityT) · [WangLeto](https://github.com/WangLeto) · [SevenSteven](https://github.com/Seven-Steven) · [Leo](https://github.com/clinyong) · [Jonas · Gao](https://github.com/JonasGao) · [Cologler](https://github.com/Cologler) · [bgh](https://github.com/bldght) · [Ronglong Pu](https://github.com/PuRonglong)

## 协作开发

> Pull requests 方式：

* 请务必从 **develop** 分支开始；（ **注意：非 develop 分支的 pr 将不会被合并** ）

* Pull requests

* 如果需要合并的话，合并后我会通知你；（在下个版本发布时一起发布）

## 请杯咖啡 ☕
如果简悦可以解决你在阅读上痛点，提升 Web 端的阅读体验，可以请我喝杯咖啡，想必也是非常愉悦的事情。 :smile:  
_如发现下图显示不全，请直接访问 http://sr.ksria.cn/zhifu_m2.png_  
![支付](http://sr.ksria.cn/zhifu_m2.png)

## 简悦的诞生离不开它们
<http://ksria.com/simpread/docs/#/开源列表>

## 许可
[![license-badge]][license-link]

<!-- Link -->
[www-badge]:        https://img.shields.io/badge/website-_simpread.ksria.com-1DBA90.svg
[www-link]:         http://ksria.com/simpread
[version-badge]:    https://img.shields.io/badge/lastest_version-1.1.4-blue.svg
[version-link]:     https://github.com/kenshin/simpread/releases
[chrome-badge]:     https://img.shields.io/badge/download-_chrome_webstore-brightgreen.svg
[chrome-link]:      https://chrome.google.com/webstore/detail/%E7%AE%80%E6%82%A6-simpread/ijllcpnolfcooahcekpamkbidhejabll
[offline-badge]:    https://img.shields.io/badge/download-_crx-brightgreen.svg
[offline-link]:     http://ksria.com/simpread/crx/1.1.4/simpread.crx
[license-badge]:    https://img.shields.io/github/license/mashape/apistatus.svg
[license-link]:     https://opensource.org/licenses/MIT
