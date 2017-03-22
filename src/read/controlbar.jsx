console.log( "=== simpread read controlbar load ===" )

import * as ss     from 'stylesheet';
import {browser}   from 'browser';
import * as msg    from 'message';
import th          from 'theme';
import * as config from 'config';

import Fab         from 'fab';

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
export default class ReadCtlbar extends React.Component {

    static propTypes = {
        onAction: React.PropTypes.func,
    }

    onAction( event, type ) {
        console.log( "fab type is =", type )
        switch ( true ) {
            case type.indexOf( "_" ) > 0 && type.startsWith( "share" ):
                let url = "";
                switch ( type.split("_")[1] ) {
                    case "facebook":
                        url = `https://www.facebook.com/dialog/feed?app_id=1528743474024441&link=${ this.props.site.url }`;
                        break;
                    case "twitter":
                        url = `https://twitter.com/intent/tweet?text=${ this.props.site.title }&url=${ this.props.site.url }`;
                        break;
                    case "gplus":
                        url = `https://plus.google.com/share?url=${ this.props.site.url }`;
                        break;
                    case "weibo":
                        url = `http://service.weibo.com/share/share.php?url=${ this.props.site.url }&title=${ this.props.site.title }`;
                        break;
                }
                browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url }));
                break;
            case [ "exit", "setting", "save" ].includes( type ):
                this.props.onAction && this.props.onAction( type );
                break;
            case [ "up", "down" ].includes( type ):
                this.props.onAction && this.props.onAction( "scroll", type == "up" ? -250 : 250 );
                break;
            case type.indexOf( "_" ) > 0 && ( type.startsWith( "fontfamily" ) || type.startsWith( "fontsize" ) || type.startsWith( "layout" )):
                const [ key, value ] = [ type.split( "_" )[0], type.split( "_" )[1] ];
                Object.keys( ss ).forEach( (name)=>name.toLowerCase() == key && ss[name]( value ));
                this.props.onAction && this.props.onAction( key, value );
                break;
            case type.indexOf( "_" ) > 0 && type.startsWith( "theme" ):
                let i = th.names.indexOf( th.theme );
                i = type.endsWith( "prev" ) ? --i : ++i;
                i >= th.names.length && ( i = 0 );
                i < 0 && ( i = th.names.length - 1 );
                th.Change( th.names[i] );
                this.props.onAction && this.props.onAction( type.split( "_" )[0], th.theme );
                break;
        }
    }

    bindShortcuts() {
        const bindOpt = ( name ) => {
            const ffkey  = config.Shortcuts[name].key.toLowerCase(),
                  ffkeys = config.Shortcuts[name].value.map( (key) => ffkey + " " + key );
            Mousetrap.bind( ffkeys, ( event, combo ) => {
                Object.keys( config.Shortcuts ).forEach( name=> {
                    if ( config.Shortcuts[name].key.toLowerCase() == combo.split( " " )[0] ) {
                       const idx = config.Shortcuts[name].value.indexOf( combo.split( " " )[1] );
                       this.onAction( undefined, name + "_" + config.Shortcuts[name].name[idx] );
                    }
                });
            });
        };
        Object.keys( config.Shortcuts ).forEach( name => bindOpt( name ) );
        Mousetrap.bind( [ "up", "down" ], event => this.onAction( undefined, event.code.toLowerCase().replace( "arrow", "" ) ) );
        Mousetrap.bind( [ "shift+left", "shift+right" ], ( event, combo ) => {
            this.onAction( undefined, "theme_" + ( combo.split("+")[1] == "left" ? "prev" : "next" ));
        });
        Mousetrap.bind( [ "c c" ], ( event, combo ) => this.onAction( undefined, "exit" ) );
    }

    constructor( props ) {
        super( props );
        this.bindShortcuts();
    }

    render() {
        return (
            <Fab items={ items } tooltip={ tooltip_options } waves="sr-fab waves-circle waves-float" onAction={ (event, type)=>this.onAction(event, type ) } />
        )
    }
}
