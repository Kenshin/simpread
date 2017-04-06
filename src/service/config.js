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
       }
       return menu;
});

export {
    shortcuts as Shortcuts,
    tabsItem,
    headerColors,
    topColors,
    menuItem,
}