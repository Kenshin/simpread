> 此功能为 [同步助手 1.4.0 版](Sync) 功能，如低于此版本 [请升级](Sync?id=下载)。

# 描述

将你的稍后读转换为 RSS 并支持任意 RSS 阅读器订阅

# 地址

http://localhost:7026/rss/

# 预览

![](https://res.cloudinary.com/simpread/image/upload/v1759487948/config/ae85c0092d87c5654d78eed4f702ac3e.png)

# 默认源

当已经使用了 1.4.0 版的同步助手后，在浏览器打开 http://localhost:7026/rss/pubscribe 即可查看默认 RSS 源。（注意：使用前提是你已经产生了一些稍后读）

# 定制

1️⃣ 可根据规则将稍后读生成 RSS（如：当天 / 昨天等日期方式、通过标签生成方式等）

![](https://res.cloudinary.com/simpread/image/upload/v1759487972/config/79134fbf79cde69df710383c3b11049f.png)

2️⃣ 生成的内容可设置为：仅标注、仅正文（本地快照）、正文 + 标注

![](https://res.cloudinary.com/simpread/image/upload/v1759487996/config/d992864d4ef8d605edf9e47abc79fc7d.png)

3️⃣ RSS 源可选择原网页或本地快照

![](https://res.cloudinary.com/simpread/image/upload/v1759488016/config/f41bff9a4b2872e8dae4bffc6766eab3.png)

## 如何定制

留意下面的内容

![](https://res.cloudinary.com/simpread/image/upload/v1759488036/config/809be7547c700a66dff7c55f9fe02e90.png)

点击 5️⃣ 新建 RSS 源后，即可生成，同时出现在下图所示的位置

![](https://res.cloudinary.com/simpread/image/upload/v1759488057/config/ff3ccd6987050c901c8dfeb6301eba3d.png)

鼠标移动到此处时，会有相应功能，包括：编辑并保存名称、打开此 RSS 源、复制到剪切板、删除、编辑以及发布。

![](https://res.cloudinary.com/simpread/image/upload/v1759488081/config/c6a9cf75e1b9483ab88ae9456b59ba1f.png)

点击 **编辑** 会当前的 RSS 显示在下图，然后可以重新定制。

![](https://res.cloudinary.com/simpread/image/upload/v1759488099/config/b606122a53c58fff8b363101a7747602.png)

# 支持 RSS 阅读器

因发布为 `http://localhost:7026/rss/pubscribe?xxx` 形式，所以仅支持部分桌面端 RSS 阅读器，如：NetNewsWire、Vivaldi RSS 等。

如果你希望在线 RSS 阅读器使用，如：Inoreader、Feedly 等，请使用下面的 **发布** 功能。

# 发布

将你本地的 RSS 源发布到网络上，支持任意 RSS 订阅。

![](https://res.cloudinary.com/simpread/image/upload/v1759488126/config/4aa25266eb42c4958f349e9d363f5395.png)

## 如何使用

在任意存在的 RSS 源点击下图即可发布

![](https://res.cloudinary.com/simpread/image/upload/v1759488154/config/3fca6d7ded36896d1106863f302620e1.png)

视频演示

https://github.com/user-attachments/assets/adf26636-7719-4d83-a8a1-528505d82a7d

## 发布后的地址

当发布成功会你会得到类似的 RSS 地址 `https://feed.simpread.work/feed?id=xxxx` `xxx` 是你唯一的 ID

## 定制

![](https://res.cloudinary.com/simpread/image/upload/v1759488191/config/b9689afc0bed91a0518e04253b9916b3.png)

你可以根据时间来定时将稍后读 → RSS，目前仅支持正点且只能指定三个时间点，每个时间点用 , 分割，例如 `9, 13, 15` 即：每天 **9点 / 13点 / 15点** 发布 RSS。

除此之外，还支持手动方式，菜单栏同步助手 Icon → 将稍后读发布为 RSS

![](https://res.cloudinary.com/simpread/image/upload/v1759488236/config/df69970f605ec1a0625c0454e6a70fe6.png)

或者打开主窗体 → 服务 → RSS 输出

![](https://res.cloudinary.com/simpread/image/upload/v1759488259/config/7e7cb71e533fc6d446e9c6aa71e6bfbd.png)

## 注意

此方式可以将本地 RSS 源发布到简悦的服务器， RSS 的每次调用都会消耗带宽，所以请留意：

1️⃣ 最大不超过 `2MB` 的 RSS

2️⃣ 最大不超过 `50 条` 的 RSS 条目

3️⃣ 不支持每次添加稍后读后 `自动发布` RSS 的方式，仅支持 `定时或手动` 生成方式

上述限制仅为暂时，后续会根据实际情况开放更多的限制，如：`最大 size 限制` `最大 条目 限制` 等。
