>  此功能最低要求 1.1.4.6022 版本，如低于此版本，[请升级](http://ksria.com/simpread/) 到最新版本。

> [!TIP]
> 使用 Notion 的用户一般会配合 Notion 辅助增强实现更强大的导入方案，包括：增加 favicon、题图、同步稍后读标签、添加自定义标签等功能，详细说明 [请看这里](https://github.com/Kenshin/simpread/discussions/3572)。

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