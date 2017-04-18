console.log( "=== simpread read controlbar load ===" )

import * as ss     from 'stylesheet';
import {browser}   from 'browser';
import * as msg    from 'message';
import th          from 'theme';
import * as config from 'config';

import Fab         from 'fab';

const tooltip_options = {
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
            <Fab items={ config.readItems } tooltip={ tooltip_options } waves="sr-fab waves-circle waves-float" onAction={ (event, type)=>this.onAction(event, type ) } />
        )
    }
}
