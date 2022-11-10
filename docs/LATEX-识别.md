LaTeX 识别
---

> 此功能最低要求 1.1.3 版本，如低于此版本，[请升级](https://simpread.pro) 到最新版本。

> 此功能属于 [词法分析引擎](词法分析引擎) 功能之一。

应该是 **第一个** 支持  LaTeX 的阅读模式，确保安装此版本后，访问 <http://akosiorek.github.io/ml/2017/10/14/visual-attention.html> 点击右上角红色 icon 或 快捷键，即可进入含有 LaTeX 公式的页面，如下图：

![](https://i.loli.net/2019/05/06/5ccfb7270f4db.jpg)

词法分析引擎做了如下的事情：

- 判断当前页面是否已在适配列表中；
- 自动提取当前页面的正文；
- 自动识别当前页面是否是 LaTeX 类型的页面；

## 引申阅读

- [如何完美解析含有 LateX 的页面](https://github.com/Kenshin/simpread/discussions/1553)

- [适配知乎公式](https://github.com/Kenshin/simpread/discussions/2861#discussioncomment-3341890)