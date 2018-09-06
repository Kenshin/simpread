此功能最低要求 1.1.0 版本，如低于此版本，[请升级](http://ksria.com/simpread/) 到最新版本。
***

含义
---

站点编辑器，下称 `SiteEditor`，为 `简悦` 特有的功能；具有 `可编程` `定制化` `在线同步更新` 等特点。

注意事项
---
- 某个网址如已适配 `阅读模式` 后，也同样适合 `聚焦模式`，后者只拥有 `高亮区域` 与 `排除列表`； 

如何同步适配列表
---
设定 → 手动同步适配列表
![](https://i.imgur.com/jktojeC.png)

如何新增/修改
---

- 阅读模式；  
  进入临时阅读模式，点击侧栏，设定 → 站点编辑器。
- 聚焦模式；  
  进入聚焦模式，点击侧栏，设定 → 站点编辑器。

如何删除
---

> 只有本地适配列表才能被删除，**官方（主）适配源** 与  **官方（次）适配源以及第三方适配源** 只能通过 [站点管理器](站点管理器) 删除。

可定制的内容
---

- 标识  
  必填  
- 标题  
  必填  
- 域名  
  必填  
- 描述  
  可为空
- 高亮区域  
  进入 `阅读模式` 后的正文；
- 隐藏列表  
- 自定义 CSS  
  可为空，可以为每个不同的适配源定制不同的样式；
- 头像的名称和地址  
  论坛页时必填
- 前一页和后一页  
  多个页面时必填

可编程包含
---

> 除了 `Html标签` 外，可编程的执行语句为 `[[ 包含的内容 ]]` ，目前支持的关键字包括： `{}` `''` `\\` `[]` 四种。

- `Html 标签`  
  支持的格式： `<HTML元素 [id|class="xxx"]>`，例如：
  ```
  <title>
  <section class='c-single-normal__title'>
  <div id='origin-content'>
  ```
  虽然以下格式也支持，但最好符合上述标准：
  ```
  <div id='origin-content clear'>
  <section class='c-single-normal__title' style='font-size: 14px;'>
  ```

- `[[{jquery 执行语句}]]`
  ```
  // 执行 $('meta[name=description]').attr('content')，返回字符串
  [[{$('meta[name=description]').attr('content')}]]
  ```

- `[['html 标签']]`
  ```
  // 隐藏掉正文中包含此 Html代码段 的内容
  [['<span>原创翻译，未经许可，禁止转载</span>']]
  ```

- `[[/正则表达式/]]`
  ```
  // 执行正则表达式，多用于：隐藏掉正文中包含此 src 的内容，一般针对与 <img> 图片
  // 注意语句中使用 \ 需要转移为 \\
  [[/src=\\S+(pixel)\\S+'/]]
  ```

- `[[[jQuery查询语句]]]`
  ```
  // 执行 $('.article-btn') 返回 jQuery 对象
  [[[$('.article-btn')]]]
  ```

对应字段
---

> [website_list.json](%E9%80%82%E9%85%8D%E7%AB%99%E7%82%B9%E5%88%97%E8%A1%A8) 对应的字段  

- `name`（标识）  
  必填，用于标识当前 url 的别名，相当于 `id`，例如：  
  ```
   minapp.ifanr.com
   news.ifanr.com
   issues.github.com
   mp.weixin.qq.com
  ```

- `url`（域名）  
  用于标识当前 url，支持两种形式：
  
   精准匹配：
   ```
   https://xxx.com/post/39411
   https://xxx.com/post/1243
   https://xxx.com/post/39411
   ```
  
   模糊匹配：
   > 支持 [minimatch](https://github.com/isaacs/minimatch) 由 [ksky521](https://github.com/ksky521) 提供
   ```
   http://*.cnbeta.com/articles/*/*.htm
   https://www.ithome.com/html/**/*/*.htm
   https://github.com/*/*/issues/*
   ```

- `desc`（描述）  
  选填，支持：`Html 标签` `[[{}]]`

- `include`（高亮）  
  必填，支持：`Html 标签` `[[{}]]` `[[[]]]`

- `exclude`（隐藏列表）  
  选填，Array 类型，支持： `Html 标签` `[['']]` `[[\\]]` `[[[]]]`

- `css`（自定义 CSS）  
  选填，支持 CSS 语句

- `name`（头像的名称）  
  论坛页页面必填，单页面是为空。头像的名称，仅支持 `[[{}]]` 

- `url`（头像的地址）  
  论坛页页面必填，单页面是为空。头像的地址，仅支持 `[[{}]]` 

- `prev`（前一页）  
  （选填）前一页，仅支持 `[[{}]]` 

- `next`（后一页）  
  （选填）后一页，仅支持 `[[{}]]` 


图示：
---

[![SiteEditor 图示](https://i.imgur.com/CnvWsC3.png)](https://i.imgur.com/CnvWsC3.png)