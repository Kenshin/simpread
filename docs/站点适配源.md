此功能最低要求 1.1.0 版本，如低于此版本，[请升级](http://ksria.com/simpread/) 到最新版本。
***

介绍
---
> `站点适配源` 是简悦独有的功能，通过精准适配不同的站点，用于简悦独有的阅读模式 。1.1.0 增加了适配源的 **管理功能** ，同时支持多个适配源规则，类似 uBlock 订阅的方式，通过社区的帮助增加更多的适配站点。

类别
---

- 官方（主）适配源
  > 无法删除，可自动更新，以及手动更新

  ![Imgur](https://i.imgur.com/OMvlna9.png)

- 站点集市适配源
  > 简悦用户自行提交的适配站点。

  ![Imgur](https://i.imgur.com/ObK47M4.png)

- 第三方适配源（官方次适配源）
  > 可以加载第三方适配源，类似 `uBlock 订阅` 概念，无法自动更新。

  ![Imgur](https://i.imgur.com/Q1Wg7wq.png)

- 本地适配源

  > 自行添加 或 从上两种适配源修改而来，又称 **自定义适配源**；

优先级
---
> 从高到低，本地适配源 → 官方（主）适配源 → 站点集市 → 第三方适配源

收录了哪些网址
---

- 可以通过 [站点集市](https://simpread.ksria.cn/sites/) 查看；


如何导入
---

#### 官方（主）适配源

- 手动更新；  
  操作步骤： `简悦` → `选项` → `手动同步适配列表`；
- 自动更新；  
  每个一段固定周期，`简悦` 会自动从网络下载最新的适配列表；

#### 官方（次）适配源以及第三方适配源

> 只能通过手动更新方式

- 加载官方适配列表  
  点击后，会加载官方（次）适配源；也可以在输入框中直接录入第三方适配源（ url 地址 ）

- 导入到适配列表  
  点击后，会将输入框的内容导入到 `简悦的适配列表`；

- 清除适配列表  
  只能清除 **官方（次）适配源以及第三方适配源** 的内容，而无法清除 **官方（主）适配源**

如何编写
---
> 只能是 json 文件，结构如下：

```
{
    "sites"  : [{
        "name"    : "cnbeta.com",
        "url"     : "http://*.cnbeta.com/articles/*/*.htm",
        "title"   : "[[{$('header.title h1').text()}]]",
        "desc"    : "[[{$('.article-summary').text()}]]",
        "include" : "<div class='article-content'>",
        "exclude" : [
            "<div class='clearfix'>",
            "<div class='rating_box'>",
            "[['<strong>[广告]活动入口:</strong>']]"
        ]
    },{
        "name"    : "tieba.baidu.com",
        "url"     : "https://tieba.baidu.com/p/",
        "avatar"  : [
            {"name" : "[[{$('.p_author_name')}]]"},
            {"url"  : "[[{$('.p_author_face').find('img')}]]"}
        ],
        "paging"  : [
            {"prev" : "[[{$('.pb_list_pager').find('.tP').prev().attr('href')}]]"},
            {"next" : "[[{$('.pb_list_pager').find('.tP').next().attr('href')}]]"}
        ],
        "title"   : "[[{$('.core_title_txt').text()}]]",
        "desc"    : "",
        "include" : "[[{$('.p_content')}]]",
        "exclude" : [
            "<span class='apc_src_wrapper'>",
            "<div class='save_face_bg_2'>"
        ]
    }]
}
```
上述字段对应的内容请看 [对应字段](%E7%AB%99%E7%82%B9%E7%BC%96%E8%BE%91%E5%99%A8#%E5%AF%B9%E5%BA%94%E5%AD%97%E6%AE%B5) [可编程包含](%E7%AB%99%E7%82%B9%E7%BC%96%E8%BE%91%E5%99%A8#%E5%8F%AF%E7%BC%96%E7%A8%8B%E5%8C%85%E5%90%AB) [可定制的内容](%E7%AB%99%E7%82%B9%E7%BC%96%E8%BE%91%E5%99%A8#%E5%8F%AF%E5%AE%9A%E5%88%B6%E7%9A%84%E5%86%85%E5%AE%B9)

如何使用自定义适配源
---

- 将此 json 放到网络中，地址如：`http://xxx.com/xxx.json` 并将此录入到下图的输入框中后点击 `导入到适配列表中` 即可导入。
  ![](https://i.imgur.com/Q1Wg7wq.png)

- 可以将此 json 加入到简悦的官方（次）适配源；（请看下方说明）

如何提交到简悦的官方（次）适配源
---

> 类似 uBlock 订阅的方式，提交适配源 [到这里](https://github.com/Kenshin/simpread/labels/origin)，审核通过后，会加入到 [简悦的官方（次）适配源](http://ojec5ddd5.bkt.clouddn.com/website_list_origins.json)