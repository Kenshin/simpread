console.log( "=== simpread read controlbar load ===" )

import * as ss     from 'stylesheet';
import {browser,br}from 'browser';
import * as msg    from 'message';
import th          from 'theme';
import * as conf   from 'config';
import * as output from 'output';
import * as watch  from 'watch';
import * as kbd    from 'keyboard';
import { storage } from 'storage';

import ReadOpt     from 'readopt';
import Actionbar   from 'actionbar';
import Pluginbar   from 'pluginbar';
import Sitebar     from 'sitebar';

import Fab         from 'fab';
import Fap         from 'fap'
import * as ttips  from 'tooltip';

let notify;
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

    verify( type ) {
        if ( ss.VerifyCustom( type, storage.current.custom ) ) {
            !notify && ( notify = new Notify().Render({ state: "holdon", content: '由于已使用自定义样式，设定 <b style="color: #fff;">有可能无效</b>，详细说明 <a href="http://ksria.com/simpread/docs/#/自定义样式" target="_blank">请看这里</a>', callback:()=>notify=undefined }));
        }
    }

    componentDidMount() {
        browser.runtime.onMessage.addListener( ( request, sender, sendResponse ) => {
            if ( request.type == msg.MESSAGE_ACTION.export ) {
                console.log( "controlbar runtime Listener", request );
                new Notify().Render( "已重新授权成功！" );
                br.isFirefox() ? new Notify().Render( "请刷新本页才能生效。" ) : this.onAction( undefined, request.value.type );
            }
        });
        kbd.Listen( combo => {
            this.onAction( undefined, combo )
        });
    }

    onAction( event, type ) {
        console.log( "fab type is =", type )

        this.verify( type.split( "_" )[0] );

        const action = ( event, type ) => {
            this.props.multi && 
            [ "markdown", "dropbox", "yinxiang","evernote", "onenote", "gdrive" ].includes( type ) &&
            new Notify().Render( "当前为论坛类页面，不建议使用导出服务，有可能出现未知错误。" );

            switch ( true ) {
                case [ "exit", "setting", "siteeditor", "remove", "highlight" ].includes( type ):
                    this.props.onAction( type );
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
                case type.startsWith( "dyslexia" ):
                    output.Action( type, $( "sr-rd-title" ).text(), "", $( "sr-rd-content" ).text() );
                    break;
                case type == "tempread":
                    if ( storage.pr.state != "temp" ) {
                        new Notify().Render( "此功能只限临时阅读模式时使用。" );
                        return;
                    }
                    // hack code
                    const news = { ...storage.pr.current.site };
                    storage.pr.dom && ( news.include = storage.pr.dom.outerHTML.replace( storage.pr.dom.innerHTML, "" ).replace( /<\/\S+>$/i, "" ));
                    delete news.html;
                    browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.temp_site, { url: location.href, site: news, uid: storage.user.uid, type: "temp" }));
                    break;
                case type.startsWith( "webdav_" ) :
                        const [ title, desc, content ] = [ $( "sr-rd-title" ).text().trim(), $( "sr-rd-desc" ).text().trim(), $( "sr-rd-content" ).html().trim() ];
                        output.Action( type, title, desc, content );
                    break;
                default:
                    if ( type.indexOf( "_" ) > 0 && type.startsWith( "share" ) || 
                        [ "fullscreen", "save", "markdown", "png", "epub", "pdf", "kindle", "temp", "html", "dropbox", "pocket", "instapaper", "linnk", "yinxiang","evernote", "onenote", "gdrive", "jianguo" ].includes( type )) {
                        const [ title, desc, content ] = [ $( "sr-rd-title" ).text().trim(), $( "sr-rd-desc" ).text().trim(), $( "sr-rd-content" ).html().trim() ];
                        output.Action( type, title, desc, content );
                    }
            }
        };

        type != "exit" ? watch.Verify( ( state, result ) => {
            if ( state ) {
                console.log( "watch.Lock()", result );
                new Notify().Render( "配置文件已更新，刷新当前页面后才能生效。", "刷新", ()=>location.href = location.href );
            } else action( event, type );
        }) : action( event, type );

    }

    onChange( type, custom ) {
        const [ key, value ] = [ type.split( "_" )[0], type.split( "_" )[1] ];
        this.props.onAction && this.props.onAction( key, value, custom );
        this.verify( key );
    }

    onPop( type ) {
        type == "open" ? ttips.Render( ".simpread-read-root", "panel" ) : ttips.Exit( ".simpread-read-root", "panel" );
    }

    componentWillMount() {
        try {
            if ( storage.current.fap ) {
                delete conf.readItems.exit;
                delete conf.readItems.option.items.setting;
            }
            if ( this.props.type.startsWith( "txtread::" ) && this.props.type.endsWith( "::local" )) {
                delete conf.readItems.download;
                delete conf.readItems.readlater;
                delete conf.readItems.send;
                delete conf.readItems.share;
                delete conf.readItems.option;
            }
            if ( this.props.type.startsWith( "metaread::" ) || this.props.type.startsWith( "txtread::" ) ) {
                delete conf.readItems.option;
            }
            storage.Safe( () => {
                storage.secret.webdav.forEach( item => {
                    item = JSON.parse( item );
                    conf.readItems.send.items[ "webdav_" + item.name ] = {
                        name: item.name,
                        icon: ss.IconPath("webdav_icon"),
                        "color": "#00BCD4",
                    };
                });
            })
        } catch ( err ) {
            // TO-DO
        }
        // hack code
        !/chrome/ig.test( navigator.userAgent ) && ( delete conf.readItems.dyslexia );
    }

    constructor( props ) {
        super( props );
    }

    render() {
        const Controlbar = storage.current.fap ? 
            <Fap items={ [ "样式", "动作", "站点", "插件" ] } autoHide={ false }
                waves="md-waves-effect md-waves-circle md-waves-float" 
                onOpen={ ()=> this.onPop( "open" ) } onClose={ ()=> this.onPop( "close" ) }
                onAction={ (event, type)=>this.onAction(event, type ) }>
                <ReadOpt option={ storage.current } onChange={ (t,c)=>this.onChange(t,c)}/>
                <Actionbar items={ conf.readItems } onAction={ (type)=>this.onAction(undefined, type ) }/>
                <Sitebar />
                <Pluginbar />
            </Fap>
            :
            <Fab items={ conf.readItems } tooltip={ tooltip_options } waves="md-waves-effect md-waves-circle md-waves-float" onAction={ (event, type)=>this.onAction(event, type ) } />
        return (
            <sr-rd-crlbar class={ this.props.show ? "" : "controlbar" } style={{ "zIndex": "2" }}>
                { Controlbar }
            </sr-rd-crlbar>
        )
    }
}
