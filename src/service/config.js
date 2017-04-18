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
    /*"download" : {
        "name" : "导出",
        "icon" : ss.IconPath("download_icon"),
        "color": "#673AB7",
    },
    "send" : {
        "name" : "发送到 Pocket",
        "icon" : ss.IconPath("send_icon"),
        "color": "#4CAF50",
    },*/
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
    headerColors  = [ "#64B5F6", "#81C784", "#9575CD", "#BA68C8", "#4DB6AC" ],
    topColors     = [ "#2196F3", "#4CAF50", "#673AB7", "#9C27B0", "#009688" ],
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
                menu.icon = ss.IconPath( "read_later_icon" );
                break;
            case 4:
                menu.icon = ss.IconPath( "about_icon" );
                break;
            case 5:
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
    readItems,
    tabsItem,
    headerColors,
    topColors,
    menuItem,
    actionItems,
}