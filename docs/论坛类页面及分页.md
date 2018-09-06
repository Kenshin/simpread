此功能最低要求 1.0.2 版本，如低于此版本，[请升级](http://ksria.com/simpread/) 到最新版本。
***

论坛类页面
---
> 通常情况，需要提取页面的正文都是整段内容的，但是像 `贴吧，知乎` 这类分段内容的页面不能单纯的使用之前的 `阅读模式`，所以简悦增加了一种新的页面类型：**论坛类页面**

分页
---
> 同样，无论是单页面还是论坛类页面都会有分页的情况，所以简悦的 `阅读模式` 也具有分页功能。（同时支持快捷键 <kbd>→ ←</kbd> 的翻页方式。）

如何新增/修改
---
具体可参考 [站点编辑器](%E7%AB%99%E7%82%B9%E7%BC%96%E8%BE%91%E5%99%A8)

#### 注意事项：

- 论坛类页面的 `高亮区域` 必须是 `[[{}]]` 结构；
- 头像的 `名称` 和 `地址` 必须保证同时设定；
- `前一页` 和 `后一页` 必须保证同时设定；

#### 参考：

```
{
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
    }
```

效果
---
> 动图请看 [这里](http://ojec5ddd5.bkt.clouddn.com/multi-page.gif)

![Imgur](http://ojec5ddd5.bkt.clouddn.com/multiple%20page.png)



