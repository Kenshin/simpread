console.log( "=== simpread version load ===" )

import {browser} from 'browser';

/**
 * Manifest.json version
 */
const version  = browser.runtime.getManifest().version,
      versions = new Map([
          [ "1.0.0", "Sun Jun 11 2017 12:30:00 GMT+0800 (CST)" ],
          [ "1.0.1", "Fri Jun 30 2017 09:27:18 GMT+0800 (CST)" ],
          [ "1.0.2", "Mon Aug 07 2017 19:03:50 GMT+0800 (CST)" ],
          [ "1.0.3", "Mon Aug 21 2017 04:09:23 GMT+0800 (CST)" ],
          [ "1.0.4", "Mon Sep 25 2017 14:40:27 GMT+0800 (CST)" ],
      ]),
      details = new Map([
          [ "1.0.0", "" ],
          [ "1.0.1", "新增「高级设定」选项页，" ],
          [ "1.0.2", "新增「自定义样式，论坛类页面与分页功能」，" ],
          [ "1.0.3", "新增「导出到生产力工具，发送到 Kindle，自定义样式，论坛类页面，分页等」，" ],
          [ "1.0.4", "新增「高级聚焦模式、主动适配与临时阅读模式」，" ],
    ]);

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
        data.option.menu.list = false;
        data.option.br_exit   = false;
        data.option.secret    = false;
        curver = "1.0.4";
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
          link   = first ? `${detail}如何使用请看 <a href="https://github.com/Kenshin/simpread/wiki/入门指南（-操作指引-）" target="_blank">入门指南</a>` : `${detail}请看 <a href="http://ksria.com/simpread/welcome/version_${ver}.html" target="_blank">更新说明</a>`;
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

export {
    version,
    Verify,
    Notify,
    Compare,
}