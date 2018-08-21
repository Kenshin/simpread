console.log( "=== simpread read load ===" )

import ProgressBar from 'schedule';
import * as spec   from 'special';
import ReadCtlbar  from 'readctlbar';
import * as toc    from 'toc';
import * as modals from 'modals';
import * as se     from 'siteeditor';
import * as kbd    from 'keyboard';

import { storage, Clone } from 'storage';
import th                 from 'theme';
import * as ss            from 'stylesheet';
import {browser}          from 'browser';
import * as msg           from 'message';
import * as highlight     from 'highlight';
import * as run           from 'runtime';

import * as tooltip       from 'tooltip';
import * as waves         from 'waves';

const rdcls   = "simpread-read-root",
      bgtmpl  = `<div class="${rdcls}"></div>`,
      rdclsjq = "." + rdcls,
      $root   = $( "html" ),
      theme   = "simpread-theme-root";

const Footer = () => {
    return (
        <sr-rd-footer>
            <sr-rd-footer-group>
                <sr-rd-footer-line></sr-rd-footer-line>
                <sr-rd-footer-text>全文完</sr-rd-footer-text>
                <sr-rd-footer-line></sr-rd-footer-line>
            </sr-rd-footer-group>
            <sr-rd-footer-copywrite>本文由 <a href="http://ksria.com/simpread" target="_blank">简悦 SimpRead</a> 优化，用以提升阅读体验。</sr-rd-footer-copywrite>
        </sr-rd-footer>
    )
}

class Read extends React.Component {

    componentWillMount() {
        loadPlugins( "read_start" );
        $( "body" ).addClass( "simpread-hidden" );
        th.Change( this.props.read.theme );
        // hack code
        //storage.current.fap && $( "head" ).append( '<link rel="stylesheet" class="simpread-fs-style" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">' );
        if ( storage.current.fap ) {
            $( "head" ).append( '<link rel="stylesheet" class="simpread-fs-style" href="https://use.fontawesome.com/releases/v5.1.0/css/solid.css" integrity="sha384-TbilV5Lbhlwdyc4RuIV/JhD8NR+BfMrvz4BL5QFa2we1hQu6wvREr3v6XSRfCTRp" crossorigin="anonymous">' );
            $( "head" ).append( '<link rel="stylesheet" class="simpread-fs-style" href="https://use.fontawesome.com/releases/v5.1.0/css/fontawesome.css" integrity="sha384-ozJwkrqb90Oa3ZNb+yKFW2lToAWYdTiF1vt8JiH5ptTGHTGcN7qdoR1F95e0kYyG" crossorigin="anonymous">' );
        }
    }

    async componentDidMount() {
        if ( $root.find( "sr-rd-content-error" ).length > 0 ) {
            this.componentWillUnmount();
            if ( ! localStorage["sr-update-site"] ) {
                new Notify().Render({ content: "当前页面结构改变导致不匹配阅读模式，接下来请选择？", action: "更新", cancel: "高亮", callback: type => {
                    if ( type == "action" ) {
                        new Notify().Render( "2 秒钟后将会自动查找更新，请勿关闭此页面..." );
                        localStorage["sr-update-site"] = true;
                        setTimeout( ()=>browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.update_site, { url: location.href, site: storage.pr.current.site } )), 2000 );
                    } else {
                        this.props.read.highlight == true ? setTimeout( () => {
                            Highlight().done( dom => {
                                storage.pr.TempMode( "read", dom );
                                Render();
                            });
                        }, 1000 ) : new Notify().Render( `请先开启 <a href='https://github.com/Kenshin/simpread/wiki/%E4%B8%B4%E6%97%B6%E9%98%85%E8%AF%BB%E6%A8%A1%E5%BC%8F' target='_blank' >临时阅读模式</a> 选项！` );
                    }
                }});
            } else {
                new Notify().Render({ content: "更新后仍无法适配此页面，是否提交？", action: "是的", cancel: "取消", callback: type => {
                    if ( type == "cancel" ) return;
                    $.ajax({
                        url   : storage.service + "/sites/service/pending",
                        method: "POST",
                        data  :{ url: location.href, site: storage.pr.current.site, uid: storage.user.uid }
                    }).done( ( result, textStatus, jqXHR ) => {
                       new Notify().Render( "提交成功，谢谢对简悦作出的贡献！" );
                    }).fail( error => new Notify().Render( 2, "提交失败，请稍后再试！" ) );
                }});
            }
            localStorage.removeItem( "sr-update-site" );
        } else {
            $root
            .addClass( "simpread-font" )
            .addClass( theme )
            .find( rdclsjq )
                .addClass( theme )
                .sreffect( { opacity: 1 }, { delay: 100 })
                .addClass( "simpread-read-root-show" );

            this.props.read.fontfamily && ss.FontFamily( this.props.read.fontfamily );
            this.props.read.fontsize   && ss.FontSize( this.props.read.fontsize );
            this.props.read.layout     && ss.Layout( this.props.read.layout );
            ss.Preview( this.props.read.custom );

            storage.pr.state == "txt"       && $( "sr-rd-content" ).css({ "word-wrap": "break-word", "white-space": "pre-wrap" });
            storage.pr.current.site.desc == "" && $( "sr-rd-desc" ).addClass( "simpread-hidden" );

            excludes( $("sr-rd-content"), this.props.wrapper.exclude );
            storage.pr.Beautify( $( "sr-rd-content" ) );
            storage.pr.Format( rdcls );

            !this.props.wrapper.avatar && this.props.read.toc && toc.Render( "sr-read", $( "sr-rd-content" ), this.props.read.theme, this.props.read.toc_hide );
            this.props.read.site.css && this.props.read.site.css.length > 0 &&
                ss.SiteCSS( this.props.read.site.css );

            kbd.Render( $( "sr-rd-content" ));
            tooltip.Render( rdclsjq );
            waves.Render({ root: rdclsjq });
            storage.Statistics( "read" );

            loadPlugins( "read_complete" );

            localStorage.removeItem( "sr-update-site" );
        }
    }

    componentWillUnmount() {
        loadPlugins( "read_end" );
        ss.FontSize( "" );
        $root.removeClass( theme )
             .removeClass( "simpread-font" );
        $root.attr("style") && $root.attr( "style", $root.attr("style").replace( "font-size: 62.5%!important", "" ));
        ss.SiteCSS();
        $( "body" ).removeClass( "simpread-hidden" );
        $( rdclsjq ).remove();
        tooltip.Exit( rdclsjq );
    }

    /**
     * Controlbar action event
     * @param {string} type, include: exit, setting, save, scroll, option
     * @param {string} value 
     * @param {string} custom value, storage.current.custom.art.xxx 
     */
    onAction( type, value, custom ) {
        switch ( type ) {
            case "exit":
                this.exit();
                break;
            case "setting":
                modals.Render( ()=>setTimeout( ()=>se.Render(), 500 ));
                break;
            case "siteeditor":
                se.Render();
                break;
            case "fontfamily":
            case "fontsize":
            case "layout":
            case "theme":
            case "shortcuts":
            case "custom":
                type != "custom" ? storage.current[type]=value : storage.current.custom.art[custom]=value;
                storage.Setcur( storage.current.mode );
                break;
            case "remove":
                new Notify().Render( "移动鼠标选择不想显示的内容，只针对本次有效。" );
                $( "panel-bg" ).length > 0 && $( "panel-bg" ).trigger( "click" );
                Highlight().done( dom => {
                    $(dom).remove();
                });
                break;
            case "highlight":
                new Notify().Render( "移动鼠标选择高亮区域，以便生成阅读模式，将会在页面刷新后失效。" );
                this.exit();
                Highlight().done( dom => {
                    storage.pr.TempMode( "read", dom );
                    Render();
                });
                break;
            /*
            case "scroll":
                $( "sr-read" ).velocity( "scroll", { offset: $( "body" ).scrollTop() + value });
                break;
            */
        }
    }

   // exit read mode
   exit() {
        Exit();
    }

    render() {
        const Article = this.props.wrapper.avatar ? 
                        <spec.Multiple include={ this.props.wrapper.include } avatar={ this.props.wrapper.avatar } /> :
                        <sr-rd-content dangerouslySetInnerHTML={{__html: this.props.wrapper.include }} ></sr-rd-content>;

        const Page    = this.props.wrapper.paging && 
                        <spec.Paging paging={ this.props.wrapper.paging } />;
        return (
            <sr-read>
                <ProgressBar show={ this.props.read.progress } />
                <sr-rd-title>{ this.props.wrapper.title }</sr-rd-title>
                <sr-rd-desc>{ this.props.wrapper.desc }</sr-rd-desc>
                { Article }
                { Page    }
                <Footer />
                <ReadCtlbar show={ this.props.read.controlbar } 
                            multi={ this.props.wrapper.avatar ? true : false }
                            type={ this.props.wrapper.name }
                            site={{ title: this.props.wrapper.title, url: window.location.href }} 
                            custom={ this.props.read.custom } onAction={ (t,v,c)=>this.onAction( t,v,c ) }/>
            </sr-read>
        )
    }

}

/**
 * Render entry
 * 
 */
function Render() {
    storage.pr.ReadMode();
    console.log( "current puread object is   ", storage.pr )
    ReactDOM.render( <Read read={ storage.current } wrapper={ storage.pr.html } />, getReadRoot() );
}

/**
 * High light current page to read mode( read only )
 */
function Highlight() {
    const dtd = $.Deferred();
    highlight.Start().done( dom => {
        dtd.resolve( dom );
    });
    return dtd;
}

/**
 * Verify simpread-read-root tag exit
 * 
 * @param  {boolean}
 * @return {boolean}
 */
function Exist( action ) {
    if ( $root.find( rdclsjq ).length > 0 ) {
        action && modals.Render( ()=>setTimeout( ()=>se.Render(), 500 ));
        return true;
    } else {
        return false;
    }
}

/**
 * Exit
 */
function Exit() {
    $( rdclsjq ).sreffect( { opacity: 0 }, {
        delay: 100,
        complete: ( elements ) => {
            ReactDOM.unmountComponentAtNode( getReadRoot() );
        }
    }).addClass( "simpread-read-root-hide" );
}

/**
 * Get read root
 * 
 * @return {jquery} read root jquery object
 */
function getReadRoot() {
    if ( $root.find( rdclsjq ).length == 0 ) {
        $root.append( bgtmpl );
    }
    return $( rdclsjq )[0];
}

/**
 * Set exclude style
 * 
 * @param {jquery} jquery object
 * @param {array}  hidden html
 */
function excludes( $target, exclude ) {
    const tags = storage.pr.Exclude( $target );
    $target.find( tags ).remove();
}

/**
 * Load plugins from storage and exec
 * 
 * @param {string} state include: plugin.run_at
 */
function loadPlugins( state ) {
    storage.Plugins( () => {
        storage.option.plugins.forEach( id => {
            storage.plugins[id] && run.Exec( state, storage.current.site.name, storage.plugins[id] );
        });
    });
}

export { Render, Exist, Exit, Highlight };
