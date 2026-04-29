> [!WARNING]
> 2022年12月6日开始，Notion API 调整导致扩展端功能无法导入到 Database Page，原因细节 [请看这里](https://github.com/Kenshin/simpread/issues/4849)。
> 为了避免这种情况反复发生的被动，所以简悦官方推出了：**导入到 Notion 插件**，用插件的方式来替代原来的内置在扩展端的功能。

下表是插件端与扩展端的区别

|        | 快捷键         | 图床 | 加入稍后读时自动导入 | 自动化 | 可更改导入 Page | 支持 Notion 辅助增强插件 | 稍后读内是否可用                |
| ------ | -------------- | ---- | -------------------- | ------ | --------------- | ------------------------ | ------------------------------- |
| 扩展端 | <kbd>s r n t</kbd>      | ✓    | ✓                    | ✓      | ✕               | ✓                        | ✓（无法使用 Notion 辅助增强插件） |
| 插件端 | <kbd>n t</kbd> | ✓    | ✓                    | ✓      | ✓               | ✓                        | ✕                               |

***

> 导入全文（含标注色）到 Notion，并支持题图、Favicon、稍后读标签、自定义标签、标注的一站式导入工具。

## 全新 2.0 版

在 2024 年 11 月 16 日，Notion 私有 API 再次出现无法使用的问题，这让我决定**彻底弃用 Notion 私有 API 方案，转向公开 API 方案。**

当你看到这些内容时，**安装的 Notion 插件已是全新的 2.0 版**，由于采用了公开 API，因此不会再出现无法使用的情况。

下面的功能全部以 2.0 版本为描述。

## 特色

与其他同类产品相比，**简悦凭借其出色的阅读模式，可以更精准地将全文导入到 Notion**。

由于采用了公共 API，解决了 1.0 版本无法无法正确转换 LaTeX 公式的问题，并提供更安全简便的一键授权方式（相比私有 API，避免了账户泄漏风险）。

此外，还支持以下功能：

- 在 Notion Page 显示描述、题图、Favicon、来源、标签、备注
- 内置图床
- 导入带标注颜色的全文[查看效果](https://simpreadpublish.notion.site/150907a65f588120b3c4de0e61cf9ad4)
- 导入标注（支持三种方式）
- 支持超长文章的导入、[知乎公式](https://simpreadpublish.notion.site/Random-Fourier-Features-156907a65f5881369b70c4e096f14229)、[表格及包含大量代码段](https://simpreadpublish.notion.site/ADB-156907a65f5881f6bfbac02cca3d3573?pvs=74)（使用私有 API 的产品都存在无法使用的问题）

## 导入效果

https://simpreadpublish.notion.site/150907a65f5881c0b4dad5ef1f635929?v=150907a65f588123b43e000cbd0e8897&pvs=74

## 配置库

[简悦 · 配置库](https://www.yuque.com/kenshin/simpread/ds8zk0) 是简悦官方推出的一套针对新用户的极简配置方案，方便新用户用最快的方式使用简悦的各种高级服务，配置库内置了常用的双链笔记用法，如：Notion、Obsidian、Logseq、Roam Research，同时包含了简悦在阅读模式上的一些常规插件：Live Editor、题图、Safari 阅读模式等。

如果你需要使用简悦 + Notion 的话，可以直接看此配置库。

此处为语雀内容卡片，点击链接查看：https://www.yuque.com/kenshin/simpread/mwda8s

## 介绍

导入到 Notion 相关功能分为两个插件：

1. [导入到 Notion 插件](https://simpread.ksria.cn/plugins/details/OpaogjT8KJ)
2. [导入到 Notion 辅助增强插件](https://simpread.ksria.cn/plugins/details/g60jwZEeqU)

## 功能

1️⃣ 可导入当前页面的题图、Favicon、来源等。

![image-20241209163441493](https://res.cloudinary.com/simpread/image/upload/v1733733284/config/72bb172e100de03b716388ea57422d85.png)

2️⃣ 导入正文到 Notion，因为使用了公开 API，所以可以完美适配 [知乎公式](https://simpreadpublish.notion.site/Random-Fourier-Features-156907a65f5881369b70c4e096f14229) · [表格及包含大量代码段](https://simpreadpublish.notion.site/ADB-156907a65f5881f6bfbac02cca3d3573?pvs=74) 

3️⃣ 导入**带标注色的正文**到 Notion [查看效果](https://simpreadpublish.notion.site/150907a65f588120b3c4de0e61cf9ad4)

此功能需要 **简悦高级账户**，可通过 [**此链接**](https://simpread.pro/price) 升级。

![image-20241209163507107](https://res.cloudinary.com/simpread/image/upload/v1733733310/config/abdaa0dd177a0210480609c40587d73c.png)

4️⃣ 内置 **Cloudinary 图床**

![image-20241209163516661](https://res.cloudinary.com/simpread/image/upload/v1733733319/config/f958bca8d534577039d81963b9c5a2af.png)

5️⃣ 在导入可选择任意 Notion

![image-20241209163531196](https://res.cloudinary.com/simpread/image/upload/v1733733333/config/4a05200514271d9245259d99dca493d7.png)

6️⃣ 同步稍后读的标签，并支持加入全局标签（即使当前页面未被标记为稍后读，也可导入已添加的全局标签）。

![image-20241209163543830](https://res.cloudinary.com/simpread/image/upload/v1733733346/config/d4caa831065c159ebb1d0a8136c4e3ff.png)
7️⃣ 添加描述（Summary)与稍后读备注

此功能需要 **简悦高级账户**，可通过 [此链接](https://simpread.pro/price) 升级。

![image-20241209163555174](https://res.cloudinary.com/simpread/image/upload/v1733733357/config/aef63c561f6bbf937c64dd3c968401a5.png)

8️⃣ 去除重复的 Page

![image-20241209163603301](https://res.cloudinary.com/simpread/image/upload/v1733733365/config/b325be3031344cf1f726f968b49f6301.png)

9️⃣ 导入标注

![image-20241209163614376](https://res.cloudinary.com/simpread/image/upload/v1733733376/config/d3b00d1a5bbeb24225a22295c90f2ad3.png)

2.0 版在原来的方案（[标准模式](https://simpreadpublish.notion.site/annote-159907a65f5880118f76e58760373491)）基础上增加了两个全新的标注模板：

📗 带标注色的模板 [查看效果](https://simpreadpublish.notion.site/annote-159907a65f5880e4a073c2018db94872)

📘 按照标注色分类的模板 [查看效果](https://simpreadpublish.notion.site/annote-159907a65f58804097a9dc26e476ed84)

![image-20241209163629804](https://res.cloudinary.com/simpread/image/upload/v1733733392/config/437e8202abccf198c1ee7c32ab03807c.png)

注意：上述两种标注模板需要**简悦高级账户**权限，可通过 [此链接](https://simpread.pro/price) 升级。

***

> [!TIP]
> 除了使用配置库方案外，我更建议用户手动配置，通过配置可以更深入地了解整个流程，以下内容均与配置相关。

## 更好地调整配置

简悦的一切都在配置文件中，所有的改动也都会反映到配置文件中，为了更好的配置下面的教程，请留意：

1. 不要同时打开多个 Tab 同时操作配置项，因为会互相覆盖配置。
2. 只开两个：**一个选项页（A）；一个进入阅读模式的页面（B）**e.g https://sspai.com/post/69972 即可。当 A 改动后刷新 B 使其使用最新的数据；反之也一样。
3. 如使用同步助手的话，先关闭自动同步功能，等配置稳定了（毕竟不需要随时改动，只是配置一次），在开启自动同步，然后覆盖本地配置文件。

关于玩转配置文件的内容可以 [看这里](https://zhuanlan.zhihu.com/p/502321961)。

## 导入到 Notion 插件

### 下载

https://simpread.ksria.cn/plugins/details/OpaogjT8KJ

### 前提

确保已经安装了此插件（如果使用了同步助手的自动同步功能，请使用 [插件管理器](https://www.yuque.com/kenshin/simpread/fcw60u#ymS1C) 安装）

随便进入一个页面 e.g. https://sspai.com/post/71576 并进入 **阅读模式 → 右下角 → 动作 → 插件触发器**

![image-20241209163643725](https://res.cloudinary.com/simpread/image/upload/v1733733406/config/076291a2a534c140857a42c080830113.png)

### 授权

1️⃣ 复制 [简悦的模板](https://simpreadpublish.notion.site/e784eba882da452eb8f300e6cd6b195d) 到你的 Notion 空间（ 2.0 版已新增对不同结构 Notion Page 的兼容性支持，但为更好地展示导入效果，请 **务必使用简悦提供的导入模板**）

![image-20241209163655463](https://res.cloudinary.com/simpread/image/upload/v1733733417/config/961f5088890ecc22ff1da1c83c187c28.png)

2️⃣ 授权并获取 Notion 的空间与页面（由于采用公开 API，授权过程非常简单）。

https://github.com/user-attachments/assets/9f8b21be-5a47-4306-947f-3afec42c201f

### Cloudinary 图床

这是 1.1.0 版本内置的图床方案，相比 Notion 图床来说具有速度快、更稳定的使用体验。

[Cloudinary](https://link.zhihu.com/?target=https%3A//cloudinary.com/) 是老牌的图床服务，**免费版每月 25 Credit，每个 Credit 可支持 1GB 存储或 1GB 带宽**。

相当于：**每月 13GB 存储**以及 **12GB 带宽**的图床，且**国内访问速度不错**，免费份额足够个人使用。

为方便用户使用，简悦内置另一个 Cloudinary 账户，在注册前可以考虑先使用此方式实验效果。

![image-20241209163827506](https://res.cloudinary.com/simpread/image/upload/v1733733510/config/447d543e1e55f28321ce03d2628db859.png)

如何注册和配置请看 [此教程](https://www.yuque.com/kenshin/simpread/wpgqnh4eefgdx6o9) 本页最下方也有一样的教程。

### 使用

随便进入一个页面 e.g. https://sspai.com/post/71576 并进入 **阅读模式 → 右下角 → 动作 → 插件触发器** 根据下图所示手动导入。

![image-20241209163906450](https://res.cloudinary.com/simpread/image/upload/v1733733548/config/b1c0400e3835c385a4e426377ac16a5b.png)

## 导入到 Notion 辅助增强插件

### 下载

https://simpread.ksria.cn/plugins/details/g60jwZEeqU

### 前提

确保已经安装了此插件（如果使用了同步助手的自动同步功能，请使用 [插件管理器](https://www.yuque.com/kenshin/simpread/fcw60u#ymS1C) 安装）

随便进入一个页面 e.g. https://sspai.com/post/71576 并进入 **阅读模式 → 右下角 → 动作 → 插件触发器**

![image-20241209163856335](https://res.cloudinary.com/simpread/image/upload/v1733733539/config/961983f46f3ce51efc48508e5ddcea49.png)

### 设置

2.0 版直接使用了 [导入到 Notion 插件](https://github.com/Kenshin/simpread/discussions/4954) 的授权信息，所以不需要再重复授权，也没有 1.x 版本繁琐的授权过程。

### 使用

默认安装后即可使用，随便进入一个页面 e.g. [放弃纠结、拥抱妥协，重器轻用就是高效](https://sspai.com/post/71576) 并进入阅读模式，确保下面的选项开启。 

![image-20241212191842474](https://res.cloudinary.com/simpread/image/upload/v1734002331/config/52c2ef564b7f55fac41745ecfa46e5d1.png)

右下角触发器 → 动作 → 导入到 Notion 即可。

![image-20241209163906450](https://res.cloudinary.com/simpread/image/upload/v1733733548/config/b1c0400e3835c385a4e426377ac16a5b.png)

## 自动化

结合 [自动化辅助增强插件](https://github.com/Kenshin/simpread/discussions/3596)，并使用 **带标注色的模板** 或 **按照标注色分类的模板** ，在页面上进行标注操作，标注完毕后，添加稍后读等相关元数据，保存后会自动触发 **导入全文到 Notion** 与 **导入标注到 Notion**

### 下载

https://simpread.ksria.cn/plugins/details/DH9l5jblPH

### 配置

确保已经安装了此插件（如果使用了同步助手的自动同步功能，请使用 [插件管理器](https://www.yuque.com/kenshin/simpread/fcw60u#ymS1C) 安装）

随便进入一个页面 e.g. https://sspai.com/post/71576 并进入 **阅读模式 → 右下角 → 动作 → 插件触发器**

![image-20241209163915146](https://res.cloudinary.com/simpread/image/upload/v1733733558/config/188f2e941c5bab017af5dc7ad2d0caf2.png)

## 用法一

使用 **带标注色的模板** 或 **按照标注色分类的模板** ，在页面上进行标注操作，标注完毕后，添加稍后读等相关元数据，保存后会自动触发 **导入全文到 Notion（含 Notion 辅助增加）** 与 **导入标注到 Notion。**

注意：这里并未加入 **添加/删除标注时自动导入标注到 Notion** 的功能，因为每次导入标注都会生成一个新的 Page。因此，自动化方案采用以下流程：

加入稍后读 → 标注 → 添加稍后读元数据 → 触发 **导入全文到 Notion** 和 **导入标注到 Notion**。

![image-20241209163926936](https://res.cloudinary.com/simpread/image/upload/v1733733570/config/fe8ca1e5f4cc266cf3e4543b37b4ade5.png)

导入到 Notion → 开启 Cloudinary 图床

![image-20241209163936441](https://res.cloudinary.com/simpread/image/upload/v1733733570/config/fe8ca1e5f4cc266cf3e4543b37b4ade5.png)

导入到 Notion 辅助增强开启下面的选项

![image-20241209163949292](https://res.cloudinary.com/simpread/image/upload/v1733733591/config/bd6c3e37fd389986534d772b9303ee65.png)

![image-20241209164006387](https://res.cloudinary.com/simpread/image/upload/v1733733608/config/3425c22b7facedceea0b5cee91505ac9.png)

使用过程

https://github.com/user-attachments/assets/663a3fde-8011-4174-9561-b63afb4adb07

## 用法二

将一篇文章通过标注将重点内容导入到 Notion，并使用 **默认模板** ，其它设置与**用法一**一致。

![image-20241209164140946](https://res.cloudinary.com/simpread/image/upload/v1733733703/config/af3dd1ae2b0a0a20b9b610884b955fe0.png)

导入效果

![image-20241209164152915](https://res.cloudinary.com/simpread/image/upload/v1733733722/config/f66fecf77337063322fe135ee20d41dc.png)

## 用法三

可配合 [Assistive Touch](https://simpread.ksria.cn/plugins/details/rsd4UIcDKY) 方便鼠标党使用。

![image-20241209164206321](https://res.cloudinary.com/simpread/image/upload/v1733733728/config/7a2276d475a278cde8ed9459ec0e7480.png)

安装并打开 Assistive Touch 后，复制下面的代码

```plain
<svg viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1525' width='20' height='20'><path d='M707.2 309.333333c2.645333 14.72-0.768 29.013333-14.421333 30.336l-22.698667 4.096-9.386667 354.858667c-19.968 10.666667-38.144 16.554667-53.12 16-24.192-0.853333-30.037333-9.173333-47.36-33.92l-141.056-253.738667-6.4 240.469334 46.421334 12.970666s-0.768 29.056-38.4 27.733334l-104.106667 2.901333c-2.816-6.613333 0.597333-22.698667 11.306667-25.429333l27.306666-7.210667 8.405334-317.866667-37.546667-4.522666c-2.645333-14.72 5.461333-35.370667 26.538667-36.266667l111.658666-4.224 146.986667 257.152 5.930667-222.762667-39.082667-6.272a26.453333 26.453333 0 0 1 24.917333-31.317333l104.106667-2.986667z' fill='#ffffff' p-id='1526'></path><path d='M736.341333 120.874667a2036.096 2036.096 0 0 0-448.682666 0c-85.845333 9.6-155.178667 77.226667-165.248 163.498666a1959.338667 1959.338667 0 0 0 0 455.253334c10.069333 86.272 79.36 153.898667 165.248 163.498666 147.882667 16.512 300.8 16.512 448.682666 0 85.845333-9.6 155.178667-77.226667 165.248-163.498666a1958.997333 1958.997333 0 0 0 0-455.253334c-10.069333-86.272-79.36-153.898667-165.248-163.498666z m-441.6 63.573333a1972.053333 1972.053333 0 0 1 434.517334 0c56.746667 6.4 102.186667 51.157333 108.8 107.392a1895.296 1895.296 0 0 1 0 440.32c-6.613333 56.234667-52.053333 101.034667-108.8 107.349333a1971.925333 1971.925333 0 0 1-434.517334 0c-56.746667-6.314667-102.186667-51.114667-108.8-107.349333a1895.296 1895.296 0 0 1 0-440.32c6.613333-56.234667 52.053333-101.034667 108.8-107.349333z' fill='#ffffff' p-id='1527'></path></svg>
```

并打开 Assistive Touch 按下图所示加入其中。

![image-20241209164215059](https://res.cloudinary.com/simpread/image/upload/v1733733738/config/7bcfb597f6102c1d0406d454758118a7.png)

## 用法四

这是一整套的知识管理整理方案，使用快捷键 `f f` 触发整套流程，整个自动化过程包括：

1. 将图片转换为 Cloudinary 图床（[图床插件](https://simpread.ksria.cn/plugins/details/VdMfVaXlni)）

2. 图片转换完毕后，自动加入稍后读

3. 生成本地快照（[稍后读辅助增强插件](https://simpread.ksria.cn/plugins/details/dtIMMLktg9)）

4. 开始标注

5. 标注完毕后修改稍后读元数据，然后触发：（[自动化辅助增强插件](https://simpread.ksria.cn/plugins/details/DH9l5jblPH)）

   - 导入带标注色的全文到 Notion（[导入到 Notion 插件](https://simpread.ksria.cn/plugins/details/OpaogjT8KJ)）

   - 导入标注到 Notion（[导入到 Notion 辅助增强插件](https://simpread.ksria.cn/plugins/details/g60jwZEeqU)）

<video src="https://res.cloudinary.com/simpread/video/upload/v1733830771/config/2024-12-10_19-32-49_fvrn8m.mp4"></video>

这套流程已包含在 [Notion 配置库 · 高级版](https://www.yuque.com/kenshin/simpread/zuptv2)，如果是新用户的话，建议直接使用配置库方案即可；老用户并且以及配置了 [本地快照系统](https://www.yuque.com/kenshin/simpread/wkswh7) 的用户，可直接安装上面提到的插件即可。

## 关联

-  [Notion Blog 生成器](https://github.com/Kenshin/simpread/discussions/3776) 
-  [如何在 Notion 使用简悦的阅读模式](https://github.com/Kenshin/simpread/discussions/2106) 
-  [利用简悦增强你的 Notion 使用体验](https://github.com/Kenshin/simpread/discussions/2586) 

关于简悦与 Notion 的更多联动 [请看这里](https://github.com/Kenshin/simpread/discussions?discussions_q=label%3Anotion)。

## 引申

- [自动导入标注到 Obsidian（不使用同步助手方案，轻量级方案）](https://www.yuque.com/kenshin/simpread/ifioux)
- [Obsidian SimpRead Sync - 一站式文献笔记解决方案教程](https://www.yuque.com/kenshin/simpread/fr8zo5)
- [Logseq SimpRead Sync - 一站式文献笔记解决方案教程](https://www.yuque.com/kenshin/simpread/gbere7)
- [Roam Research SimpRead Sync - 一站式文献笔记解决方案](https://www.yuque.com/kenshin/simpread/qlgddc)

## 附录

### 导入到 Notion 扩展端已被废弃

简悦早在 1.1.4 版就接入了 Notion，可见对 Notion 的支持 😄 同时我也是 Notion 重度用户，一直在使用的简悦就是用 Notion 来管理的，专门为此写了一篇 [**《聊了聊如何用 Notion 管理简悦》**](https://sspai.com/post/70237) 的文章。

为了更好的将正文导入到 Notion，简悦使用了一些 Notion 私有 API，虽然得到了很好的效果，也带来了「一些隐患」，比如：**2022年7月23日发生了** [**标题含有 CJK 字符就会出现无法保存的问题**](https://github.com/Kenshin/simpread/issues/4237)，但好在这次事件 Notion 官方快速修复了。

而在 2022年12月6日发生了 [**因为 API 后端参数修改导致无法导入到 Notion Page 的问题**](https://github.com/Kenshin/simpread/issues/4849)，我也是第一时间就反馈给了 Notion 但一直没有得到反馈，因并不算是 Bug，而 API 修改 Notion 也没有通知（私有 API 缘故），所以简悦就显得有些「被动了」。

为了避免这种情况再次发生，简悦官方决定将**导入到 Notion 功能**插件化，即：使用插件的方式实现导入到 Notion 的功能。

所以扩展端的导入 Notion 已不再更新，

包括：选项页 → 服务 → 授权管理 → 导入到 Notion

![image-20241209164231627](https://res.cloudinary.com/simpread/image/upload/v1733733753/config/a455623d2b8cc5d9d5015771293a2c3b.png)

以及以下选项。

![image-20241209164240178](https://res.cloudinary.com/simpread/image/upload/v1733733762/config/e7677c1d2d0303fed6ffc82c2f6ed64a.png)

### 使用共有 API 的已知问题

1. 无法识别多层嵌套列表（很少见的情况）
2. 因为使用了 Notion 共有 API，而这些 API 并不是简单的转换，Notion 有一套独有个结构，所以存在个别转换失败的情况。

### 旧版本升级说明

如果你已使用 1.x 版（旧版本），首次升级后会出现如下截图，此时需重新授权 Notion 才能使用。（授权方式与上面一致）

![image-20241209164302996](https://res.cloudinary.com/simpread/image/upload/v1733733809/config/53b8c7fa858a9a8275e10210d9bbda46.png)

### 插件安装失败等原因的解决方案

如果你没有使用同步助手的话，一般不会出现此问题，但发生无法安装插件等问题，请重置插件解决。

![image-20241209164338536](https://res.cloudinary.com/simpread/image/upload/v1733733821/config/d873ee2f8f690c3dbe8883d7da79945d.png)

如果你使用了同步助手的话，请查看 [此解决方案](https://github.com/Kenshin/simpread/discussions/2342)。

### 注册并设置 Cloudinary 图床

注册很简单，没有国内乱七八糟的方案，[直接 Email 注册](https://cloudinary.com/users/register_free) ，过程从略。

注册成功后会有如下界面，请选择 **Developer**，然后选择 **Done**（注意：新版界面可能跟下图有所区别）

![image-20241209164407170](https://res.cloudinary.com/simpread/image/upload/v1733733849/config/99b57b5156fb85546f9c0b4240967998.png)

然后进入 [API Keys](https://console.cloudinary.com/settings)

![image-20241209164415758](https://res.cloudinary.com/simpread/image/upload/v1733733858/config/16227a59abddafead423dc2d7381f2fd.png)

留意 ➊ ➋ ➌ 接下来需要这几个值。

![image-20241209164426349](../../../../../Library/Application%20Support/typora-user-images/image-20241209164426349.png)

确保你的 Notion 插件为 2.0 版，随便进入一个页面 e.g. https://sspai.com/post/71576 并进入 **阅读模式 → 右下角 → 动作 → 插件触发器→ 导入到 Notion**

![image-20241209164443069](https://res.cloudinary.com/simpread/image/upload/v1733733510/config/447d543e1e55f28321ce03d2628db859.png)
请将 ➊ ➋ ➌ 分别填入。（这几个值在 **注册并获取 API Key** 节点)

注意：Folder 文件夹可为空，也可为任意值（ 建议使用 `simpread` ），不必事先在 Cloudinary 创建相应目录。

验证

![image-20241209164534277](https://res.cloudinary.com/simpread/image/upload/v1733733936/config/9e62335388cf81829ec3587be4eb033f.png)

验证过程

![](https://res.cloudinary.com/simpread/image/upload/v1733733996/config/270536457-98c6f450-debd-4c62-8f03-47dad2188845_dtgsib.gif)

### 为什么 1.0 版使用私有 API 而没有直接使用共有 API？

在开发【导入到 Notion】功能时，Notion 官方尚未推出任何 API 功能。我通过某些技术手段「模拟」了 Notion 的导入流程，从而发布了该插件。

此外，公开的 Notion API 功能较为有限，例如缺少上传图片的接口，使用起来并不方便。

然而，随着 Notion 对私有 API 权限的逐步收紧，继续使用私有 API 已不再是理想方案，因此推出了基于公开 API 的 2.0 版。