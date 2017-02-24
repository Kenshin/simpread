console.log( "=== simpread read controlbar load ===" )

import {browser} from 'browser';
import setting from 'readsetting';
import Fab     from 'fab';

const path  = icon=>browser.extension.getURL( `assets/images/${icon}.png` );
const items = {
    "close" : {
        "name" : "关闭",
        "icon" : path("exit_icon"),
    },
    "setting" : {
        "name" : "设定",
        "icon" : path("setting_icon"),
        "color": "#FF5722",
    },
    "weight" : {
        "name" : "版面布局",
        "icon" : path("weight_icon"),
        "color": "#FFEB3B",
        "items": {
            "wightlarge" : {
                "name" : "加宽",
                "icon" : path("weight_large_icon"),
                "color": "#FFEB3B",
            },
            "wightnormal" : {
                "name" : "正常",
                "icon" : path("weight_normal_icon"),
                "color": "#FFEB3B",
            },
            "wightsmall" : {
                "name" : "窄",
                "icon" : path("weight_small_icon"),
                "color": "#FFEB3B",
            },
        },
    },
    "fontsize" : {
        "name" : "字体大小",
        "icon" : path("fontsize_icon"),
        "color": "#9E9E9E",
        "items": {
            "fontsizeup" : {
                "name" : "增大",
                "icon" : path("fontsize_large_icon"),
                "color": "#9E9E9E",
            },
            "fontsizedown" : {
                "name" : "减小",
                "icon" : path("fontsize_small_icon"),
                "color": "#9E9E9E",
            },
        },
    },
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
            <Fab items={ items } onAction={ (event, type)=>this.onAction(event, type ) } />
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