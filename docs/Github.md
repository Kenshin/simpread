>  此功能最低要求 2.0.0 版本，如低于此版本，[请升级](https://simpread.pro) 到最新版本。

说明
---

将阅读模式以 **Markdown** 格式导入到 `Github`

位置
---

> 阅读模式 → 控制栏 → 动作 → 保存

![U4Gvng.png](https://s1.ax1x.com/2020/07/20/U4Gvng.png)

授权
---

- Generate new token <https://github.com/settings/tokens/new>
- 勾选 repo 权限，并对其命名，如下图：
  ![U4J7b4.png](https://s1.ax1x.com/2020/07/20/U4J7b4.png)

- 简悦 → 选项页 → 高级设定 → 服务
  [![U4YZxf.png](https://s1.ax1x.com/2020/07/20/U4YZxf.png)](https://imgchr.com/i/U4YZxf)
  1. 填入上个步骤生成的 Token
  2. 需要导入的 owner/repo 地址 e.g. Kenshin/simpread
  3. 填入对应的文件夹名称，默认为 md
- 点击 **验证并绑定 Github 的信息** 即可

快捷键
---

> 需要先开启全局快捷键 <kbd>sr</kbd> 后才能使用

<kbd>gh</kbd>


备注
---

> 当出现下图所示的提示，原因是 **你在 Github 上面已经存在了相同名称的 md 文件**，因 Github API 政策调整，导致没有返回准确提示，请留意。

[![sBbaM4.png](https://s3.ax1x.com/2021/01/16/sBbaM4.png)](https://imgchr.com/i/sBbaM4)

> 此问题仅限简悦 2.1 版（及以下）。