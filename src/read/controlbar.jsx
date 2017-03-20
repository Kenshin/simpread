console.log( "=== simpread read controlbar load ===" )

import * as ss from 'stylesheet';

import setting from 'readsetting';
import Fab     from 'fab';

const items = {
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
    },
    "down" : {
        "name" : "向下滚动 ↓",
        "icon" : ss.IconPath("down_icon"),
        "color": "#00BCD4",
    },
    "up" : {
        "name" : "向上滚动 ↑",
        "icon" : ss.IconPath("up_icon"),
        "color": "#00BCD4",
    },
    "fontfamil" : {
        "name" : "字体样式",
        "icon" : ss.IconPath("fontfamily_icon"),
        "color": "#9C27B0",
        "items": {
            "fontfamily_default" : {
                "name" : "系统默认",
                "icon" : ss.IconPath("fontfamily_default_icon"),
                "color": "#9C27B0",
            },
            "fontfamily_hansans" : {
                "name" : "思源黑体",
                "icon" : ss.IconPath("fontfamily_hansans_icon"),
                "color": "#9C27B0",
            },
            "fontfamily_yahei" : {
                "name" : "微软雅黑",
                "icon" : ss.IconPath("fontfamily_yahei_icon"),
                "color": "#9C27B0",
            },
            "fontfamily_pingfang" : {
                "name" : "苹方",
                "icon" : ss.IconPath("fontfamily_pingfang_icon"),
                "color": "#9C27B0",
            },
            "fontfamily_hiragino" : {
                "name" : "冬青黑体",
                "icon" : ss.IconPath("fontfamily_hiragino_icon"),
                "color": "#9C27B0",
            },
        },
    },
    "fontsize" : {
        "name" : "字体大小",
        "icon" : ss.IconPath("fontsize_icon"),
        "color": "#9E9E9E",
        "items": {
            "fontsizelarge" : {
                "name" : "增大",
                "icon" : ss.IconPath("fontsize_large_icon"),
                "color": "#9E9E9E",
            },
            "fontsizenormal" : {
                "name" : "正常",
                "icon" : ss.IconPath("fontsize_normal_icon"),
                "color": "#9E9E9E",
            },
            "fontsizesmall" : {
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
            "wightlarge" : {
                "name" : "加宽",
                "icon" : ss.IconPath("layout_large_icon"),
                "color": "#FFEB3B",
            },
            "wightnormal" : {
                "name" : "正常",
                "icon" : ss.IconPath("layout_normal_icon"),
                "color": "#FFEB3B",
            },
            "wightsmall" : {
                "name" : "窄",
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
            "themeprev" : {
                "name" : "前一个主题",
                "icon" : ss.IconPath("theme_prev_icon"),
                "color": "#FB8C00",
            },
            "themenext" : {
                "name" : "后一个主题",
                "icon" : ss.IconPath("theme_next_icon"),
                "color": "#FB8C00",
            },
        },
    },
},
    tooltip_options = {
        target   : "name",
        position : "bottom",
        delay    : 50,
};

/**
 * Read controlbar
 * 
 * @class
 */
class ReadCtlbar extends React.Component {

    open() {
        setting.Render();
    }

    onAction( event, type ) {
        console.log( "fab type is =", type )
        switch ( type ) {
            case "exit":
                this.props.exit();
                break;
            case "setting":
                action( type );
                break;
        }
    }

    render() {
        return (
            <Fab items={ items } tooltip={ tooltip_options } waves="sr-fab waves-circle waves-float" onAction={ (event, type)=>this.onAction(event, type ) } />
        )
    }
}

/**
 * Call setting adaper
 * 
 * @param {string} type, include: 'setting'
 */
function action( type ) {
    if ( type == "setting" ) {
        setting.Render();
    }
}

export {
    ReadCtlbar,
    action as ReadCtlAdapter,
}