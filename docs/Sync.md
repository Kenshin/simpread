> [简悦 · 同步助手](Sync) 是 **随着简悦 2.1.0 发布的一个全新的 Desktop App**，用于对简悦已知功能的补充，以及会 **持续提供更多** 的可玩性。

![](https://z3.ax1x.com/2021/05/19/g4vN9S.png)

目录
---

- [描述](#描述)

- [支持平台](#支持平台)

- [下载](#下载)

- [验证](#验证)

- [同步](#同步)

- [自动同步](自动同步)

- [自动同步的注意事项](#自动同步?id=注意事项)

- [内置解析](#内置解析)

- [导出服务](#导出服务)

- [PDF](#pdf)

- [Epub](#epub)

- [pandoc](#pandoc)

- [Hypothesis](#Hypothesis)

- [Readwise.io](#Readwise)

- [邮件服务](#邮件服务)

- [发送到Kindle](#发送到Kindle)

- [系统级快捷键](#系统级快捷键)

- [打开稍后读](#打开稍后读)

- [Bookmarklet](#Bookmarklet)

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

基本上涵盖了全部平台，包括：`Windows` `Mac` `Linux`

下载
---

> 暂时仅支持下列网盘，接下来会有更多下载方案。
>
> 重要提示：**非 2.2.0 版用户不要下载 1.0.1 版**；反之 **2.2.0 版用户请务必下载 1.0.1 版**。


- [OneDrive](https://1drv.ms/u/s!Aua4SNl3dUARh0iLAigvKGbGEHMz?e=LJe6f3) （如无法访问请退出你的 OneDrive 账户，或在隐身模式下打开此链接）

- TG Channel [1.0.0@win](https://t.me/simpread/117) [1.0.0@mac](https://t.me/simpread/115)  [1.0.0@mac with readwise.io](https://t.me/simpread/128)

- TG Channel [1.0.1@win 64 & 32](https://t.me/simpread/171)  [1.0.1@mac](https://t.me/simpread/166)

- [腾讯微云](https://share.weiyun.com/S8C1bxJ7) 提取码：pqaytk

### 无法运行

> 在 Mac 上如果出现下图的话，请使用 **腾讯微云** 的方式，细节可以 [看这里](https://github.com/Kenshin/simpread/issues/2100#issuecomment-846510794)。

![image](https://user-images.githubusercontent.com/6434137/119250114-6eb6d680-bbd0-11eb-9db9-c7ca71ce7ee6.png)

> 在 Windows 上运行可能会被 360类的产品误报，因为同步助手使用了 Electron 技术，所以有可能存在此情况，如果是在上述官方提到的渠道下载，请放心使用。

> 如果你在运行同步助手是遇到了问题，[Mac 用户看这里](https://github.com/Kenshin/simpread/discussions/2283) [Windows 用户看这里](https://github.com/Kenshin/simpread/discussions/2129)。

验证
---

**简悦 · 同步助手** 在安装后需要与你的 **简悦 · 高级账户** 绑定后才能使用，验证流程：

#### 前提

1. 确保安装简悦扩展端为 2.1.0 版本以上。
2. 确保你已经是高级账户。

#### 验证

1. 运行 **简悦 · 同步助手** 
2. **简悦 → 选项页 → 共通 → 简悦 · 同步助手 → 授权验证并开启简悦 · 同步助手**

  [![BXhkxP.png](https://s1.ax1x.com/2020/11/11/BXhkxP.md.png)](https://imgchr.com/i/BXhkxP)

3. 认证无误后会有提示，如下图：

  [![BXh1x0.png](https://s1.ax1x.com/2020/11/11/BXh1x0.png)](https://imgchr.com/i/BXh1x0)

注意事项
---

1. 端口号默认为 `7026`，建议不要随意更改。
2. 简悦 · 同步助手 **仅可绑定一个** 简悦 · 高级帐号，即：授权验证后再无法再次绑定。（但可以通过重置的方式来解决）

同步
---

通过此功能，简悦可以将 **配置文件保存到本地的任意位置**，同时辅以 **网盘同步功能**，可以实现自动同步的功能。

#### 如何配置

配置起来很简单，只需要选择 **配置文件保存的本地文件夹位置** 后就可以了。

[![BX4SyV.png](https://s1.ax1x.com/2020/11/11/BX4SyV.md.png)](https://imgchr.com/i/BX4SyV)

自动同步
---

详细配置 [请看这里](自动同步)

自动同步的注意事项
---

详细配置 [请看这里](自动同步?id=注意事项)


内置解析
---

得益于 **简悦 · 同步助手**，简悦 · 稍后读内置的阅读模式解析得到全面「飞跃」，可解析 **动态加载**  **包含了 LateX 的页面**，同时也解决了 **简悦 2.0 的某些页面乱码问题**

#### 如何配置

只需一步，进入 **稍后读 → 左下角 设置 icon → 勾选下图所示的内容** 即可。

[![BX7yLt.png](https://s1.ax1x.com/2020/11/11/BX7yLt.png)](https://imgchr.com/i/BX7yLt)


导出服务
---

得益于 **简悦 · 同步助手** 的同步功能，

包括：

1. `Markdown` `HTML` `离线 Markdown` `离线 HTML`
2. `原生 PDF`
3. `原生 Epub`
4. `直接发送到 Kindle`
5. `发送到邮件`

#### 如何配置

1. 可选择与 **同步配置文件夹地址** 不一样的本地文件夹，也可保留为空，即使用 **同步配置文件夹地址**。

2. **简悦 · 同步助手** 开启相关选项

  [![BXb93Q.png](https://s1.ax1x.com/2020/11/11/BXb93Q.md.png)](https://imgchr.com/i/BXb93Q)

3. **简悦（扩展端） → 选项页 → 共通 → 简悦 · 同步助手 ** 也同样开启以下功能。

  [![BXb3Hx.png](https://s1.ax1x.com/2020/11/11/BXb3Hx.md.png)](https://imgchr.com/i/BXb3Hx)
#### 如何使用

与之前的导出功能所在的位置一样，即：进入 **阅读模式|聚焦模式 → 右下角 控制栏 → 动作 → 导出**

[![BXbhKs.png](https://s1.ax1x.com/2020/11/11/BXbhKs.md.png)](https://imgchr.com/i/BXbhKs)

PDF
---

通过  **简悦 · 同步助手** 终于支持了原生的 PDF 输出功能，只要分别在：

1.  简悦 · 同步助手 → 导出 → **启用导出 PDF 功能**
2.  简悦（扩展端） → 选项页 → 共通 → 简悦 · 同步助手 →**启用导出 PDF 功能**

即可，[导出例子](https://static.simp.red/export/simpread.pdf)

#### 与调用系统打印功能对比

1. 一次点击，系统打印需要多次点击
2. 布局更合理，系统打印的白边太大
3. 跨页时图片无分割，系统打印的图片在跨页时会有分割

Epub
---

借助 [pandoc](#pandoc) 简悦也支持 **原生导出 Epub**，在操作上与上面保持一致，即：需要分别在 **扩展端** 与 **同步助手** 开启此选项。

#### 与调用第三方 Epub 对比

1. 第三方 Epub 转换所需的时间较长。（取决于网络的通畅
2. 标题为中文字体会显示乱码。

而 **原生 Epub 输出** 则没有上述问题。

但如果要启用此功能的话，需要在 **本地安装  [pandoc](#pandoc) **。

#### 扩展端开启方法

> 选项页 → 共通 → 同步助手，下图所示：

[![riixdx.png](https://s3.ax1x.com/2020/12/10/riixdx.png)](https://imgchr.com/i/riixdx)

###同步助手端开启方法 

> 同步助手默认开启此选项，下图所示

[![riFkyd.png](https://s3.ax1x.com/2020/12/10/riFkyd.png)](https://imgchr.com/i/riFkyd)

pandoc
---

[pandoc](https://pandoc.org/) 是一个免费基于命令行的多格式转换工具，**简悦 · 同步助手** 已集成 pandoc 的大部分功能，所以借此可以将 **阅读模式的内容导出多种格式**，但目前仅支持 **导出 Epub**，接下来会支持更多格式。

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

Hypothesis
---

> 请移步到 [自动化服务](自动化服务?id=Hypothes)

Readwise
---

> 请移步到 [自动化服务](自动化服务?id=Readwise)

邮件服务
---

**简悦 · 同步助手** 内置了邮件发送系统。为了 **安全性与隐私性**，需要使用用户自己的邮件作为邮件发送方，所以 **需要开启邮箱的 SMTP服务**，由于每个邮件服务提供的方式不完全一致，请留意自己的邮件服务商的开启方式。

#### 邮箱服务提供商

为了简化难度，此版本 **仅支持默认选择的邮件服务提供商**，暂不支持定制，未来会考虑更多的定制化。

但目前提供的服务商列表基本上涵盖了大多数常用邮件提供商，包括（部分常用）：

`QQ 邮箱` `126` `163` `Gmail` `Hotmail` `iCloud` `Mailgun` `AOL` `Outlook365` `QQex` `Yahoo` `Yandex` `Zoho` 

#### 如何开启 SMTP

以  **QQ邮箱** 为例，进入 **邮箱 → 设置 → 账户**，按照下图所示开启即可。

[![BjKftx.png](https://s1.ax1x.com/2020/11/11/BjKftx.png)](https://imgchr.com/i/BjKftx)

注意：开启后会 **给你一个密码，请注意保留**，下个步骤需要使用。

#### 如何配置

**简悦 · 同步助手** 只需要以下几步即可配置，包括：

1. SMTP 服务地址 → 目前仅提供一些常用的邮件服务提供商，未来会考虑定制化。
2. 发送邮件地址
3. SMTP 服务密码 → 请填入上步得到的密码即可。
4. 接收的邮件地址

[![DtrvZQ.png](https://s3.ax1x.com/2020/11/24/DtrvZQ.md.png)](https://imgchr.com/i/DtrvZQ)

**简悦 · 扩展端** 需要设置发送时的附件方式，包括： `不包含附件` `PDF 附件` `离线 HTML 附件` 三类。

并在 **简悦（扩展端） → 选项页 → 共通 → 简悦 · 同步助手 ** 开启并选择某种形式的附件。

[![BjlWAs.png](https://s1.ax1x.com/2020/11/11/BjlWAs.md.png)](https://imgchr.com/i/BjlWAs)

即可。

#### 使用

与其它导出服务一样进入 **阅读模式|聚焦模式 → 右下角 控制栏 → 动作 → 导出 → 邮件** 即可。

[![Bj1iHH.png](https://s1.ax1x.com/2020/11/11/Bj1iHH.md.png)](https://imgchr.com/i/Bj1iHH)

#### 发送内容

包含标注（如果已有标注）的阅读模式正文内容，如下图：

[![Bj1BVJ.png](https://s1.ax1x.com/2020/11/11/Bj1BVJ.md.png)](https://imgchr.com/i/Bj1BVJ)


发送到Kindle
---

#### 配置

在 [邮件服务](#邮件服务) 的基础上，支持 **原生发送到 Kindle**，只需填写你的 Kindle 邮箱即可，如下图：

[![DtrvZQ.png](https://s3.ax1x.com/2020/11/24/DtrvZQ.md.png)](https://imgchr.com/i/DtrvZQ)

同样在 **简悦（扩展端） → 选项页 → 共通 → 简悦 · 同步助手 ** 开启此功能：

[![Bj8z3q.png](https://s1.ax1x.com/2020/11/11/Bj8z3q.png)](https://imgchr.com/i/Bj8z3q)

#### 使用

与其它导出服务一样进入 **阅读模式|聚焦模式 → 右下角 控制栏 → 动作 → 导出 → 发送到 Kindle** 即可。

系统级快捷键
---

**简悦 · 同步助手** 内置了系统级快捷键，即：只要运行此 App，就可全局呼出你需要的内容，目前暂时仅包含：**稍后读**

打开稍后读
---

#### 设置稍后读

> 关于此部分细节请看 [binsee](https://github.com/binsee) 提供的 [详细说明](https://github.com/Kenshin/simpread/issues/1402)

需要 **简悦（扩展端）· 稍后读**  [创建快捷方式](稍后读?id=创建快捷方式)，然后将快捷键方式的路径填入到下面的地址，即可：

[![BjJ2Yd.png](https://s1.ax1x.com/2020/11/11/BjJ2Yd.md.png)](https://imgchr.com/i/BjJ2Yd)

#### 设置快捷键

同时在快捷键栏里可以更改为你常用的快捷键。

**注意：** 此方式的设置与 **简悦 · 扩展端** 一致，依次设置按键。

Bookmarklet
---

详细 [请看这里](Bookmarklet)

***

> 同步助手的 Logo 自于社区用户 [Shawn](https://shawnan.design/) 的设计。





