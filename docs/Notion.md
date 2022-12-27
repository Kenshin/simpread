>  此功能最低要求 1.1.4.6022 版本，如低于此版本，[请升级](https://simpread.pro) 到最新版本。

> [!TIP]
> 使用 Notion 的用户一般会配合 Notion 辅助增强实现更强大的导入方案，包括：增加 favicon、题图、同步稍后读标签、添加自定义标签等功能，详细说明请看 [导入到 Notion 辅助增强](https://github.com/Kenshin/simpread/discussions/3572)。

> [!TIP]
> 简悦近期推出了配置库功能，包括 Notion 配置库，详细说明请看 [配置库](配置库)。

***

> [!WARNING]
> 2022年12月6日开始，Notion API 调整导致扩展端功能无法导入到 Database Page，原因细节 [请看这里](https://github.com/Kenshin/simpread/issues/4849)。
> 为了避免这种情况反复发生的被动，所以简悦官方推出了：**导入到 Notion 插件**，用插件的方式来替代原来的内置在扩展端的功能。

# 插件端

插件端拥有比扩展端更灵活的方案，也是简悦官方建议首选方案关于插件端的详细说明 [请看这里](https://github.com/Kenshin/simpread/discussions/4954)。

## 地址

https://simpread.ksria.cn/plugins/details/OpaogjT8KJ

与扩展端的区别
---

|        | 快捷键         | 图床 | 加入稍后读时自动导入 | 自动化 | 可更改导入 Page | 支持 Notion 辅助增强插件 | 稍后读内是否可用                |
| ------ | -------------- | ---- | -------------------- | ------ | --------------- | ------------------------ | ------------------------------- |
| 扩展端 | s r → n t      | ✓    | ✓                    | ✓      | ✕               | ✓                        | ✓（无法使用 Notion 辅助增强插件 |
| 插件端 | <kbd>n t</kbd> | ✓    | ✓                    | ✓      | ✓               | ✓                        | ✕                               |


通过上表可以看到，除了无法在稍后读中使用外（下个版本支持），扩展端具有的功能，插件端也都具有，但插件端还可支持随时更改不同的 Page 功能。

同时，因为插件的更新不依赖与扩展端，可随时更新，具有更好的时效性。
快捷键
---

`n t` → [一键导入全文到 Notion](#导入正文)

`q n t` → [选择不同的 Page 后导入全文到 Notion](#选择任意Page导入)

选项
---

随便进入一个页面 e.g. https://sspai.com/post/71576 并进入 **阅读模式 → 右下角 → 动作 → 插件触发器**

按照下图所示即可查看此插件的选项页。（注意：如果你的界面没有插件触发器，请根据此 [解决方案](https://github.com/Kenshin/simpread/discussions/2342) 修复。

![](https://s1.ax1x.com/2022/12/27/zzZFMt.png)

功能
---

### 授权

![2022-12-26_13-05-42 (1)](https://user-images.githubusercontent.com/81074/209503863-00eadb68-ef0c-4b9f-9195-3f056c63aea2.gif)

**注意：** 想要显示 Page 的话，必须要加 🌟 ，详细说明 [请看这里](#注意)。

### 导入正文

支持快捷键 <kbd>n t</kbd> 或手动导入

![](https://s1.ax1x.com/2022/12/27/zzZZdS.png)

### 选择任意Page导入

相比扩展端来说，增加了方便选择不同 Page 的导入功能，支持快捷键 <kbd>q n t</kbd> 或手动导入。

![](https://s1.ax1x.com/2022/12/27/zzZuGj.png)

呼出后会显示下图所示的界面，通过此界面在不离开当前页面的前提下就可选择不同的 Page 导入。

![](https://s1.ax1x.com/2022/12/27/zzZKRs.png)

上述操作可以看这两个视频：[知乎视频](https://www.zhihu.com/zvideo/1590744209203687424) | [B站视频](https://www.bilibili.com/video/BV18e4y1j7Ps/)

安装与升级
---

- 没有使用 [同步助手](Sync) 的 [自动同步](Sync?id=自动同步) 的话，可直接通过 [此链接](https://simpread.ksria.cn/plugins/details/OpaogjT8KJ) 安装。

- 使用 [同步助手](Sync) 的 [自动同步](Sync?id=自动同步) 功能，请使用 [插件管理器](https://www.yuque.com/kenshin/simpread/fcw60u) 安装。

注意
---

在授权后的下拉列表中无法看到你需要的 Page，请将它加 Pin（如下图所示操作）

![](https://s1.ax1x.com/2022/12/27/zzZlMq.png)

关于无法授权的更多 [解决方案](https://www.yuque.com/kenshin/simpread/wwk65u)。

***

> [!WARNING]
> 以下为扩展端功能，从2022年12月6日后，不在建议使用。

# 扩展端

位置
---

> 阅读模式 → 控制栏 → 动作 → 保存

![lzcLOe.png](https://s1.ax1x.com/2022/11/07/xv014U.png)

说明
---

导出到 `Notion` 的内容为 **Markdown** 格式


授权
---

> 由于  **Notion** 并未提供 API 方式，所以需要使用 下面几个步骤才能授权成功。

- 选项页 → 高级设定 → 服务
  ![NeHUaQ.png](https://s1.ax1x.com/2020/06/18/NeHUaQ.png)

- 用户需要手动登录到 [Notion](https://www.notion.so/)

- 选择授权（如无法找到需要授权的 Page 可通过 加 **Favorite 解决**

  ![N0JMEF.png](https://s1.ax1x.com/2022/11/07/xv0Yv9.png)

- 授权成功后，可选择保存的 Page

- Notion Page 支持层级文件夹 _**注意：需要 1.1.4.6016 版本才可支持**_

![lzgEwj.png](https://s1.ax1x.com/2020/06/16/NFU1k8.png)

图床
---

> [1.1.4.6022](http://ksria.com/simpread/changelog.html#1.1.4.6022) 增加了 Notion.so 图床功能，导入到 Notion 的内容可自动上传为 Notion 本身，避免源页面 404 等问题

> 注意：由于使用了 Notion 私有 API 所以在上传图片时较慢 

> 选项页 → 服务 → 授权管理，开启图床功能 _**默认为关闭状态**_

  ![NGBOWq.png](https://s1.ax1x.com/2020/06/22/NGBOWq.png)

> 使用效果

  ![NGcqkF.gif](https://s1.ax1x.com/2020/06/22/NGcqkF.gif)

注意
---

> A. 如何更改授权后的文件夹？

1. 选项页 → 服务 → 授权管理
2. 点击 **重新获取 Notion Page** 即可看到下拉列表

> B. 导出到 Notion database 的内容 **不含有链接** 的话，请参照下面的方式设定

![NNWyDJ.png](https://s1.ax1x.com/2020/06/23/NNWyDJ.png)

>  C. 导出到 Notion database 的内容也可以显示导入时间，请参照下面的方式设定

![NNWsu4.png](https://s1.ax1x.com/2020/06/23/NNWsu4.png)


授权异常
---

> 无法授权或者授权后找不到对应的 Page 可通过 加 **Favorite 解决**，如下图所示的方式。

![N0JMEF.png](https://s1.ax1x.com/2022/11/07/xv0Yv9.png)

> 由于使用了私有 API 所以需要 Cookie 的开启，请确保下面的内容

![U4aM60.png](https://s1.ax1x.com/2020/07/20/U4aM60.png)

> 如果上述内容均无法成功授权或无法导出到 Notion，请看下面的方式

使用 Notion Web Cliper 并新建一个 database 的 Page 然后通过 Notion 授权并选择这个 Page 的方式