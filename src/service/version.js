console.log( "=== simpread version load ===" )

import {browser} from 'browser';

/**
 * Manifest.json version
 */
const version  = browser.runtime.getManifest().version.replace( /.\d{2,}/, "" ),           // get x.x.x,
      sub_ver  = browser.runtime.getManifest().version.replace( /(\d{1,2}.){2}\d.?/, "" ), // get *.*.*.xxxx
      versions = new Map([
          [ "1.0.0", "Sun Jun 11 2017 12:30:00 GMT+0800 (CST)" ],
          [ "1.0.1", "Fri Jun 30 2017 09:27:18 GMT+0800 (CST)" ],
          [ "1.0.2", "Mon Aug 07 2017 19:03:50 GMT+0800 (CST)" ],
          [ "1.0.3", "Mon Aug 21 2017 04:09:23 GMT+0800 (CST)" ],
          [ "1.0.4", "Mon Sep 25 2017 14:40:27 GMT+0800 (CST)" ],
          [ "1.0.5", "Wed Nov 15 2017 11:39:23 GMT+0800 (CST)" ],
          [ "1.0.6", "Thu Dec 07 2017 14:48:44 GMT+0800 (CST)" ],
          [ "1.1.0", "Sat Dec 23 2017 15:09:30 GMT+0800 (CST)" ],
          [ "1.1.1", "Mon Jun 11 2018 15:10:12 GMT+0800 (CST)" ],
          [ "1.1.2", "Tue Jun 19 2018 14:15:12 GMT+0800 (CST)" ],
          [ "1.1.3", "Thu Jun 06 2019 15:47:44 GMT+0800 (CST)" ],
      ]),
      details = new Map([
          [ "1.0.0", "" ],
          [ "1.0.1", "新增「高级设定」选项页，" ],
          [ "1.0.2", "新增「自定义样式，论坛类页面与分页功能」，" ],
          [ "1.0.3", "新增「导出到生产力工具，发送到 Kindle，自定义样式，论坛类页面，分页等」，" ],
          [ "1.0.4", "新增「高级聚焦模式、主动适配与临时阅读模式」，" ],
          [ "1.0.5", "新增「导出 epub，TXT 阅读器，阅读模式增加目录功能，白名单等」，" ],
          [ "1.0.6", "新增「添加新站到阅读模式，导入第三方适配站点等」，" ],
          [ "1.1.0", "新增「站点编辑器，站点适配源，站点管理器等」，" ],
          [ "1.1.1", "新增「黑名单，全新的控制栏面板，更丰富的中文定制化，无障碍阅读等」，" ],
          [ "1.1.2", "新增「插件中心，站点集市等」，" ],
          [ "1.1.3", "新增「消息中心，帮助中心，入门指引，支持导入语雀 / 坚果云，预加载机制，增强插件 API 等」，" ],
    ]),
    tips      = {
        "root"  : value => `.version-tips[data-hits='${value}']`,
        "1.1.3" : {
            target: 'labs',
            idx: 2,
            items: [
                {
                    id: '',
                    intro: '简悦 1.1.3 功能描述：<br>' + details.get( "1.1.3" ) + '详细说明 <a target="_blank" href="http://ksria.com/simpread/welcome/version_1.1.3.html">请看这里</a> 。' ,
                },
                {
                    id: 'save_at',
                    intro: '从现在开始可以将配置文件保存到坚果云了，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/坚果云">请看这里</a> 。',
                },
                {
                    id: 'preload',
                    intro: '简悦的词法分析引擎采用了预加载机制，当系统性能吃紧时，可以选择关闭此功能，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎?id=预加载机制">请看这里</a> 。',
                },
                {
                    id: 'lazyload',
                    intro: '此功能适合 <b>经常使用简悦但又性能不够</b> 的用户；需要动态加载的页面；支持 Mathjax 解析的页面等，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎?id=预加载机制">请看这里</a> 。',
                },
                {
                    id: 'jianguo',
                    intro: '你可以在这里输入坚果云的用户名和授权的密码来绑定坚果云，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/坚果云">请看这里</a> 。',
                },
                {
                    id: 'yuque',
                    intro: '连接你的语雀帐号后，就可使用导出到语雀的服务了，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/授权服务">请看这里</a> 。',
                },
                {
                    id: 'webdav',
                    intro: '导出服务 <b>任意支持 WebDAV 协议</b> 了，从现在开始使用你熟悉的网盘吧，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/WebDAV">请看这里</a> 。',
                },
                {
                    id: 'notice',
                    intro: '简悦 1.1.3 版增加了消息中心，为了方便查看简悦的一些最新消息，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/消息中心">请看这里</a> 。',
                }
            ]
        },
        "common" : {
            target: 'common',
            idx: 0,
            items: [
                {
                    id: 'sync',
                    intro: '简悦支持导出配置文件到 Dropbox 或 坚果云，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/同步">请看这里</a> 。',
                },
                {
                    id: 'config',
                    intro: '从 <b>本地导入配置文件</b> 或 <b>导出配置文件到本地</b> 。<br>注意：简悦支持导入任意版本的配置文件，但请尽量上传匹配版本的配置文件。',
                },
                {
                    id: 'oldnewsites',
                    intro: '从 1.1.3 开始，此功能转移到 <b>站点管理</b> 选项卡里面，此功能已废除。',
                },
                {
                    id: 'clear',
                    intro: '清除简悦产生的全部数据，等同于重新安装，慎用！使用前 <b>请先备份</b> 。',
                }
            ]
        },
        "simple" : {
            target: 'simple',
            idx: 1,
            items: [
                {
                    id: 'focusmode',
                    intro: '使用 <a target="_blank" href="http://ksria.com/simpread/docs/#/聚焦模式">聚焦模式</a> 时的选项<br>包括：遮罩的主题色，遮罩的透明度，以及进入聚焦模式的快捷键。<br>这些功能也可以在进入此模式后通过右下角控制栏调整。',
                },
                {
                    id: 'readmode',
                    intro: '使用 <a target="_blank" href="http://ksria.com/simpread/docs/#/阅读模式">阅读模式</a> 时的选项<br>包括：主题色，进入阅读模式的快捷键，字体类型，版面布局，甚至正文的字体细调（字间距，行间距等）。<br>这些功能也可以在进入此模式后通过右下角控制栏调整。',
                }
            ]
        },
        "labs" : {
            target: 'labs',
            idx: 2,
            items: [
                {
                    id: '',
                    intro: '本页的功能专门针对 <b>不同需求、不同使用场景</b> 的精细调整。<br>如果你是初级用户的话，完全可以无视这些调整，简悦支持 <b>开箱即用</b>。<br>如果想让阅读模式更具个性化，建议花 1 ~ 2 分钟来看下这些功能点。 😊 ' ,
                },
                {
                    id: 'esc',
                    intro: '启用此功能后，进入阅读模式 & 聚焦模式，可通过点击 ESC 的方式退出。',
                },
                {
                    id: 'br_exit',
                    intro: '点击浏览器右上角 <b>简悦 icon</b> 后的动作，包括：退出当前模式 & 弹出设置对话框。',
                },
                {
                    id: 'blacklist',
                    intro: '加入到列表中的 URL 对应的页面将不会运行简悦，适合一些完全不需要简悦的场合，如：视频类的网站。<br>支持绝对地址或主域名，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/FAQ?id=黑名单">请看这里</a> 。',
                },
                {
                    id: 'save_at',
                    intro: '从现在开始可以将配置文件保存到坚果云了，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/坚果云">请看这里</a> 。',
                },
                {
                    id: 'menu',
                    intro: '简悦支持右键菜单，如果你是个鼠标党的话，可以好好利用它们，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/右键菜单">请看这里</a> 。',
                },
                {
                    id: 'focusconfig',
                    intro: '与 <b>基础设定</b> 中不同，这里是关于聚焦模式细节的设定，同时这些选项也只能在选项页中修改。',
                },
                {
                    id: 'readconfig',
                    intro: '与 <b>基础设定</b> 中不同，这里是关于阅读模式细节的设定，同时这些选项也只能在选项页中修改。<br><br> <a target="_blank" href="http://ksria.com/simpread/docs/#/阅读模式">阅读模式</a> 是简悦重要的组成部分，除了常规的阅读模式外，简悦还支持多种类型，包括：<br> - <a target="_blank" href="http://ksria.com/simpread/docs/#/论坛类页面及分页">论坛类页面及分页</a> <br> - <a target="_blank" href="http://ksria.com/simpread/docs/#/主动适配阅读模式">主动适配</a> <br> - <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎?id=智能感知">智能感知</a> <br> - <a target="_blank" href="http://ksria.com/simpread/docs/#/手动框选">手动框选</a> <br> - <a target="_blank" href="http://ksria.com/simpread/docs/#/TXT-阅读器">TXT 阅读器</a> <br> - <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎?id=markdown-识别">Markdown 阅读器</a> <br> - <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎?id=latex-识别">LaTeX 阅读器</a>',
                },
                {
                    id: 'progress',
                    intro: '进入阅读模式后会在页面上方显示一个阅读进度条，从 1.1.3 版开始 <b>默认为不启用</b>，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/阅读进度">请看这里</a> 。',
                },
                {
                    id: 'readcontrolbar',
                    intro: '进入阅读模式后，会在页面的右下角显示一个 icon 点击可查看阅读模式的一些功能，你可以在这里选择隐藏（鼠标移上时才显示）它。',
                },
                {
                    id: 'fap',
                    intro: '1.1.1 版开始提供 <b>控制栏浮动面板</b> 用来替代原来的 <b>控制栏浮动工具条</b>。<br>如果你并不经常使用简悦的一些高级功能，可以关闭此选项，使用更简洁的 <b>控制栏浮动工具条</b>，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/阅读模式-控制栏">请看这里</a> 。',
                },
                {
                    id: 'highlight',
                    intro: '在 <b>手动框选</b> 方式的基础上增加了 <b>二次确认模式</b>，此模式专门针对页面极其复杂的情况，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/手动框选">请看这里</a> 。',
                },
                {
                    id: 'toc',
                    intro: '进入阅读模式后，会自动生成当前页面的大纲，同时也可选择大纲的显示方式，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/目录">请看这里</a> 。',
                },
                {
                    id: 'readauto',
                    intro: '如果当前 <a target="_blank" href="http://ksria.com/simpread/docs/#/站点适配源">站点已适配</a> 的话，启用此选项后会自动进入到阅读模式，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/适配站点">请看这里</a> 。',
                },
                {
                    id: 'exclusion',
                    intro: '启用 <b>自动进入阅读模式</b> 后，可将不需要自动进入阅读模式的站加入到这个列表中，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/FAQ?id=排除列表">请看这里</a> 。<br>关闭 <b>自动进入阅读模式</b> 后，会有 <a target="_blank" href="http://ksria.com/simpread/docs/#/FAQ?id=白名单">白名单</a> 功能，与 <b>排除列表</b> 相反，加入此的站会自动进入阅读模式。',
                },
                {
                    id: 'pured',
                    intro: '简悦从 1.1.2.5005 开始增加了此功能，目前还处于测试版。<br>词法分析引擎会对版面重新设计，包括：去除多余空格、优化版面结构等。<br>注意：经常解析失败时，请关闭此功能，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎">请看这里</a> 。',
                },
                {
                    id: 'puredpure',
                    intro: '包括：字形、颜色、字号、代码段等，如：微信订阅号，CSDN 等。<br>注意：如果经常阅读代码的话，请安装 <a target="_blank" href="https://simpread.ksria.cn/plugins/details/klGUASLasg">代码段增强</a> 插件，功能包括：高亮，去重，支持 CSDN 等特殊情况的代码段。',
                },
                {
                    id: 'preload',
                    intro: '简悦的词法分析引擎采用了预加载机制，当系统性能吃紧时，可以选择关闭此功能，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎?id=预加载机制">请看这里</a> 。<br>注意：建议无特殊情况下不要关闭此功能，可以 <b>使用下一条的功能</b> 来规避性能问题。',
                },
                {
                    id: 'lazyload',
                    intro: '为了更快的进入到阅读模式，简悦会主动分析每个页面，但加入此列表的 URL 不会被主动分析。<br><br>此功能适合：<br><b> - 经常使用简悦但又性能不够</b> 的用户；<br> - 需要动态加载的页面；<br> - 支持 Mathjax 解析的页面等；<br><br>详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎?id=延迟加载">请看这里</a> 。',
                },
                {
                    id: 'auth',
                    intro: '简悦支持常见的导出服务，你可以授权它们，导出 <b>阅读模式（简悦优化后）的页面</b> 到这些服务，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/授权服务">请看这里</a> 。',
                },
                {
                    id: 'secret',
                    intro: '使用导出服务后，会产生授权码，简悦默认 <b>不会在导出配置时包含它们</b>，如果需要的话，请开启此功能，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/授权服务?id=授权码">请看这里</a> 。',
                },
                {
                    id: 'custom',
                    intro: '简悦可以对 <b>阅读模式生成的页面</b> 更加精细的调整，甚至于 <b>使用 CSS 来深度定制</b>，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/自定义样式">请看这里</a> 。',
                },
                {
                    id: 'notice',
                    intro: '简悦 1.1.3 版增加了消息中心，为了方便查看简悦的一些最新消息，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/消息中心">请看这里</a> 。',
                }
            ]
        },
        "sites" : {
            target: 'sites',
            idx: 2,
            items: [
                {
                    id: 'newsites',
                    intro: '简悦每隔一段时间会自动同步适配列表，你也可以手动同步。<br>什么是适配列表？详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/适配站点">请看这里</a> 。',
                },
                {
                    id: 'customsites',
                    intro: '从 1.1.3 开始，简悦调整了第三方适配的规则：仅针对个人的适配源，关于这部分的详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/站点适配源?id=第三方适配源">请看这里</a> 。<br><b>注意：</b> 如果你使用了自己的适配源，请先清除再导入。',
                },
                {
                    id: 'sitemgr',
                    intro: '用来管理全部的站点，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/站点管理器">请看这里</a> 。',
                },
                {
                    id: 'personsites',
                    intro: '简悦用户自行上传且未收录到 <a target="_blank" href="http://ksria.com/simpread/docs/#/站点适配源?id=官方适配源">官方适配源</a> 里面的适配站点，可以在这里对这些站点进行安装，删除，更新等操作，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/站点集市">请看这里</a> 。',
                }
            ]
        },
        "plugins" : {
            target: 'plugins',
            idx: 4,
            items: [
                {
                    id: 'pluginsite',
                    intro: '为了让阅读模式更加的丰富，简悦从 1.1.2 版本开始支持插件系统，插件系统 <b>仅支持阅读模式</b>。<br>点击这里打开到插件的官网，关于插件的详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/插件系统">请看这里</a> 。<br>注意：安装过多的插件会引起性能问题，建议 <b>不要超过 6 个</b> 。',
                },
                {
                    id: 'pluginconfig',
                    intro: '当用户上传了新的配置文件，需要手动从配置文件读取插件。<br>注意：上传配置文件后会清除当前环境的插件，所以请别忘记手动导入。',
                },
                {
                    id: 'pluginupdate',
                    intro: '更新已安装的全部插件到最新版本。',
                },
                {
                    id: 'pluginclear',
                    intro: '清除当前环境的全部插件。<br>注意：此操作并不能清除当前的配置文件，如果要清除配置文件，请前往 <b>共通 → 清除数据</b> 操作。',
                },
                {
                    id: 'pluginmange',
                    intro: '这是用户的已安装的全部插件，在这里进行管理，包括：禁用， 删除，更新，查看 等操作。<br>同样，在这里安装的插件可以在阅读模式下启用禁用操作，位置在 <b>阅读模式 → 右下角控制栏 → 插件（选项卡）</b> 查看。',
                }
            ]
        },
        "later" : {
            target: 'later',
            idx: 5,
            items: [
                {
                    id: 'laterlist',
                    intro: '简悦自带了一个未读列表，你可以把任意 URL 通过 <a target="_blank" href="http://ksria.com/simpread/docs/#/右键菜单">右键菜单</a> / <a target="_blank" href="http://ksria.com/simpread/docs/#/阅读模式-控制栏">控制栏 → 动作</a> 发送到稍后读。<br>稍后读也支持发送这些链接到 Pocket · Instapaper · Linnk 里面，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/稍后读">请看这里</a> 。',
                },
                {
                    id: 'latermore',
                    intro: '加载更多的稍后读。',
                }
            ]
        },
        "@performance" : {
            target: 'labs',
            idx: 2,
            items: [
                {
                    id: 'preload',
                    intro: '简悦的词法分析引擎采用了预加载机制，当系统性能吃紧时，可以选择关闭此功能，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎?id=预加载机制">请看这里</a> 。<br>注意：建议无特殊情况下不要关闭此功能，可以 <b>使用下一条的功能</b> 来规避性能问题。',
                },
                {
                    id: 'lazyload',
                    intro: '为了更快的进入到阅读模式，简悦会主动分析每个页面，但加入此列表的 URL 不会被主动分析。<br><br>此功能适合：<br><b> - 经常使用简悦但又性能不够</b> 的用户；<br> - 需要动态加载的页面；<br> - 支持 Mathjax 解析的页面等；<br><br>详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎?id=延迟加载">请看这里</a> 。',
                },
                {
                    id: 'blacklist',
                    intro: '也可以将完全不需要的站点加入到黑名单中，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/FAQ?id=黑名单">请看这里</a> 。',
                }
            ]
        }
    };

/**
 * Verify version
 * 
 * @param {string} local version
 * @param {object} simpread data structure
 */
function Verify( curver, data ) {

    if ( curver == "1.0.0" ) {
        data.option.esc      = true;
        data.option.menu     = { focus: true, read: true, link: true };
        data.focus.controlbar= true;
        data.focus.mask      = true;
        data.read.progress   = true;
        data.read.auto       = false;
        data.read.controlbar = true;
        data.read.exclusion  = [
            "v2ex.com","issue.github.com","readme.github.com","question.zhihu.com","douban.com","nationalgeographic.com.cn","tech.163.com","docs.microsoft.com","msdn.microsoft.com","baijia.baidu.com","code.oschina.net","http://www.ifanr.com","http://www.ifanr.com/news","http://www.ifanr.com/app","http://www.ifanr.com/minapp","http://www.ifanr.com/dasheng","http://www.ifanr.com/data","https://www.ifanr.com/app","http://www.ifanr.com/weizhizao","http://www.thepaper.cn","http://www.pingwest.com","http://tech2ipo.com","https://www.waerfa.com/social"
        ];

        curver = "1.0.1";
    }

    if ( curver == "1.0.1" ) {
        data.read.custom     = {
            global: {
                fontFamily : "",
                marginLeft : "",
                marginRight: "",
            },
            title : {
                fontFamily : "",
                fontSize   : "",
                color      : "",
            },
            desc  : {
                fontFamily : "",
                fontSize   : "",
                color      : "",
            },
            art   : {
                fontFamily : "",
                fontSize   : "",
                color      : "",
                fontWeight : "",
                wordSpacing: "",
                letterSpacing: "",
                lineHeight : "",
                textIndent : "",
            },
            pre  : {
                textShadow : "",
            },
            code  : {
                fontFamily : "",
                fontSize   : "",
            },
            css   : "",
        };
        curver = "1.0.2";
    }

    if ( curver == "1.0.2" ) {
        data.option.sync = "";
        curver = "1.0.3";
    }

    if ( curver == "1.0.3" ) {
        data.focus.highlight  = true;
        data.read.highlight   = true;
        data.option.menu.list = false;
        data.option.br_exit   = false;
        data.option.secret    = false;
        curver = "1.0.4";
    }

    if ( curver == "1.0.4" ) {
        data.read.toc       = true;
        data.read.toc_hide  = true;
        data.read.whitelist = [];
        curver = "1.0.5";
    }

    if ( curver == "1.0.5" ) {
        data.option.origins = [];
        data.websites       = {
            custom : [],
            local  : []
        };
        curver = "1.0.6";
    }

    if ( curver == "1.0.6" ) {
        data.websites.local = data.read.sites.concat( data.focus.sites );
        delete data.focus.sites;
        delete data.read.sites;
        curver = "1.1.0";
    }

    if ( curver == "1.1.0" ) {
        data.option.blacklist = [ "google.com" ];
        data.read.fap         = true;
        data.read.custom.global.fontFamily && ( data.read.fontfamily = data.read.custom.global.fontFamily );
        data.read.custom.global.marginLeft && ( data.read.layout     = data.read.custom.global.marginLeft );
        delete data.read.custom.global;

        data.statistics = {"focus":0,"read":0,"service":{"linnk":0,"instapaper":0,"pocket":0,"readlater":0,"epub":0,"pdf":0,"png":0,"markdown":0,"html":0,"evernote":0,"yinxiang":0,"dropbox":0,"onenote":0,"gdrive":0,"kindle":0,"temp":0}}
        data.statistics.focus = data.option.focus;
        data.statistics.read  = data.option.read;
        delete data.option.focus;
        delete data.option.read;
        curver = "1.1.1";
    }

    if ( curver == "1.1.1" ) {
        data.user = { "uid": "","name": "","contact": "","email": "","avatar": "","permission": "" };
        data.option.plugins = [];
        data.websites.person = [];
        curver = "1.1.2";
    }

    if ( curver == "1.1.2" ) {
        data.patch != sub_ver && FixSubver( sub_ver, data );
    }

    if ( curver == "1.1.2" ) {
        data.option.save_at   = "dropbox";
        data.option.notice    = true;
        data.option.preload   = true;
        data.option.lazyload  = [
            "baidu.com", "weibo.com", "youtube.com"
        ];
        data.option.uninstall = true;

        data.statistics.service.yuque   = 0;
        data.statistics.service.jianguo = 0;

        data.notice = { "latest": 0, "read": [] };

        data.option.blacklist.findIndex( item => item.toLowerCase() == "youtube.com" ) < 0 && data.option.blacklist.push( "youtube.com" );

        data.patch = 0;
        curver = "1.1.3";
    }

    /*
    if ( curver == "1.0.1" ) {
        data.option.pocket = { "consumer": "", "access": "" };
        data.read.custom = "";
        curver = "2.0.0";
    }
    */

    data.version = version;
    return data;
}

/**
 * Fix Incompatible simpread data structure
 * 
 * @param {string} version
 * @param {object} simpread data structure
 */
function Incompatible( ver, data ) {
    if ( ver == "1.1.3" ) {
        data.option.origins = data.option.origins.filter( item => item != "http://sr.ksria.cn/origins/website_list_en.json" && item != "http://sr.ksria.cn/origins/website_list_tw.json" ) 
        data.option.origins.length > 0 &&
            new Notify().Render({ type: 2, content: `检测到你曾经修改过第三方适配源，<b>务必刷新后重新导入</b>！<a target="_blank" href="http://ksria.com/simpread/docs/#/站点适配源?id=第三方适配源">详细说明</a>`, state: "holdon" });
        VerifyPlugins( ver, data.option ) &&
            new Notify().Render({ type: 2, content: `已清理失效的插件，<b>务必刷新后重新导入</b>，详细请看 <a href="http://ksria.com/simpread/welcome/version_${version}.html#badplugins" target="_blank">删除失效的插件</a>`, state: "holdon" });
    }
}

/**
 * Notify with type and version
 * 1.0.4 before usage http://ksria.com/simpread/changelog.html#{ver}
 * 1.0.4 after  usage http://ksria.com/simpread/version_${ver}.html
 * 
 * @param {boolean} is first load
 * @param {string} type, include: firstload, update
 * @param {string} ver, e.g. 1.0.0, 1.0.1
 */
function Notify2( first, type, ver ) {
    const str    = type == "firstload" ? "安装" : "更新",
          detail = type == "firstload" ? "" : details.get(ver),
          link   = first ? `${detail}如何使用请看 <a href="http://ksria.com/simpread/guide/" target="_blank">新手入门</a> 及 <a href="http://ksria.com/simpread/docs/#/" target="_blank">文档中心</a>` : `${detail}请看 <a href="http://ksria.com/simpread/welcome/version_${ver}.html" target="_blank">更新说明</a>`;
    return `${str} 到最新版本 ${ver} ，${ link }`;
}

/**
 * Compare current version and target version
 * 
 * @param  {string} target version
 * @return {number} -2: not exist; -1: old version; 1: new version; 0: current version
 */
function Compare( target ) {
    let result = -2;
    if ( versions.has( target ) ) {
        result = Date.parse( versions.get( version )) - Date.parse( versions.get( target ));
        if ( result > 0 ) {
            result = 1;
        } else if ( result < 0 ) {
            result = -1;
        }
    }
    return result;
}

/**
 * Fix subver config
 * 
 * @param {string} patch version e.g. 1025 / 5005
 * @param {object} @see simpread
 */
function FixSubver( patch, target ) {
    if ( patch == "5005" ) {
        target.read.cleanup == undefined && ( target.read.cleanup = true );
        target.read.pure    == undefined && ( target.read.pure    = true );
        target.option.menu.whitelist == undefined && ( target.option.menu.whitelist = false );
        target.option.menu.exclusion == undefined && ( target.option.menu.exclusion = false );
        target.option.menu.blacklist == undefined && ( target.option.menu.blacklist = false );
        target.option.menu.unrdist   == undefined && ( target.option.menu.unrdist   = false );
    }
    target.patch = patch;
    return target;
}

/**
 * Verify current version plugins
 * 
 * @param {string} version
 * @param {object} option
 */
function VerifyPlugins( ver, option ) {
    try {
        if ( option.plugins.length == 0 ) return false;
        const str = option.plugins.join( "," );
        if ( ver == "1.1.3" ) {
            const newStr = str.replace( /(E0j1nYBmDD,?|SumEaxStWE,?|UsayAKSuwe,?)/g, "" );
            if ( str != newStr ) {
                option.plugins = newStr.replace( /,$/, "" ).split( "," );
                return true;
            }
        } else return false;
    } catch( error ) {
        console.error( "version::VerifyPlugin catch", error )
        return false;
    }
}

export {
    version,
    tips,
    sub_ver as patch,
    Verify,
    Notify2 as Notify,
    Compare,
    FixSubver,
    VerifyPlugins,
    Incompatible,
}