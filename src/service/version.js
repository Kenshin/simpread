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
          [ "1.1.3", "新增「通知中心，入门指引，支持导入语雀 / 坚果云，预加载机制，增强插件 API 等」，" ],
    ]),
    tips      = {
        "root"  : value => `.version-tips[data-hits='${value}']`,
        "1.1.3" : {
            target: 'labs',
            idx: 2,
            items: [
                {
                    id: 'save_at',
                    intro: '从现在开始可以将配置文件保存到坚果云了，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/坚果云">请看这里</a>',
                },
                {
                    id: 'preload',
                    intro: '简悦的词法分析引擎采用了预加载机制，当系统性能吃紧时，可以选择关闭此功能，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/预加载机制">请看这里</a>',
                },
                {
                    id: 'lazyload',
                    intro: '此功能适合 <b>经常使用简悦但又性能不够</b> 的用户；需要动态加载的页面；支持 Mathjax 解析的页面等，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/延迟加载">请看这里</a>',
                },
                {
                    id: 'jianguo',
                    intro: '你可以在这里输入坚果云的用户名和授权的密码来绑定坚果云，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/坚果云">请看这里</a>',
                },
                {
                    id: 'yuque',
                    intro: '连接你的语雀帐号后，就可使用导出到语雀的服务了，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/语雀">请看这里</a>',
                },
                {
                    id: 'webdav',
                    intro: '导出服务 <b>任意支持 WebDAV 协议</b> 了，从现在开始使用你熟悉的网盘吧，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/WebDAV">请看这里</a>',
                }
            ]
        },
        "common" : {
            target: 'common',
            idx: 0,
            items: [
                {
                    id: 'sync',
                    intro: '简悦支持导出配置文件到 Dropbox 或 坚果云，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/同步">请看这里</a>',
                },
                {
                    id: 'config',
                    intro: '从本地导入配置文件或导出配置文件到本地。注意：简悦支持导入任意版本的配置文件。',
                },
                {
                    id: 'newsites',
                    intro: '简悦每隔一段时间会自动同步适配列表，你也可以手动同步。什么是适配列表？详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/适配站点">请看这里</a>',
                },
                {
                    id: 'clear',
                    intro: '清除简悦产生的全部数据，等同于重新安装，慎用，使用前请先备份。',
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
        "sites" : {
            target: 'sites',
            idx: 2,
            items: [
                {
                    id: 'customsites',
                    intro: '从 1.1.3 开始，简悦调整了第三方适配的规则，从现在开始第三方适配仅针对个人的适配源，关于这部分的详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/站点适配源?id=第三方适配源">请看这里</a><br><b>注意：</b> 如果你使用了自己的适配源，请先清除再导入。',
                },
                {
                    id: 'sitemgr',
                    intro: '用来管理全部的站点，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/站点管理器">请看这里</a> 。',
                },
                {
                    id: 'personsites',
                    intro: '简悦用户自行上传且未收录到 <a target="_blank" href="http://ksria.com/simpread/docs/#/站点适配源?id=官方（主）适配源">官方适配源</a> 里面的适配站点，可以在这里对这些站点进行安装，删除，更新等操作，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/站点集市">请看这里</a> 。',
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
        data.option.lazyload  = [];
        data.option.uninstall = true;

        data.statistics.service.yuque   = 0;
        data.statistics.service.jianguo = 0;

        data.notice = { "latest": 0, "read": [] };

        data.option.blacklist.findIndex(item=>item.indexOf("youtube.com") > 0) < 0 && data.option.blacklist.push( "youtube.com" )

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
 * Notify with type and version
 * 1.0.4 before usage http://ksria.com/simpread/changelog.html#{ver}
 * 1.0.4 after  usage http://ksria.com/simpread/version_${ver}.html
 * 
 * @param {boolean} is first load
 * @param {string} type, include: firstload, update
 * @param {string} ver, e.g. 1.0.0, 1.0.1
 */
function Notify( first, type, ver ) {
    const str    = type == "firstload" ? "安装" : "更新",
          detail = type == "firstload" ? "" : details.get(ver),
          link   = first ? `${detail}如何使用请看 <a href="http://ksria.com/simpread/docs/#/" target="_blank">文档中心</a>` : `${detail}请看 <a href="http://ksria.com/simpread/welcome/version_${ver}.html" target="_blank">更新说明</a>`;
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

export {
    version,
    tips,
    sub_ver as patch,
    Verify,
    Notify,
    Compare,
    FixSubver,
}