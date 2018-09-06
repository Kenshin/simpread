此功能最低要求 1.1.2 版本，如低于此版本，[请升级](http://ksria.com/simpread/) 到最新版本。
***

含义
---
> 1.1.2 开始引入了 `插件系统`，同时也可以方便的编写基于 `阅读模式` 的插件了。

门槛
---
> 只要你会 `JavaScript`，就可以编写了，如果还会些 CSS 与 Chrome API 就更棒了~

API
---
> 1.1.2 开放了以下 API，可以在插件中使用，随着版本的升级，我会陆续开放一些更高级的玩法。

- window 等全局变量；

- jQuery

- [Mousetrap](https://craig.is/killing/mice) `快捷键支持`

- [Velocity.js](http://github.com/julianshapiro/velocity) `动效支持`

- Notify 内置的提示器 （关于这部分，会单独详细说明）

- Chrome / Firfox API （并没有开放更多的权限，只限于 `消息系统` `storage` 等 ）

- 已命名好的 jQuery 对象：

  - $$version → `当前插件的版本号`

  - $title  → `阅读模式的标题`
  - $desc → `阅读模式的描述`
  - $content → `阅读模式的正文`
  - $footer → `阅读模式的页脚`
  - $process → `当前 scroll 的进度`
  - $toc → `当前页面的 目录`

- storage.current （ `当前页面的适配规则 ）

- storage.read （当前页面的配置信息）

Demo
---

```
// 无图版
$content.find( "img" ).remove();
```

```
// 快捷键关闭当前 Tab
Mousetrap.bind( 'x x', function() {
    browser.runtime.sendMessage( {type:"close_tab", value:{ url: location.href }} );
});
```

```
// 为阅读模式增加字数统计
sr-plugin-count {
    position: fixed;
    display: block;
    left: 5px;
    bottom: 5px;
    font-size: 12px
}

var count = $content.text().length,
       html  = '<sr-plugin-count> 共计：' + count + ' 个字 </sr-plugin-count>';
$content.append(html);
```
- [Lightbox( 点击查看大图 )](https://gist.github.com/Kenshin/e9bf7f7c93c9746e1d816ec9de9ecd43)

- [划词搜索](https://gist.github.com/Kenshin/4b981094a615540c30fc63451e038d30)

如何编写
---
> 1.1.2 内置了插件编辑器，具体操作如下：

- 通过 选项页 → 共通 → 导出配置文件到本地，导出配置文件；

- 打开 https://simpread.ksria.cn/plugins/editor/

- 点击 `导入配置文件` 导入实现下载的配置文件；

会得到下图 ↓ 所示的界面

![2018-09-03_153112.png](https://i.loli.net/2018/09/03/5b8ce3a764413.png)

- 点击 `新建一个插件` 进行新建操作；

- 点击 `提交到服务器` 进行提交，提交后会进入待审核状态，管理员审核后，就可以出现在 [ 插件中心](https://simpread.ksria.cn/plugins)

新建插件说明
---
![2018-09-03_153946.png](https://i.loli.net/2018/09/03/5b8ce6264abb7.png)

1. 插件名称，不可为空，用来描述插件的功能，尽量简单直接；

2. 版本号，符合 semver 规则，例如 x.xx.xx 等；

3. 当前插件生效的 `域`，仅支持适配站点的 `name` 属性；

4. 插件的类别，供有下图所示的内容

   ![2018-09-03_154500.png](https://i.loli.net/2018/09/03/5b8ce6f2a2cd1.png)

5. 插件运行的位置，暂仅支持 `进入阅读模式` 后，目前包括的值有：

   ![2018-09-03_154512.png](https://i.loli.net/2018/09/03/5b8ce726ac05c.png)

6. 插件的图标，仅可以使用 [Font Awesome](https://fontawesome.com/icons?d=gallery&m=free)

7. 插件的前景色，仅支持 CSS3 颜色值；

8. 插件的背景色，仅支持 CSS3 颜色值；

9. 插件的样式，可为空；

10. 插件的脚本，必填项；

如何测试
---

> 以 `Chrome` 为例，利用了特有的 `Snippet` 机制，即可方便的测试插件。

1. 点击 `复制到剪切板`；

2. 打开一个任意可以进入阅读模式的页面，如 https://sspai.com/post/39491

3. Ctrl + Shift + I，打开 Chrome DevTools

4. 点击 `Source` 选项卡，在右侧选择 `Snippets`

5. 点击 `New snippt` 新建一个空的 `Snippet`

6. 粘贴（Ctrl + V） 到空的 `Snippet`

7. 如果 `步骤1` 无误的话，会出现以下的代码

```
console.log( 'SimpRead Plugin debbuger' )

/********************************************
 * SimpRead Plugin debugger, version 0.0.1
 ********************************************/

/**
 * Plugin
 * 
 * @param {string} $$version 
 * @param {jquery} $title   jquery object
 * @param {jquery} $desc    jquery object
 * @param {jquery} $content jquery object
 * @param {jquery} $footer  jquery object 
 * @param {jquery} $process jquery object
 * @param {jquery} $toc     jquery object
 * @param {object} Notify
 * @param {object} browser, include: chrome, browser(firefox)
 * @param {object} current site object
 * @param {object} current simpread.read object
 */
function plugin($$version, $title, $desc, $content, $footer, $process, $toc, Notify, browser, $$current, $$read ) {
    // debugger;
    (function () {
        // 你写的内容
    })();
}

/**
 * Style
 * 
 * @returns {string} style str
 */
function style() {
    return ``;
}

// change top to simpread
window.simpread.testPlugin( style, plugin );
```

8. 选中下图所示的内容后，分别点击下图 ① ②

![2018-09-03_160257.png](https://i.loli.net/2018/09/03/5b8ceca5a6ef2.png)

即可开始测试你的插件。

**注意** 上图 `L25`，此处即为你的代码，建议在 `步骤1` 前在 **样式** 和 **脚本** 处随意加入些内容，方便 `步骤 8` 的定位。

