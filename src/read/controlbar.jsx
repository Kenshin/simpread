console.log( "=== simpread read controlbar load ===" )

//import {browser} from 'browser';
import * as ss from 'stylesheet';

import setting from 'readsetting';
import Fab     from 'fab';

//const path  = icon=>browser.extension.getURL( `assets/images/${icon}.png` );
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
    "weight" : {
        "name" : "版面布局",
        "icon" : ss.IconPath("weight_icon"),
        "color": "#FFEB3B",
        "items": {
            "wightlarge" : {
                "name" : "加宽",
                "icon" : ss.IconPath("weight_large_icon"),
                "color": "#FFEB3B",
            },
            "wightnormal" : {
                "name" : "正常",
                "icon" : ss.IconPath("weight_normal_icon"),
                "color": "#FFEB3B",
            },
            "wightsmall" : {
                "name" : "窄",
                "icon" : ss.IconPath("weight_small_icon"),
                "color": "#FFEB3B",
            },
        },
    },
    "fontsize" : {
        "name" : "字体大小",
        "icon" : ss.IconPath("fontsize_icon"),
        "color": "#9E9E9E",
        "items": {
            "fontsizeup" : {
                "name" : "增大",
                "icon" : ss.IconPath("fontsize_large_icon"),
                "color": "#9E9E9E",
            },
            "fontsizedown" : {
                "name" : "减小",
                "icon" : ss.IconPath("fontsize_small_icon"),
                "color": "#9E9E9E",
            },
        },
    },
    "share" : {
        "name" : "共享",
        "icon" : ss.IconPath("share_icon"),
        "color": "#8BC34A",
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