<p align="center"><img src="http://ojec5ddd5.bkt.clouddn.com/logo%20bigger.png" /></p>
<h1 align="center">简悦 - SimpRead</h1>
<p align="center">让你瞬间进入沉浸式阅读的 Chrome 扩展，还原阅读的本质，提升你的阅读体验。</p>
<p align="center">为了达到完美的阅读模式这个小目标 ，我适配了 120+ 个网站，因此诞生了简悦。</p>
<p align="center">
   <a href="https://github.com/kenshin/simpread/releases"><img src="https://img.shields.io/badge/lastest_version-1.0.0-blue.svg"></a>
   <a target="_blank" href="http://ksria.com/simpread"><img src="https://img.shields.io/badge/website-_simpread.ksria.com-1DBA90.svg"></a>
   <a target="_blank" href="https://chrome.google.com/webstore/detail/%E7%AE%80%E6%82%A6-simpread/ijllcpnolfcooahcekpamkbidhejabll"><img src="https://img.shields.io/badge/download-_chrome_webstore-brightgreen.svg"></a>
   <a href="http://ksria.com/simpread/crx/1.0.0/simpread.crx"><img src="https://img.shields.io/badge/download-_crx-brightgreen.svg"></a>

</p>

***

#### 主要功能一览：
- 阅读模式； `逐一适配了 120+ 个网站，并提取 标题  描述 正文 媒体资源（ 图片/ 视频 ） 等，生成 符合中文阅读 的页面`
- 聚焦模式； `只高亮需要阅读，并隐藏掉其余部分，不分散用户的注意力，适合 非适配阅读模式 的网站，或者 临时阅读`
- 站点编辑器； `可编程，定制化`，详细请看 [站点编辑器](https://github.com/Kenshin/simpread/wiki/%E7%AB%99%E7%82%B9%E7%BC%96%E8%BE%91%E5%99%A8)
- 多种主题； `白练、白磁、卯之花色、丁子色、娟鼠、月白、百合、紺鼠、黒鸢` 等
- 同步、上传/下载 配置、同步适配列表等；
- 稍后读；

#### 截图：
![简单阅读，愉悦心情！](http://ojec5ddd5.bkt.clouddn.com/visual%20effect.jpg)
![简悦 - 阅读模式](http://ojec5ddd5.bkt.clouddn.com/read%20mode.png)  
![简悦 - 阅读模式 · 控制栏界面](http://ojec5ddd5.bkt.clouddn.com/read%20mode%20controlbar.png)  
![简悦 - 阅读模式 · 设置界面](http://ojec5ddd5.bkt.clouddn.com/read%20mode%20setting.png)  
![简悦 - 设置界面](http://ojec5ddd5.bkt.clouddn.com/option.png)  
![简悦 - 稍后读](http://ojec5ddd5.bkt.clouddn.com/unread%20list.png)  

#### 照片集：
* <http://ksria.com/simpread/gallery/>

#### 详细功能：
![功能一览](http://ojec5ddd5.bkt.clouddn.com/feature.png)

#### 如何使用：

`简悦`会自动检测当前页面是否已经适配 `阅读模式` ，如适配则在浏览器右上角显示 ![Imgur](http://i.imgur.com/dyROEBi.png) （`聚焦模式` 会自动获取当前鼠标所在的段落并高亮，适合任意页面。）

- 点击浏览器右上角 `红色icon`；

- 右键选择 `简悦 - SimpRead` → `阅读模式`；

- 快捷键；（默认为 `双击 A` )

#### 投票：
* 简悦是一个免费并开源的项目。如果觉得不错，请给我 [投票](https://chrome.google.com/webstore/detail/%E7%AE%80%E6%82%A6-simpread/ijllcpnolfcooahcekpamkbidhejabll) 。这样让更多人使用 `简悦` 带来的便利，你的认可是对我最大的鼓励。

#### 下一步：
- [ ] 稍后读可以直接发送到 `Pocket`；  
- [ ] 增强型 `聚焦模式`；  
- [ ] 自行添加新的站点到 `阅读模式`；  
- [ ] 自定义主题；  

#### 相关链接：
* [更新日志](http://ksria.com/simpread/changelog.html)
* [Wiki](https://github.com/kenshin/simpread/wiki)
* [常见问题](https://github.com/Kenshin/simpread/wiki/常见问题)
* [反馈](https://github.com/kenshin/simpread/issues)
* [联系](http://kenshin.wang) | [邮件](kenshin@ksria.com) | [微博](http://weibo.com/23784148)
* 想了解简悦背后的故事？ [猛击这里](http://www.jianshu.com/p/2917e4e0169d)

#### 如何提交新的网址用于适配模式：
- 请提交网址 [到这里](https://github.com/Kenshin/simpread/labels/new%20site)；当我适配完成后关闭此 `issues`，之后通过 `简悦` → `选项` → `手动同步适配列表` 更新；
- 同样，你也可以直接提交已完成适配的代码，关于如何适配请看 [站点编辑器](https://github.com/Kenshin/simpread/wiki/%E7%AB%99%E7%82%B9%E7%BC%96%E8%BE%91%E5%99%A8)；

#### 感谢：
- [Node.js](https://nodejs.org/) · [NPM](https://www.npmjs.com)
- [Webpack](https://webpack.github.io/)
- [React](https://facebook.github.io/react)
- [ES6](http://es6-features.org/) · [Babel](https://babeljs.io)
- [PostCSS](http://postcss.org/) · [cssnext](http://cssnext.io/)
- [jQuery](https://jquery.com/) · [Mousetrap](https://craig.is/killing/mice) · [pangu.js](https://github.com/vinta/pangu.js) · [ProgressBar.js](https://kimmobrunfeldt.github.io/progressbar.js/) · [timego.js](http://timeago.org/) · [Velocity.js](http://velocityjs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Sketch](https://www.sketchapp.com/) · [Pixelmator](http://www.pixelmator.com/)
- Icon from <http://iconfont.cn>
- Mockup Design usage <http://magicmockups.com/>
- Material Design usage <https://material.io/guidelines/>

#### 许可：
[![license-badge]][license-link]

<!-- Link -->
[www-badge]:        https://img.shields.io/badge/website-_simpread.ksria.com-1DBA90.svg
[www-link]:         http://ksria.com/simpread
[version-badge]:    https://img.shields.io/badge/lastest_version-1.0.0-blue.svg
[version-link]:     https://github.com/kenshin/simpread/releases
[chrome-badge]:     https://img.shields.io/badge/download-_chrome_webstore-brightgreen.svg
[chrome-link]:      https://chrome.google.com/webstore/detail/%E7%AE%80%E6%82%A6-simpread/ijllcpnolfcooahcekpamkbidhejabll
[offline-badge]:    https://img.shields.io/badge/download-_crx-brightgreen.svg
[offline-link]:     http://ksria.com/simpread/crx/1.0.0/simpread.crx
[license-badge]:    https://img.shields.io/github/license/mashape/apistatus.svg
[license-link]:     https://opensource.org/licenses/MIT
