console.log( "=== simpread focus controlbar load ===" )

import * as setting   from 'setting';
import * as se        from 'siteeditor';

import * as conf      from 'config';
import { storage }    from 'storage';
import * as output    from 'output';
import * as watch     from 'watch';
import {browser,br}   from 'browser';
import * as msg       from 'message';
import * as highlight from 'highlight';

import Fab         from 'fab';

let focusItems, $root, selector, callback;

const tooltip_options = {
    target   : "name",
    position : "bottom",
    delay    : 50,
};

class FControl extends React.Component {

    componentDidMount() {
        browser.runtime.onMessage.addListener( ( request, sender, sendResponse ) => {
            if ( request.type == msg.MESSAGE_ACTION.export ) {
                console.log( "controlbar runtime Listener", request );
                new Notify().Render( "已重新授权成功！" );
                br.isFirefox() ? new Notify().Render( "请刷新本页才能生效。" ) : this.onAction( undefined, request.value.type );
            }
        });
    }

    onAction( event, type ) {
        console.log( "fab type is =", type )

        const action = ( event, type ) => {
            switch ( type ) {
                case "exit":
                    ReactDOM.unmountComponentAtNode( getRoot() );
                    break;
                case "top":
                    $( "html, body" ).animate({ scrollTop: 0 }, "normal" );
                    break;
                case "setting":
                    setting.Render( ()=>setTimeout( ()=>se.Render(), 500 ));
                    break;
                case "siteeditor":
                    se.Render();
                    break;
                case "remove":
                    new Notify().Render( "移动鼠标选择不想显示的内容，只针对本次有效。" );
                    highlight.Start().done( dom => {
                        $(dom).remove();
                    });
                    break;
                case "highlight":
                    new Notify().Render( "移动鼠标选择高亮区域，以便生成阅读模式，将会在页面刷新后失效。" );
                    ReactDOM.unmountComponentAtNode( getRoot() );
                    highlight.Start().done( dom => {
                        callback && callback( dom );
                    });
                    break;
                default:
                    if ( type.indexOf( "_" ) > 0 && type.startsWith( "share" ) || 
                         [ "save", "markdown", "png", "epub", "pdf", "kindle", "temp", "html", "dropbox", "pocket", "instapaper", "linnk", "yinxiang","evernote", "onenote", "gdrive", "notion", "youdao" ].includes( type )) {
                        const [ title, desc, content ] = [ $( "head title" ).text().trim(), "", $( ".simpread-focus-highlight" ).html().trim() ];
                        output.Action( type, title, desc, content );
                    }
            };
        }

        ![ "exit", "top" ].includes( type ) ? watch.Verify( ( state, result ) => {
            if ( state ) {
                console.log( "watch.Lock()", result );
                new Notify().Render( "配置文件已更新，刷新当前页面后才能生效。", "刷新", ()=>location.href = location.href );
            } else action( event, type );
        }) : action( event, type );
    }

    componentWillMount() {
        focusItems = $.extend( true, {}, conf.focusItems );
        if ( storage.current.site.name.startsWith( "metaread::" ) || storage.current.site.name.startsWith( "txtread::" ) ) {
            delete focusItems.option;
        }
    }

    componentWillUnmount() {
        $(this.refs.target).remove();
        $( "body" ).find( selector ).trigger( "click", "okay" );
    }

    render() {
        return (
            <sr-rd-crlbar class={ this.props.show ? "" : "controlbar" } style={{ "zIndex": 2147483647 }}>
                <Fab ref="target" tooltip={ tooltip_options } waves="md-waves-effect md-waves-circle md-waves-float" items={ focusItems } onAction={ (event, type)=>this.onAction(event, type ) } />
            </sr-rd-crlbar>
        )
    }
}

const fcontrol = new FControl();

/**
 * Render
 * 
 * @param {string}   class name, e.g. .xxx
 * @param {string}   class name, e.g. .xxx
 * @param {function} callback
 */
function Render( root, finder, cb ) {
    callback = cb;
    selector = finder;
    $root = $(root);
    ReactDOM.render( <FControl show={ storage.current.controlbar } />, getRoot() );
}

/**
 * Get root html
 * 
 * @return {object} root html
 */
function getRoot() {
    return $root[0];
}

export { fcontrol as elem, Render };