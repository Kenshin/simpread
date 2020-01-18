> 此功能最低要求 1.0.4 如低于此版本，[请升级](http://ksria.com/simpread/) 到最新版本。

***

含义
---
只需要在页面加入特定的 `<meta>` 数据即可适配阅读模式，无需提交到 `适配列表`，也无需手动添加，详细操作，[请看这里](http://ksria.com/simpread/welcome/version_1.0.4.html#mate-read-mode)

如何适配
---

* 将 `<meta>` 写入到需要使用阅读模式的页面，如 [http://kenshin.wang/blog/#/posts/3](http://kenshin.wang/blog/#/posts/3)

* 访问上述页面时，右上角（ ↗ ）会出现 ![](https://camo.githubusercontent.com/6e63b46dcad5886bdfdfa405714f9c0502a1f3a1/687474703a2f2f692e696d6775722e636f6d2f6479524f4542692e706e67) ；

* 点击它（如同阅读模式的流程一样），即可进入阅读模式。

说明
---

目前简悦支持的 `<meta>` 包括：

* `simpread:name`
    标识，对应 [站点适配器](%E7%AB%99%E7%82%B9%E7%BC%96%E8%BE%91%E5%99%A8#%E5%AF%B9%E5%BA%94%E5%AD%97%E6%AE%B5) 的 `name` 字段，必填项。

* `simpread:title`
    标题，对应 [站点适配器](%E7%AB%99%E7%82%B9%E7%BC%96%E8%BE%91%E5%99%A8#%E5%AF%B9%E5%BA%94%E5%AD%97%E6%AE%B5) 的 `title` 字段，当 `未定义 或 为空` 时，自动获取 `<title>` 的数据。

* `simpread:url`
    匹配的 `URL`，支持 url 及 [minimatch](https://github.com/isaacs/minimatch/) 方式，当 `未定义 或 为空` 时，匹配当前页面。

* `simpread:desc`
    描述，对应 [站点适配器](%E7%AB%99%E7%82%B9%E7%BC%96%E8%BE%91%E5%99%A8#%E5%AF%B9%E5%BA%94%E5%AD%97%E6%AE%B5) 的 `desc` 字段，可为空。

* `simpread:include`
    高亮字段，对应 [站点适配器](%E7%AB%99%E7%82%B9%E7%BC%96%E8%BE%91%E5%99%A8#%E5%AF%B9%E5%BA%94%E5%AD%97%E6%AE%B5) 的 `include` 字段，必填项。

* `simpread:exclude`
    排除列表，对应 [站点适配器](%E7%AB%99%E7%82%B9%E7%BC%96%E8%BE%91%E5%99%A8#%E5%AF%B9%E5%BA%94%E5%AD%97%E6%AE%B5) 的 `exclude` 字段，可为空。

* `simpread:auto`
    描述是否自动进入阅读模式，当为 `“true”` 时才会自动进入阅读模式。

图示
---

![Imgur](https://i.imgur.com/Uy3ZAKp.png)

安全性
---

由于 [站点适配器](%E7%AB%99%E7%82%B9%E7%BC%96%E8%BE%91%E5%99%A8#%E5%AF%B9%E5%BA%94%E5%AD%97%E6%AE%B5) 的可编程性，其中 `title` `desc` `include` `exclude` 均支持 jQuery 查询语句、正则表达式 等方式，但 `<meta>` 只支持最基本的 `<tag>` 节点，为了安全性（防止 JS 注入）

## 动图

[![](https://camo.githubusercontent.com/d7fc0779cb71dce2daa545f409071b0066afc428/68747470733a2f2f692e696d6775722e636f6d2f466c35435032562e676966)](https://camo.githubusercontent.com/d7fc0779cb71dce2daa545f409071b0066afc428/68747470733a2f2f692e696d6775722e636f6d2f466c35435032562e676966)