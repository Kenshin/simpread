此功能最低要求 1.1.3 版本，如低于此版本，[请升级](http://ksria.com/simpread/) 到最新版本。
***

配置
---
> 只要是支持 WebDAV 的服务均可以使用简悦的导出服务。包括：Box.net Teracloud.com 等

> 每个服务支持的 WebDAV 地址都不一样，所以想要使用此功能，需要知道对应服务的 WebDAV 地址。

> 下面以 Box.net 为例说明。

![Xnip2019-06-29_14-14-09.png](https://i.loli.net/2019/06/29/5d1701bae47fd92999.png)

- Box.net WebDAV 地址为 https://dav.box.com/dav/

- 在 选项页 → 授权管理 WebDAV 键入如下的结构

  ```
  {"name":"Box","user":"admin@simpread.com","password":"abcdefg", "url": "https://dav.box.com/dav/"}
  ```
  **结构说明**

  * `name`: 当前 WebDAV 服务的标识 _中英文均可_
  * `user`: 你在 Box.net 的帐号
  * `password`: 你在 Box.net 的密码
  * `url`: Box.net WebDAV 地址

  上面四个属性 **顺序可以调换**，但均为**必填**；且每行一组，可以具有多组。

- 输入完毕后，点击 **验证上述 WebDAV 服务**

- 上述如无误的话，会有验证成功的提示，验证成功后，会自动在 Box.net 建立如下的结构 _此结构名称无法更改且不能重新命名_

  ![Xnip2019-06-27_11-24-00.png](https://i.loli.net/2019/06/27/5d1436d829b1d87303.png)


使用
--

> 如同其它服务一样，进入阅读模式后，在 **控制栏 → 动作 → 保存**

> 注意：绑定的 WebDAV **并没有自己的 icon** 但可通过 icon 下鼠标悬停显示的 Tooltip 判断是何种服务。

> 导出到 WebDAV 的均为 Markdown 格式。

![Xnip2019-06-27_11-26-14.png](https://i.loli.net/2019/06/27/5d1437d6c7d9e94788.png)

