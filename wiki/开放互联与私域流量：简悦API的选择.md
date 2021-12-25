> 原文地址 [simpread.zhubai.love](https://simpread.zhubai.love/posts/2075570800953778176)

记得小时候，那个龟速互联网时代，经常在雅虎的黄页上发现各种好玩的网站，查看各种信息，通过华军下载各种各样的软件。

再之后，有了搜索就更方便了，什么都能搜索到。

再后来，不知不觉间：

*   打开知乎提示我需要登录它的 App 才能一窥全文。

*   想在淘宝买东西，只能在淘宝上搜索。

*   想在微信发淘宝链接，不知道什么时候链接变成了淘口令。

*   下个软件，首先想到的是 App store，各种 Store。

现在，从一个浏览器「逛遍全世界」变成了一个个不同的 App「逛遍全世界」。

![](https://imgs.zhubai.love/c98193f32908401ebc4874616ddcc25e.jpeg)

私域流量，币圈，元宇宙，越来越多听不懂的词汇出现在这个开放互联的万维网上...

从一个 Email 走天下，到一个手机号走天下，一个微信走天下的当下，丢手机竟然成了比丢身份证更加麻烦和不能容忍的事情。

> ﻿[一定要小心「数据孤岛」, 一旦形成后就没法迁移](https://zhuanlan.zhihu.com/p/348520757)⤴️

![](https://imgs.zhubai.love/ac942b7765794fb891750b29ed03a627.jpeg)

不止如此，也不知道什么时候开始，A 家产品很容易的导入 B 家产品，但 A 家产品只能在 A 家用。

![](https://imgs.zhubai.love/447539dcc2eb4325be0b1971be9ef0b7.png)

为此，你不得掌握一定的避坑能力，免受迁移之苦。

> ﻿[本地存储 + 线上获取：我的个人数据库建构路径](https://sspai.com/post/69972) ⤴️

![](https://imgs.zhubai.love/f07c5fb13ef24b3da50d5da631ec8aa9.png)

> 可能是小时候那种场景让我历历在目吧，所以简悦走了一条跟大多数产品格格不入的道路：

1.  拥抱开放，简悦不设置任何私有文件格式，并只支持共有文件格式。

2.  本地优先，你的数据全部在你的本地，未经授权下，无法得到你的 1KB 数据。

3.  无登录系统，不需要你的手机号，微信号，甚至也不必使用 Email，仅凭 UID（密钥）登录。

4.  支持 API 导入，支持 API（ Webhook ）导出。

5.  不强制要求用户留在简悦中，跟 Pocket / Intapaper / Raindrop / Pinboard 都可以完美的搭配使用。

![](https://imgs.zhubai.love/5dab5a778b754d88bd6bbc89bf5958e0.png)

> 基于上面对简悦的开放性特点，在开发 [简悦 API 2.0](https://zhuanlan.zhihu.com/p/427784304) ⤴️ 后，衍生出多种使用方式。

## 导入 RSS

> 通过 API 将简悦作为你的 RSS 阅读器（包括快照）

*   ﻿[将简悦变成你的 RSS 阅读器（自动下载快照到本地）](https://zhuanlan.zhihu.com/p/431705193) ⤴️

## 联动 Inoreader

> 将 Inoreader 的某个条目加星操作，然后这个 URL 对应的快照就会出现在你坚果云的相应文件夹中，同时也会出现在简悦的稍后读中，而后方便你在稍后读中对它进行二次加工。

*   ﻿[Inoreader 加星后自动保存到简悦的稍后读以及生成本地快照](https://zhuanlan.zhihu.com/p/429713070) ⤴️
*   Inoreader 打星的文章生成 RSS 再导入到简悦的方式。（利用上面的方法）

## 利用简悦 + Inoreader 做信息筛选的方案

> 来自简悦用户的投稿，非常不错的工作流的文章。

*   ﻿[[用户投稿] 我的信息收集 / 过滤系统](https://zhuanlan.zhihu.com/p/430740444)﻿ [](https://zhuanlan.zhihu.com/p/430740444) ⤴️

## 订阅 Newsletter 并自动保存到简悦

> 如果是 Newsletter 与简悦深度用户的话，请试试这个方法，可以实现 Inoreader Pro 自带的邮箱收取 Newsletter 的功能。

*   ﻿[订阅 Newsletter 后自动保存到简悦的稍后读](https://zhuanlan.zhihu.com/p/435912124) ⤴️

## 生成自己的分享页

> 通过 Airtable，你可以将收藏的 URLs 分享出来，成为属于自己的链接收藏集。

*   ﻿[利用简悦 Webhook + Airtable 实现 No-code 低成本构建自己的公开分享集](https://zhuanlan.zhihu.com/p/429270637) ⤴️

## 从 Pinboard / Pocket / Instapaper / Raindrop 导入到简悦

> 简悦从不强制要求用户留在自己的体系中，所以你仍可以使用自己喜欢的 App，只是将本地快照功能交给简悦。

*   ﻿[保存到 Pinboard.in 同时也保存到简悦（包括本地快照）](https://zhuanlan.zhihu.com/p/432514888) ⤴️

*   ﻿[Instapaper 加星后自动保存到简悦的稍后读（包含快照）](https://github.com/Kenshin/simpread/discussions/3034) ⤴️

*   ﻿[加入 Pocket 后自动保存到简悦的稍后读（包含快照）](https://github.com/Kenshin/simpread/discussions/3024) ⤴️

*   ﻿[Raindrop.io 加星后自动导入到简悦并生成本地快照](https://github.com/Kenshin/simpread/discussions/3021) ⤴️

## 导入到 Telegram Channel

> 将稍后读导入到 Telegram Channel，并使用 Telegram RSS bot，打造你专属信息获取渠道。

*   ﻿[导入到 Telegram Channel](https://github.com/Kenshin/simpread/discussions/3092) ⤴️

## 导入到飞书群

> 飞书群跟很多其它 IM 最大的区别是：它支持 API 甚至是 Webhook，所以此功能才得以实现，非常难能可贵。如果你经常使用飞书的话，也可以使用飞书群来作为你的信息获取渠道。

*   ﻿[导入到飞书群](https://github.com/Kenshin/simpread/discussions/3104) ⤴️

# 最后

> 用一名句点评，希望快点到来。

![](https://imgs.zhubai.love/967fa0b20f4243b1ac67bea4dcf61aee.jpeg)
