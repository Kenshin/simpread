> [简悦 · 同步助手](Sync) 是 **随着简悦 2.1.0 发布的一个全新的 Desktop App**，用于对简悦已知功能的补充，以及会 **持续提供更多** 的可玩性。

![](https://z3.ax1x.com/2021/05/19/g4vN9S.png)

目录
---

- [描述](#描述)

- [支持平台](#支持平台)

- [更新日志](#更新日志)

- [下载](#下载)

- [教程](#教程)

- [验证](#验证)

- [同步](#同步)

  - [如何配置](#如何配置)

  - [自动同步](#自动同步)

  - [自动同步的注意事项](#自动同步?id=注意事项)

- [内置解析](#内置解析)

- [导出到本地](#导出服务)

    - [导出文件夹](#导出文件夹)

    - [如何使用](#如何使用)

    - [增强导出](#增强导出)

    - [读取外部文件](#外部文件)

    - [删除旧文件](#删除旧文件)

- [导出类型](#导出类型)

    - [PDF](#pdf)
    
    - [pandoc](#pandoc)
    
    - [Epub](#epub)
    
    - [assets + md](#assets-md)
    
    - [Textbundle](Textbundle)
    
    - [邮件服务](邮件服务)
    
    - [发送到 Kindle](发送到-Kindle)
    
- [导出服务](#自动化服务)

    - [Hypothesis](自动化服务?id=hypothes)

    - [Readwise.io](自动化服务?id=readwise)

- [URL Scheme](#URLScheme)

- [稍后读相关](#稍后读相关)

  - [打开稍后读](#打开稍后读)

  - [极速版](#极速版)

  - [标注嵌入模式](#标注嵌入模式)

      - [嵌入到 Obsidian](#嵌入到obsidian)

      - [嵌入到 Logseq](#嵌入到logseq)

      - [嵌入到 MenubarX](#嵌入到menbarx)

  - [Token](#Token)

- [主题](#主题)

- [暗色模式](#暗色模式)

- [文档地址源](#文档地址源)

- [Bookmarklet](#Bookmarklet)

- [日志输出](#日志)


描述
---

**简悦 · 同步助手** 为简悦 · 高级账户提供了增强型的功能，如：

1. **自动同步**

2. **小书签**

3. 导出到文件 **本地的任意位置**

4. **原生 PDF ·  Epub** 导出

5. **直接发送到你的 Kindle**

6. 内置解析

7. **邮件发送** 

8. **自动化** 导出

等诸多仅扩展端无法提供的功能，同时也为简悦 · 稍后读的客户端提供了一个未来可接入的入口。

支持平台
---

> 基本上涵盖了全部平台，包括：`Windows` · `Mac` · `Linux` 与 [命令行版本](https://github.com/Kenshin/simpread/discussions/3704) · [Docker](https://github.com/Kenshin/simpread/discussions/4312)。

> 关于同步助手的更多玩法和介绍，[请看这里](https://github.com/Kenshin/simpread/discussions/categories/同步助手)。

更新日志
---

> 详细说明 [请看这里](https://simpreadpublish.notion.site/simpreadpublish/2482effc334e4df8aa3aac7da8bb8059)

下载
---

包含简悦同步助手的全部版本：

- [Onedrive@世纪互联](https://experience.sharepoint.cn/:f:/s/simpread/EooPpw5vqrpLoMInbTpV1rgB5hyvrqv-cdhPCGwiLxrDvw?e=NJ9ZPG) **国内用户首选**

- [FlowUs](https://flowus.cn/share/be3e616f-a047-40d4-94dc-e89f795a7a5e) **国内用户首选**

- [百度网盘](https://pan.baidu.com/s/1ARQZ-zcQroTzHDJWWRJUIQ?pwd=m4pt) 提取码: m4pt  **偶尔会被无故取消分享 😂**

- [Box.net](https://app.box.com/s/q7hz86hkeqgoc7mkofxaxu5eiup88j32)  **国外用户首选**

- [OneDrive](https://1drv.ms/u/s!Aua4SNl3dUARh0iLAigvKGbGEHMz?e=LJe6f3)

  >  如无法访问请退出你的 OneDrive 账户，或在隐身模式下打开此链接。

- Telegram Channel

  - 1.0.1 → [win 64 & 32](https://t.me/simpread/171)  [mac](https://t.me/simpread/166)

  - 1.0.2  → [Telegram Group](https://t.me/simpreadgroup/56764)（含全部系统）

  - 1.1.0 → [Telegram Group](https://t.me/simpreadgroup/57763)（含全部系统）

无法使用
---

在 Windows 上运行可能会被 360类的产品误报，因为同步助手使用了 Electron 技术，所以有可能存在此情况，如果是在上述官方提到的渠道下载，请放心使用。

如果你在运行同步助手是遇到了问题，[Mac 用户看这里](https://github.com/Kenshin/simpread/discussions/2283) [Windows 用户看这里](https://github.com/Kenshin/simpread/discussions/2129)。

教程
---

> 包含同步助手验证、绑定、自动同步、增强导出等功能的 [一站式教程](https://www.yuque.com/kenshin/simpread/pwpnsx)。

验证
---

**简悦 · 同步助手** 在安装后需要与你的 **简悦 · 高级账户** 绑定后才能使用，验证流程：

### 前提

1. 确保安装简悦扩展端为 2.1.0 版本以上。

2. 确保你已经是高级账户。

### 验证

1. 运行 **简悦 · 同步助手** 
2. **简悦 → 选项页 → 共通 → 简悦 · 同步助手 → 授权验证并开启简悦 · 同步助手**

  ![BXhkxP.png](https://s1.ax1x.com/2020/11/11/BXhkxP.md.png)

3. 认证无误后会有提示，如下图：

  ![BXh1x0.png](https://s1.ax1x.com/2020/11/11/BXh1x0.png)

注意事项
---

1. 端口号默认为 `7026`，建议不要随意更改。
2. 简悦 · 同步助手 **仅可绑定一个** 简悦 · 高级帐号，即：授权验证后再无法再次绑定。（但可以通过重置的方式来解决）

同步
---

> [!TIP]
> 通过此功能，简悦可以将 **配置文件保存到本地的任意位置**。

### 如何配置

配置起来很简单，只需要选择 **配置文件保存的本地文件夹位置** 后就可以了。

![](https://s1.ax1x.com/2022/11/09/zSKDbQ.png)

### 自动同步

> [!TIP]
> 当使用同步功能后，如果选择的文件夹恰好是某个网盘的同步文件夹，就可以实现自动同步的功能。详细配置 [请看这里](自动同步)。

### 自动同步的注意事项

> 详细配置 [请看这里](自动同步?id=注意事项)

内置解析
---

> 得益于 **简悦 · 同步助手**，简悦 · 稍后读内置的阅读模式解析得到全面「飞跃」，可解析 **动态加载**  **包含了 LateX 的页面**，同时也解决了 **简悦 2.0 的某些页面乱码问题**。

> 此功能需要在稍后读中使用，详细说明 [请看这里](稍后读?id=阅读模式解析器)。

导出服务
---

得益于 **简悦 · 同步助手** 的加持，在简悦原有导出的功能的基础上增加（强）了如下功能：

- 可导出到任意目录

- `原生 PDF` `原生 Epub`

- `TextBundle` `md + assets`

- `Markdeep`

- `发送到邮件` `直接发送到 Kindle`

- 支持任意格式导出 e.g. `.docs` 

### 导出文件夹

> [!TIP]
> 通过设置导出文件夹，可以**将阅读模式的导出功能** 导出到此文件夹中。

1. 在 **同步配置文件夹目录** 建立 `output` 文件夹

  ![](https://s1.ax1x.com/2022/11/09/zSK93V.png)

  > 也可选择与 **同步配置文件夹目录** 不一样的本地文件夹；也可保留为空，即使用 **同步配置文件夹目录** 下面的 `output` 文件夹。

2. **简悦 · 同步助手** 开启相关选项（默认为开启状态）

  ![](https://s1.ax1x.com/2022/11/09/zSF8W4.png)

3. **简悦（扩展端） → 选项页 → 共通 → 简悦 · 同步助手** 也同样开启以下功能。

  ![BXb3Hx.png](https://s1.ax1x.com/2020/11/11/BXb3Hx.md.png)

### 如何使用

与之前的导出功能所在的位置一样，即：进入 **阅读模式|聚焦模式 → 右下角 控制栏 → 动作 → 导出**

![](https://s1.ax1x.com/2022/11/09/zSMZqg.png)

### 增强导出

1.0.2 版新增的功能，类似 Hazel 的自动化功能，可以将任意导出文件导出到指定目录。

```
{"extension":"external", "path":"/Users/xxxx/xxxx/simpublish-demo/api/_output"}
{"extension":"pdf", "path":"/Users/xxxx/xxxx/Ebook"}
{"extension":"epub", "path":""}
{"extension":"docx", "path":""}
{"extension":"assets", "path":"/Users/xxxx/xxxx/Obsidian/SimpRead"}
{"extension":"textbundle", "path":""}
{"extension":"md", "path":"/Users/xxxx/xxxx/Obsidian/SimpRead"}
{"extension":"assets", "path":"/Users/xxxx/xxxx/Obsidian@simpread/Inbox", "type":"page"}
{"extension":"md", "path":"/Users/xxxx/xxxx/Obsidian@simpread/SimpRead", "type":"annote"}
```

简单的解释

- `extension` → 任意文件的后缀 `epub` `docx` `md` `html` 等

  有两个特殊的后缀：

  - `external` 导出 HTML 时，将当前 `xxx.html` 复制到 `path` 对应的目录，此功能注意针对 [简悦的外部资料库的自建方案](https://github.com/Kenshin/simpread/discussions?discussions_q=label%3A%22self+built%22)。

  - `assets`，可以辅助 [导出 md + assets 格式](https://github.com/Kenshin/simpread/discussions/4041) 实现 `md + assets` 结构。

- `output` → 导出文件夹地址

  - `""` → 空值，即当前导出目录的同 `extension` 文件夹，如

    `{"extension":"epub", "path":""}` 则会在导出文件夹中新建 `epub` 文件夹。

  - `"/xxxx"` → 有值，根据对应值的位置导出。

- type → 导出类型（ 此功能为 [同步助手 1.1.3 版](Sync) 功能，如低于此版本 [请升级](#下载) ）。

  - `annote` → 标注 e.g. `1234-xxx@annote`

  - `page` → 全文 e.g. `1234-xxx`

  > type 参数可以省略，当省略后不区分 **全文 or 标注**。

  > 通过区分全文 or 标注，可以实现以下方案：

  > 将标注导入到 Obsidian SimpRead 文件夹，将 assets 形式的全文导入到 Inbox 文件夹，做到全文和标注分开管理。

### 外部文件

> 此功能为 [同步助手 1.1.3 版](Sync) 功能，如低于此版本 [请升级](#下载)。

> 将本地的任意快照（ 包括： `.html` `.md` ）生成阅读模式，同时也加入到简悦的稍后读系统，详细说明 [外部文件](外部文件)。

### 删除旧文件

> 当 **使用 [知识库](https://www.yuque.com/kenshin/simpread/lglfy2) 时，请启用此功能**。当删除稍后读时，无法自动同步删除本地快照，启用此功能后会避免出现重复的 `idx-xxx.html`。

## 导出类型

> [!TIP]
> 这是 **同步助手中最重要的功能** 之一，除了下面内置的导出类型外，还可以在插件中使用，如：[导入到 Obsidian](https://simpread.ksria.cn/plugins/details/1VQ19jCD8Z)、[导出 Org Mode 格式](https://simpread.ksria.cn/plugins/details/etyod6A5ZT) 等。
> 
> 下面介绍几个常见格式的导出。

### PDF

#### 同步助手基础打印方案

> [!TIP]
> 通过  **简悦 · 同步助手** 终于支持了原生的 PDF 输出功能，只要分别在：

1.  简悦 · 同步助手 → 导出 → **启用导出 PDF 功能**

2.  简悦（扩展端） → 选项页 → 共通 → 简悦 · 同步助手 →**启用导出 PDF 功能**

即可，[导出例子](https://static.simp.red/export/simpread.pdf)。

#### wkhtmltopdf

> [!TIP]
> 同步助手高级打印方案
> 
> 1.0.2 版的同步助手增加了更丰富的定制化 PDF 导出方案，详细 [请看这里](https://github.com/Kenshin/simpread/discussions/3887)。

**同步助手高级打印方案** 还提供了基础打印方案没有的定制化功能：

- [主题、字体样式、字体大小](https://github.com/Kenshin/simpread/discussions/3887#discussioncomment-2735661)

- [自定义字体](https://github.com/Kenshin/simpread/discussions/3887#discussioncomment-2735667)

- [自定义样式](https://github.com/Kenshin/simpread/discussions/3887#discussioncomment-2735664)

- [更细致的打印，如页边距、打印尺寸](https://github.com/Kenshin/simpread/discussions/3887#discussioncomment-2750058)

- 自带目录

- 完美解决因图片防盗链无法成功打印的问题。

#### 与调用系统打印功能对比

1. 一次点击，系统打印需要多次点击

2. 布局更合理，系统打印的白边太大

3. 跨页时图片无分割，系统打印的图片在跨页时会有分割

### Pandoc

> [!NOTE]
> [Pandoc](https://pandoc.org/) 是一个免费基于命令行的多格式转换工具，**简悦 · 同步助手** 已集成 Pandoc 的大部分功能，所以借此支持导出任意格式 e.g. `.docs` `.epub` 等，细节 [请看这里](定制化导出?id=自定义导出)。

#### 下载地址

建议请去 [官网](https://pandoc.org/installing.html) [下载](https://github.com/jgm/pandoc/releases/latest) 请找到适合自己的系统即可。

#### 安装

根据提示一路安装即可。

#### 验证（Windows）

> 只要 **确保全局可以调用 pandoc 命令**，安装完毕后在命令行下输入 `pandoc -v` 看到正常的输出即可。

#### 验证（Mac）

> 请确保 pandoc 在你的 `/usr/local/bin/` 目录下存在，同时也确保此目录在 `$PATH` 下。
>
> 一般情况下  `/usr/local/bin/`  都会存在于 `$PATH` 下。

可以使用如下命令检验：

`which pandoc` → 查看 pandoc 所在目录

PS：一般使用 `pandoc-xxx-macOS.pkg` 安装的话，自然是 `/usr/local/bin/` 目录。

> 下个版本会包含 `pandoc` 定制化目录功能

#### 使用

**简悦 · 同步助手** 已内置了 pandoc 的使用，所以对于用户来说，无需手动设置。

### Epub

借助 [pandoc](#pandoc) 简悦也支持 **原生导出 Epub**，在操作上与上面保持一致，即：需要分别在 **扩展端** 与 **同步助手** 开启此选项。

#### 与调用第三方 Epub 对比

1. 第三方 Epub 转换所需的时间较长。（取决于网络的通畅
2. 标题为中文字体会显示乱码。

而 **原生 Epub 输出** 则没有上述问题。

但如果要启用此功能的话，需要在 **本地安装  [Pandoc](#pandoc) **。

#### 扩展端开启方法

> 选项页 → 共通 → 同步助手，下图所示：

![riixdx.png](https://s3.ax1x.com/2020/12/10/riixdx.png)

#### 同步助手端开启方法 

> 同步助手默认开启此选项，下图所示

![riFkyd.png](https://s3.ax1x.com/2020/12/10/riFkyd.png)

### Textbundle

> 详细说明 [Textbundle](Textbundle)

### assets + md

> [!TIP]
> 同步助手 1.0.2 版支持导出 md + assets，如何使用 [请看这里](https://github.com/Kenshin/simpread/discussions/4041)。
> 
> `md + assets` 是一个比 Textbundle 更加广泛的方案 Obsidian、Typora 等均支持此方式。

### Markdeep

> 详细说明 [Markdeep](Markdeep)

### 邮件服务

> 详细说明 [邮件服务](邮件服务)

### 发送到Kindle

> 详细说明 [发送到 Kindle](发送到-Kindle)

## 自动化服务

> [!TIP]
> 除了上面的增强导出功能外，同步助手还包含一类比较特殊的服务，详细说明 [自动化服务](自动化服务)，目前接入了下面两个服务。

### Hypothesis

> 详细说明 [自动化服务](自动化服务?id=Hypothes)

### Readwise

> 详细说明 [自动化服务](自动化服务?id=Readwise)

URLScheme
---

> [!TIP]
> **1.1.0 版** 新增功能，目前支持三种 URL Scheme，未来还会陆续增加新方案。

- `type` 包括：`unread` `extension`

  - `simpread://open?type=unread&idx=1234&id=abc`

    > 以独立窗口打开 ID 为 `1234` 的本地快照并具有跳转到对应的标注 `abc` 此功能也叫[标注嵌入模式](标注嵌入模式)。

  - `simpread://open?type=extension`

    > 以独立窗口打开扩展端稍后读

  - `simpread://open?type=unread`

    > 以独立窗口打开 [稍后读极速版](#极速版)

- `popup` 包括： `window` → 加上参数后，每个链接都会新打开一个窗口，默认（不加此参数）则无论打开什么链接只在当前窗口打开，例如：

  - `simpread://open?type=unread&popup=window`

  - `simpread://open?type=unread&idx=2530&id=1666433469343&popup=window`

- `embed`

  - `logseq` → 显示 logseq 选项 e.g. `simpread://open?type=unread&embed=logseq`

  - `rr` → 显示 roam research 选项 e.g. `simpread://open?type=unread&embed=rr`

> [!WARNING]
> 注意：Linux 用户暂时不支持 URL Scheme。

稍后读相关
---

> [!TIP]
> 同步助手内置了一些跟稍后读有关系的功能，包括：通过快捷键打开稍后读、稍后读极速版等。

> 1.1.3 版把同步助手稍后读的内容都整理到一起，位置：**同步助手 → 导出 → 稍后读**

![](https://s1.ax1x.com/2022/11/18/znY9RH.png)

### 快捷键

> 此功能为 [同步助手 1.1.3 版](Sync) 功能，如低于此版本 [请升级](#下载)。

> 在 1.1.3 版中把稍后读的相关快捷键整理到 **同步助手 → 导出 → 稍后读** 里面，并增加了一些新的快捷键，详细说明 [请看这里](稍后读快捷键)。

### 打开稍后读

> 通过设置快捷键可将稍后读以独立窗口打开。

![](https://s1.ax1x.com/2022/11/09/zSZdiV.png)

#### 设置稍后读

> 需要 **简悦（扩展端）· 稍后读**  [创建快捷方式](稍后读?id=创建快捷方式)，然后将快捷键方式的路径填入到下面的地址。

> 1.1.2 版（及以下）位置：同步助手 → 共通

![](https://s1.ax1x.com/2022/11/18/znJ1UO.png)

> 1.1.3 版（及以上）位置：同步助手 → 导出 → 稍后读

![](https://s1.ax1x.com/2022/11/18/znJmvR.png)


#### 设置快捷键

> 此功能为 1.1.2 版（及以下）功能。

![](https://s1.ax1x.com/2022/11/18/znJJ8H.png)

> **注意：** 此方式的设置与 **简悦 · 扩展端** 一致，依次设置按键。

> 1.1.3 版（及以上） [请看这里](#稍后读快捷键)。

### 极速版

> 1.1.0 版新增功能，内置了一个极简版本的稍后读 [访问地址](http://localhost:7026/unread/)。

> 可以方便的将其嵌入到 Obsidian、MenubarX、以及新标签页等任意需要的地方，详细说明 [请看这里](稍后读极速版)。

![](https://s1.ax1x.com/2022/11/08/xzp4L8.png)

### 标注嵌入模式

> 极速版稍后读还包含了 [标注嵌入模式](标注嵌入模式)。

![](https://s1.ax1x.com/2022/11/08/xzpHij.png)

> [!TIP]
> 基于极速版与标注嵌入模式，可以将简悦的标注系统嵌入到 Obsidian、Logseq、Roam Reasearch 等双链笔记中，彻底实现 **左侧笔记，右侧标注** 的完美方案，详细说明 [配置库](配置库)。

### Token

> 此功能为 [同步助手 1.1.3 版](Sync) 功能，如低于此版本 [请升级](#下载)。

> 简悦的稍后读数据均存在 `simpread_config.json` 中，通过此方式可以让任意应用通过 `HTTP` 方式调用的话，相当于读取了稍后读的数据，可以产生很多联动效果，详细说明 [稍后读外部访问](稍后读外部访问)。

文档地址源
---

> 此功能为 [同步助手 1.1.3 版](Sync) 功能，如低于此版本 [请升级](#下载)。

> 同步助手每个功能都配有相应的说明文档，可以通过此功能来切换不同的地址源。

![](https://s1.ax1x.com/2022/11/17/zmtHLq.png)

> 包括：

- [Github Page](http://ksria.com/simpread/docs)

  > 默认地址源。

- [阿里云](https://simpread.pro/docs)

  > 国内用户可选择此方案。

- [国外线路](http://ksria.com/simpread/docs2)

  > 使用 `cdnjs.cloudflare.com` 作为 CDN。

主题
---

> 此功能为 [同步助手 1.1.3 版](Sync) 功能，如低于此版本 [请升级](#下载)。

> 在默认样式的基础上增加了一个 Light 样式。

![](https://s1.ax1x.com/2022/11/18/znQsPA.md.png)

暗色模式
---

> 此功能为 [同步助手 1.1.3 版](Sync) 功能，如低于此版本 [请升级](#下载)。

> 增加了暗色模式，会跟随系统的改变而已改变。（暂时不支持手动更改为暗色模式）

![](https://s1.ax1x.com/2022/11/18/znQjZF.md.png)

Bookmarklet
---

> 详细说明 [请看这里](Bookmarklet)。

日志
---

1.0.2 版新增功能，可将同步助手的操作日志输出到任意目录。

![](https://s1.ax1x.com/2022/06/07/XD9uzq.png)

Logo 设计
---

同步助手的 Logo 自于社区用户 [Shawn](https://shawnan.design/) 的设计。





