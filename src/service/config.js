console.log( "=== simpread config load ===" )

import * as ss from 'stylesheet';

const keyboard = {
    "控制栏 - 导出" : {
        md: {
            "kbd"  : "md",
            "type" : "markdown",
            "desc" : "导出为 Markdown",
        },
        om: {
            "kbd"  : "om",
            "type" : "offlinemarkdown",
            "desc" : "导出为 离线 Markdown",
        },
        pg: {
            "kbd"  : "pg",
            "type" : "png",
            "desc" : "导出为 PNG",
        },
        pf: {
            "kbd"  : "pf",
            "type" : "pdf",
            "desc" : "导出为 PDF",
        },
        ep: {
            "kbd"  : "ep",
            "type" : "epub",
            "desc" : "导出为 epub",
        },
        hm: {
            "kbd"  : "hm",
            "type" : "html",
            "desc" : "导出为 HTML",
        },
        oh: {
            "kbd"  : "oh",
            "type" : "offlinehtml",
            "desc" : "导出为 离线 HTML",
        },
        tm: {
            "kbd"  : "tm",
            "type" : "temp",
            "desc" : "导出为 临时页面",
        },
        cp: {
            "kbd"  : "cp",
            "type" : "snapshot",
            "desc" : "截图",
        },
    },
    "控制栏 - 其它" : {
        ff: {
            "kbd"  : "ff",
            "type" : "fontfamily_",
            "desc" : "改变字体样式，取值 1 ~ 5",
        },
        fs: {
            "kbd"  : "fs",
            "type" : "fontsize_",
            "desc" : "改变字体大小，取值 1 ~ 3",
        },
        la: {
            "kbd"  : "la",
            "type" : "layout_",
            "desc" : "改变版面布局，取值 1 ~ 3",
        },
        "th →": {
            "kbd"  : "th →",
            "type" : "theme_next",
            "desc" : "更换为后一个主题",
        },
        "th ←": {
            "kbd"  : "th ←",
            "type" : "theme_prev",
            "desc" : "更换为前一个主题",
        },
    },
    "控制栏 - 生产力工具" : {
        yx: {
            "kbd"  : "yx",
            "type" : "yinxiang",
            "desc" : "保存到 印象笔记",
        },
        er: {
            "kbd"  : "er",
            "type" : "evernote",
            "desc" : "保存到 Evernote",
        },
        db: {
            "kbd"  : "db",
            "type" : "dropbox",
            "desc" : "保存到 Dropbox",
        },
        on: {
            "kbd"  : "on",
            "type" : "onenote",
            "desc" : "保存到 Onenote",
        },
        gr: {
            "kbd"  : "gr",
            "type" : "gdrive",
            "desc" : "保存到 Google 云端硬盘",
        },
        jg: {
            "kbd"  : "jg",
            "type" : "jianguo",
            "desc" : "保存到 坚果云",
        },
        yq: {
            "kbd"  : "yq",
            "type" : "yuque",
            "desc" : "保存到 语雀",
        },
        wz: {
            "kbd"  : "wz",
            "type" : "weizhi",
            "desc" : "保存到 为知笔记",
        },
        kd: {
            "kbd"  : "kd",
            "type" : "kindle",
            "desc" : "保存到 Kindle",
        },
        ln: {
            "kbd"  : "ln",
            "type" : "linnk",
            "desc" : "保存到 Linnk",
        },
        pt: {
            "kbd"  : "pt",
            "type" : "pocket",
            "desc" : "保存到 Pocket",
        },
        ip: {
            "kbd"  : "ip",
            "type" : "instapaper",
            "desc" : "保存到 Instapaper",
        },
        rl: {
            "kbd"  : "rl",
            "type" : "save",
            "desc" : "保存到 稍后读",
        },
        br: {
            "kbd"  : "br",
            "type" : "bear",
            "desc" : "保存到 Bear",
        },
        ul: {
            "kbd"  : "ul",
            "type" : "ulysses",
            "desc" : "保存到 Ulysses",
        },
    },
    "控制栏 - 无障碍" : {
        ts: {
            "kbd"  : "ts",
            "type" : "dyslexia_speak",
            "desc" : "开始朗读",
        },
        tt: {
            "kbd"  : "tt",
            "type" : "dyslexia_speak_stop",
            "desc" : "停止朗读",
        },
    },
    "控制栏 - 设定" : {
        fu: {
            "kbd"  : "fu",
            "type" : "fullscreen",
            "desc" : "全屏",
        },
        st: {
            "kbd"  : "st",
            "type" : "setting",
            "desc" : "设定对话框",
        },
        se: {
            "kbd"  : "se",
            "type" : "siteeditor",
            "desc" : "站点编辑器",
        },
        hl: {
            "kbd"  : "hl",
            "type" : "highlight",
            "desc" : "重新选择高亮",
        },
        cl: {
            "kbd"  : "cl",
            "type" : "remove",
            "desc" : "隐藏任意元素",
        },
        tr: {
            "kbd"  : "tr",
            "type" : "tempread",
            "desc" : "提交临时阅读模式",
        },
    },
};

/**
 * Shortcust
 */
const shortcuts = {
    "fontfamily": {
        key     : "F",
        value   : [ "1", "2", "3", "4", "5" ],
        name    : [ "default", "PingFang SC", "Hiragino Sans GB", "Microsoft Yahei", "Source Han Sans CN" ]
    },
    "fontsize"  : {
        key     : "S",
        value   : [ "1", "2", "3" ],
        name    : [ "58%", "62.5%", "70%" ],
    },
    "layout"    : {
        key     : "W",
        value   : [ "1", "2", "3" ],
        name    : [ "25%", "20%", "15%" ],
    }
};

/**
 * Read controlbar items
 */
const readItems = {
    "exit" : {
        "name" : "关闭",
        "icon" : ss.IconPath("exit_icon"),
    },
    "option" : {
        "name" : "设定",
        "icon" : ss.IconPath("option_icon"),
        "color": "#03A9F4",
        "items": {
            "fullscreen" : {
                "name" : "全屏",
                "icon" : ss.IconPath("fullscreen_icon"),
                "color": "#03A9F4",
            },
            "siteeditor" : {
                "name" : "站点编辑器",
                "icon" : ss.IconPath("siteeditor_icon"),
                "color": "#03A9F4",
            },
            "setting" : {
                "name" : "设定",
                "icon" : ss.IconPath("setting_icon"),
                "color": "#03A9F4",
            },
            "highlight" : {
                "name" : "重新选项高亮区域",
                "icon" : ss.IconPath("highlight_icon"),
                "color": "#03A9F4",
            },
            "remove" : {
                "name" : "隐藏任意元素",
                "icon" : ss.IconPath("remove_icon"),
                "color": "#03A9F4",
            },
            "tempread": {
                "name" : "提交临时阅读模式",
                "icon" : ss.IconPath("tempread_icon"),
                "color": "#03A9F4",
            },
        },
    },
    "readlater" : {
        "name" : "暂存",
        "icon" : ss.IconPath("save_icon"),
        "color": "#FF5722",
        "items": {
            "linnk" : {
                "name" : "保存到 Linnk",
                "icon" : ss.IconPath("linnk_icon"),
                "color": "#FF5722",
            },
            "instapaper" : {
                "name" : "保存到 Instapaper",
                "icon" : ss.IconPath("instapaper_icon"),
                "color": "#FF5722",
            },
            "pocket" : {
                "name" : "保存到 Pocket",
                "icon" : ss.IconPath("pocket_icon"),
                "color": "#FF5722",
            },
            "save" : {
                "name" : "保存到 稍后读",
                "icon" : ss.IconPath("readlater_icon"),
                "color": "#FF5722",
            },
        },
    },
    "download" : {
        "name" : "导出",
        "icon" : ss.IconPath("download_icon"),
        "color": "#D4237A",
        "items": {
            "epub" : {
                "name" : "导出为 epub",
                "icon" : ss.IconPath("epub_icon"),
                "color": "#D4237A",
            },
            "pdf" : {
                "icon" : ss.IconPath("pdf_icon"),
                "color": "#D4237A",
            },
            "png" : {
                "icon" : ss.IconPath("png_icon"),
                "color": "#D4237A",
            },
            "markdown" : {
                "name" : "导出为 MD",
                "icon" : ss.IconPath("markdown_icon"),
                "color": "#D4237A",
            },
            "offlinemarkdown" : {
                "name" : "导出为 离线 MD",
                "icon" : ss.IconPath("offline_markdown_icon"),
                "color": "#D4237A",
            },
            "html" : {
                "name" : "导出为 HTML",
                "icon" : ss.IconPath("html_icon"),
                "color": "#D4237A",
            },
            "offlinehtml" : {
                "name" : "导出为 离线 HTML",
                "icon" : ss.IconPath("offline_html_icon"),
                "color": "#D4237A",
            },
            "snapshot" : {
                "name" : "截图",
                "icon" : ss.IconPath("snapshot_icon"),
                "color": "#D4237A",
            },
        },
    },
    "send" : {
        "name" : "保存",
        "icon" : ss.IconPath("send_icon"),
        "color": "#00BCD4",
        "items": {
            "yinxiang" : {
                "name" : "保存到 印象笔记",
                "icon" : ss.IconPath("yinxiang_icon"),
                "color": "#00BCD4",
            },
            "evernote" : {
                "name" : "保存到 Evernote",
                "icon" : ss.IconPath("evernote_icon"),
                "color": "#00BCD4",
            },
            "dropbox" : {
                "name" : "保存到 Dropbox",
                "icon" : ss.IconPath("dropbox_icon"),
                "color": "#00BCD4",
            },
            "onenote" : {
                "name" : "保存到 Onenote",
                "icon" : ss.IconPath("onenote_icon"),
                "color": "#00BCD4",
            },
            "gdrive" : {
                "name" : "保存到 Google 云端硬盘",
                "icon" : ss.IconPath("gdrive_icon"),
                "color": "#00BCD4",
            },
            "jianguo" : {
                "name" : "保存到 坚果云",
                "icon" : ss.IconPath("jianguo_icon"),
                "color": "#00BCD4",
            },
            "yuque" : {
                "name" : "保存到 语雀",
                "icon" : ss.IconPath("yuque_icon"),
                "color": "#00BCD4",
            },
            "notion" : {
                "name" : "保存到 Notion",
                "icon" : ss.IconPath("notion_icon"),
                "color": "#00BCD4",
            },
            "youdao" : {
                "name" : "保存到 有道云笔记",
                "icon" : ss.IconPath("youdao_icon"),
                "color": "#00BCD4",
            },
            "weizhi" : {
                "name" : "保存到 为知笔记",
                "icon" : ss.IconPath("wiz_icon"),
                "color": "#00BCD4",
            },
            "kindle" : {
                "name" : "保存到 Kindle",
                "icon" : ss.IconPath("kindle_icon"),
                "color": "#00BCD4",
            },
            "temp" : {
                "name" : "生成临时页面",
                "icon" : ss.IconPath("temp_icon"),
                "color": "#00BCD4",
            },
            "bear" : {
                "name" : "保存到 Bear",
                "icon" : ss.IconPath("bear_icon"),
                "color": "#00BCD4",
            },
            "ulysses" : {
                "name" : "保存到 Ulysses",
                "icon" : ss.IconPath("ulysses_icon"),
                "color": "#00BCD4",
            },
        },
    },
    "dyslexia" : {
        "name" : "无障碍",
        "icon" : ss.IconPath("dyslexia_icon"),
        "color": "#90ee02",
        "items": {
            "dyslexia_speak" : {
                "name" : "播放声音",
                "icon" : ss.IconPath("speak_icon"),
                "color": "#90ee02",
            },
            "dyslexia_speak_stop" : {
                "name" : "停止播放",
                "icon" : ss.IconPath("speak_stop_icon"),
                "color": "#90ee02",
            },
        },
    },
    "share" : {
        "name" : "共享",
        "icon" : ss.IconPath("share_icon"),
        "color": "#3f51b5",
        "items": {
            "share_gplus" : {
                "name" : "Google G+",
                "icon" : ss.IconPath("share_gplus_icon"),
                "color": "#DD4B39",
            },
            "share_facebook" : {
                "name" : "Facebook",
                "icon" : ss.IconPath("share_facebook_icon"),
                "color": "#3B5998",
            },
            "share_telegram" : {
                "name" : "Telegram",
                "icon" : ss.IconPath("share_telegram_icon"),
                "color": "#0088CC",
            },
            "share_twitter" : {
                "name" : "Twitter",
                "icon" : ss.IconPath("share_twitter_icon"),
                "color": "#1DA1F2",
            },
            "share_weibo" : {
                "name" : "新浪微博",
                "icon" : ss.IconPath("share_weibo_icon"),
                "color": "#E6162D",
            },
            "share_card" : {
                "name" : "分享卡",
                "icon" : ss.IconPath("share_card_icon"),
                "color": "#0f4137",
            },
        },
    },
    "trigger" : {
        "name" : "插件触发器",
        "icon" : ss.IconPath("plugin_icon"),
        "color": "#00bcd4",
        "items": {}
    },
    /*
    "down" : {
        "name" : "向下滚动",
        "icon" : ss.IconPath("down_icon"),
        "color": "#00BCD4",
    },
    "up" : {
        "name" : "向上滚动",
        "icon" : ss.IconPath("up_icon"),
        "color": "#00BCD4",
    },
    */
    "fontfamily" : {
        "name" : "字体样式",
        "icon" : ss.IconPath("fontfamily_icon"),
        "color": "#9C27B0",
        "items": {
            "fontfamily_default" : {
                "name" : "系统默认",
                "icon" : ss.IconPath("fontfamily_default_icon"),
                "color": "#9C27B0",
            },
            "fontfamily_PingFang SC" : {
                "name" : "苹方",
                "icon" : ss.IconPath("fontfamily_pingfang_icon"),
                "color": "#9C27B0",
            },
            "fontfamily_Hiragino Sans GB" : {
                "name" : "冬青黑体",
                "icon" : ss.IconPath("fontfamily_hiragino_icon"),
                "color": "#9C27B0",
            },
            "fontfamily_Microsoft Yahei" : {
                "name" : "微软雅黑",
                "icon" : ss.IconPath("fontfamily_yahei_icon"),
                "color": "#9C27B0",
            },
            "fontfamily_Source Han Sans CN" : {
                "name" : "思源黑体",
                "icon" : ss.IconPath("fontfamily_hansans_icon"),
                "color": "#9C27B0",
            },
        },
    },
    "fontsize" : {
        "name" : "字体大小",
        "icon" : ss.IconPath("fontsize_icon"),
        "color": "#9E9E9E",
        "items": {
            "fontsize_70%" : {
                "name" : "增大",
                "icon" : ss.IconPath("fontsize_large_icon"),
                "color": "#9E9E9E",
            },
            "fontsize_62.5%" : {
                "name" : "正常",
                "icon" : ss.IconPath("fontsize_normal_icon"),
                "color": "#9E9E9E",
            },
            "fontsize_58%" : {
                "name" : "减小",
                "icon" : ss.IconPath("fontsize_small_icon"),
                "color": "#9E9E9E",
            },
        },
    },
    "layout" : {
        "name" : "版面布局",
        "icon" : ss.IconPath("layout_icon"),
        "color": "#FFEB3B",
        "items": {
            "layout_15%" : {
                "name" : "宽栏",
                "icon" : ss.IconPath("layout_large_icon"),
                "color": "#FFEB3B",
            },
            "layout_20%" : {
                "name" : "正常",
                "icon" : ss.IconPath("layout_normal_icon"),
                "color": "#FFEB3B",
            },
            "layout_25%" : {
                "name" : "窄栏",
                "icon" : ss.IconPath("layout_small_icon"),
                "color": "#FFEB3B",
            },
        },
    },
    "theme" : {
        "name" : "主题",
        "icon" : ss.IconPath("theme_icon"),
        "color": "#FB8C00",
        "items": {
            "theme_prev" : {
                "name" : "前一个主题",
                "icon" : ss.IconPath("theme_prev_icon"),
                "color": "#FB8C00",
            },
            "theme_next" : {
                "name" : "后一个主题",
                "icon" : ss.IconPath("theme_next_icon"),
                "color": "#FB8C00",
            },
        },
    },
}

/**
 * Read options
 */
const fontfamily = [{
        value : "default",
        name  : "系统默认",
    },{
        value : "PingFang SC",
        name  : "苹方字体",
        style : {
            text: { fontFamily: "PingFang SC" }
        }
    },{
        value : "Hiragino Sans GB",
        name  : "冬青黑体",
        style : {
            text: { fontFamily: "Hiragino Sans GB" }
        }
    },{
        value : "Microsoft Yahei",
        name  : "微软雅黑",
        style : {
            text: { fontFamily: "Microsoft Yahei" }
        }
    },{
        value : "Source Han Sans CN",
        name  : "思源黑体",
        style : {
            text: { fontFamily: "Source Han Sans CN" }
        }
    },{
        value : "Noto Serif CJK SC, Source Han Serif SC, Source Han Serif CN",
        name  : "思源宋体",
        style : {
            text: { fontFamily: "Noto Serif CJK SC, Source Han Serif SC, Source Han Serif CN" }
        }
    },{
        value : "",
        name  : "自定义字体",
        style : {
            text: { fontFamily: "default" }
        }
    }],
    fontsize = [{
        value : "62.5%",
        name  : "正常",
    },{
        value : "70%",
        name  : "大号",
    },{
        value : "58%",
        name  : "小号",
    }],
    layout = [{
        value : "20%",
        name  : "正常",
    },{
        value : "15%",
        name  : "宽栏",
    },{
        value : "25%",
        name  : "窄栏",
}],
readLabels = [ "白练", "白磁", "卯之花色", "丁子色", "娟鼠", "月白", "百合", "紺鼠", "黒鸢" ];

/**
 * Focus controlbar items
 */
const focusItems = ( items => {
    const news = $.extend( true, {}, items ),
          dels = [ "theme", "fontfamily", "fontsize", "layout", "dyslexia", "trigger" ];
    dels.forEach( del => delete news[ del ] );
    delete news.option.items.fullscreen;
    delete news.option.items.tempread;
    delete news.download.items.snapshot;
    delete news.download.items.offlinehtml;
    delete news.download.items.offlinemarkdown;
    news.top = {
        "name" : "返回顶部",
        "icon" : ss.IconPath("top_icon"),
        "color": "#009688",
    };
    return news;
})( readItems );

/**
 * Focus options
 */
const focusThemes = [
    "235, 235, 235, 0.9",
    "216, 216, 216, 0.9",
    "229, 221, 208, 0.9",
    "243, 234, 203, 0.9",
    "176, 192, 182, 0.9",
    "28, 31, 43, 0.9",
    "61, 66, 70, 0.9",
    "17, 18, 20, 0.9"
],
focusLabels = [ "白练", "灰青", "素色", "鸟之子色", "青磁鼠", "焦茶", "御纳戸色", "黒鸢" ];

/**
 * Options page
 */
const tabsItem = [{
        name: "共通",
        value: "common",
        active : true,
        route: "#common",
    },{
        name: "基础设定",
        value: "simple",
        route: "#simple",
    },{
        name: "高级设定",
        value: "labs",
        route: "#labs",
    },{
        name: "站点管理",
        value: "sites",
        route: "#sites",
    },{
        name: "插件管理",
        value: "plugins",
        route: "#plugins",
    },{
        name: "稍后读",
        value: "later",
        route: "#later",
    },{
        name: "账户",
        value: "account",
        route: "#account",
    },{
        name: "关于",
        value: "about",
        route: "#about",
}],
    headerColors  = [ "#64B5F6", "#81C784", "#7986CB", "#9575CD", "#4DD0E1", "#BA68C8", "#989fb5", "#4DB6AC" ],
    topColors     = [ "#2196F3", "#4CAF50", "#3F51B5", "#673AB7", "#00BCD4", "#9C27B0", "#6f7a9b", "#009688" ],
    menuItem      = tabsItem.map( ( item, idx ) => {
       const menu = { ...item };
       switch ( idx ) {
            case 0:
                delete menu.active;
                menu.fontIcon = '<i class="fas fa-sync-alt"></i>';
                break;
            case 1:
                menu.fontIcon = '<i class="fas fa-wrench"></i>';
                break;
            case 2:
                menu.fontIcon = '<i class="fas fa-tools"></i>';
                break;
            case 3:
                menu.fontIcon = '<i class="fas fa-sitemap"></i>';
                break;
            case 4:
                menu.fontIcon = '<i class="fas fa-plug"></i>';
                break;
            case 5:
                menu.fontIcon = '<i class="fas fa-inbox"></i>';
                break;
            case 6:
                menu.fontIcon = '<i class="fas fa-user"></i>';
                break;
            case 7:
                menu.fontIcon = '<i class="fas fa-info-circle"></i>';
                break;
       }
       return menu;
});

/**
 * Unread list
 */
const actionItems = [
    {
        id: "pocket",
        title: "发送到 Pocket",
    },{
        id: "instapaper",
        title: "发送到 Instapaper",
    },{
        id: "linnk",
        title: "发送到 Linnk",
    },{
        id: "remove",
        title: "删除",
    }
];

export {
    shortcuts,
    keyboard,

    focusItems,
    focusThemes,
    focusLabels,

    readItems,
    fontfamily,
    fontsize,
    layout,
    readLabels,

    tabsItem,
    headerColors,
    topColors,
    menuItem,

    actionItems,
}
