console.log( "=== simpread config load ===" )

import * as ss from 'stylesheet';

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
 * Focus controlbar items
 */
const focusItems = {
    "exit" : {
        "name" : "关闭",
        "icon" : ss.IconPath("exit_icon"),
    },
    "setting" : {
        "name" : "设定",
        "icon" : ss.IconPath("setting_icon"),
        "color": "#f87f76",
    },
    "top" : {
        "name" : "返回顶部",
        "icon" : ss.IconPath("top_icon"),
        "color": "#f99d97",
    },
};

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
 * Read controlbar items
 */
const readItems = {
    "exit" : {
        "name" : "关闭",
        "icon" : ss.IconPath("exit_icon"),
    },
    "setting" : {
        "name" : "设定",
        "icon" : ss.IconPath("setting_icon"),
        "color": "#03A9F4",
    },
    "save" : {
        "name" : "暂存",
        "icon" : ss.IconPath("save_icon"),
        "color": "#FF5722",
    },
    "download" : {
        "name" : "导出",
        "icon" : ss.IconPath("download_icon"),
        "color": "#D4237A",
        "items": {
            "markdown" : {
                "name" : "导出为 MD",
                "icon" : ss.IconPath("markdown_icon"),
                "color": "#D4237A",
            },
            "png" : {
                "icon" : ss.IconPath("png_icon"),
                "color": "#D4237A",
            },
            "pdf" : {
                "icon" : ss.IconPath("pdf_icon"),
                "color": "#D4237A",
            },
        },
    },
    "send" : {
        "name" : "保存",
        "icon" : ss.IconPath("send_icon"),
        "color": "#00BCD4",
        "items": {
            "dropbox" : {
                "name" : "保存到 Dropbox",
                "icon" : ss.IconPath("sync_icon"),
                "color": "#00BCD4",
            },
            "pocket" : {
                "name" : "保存到 Pocket",
                "icon" : ss.IconPath("pocket_icon"),
                "color": "#00BCD4",
            },
            "linnk" : {
                "name" : "保存到 Linnk",
                "icon" : ss.IconPath("linnk_icon"),
                "color": "#00BCD4",
            },
        },
    },
    "share" : {
        "name" : "共享",
        "icon" : ss.IconPath("share_icon"),
        "color": "#8BC34A",
        "items": {
            "share_facebook" : {
                "name" : "Facebook",
                "icon" : ss.IconPath("share_facebook_icon"),
                "color": "#8BC34A",
            },
            "share_twitter" : {
                "name" : "Twitter",
                "icon" : ss.IconPath("share_twitter_icon"),
                "color": "#8BC34A",
            },
            "share_gplus" : {
                "name" : "Google G+",
                "icon" : ss.IconPath("share_gplus_icon"),
                "color": "#8BC34A",
            },
            "share_weibo" : {
                "name" : "新浪微博",
                "icon" : ss.IconPath("share_weibo_icon"),
                "color": "#8BC34A",
            },
        },
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
        info  : "F + 1",
    },{
        value : "PingFang SC",
        name  : "苹方字体",
        info  : "F + 2",
        style : {
            text: { fontFamily: "PingFang SC" }
        }
    },{
        value : "Hiragino Sans GB",
        name  : "冬青黑体",
        info  : "F + 3",
        style : {
            text: { fontFamily: "Hiragino Sans GB" }
        }
    },{
        value : "Microsoft Yahei",
        name  : "微软雅黑",
        info  : "F + 4",
        style : {
            text: { fontFamily: "Microsoft Yahei" }
        }
    },{
        value : "Source Han Sans CN",
        name  : "思源黑体",
        info  : "F + 5",
        style : {
            text: { fontFamily: "Source Han Sans CN" }
        }
    }],
    fontsize = [{
        value : "62.5%",
        name  : "正常",
        info  : "S + 2",
    },{
        value : "70%",
        name  : "大号",
        info  : "S + 3",
    },{
        value : "58%",
        name  : "小号",
        info  : "S + 1",
    }],
    layout = [{
        value : "20%",
        name  : "正常",
        info  : "W + 2",
    },{
        value : "15%",
        name  : "宽栏",
        info  : "W + 3",
    },{
        value : "25%",
        name  : "窄栏",
        info  : "W + 1",
}],
readLabels = [ "白练", "白磁", "卯之花色", "丁子色", "娟鼠", "月白", "百合", "紺鼠", "黒鸢" ];

/**
 * Options page
 */
const tabsItem = [{
        name: "共通",
        value: "common",
        active : true,
        route: "#common",
    },{
        name: "聚焦模式",
        value: "focus",
        route: "#focus",
    },{
        name: "阅读模式",
        value: "read",
        route: "#read",
    },{
        name: "高级设定",
        value: "labs",
        route: "#labs",
    },{
        name: "稍后读",
        value: "later",
        route: "#later",
    },{
        name: "关于",
        value: "about",
        route: "#about",
    },{
        name: "帮助",
        value: "help",
        route: "https://github.com/kenshin/simpread/wiki",
}],
    headerColors  = [ "#64B5F6", "#81C784", "#9575CD", "#7986CB", "#BA68C8", "#4DB6AC" ],
    topColors     = [ "#2196F3", "#4CAF50", "#673AB7", "#3F51B5", "#9C27B0", "#009688" ],
    menuItem      = tabsItem.map( ( item, idx ) => {
       const menu = { ...item };
       switch ( idx ) {
            case 0:
                delete menu.active;
                menu.icon = ss.IconPath( "common_icon" );
                break;
            case 1:
                menu.icon = ss.IconPath( "focus_mode_icon" );
                break;
            case 2:
                menu.icon = ss.IconPath( "read_mode_icon" );
                break;
            case 3:
                menu.icon = ss.IconPath( "labs_icon" );
                break;
            case 4:
                menu.icon = ss.IconPath( "read_later_icon" );
                break;
            case 5:
                menu.icon = ss.IconPath( "about_icon" );
                break;
            case 6:
                menu.icon = ss.IconPath( "help_icon" );
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
    },
    {
        id: "remove",
        title: "删除",
    }
];

export {
    shortcuts as Shortcuts,

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
