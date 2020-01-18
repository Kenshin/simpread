此功能最低要求 1.0.3 版本，如低于此版本，[请升级](http://ksria.com/simpread/) 到最新版本。
***

### 一览
> 如果下图无法显示请看 [Send to Kindle](http://sr.ksria.cn/send%20to%20kindle.gif)

![Send to Kindle](http://sr.ksria.cn/send%20to%20kindle.gif)

### 含义
此功能是将由简悦优化后的 `阅读模式` 的页面发送到 Kindle 上，而非（转换前）原文。

### 第三方服务
此功能使用了第三方服务 http://fivefilters.org/kindle-it ，所以请确保你的网络可以访问它。

### 配置
> 需要将 http://fivefilters.org/kindle-it 对应的信箱 `kindle@fivefilters.org` 加入到 Kindle 的白名单中。

- 使用你的账户登陆并打开 https://www.amazon.cn/mn/dcw/myx.html#/home/settings/payment
- 找到 `已认可的发件人电子邮箱列表` 节，并将 `kindle@fivefilters.org` 加入信任列表，如图：
  ![Imgur](http://i.imgur.com/m406zSC.png)

### 使用
- 由于转码使用了简悦自己的后台服务，所以请确保可以访问 https://simpread.herokuapp.com

- 打开 `阅读模式` 后，通过控制栏进行发送，如下图：
  ![Imgur](http://i.imgur.com/v49dYXs.png)

- 当转码成功后，会自动打开 fivefilters.org 发送页面，如下图：
  ![Imgur](http://i.imgur.com/tn7xO5q.png)

- 点击 `Send!` 即可，如之前的配置没有问题的话，将会在 Kindle 的后台看到如下内容：  
  ![](http://sr.ksria.cn/send%20to%20kindle.png)

### 注意
- 生成后的页面，如 `https://simpread.herokuapp.com/view/20170823xxxxxx.html` 并不会长久存在，超时后会自动删除。