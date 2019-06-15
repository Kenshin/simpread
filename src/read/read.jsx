console.log( "=== simpread read load ===" )

import ProgressBar        from 'schedule';
import * as spec          from 'special';
import ReadCtlbar         from 'readctlbar';
import * as toc           from 'toc';
import * as setting       from 'setting';
import * as se            from 'siteeditor';
import * as kbd           from 'keyboard';

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

// load count,.0: call Readability. 1: call highlight 2: all failed
let   load_count = 0;

const Footer = () => {
    const good_icon = '<svg t="1556354786433" viewBox="0 0 1024 1024" version="1.1" width="33" height="33"><defs><style type="text/css"></style></defs><path d="M859.8 191.2c-80.8-84.2-212-84.2-292.8 0L512 248.2l-55-57.2c-81-84.2-212-84.2-292.8 0-91 94.6-91 248.2 0 342.8L512 896l347.8-362C950.8 439.4 950.8 285.8 859.8 191.2z" p-id="6225" fill="#8C8C8C"></path></svg>',
          bad_icon  = '<svg t="1556354650943" viewBox="0 0 1024 1024" version="1.1" p-id="5899" width="33" height="33"><defs><style type="text/css"></style></defs><path d="M458 576c2-36 0-76 16-110 4-10 2-20 2-30-8-42-28-80-30-120 0-2.78 2.008-9.542 2.01-12.314-6.432 4.468-15.214 8.048-22.01 10.314-40 12-35.02 5.146-69.02 27.146l-23.866 14.456c32.686-35.878 77.056-49.562 113.05-77.428 0.388-30.876 1.716-61.354 6.274-91.68C371.22 106.992 243.57 108.536 164.246 191.14c-90.994 94.688-90.994 248.202 0 342.89l305.698 318.192c-0.17-21.312-0.886-42.352-3.944-62.222C454 718 458 648 458 576z" p-id="5900" fill="#8C8C8C"></path><path d="M644 602c-22-52-66-88-126-100-1.7 0-3.758-1.086-5.872-2.638-0.046 0.214-0.082 0.426-0.128 0.638-22 96-46 188-42 284 0 24.454 7.966 50.234 7.666 76.262L512 896l208-216.5C690.306 658.542 660.856 637.242 644 602z" p-id="5901" fill="#8C8C8C"></path><path d="M859.748 191.14c-80.852-84.188-211.978-84.188-292.816 0L528 230.806c0.15 26.35 0.426 52.404-6 77.194-4 20-38 38-32 62 6.006 26.426 16.332 51.41 21.464 77.118C542.028 464.168 569.542 485.792 594 512c45.602 53.532 75.494 114.918 130.566 162.742l135.182-140.71C950.75 439.342 950.75 285.828 859.748 191.14z" p-id="5902" fill="#8C8C8C"></path></svg>',
          onClick   = () => {
            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.CORB, { settings: { url: storage.service + "/sites/service/pending", type: "POST", data:{url: location.href, site: storage.pr.current.site, uid: storage.user.uid, type: "failed"} }}), result => {
                console.log( 'Add stat sites', result )
            });
            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url: "https://wj.qq.com/s2/3611463/7260/" }));
          };
    return (
        <sr-rd-footer>
            <sr-rd-footer-group>
                <sr-rd-footer-line></sr-rd-footer-line>
                <sr-rd-footer-text>全文完</sr-rd-footer-text>
                <sr-rd-footer-line></sr-rd-footer-line>
            </sr-rd-footer-group>
            <sr-rd-footer-copywrite>
                <div>本文由 <a href="http://ksria.com/simpread" target="_blank">简悦 SimpRead</a> 优化，用以提升阅读体验</div>
                <div className="second">使用了 <abbr>全新的简悦词法分析引擎<sup>beta</sup></abbr>，<a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎">点击查看</a>详细说明</div>
                <div className="third">
                    <a className="sr-icon good sr-top" data-sr-mini-tooltip="觉得不错？请帮忙投票 😄" data-position="up" target="_blank" href="https://chrome.google.com/webstore/detail/%E7%AE%80%E6%82%A6-simpread/ijllcpnolfcooahcekpamkbidhejabll/reviews" dangerouslySetInnerHTML={{__html: good_icon }} ></a>
                    <a className="sr-icon bad sr-top" data-sr-mini-tooltip="有待改进，请帮忙吐槽 😄" data-position="up" target="_blank" onClick={ ()=>onClick() } dangerouslySetInnerHTML={{__html: bad_icon  }} ></a>
                </div>
            </sr-rd-footer-copywrite>
        </sr-rd-footer>
    )
}

class Read extends React.Component {

    verifyContent() {
        if ( $("sr-rd-content").text().length < 100 ) {
            if ( load_count == 0 ) {
                new Notify().Render({ content: "检测到正文获取异常，是否重新获取？", action: "是的", cancel: "取消", callback: type => {
                    if ( type == "cancel" ) return;
                    load_count++;
                    this.componentWillUnmount();
                    storage.pr.Readability();
                    Render();
                }});
            } else if ( load_count == 1 ) {
                this.componentWillUnmount();
                new Notify().Render({ content: "获取正文失败，是否使用手动框选高亮的方式获取？", action: "是的", cancel: "取消", callback: type => {
                    if ( type == "cancel" ) return;
                    setTimeout( () => {
                        Highlight().done( dom => {
                            const rerender = element => {
                                load_count++;
                                storage.pr.TempMode( "read", element );
                                Render();
                            };
                            storage.current.highlight ? 
                                highlight.Control( dom ).done( newDom => {
                                    rerender( newDom );
                                }) : rerender( dom );
                        });
                    }, 200 );
                }});
            } else if ( load_count >= 2 ) {
                this.componentWillUnmount();
                new Notify().Render({ content: "高亮无法仍无法适配此页面，是否提交？", action: "是的", cancel: "取消", callback: type => {
                    if ( type == "cancel" ) return;
                    browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.save_site, { url: location.href, site: {}, uid: storage.user.uid, type: "failed" }));
                }});
                load_count = 0;
            }
            return false;
        } else {
            return true;
        }
    }

    componentWillMount() {
        $( "body" ).addClass( "simpread-hidden" );
        th.Change( this.props.read.theme );
        if ( storage.current.fap ) {
            $( "head" ).append( '<link rel="stylesheet" class="simpread-fs-style" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/css/solid.min.css" />' );
            $( "head" ).append( '<link rel="stylesheet" class="simpread-fs-style" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/css/brands.min.css" />' );
            $( "head" ).append( '<link rel="stylesheet" class="simpread-fs-style" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/css/fontawesome.min.css" />' );
        }
    }

    async componentDidMount() {
        if ( load_count > 0 && !this.verifyContent() ) {
            return;
        }

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
        this.props.read.site.css   && this.props.read.site.css.length > 0
            && ss.SiteCSS( this.props.read.site.css );
        ss.Preview( this.props.read.custom );

        storage.pr.state == "txt"             && !location.href.endsWith( ".md" ) && $( "sr-rd-content" ).css({ "word-wrap": "break-word", "white-space": "pre-wrap" });
        $( "sr-rd-desc" ).text().trim() == "" && $( "sr-rd-desc" ).addClass( "simpread-hidden" );

        excludes( $("sr-rd-content"), this.props.wrapper.exclude );
        storage.pr.Beautify( $( "sr-rd-content" ) );
        storage.pr.Format( rdcls );

        kbd.Render( $( "sr-rd-content" ));
        tooltip.Render( rdclsjq );
        waves.Render({ root: rdclsjq });
        storage.Statistics( "read" );

        !this.props.wrapper.avatar && this.props.read.toc 
            && toc.Render( "sr-read", $( "sr-rd-content" ), this.props.read.theme, this.props.read.toc_hide );

        loadPlugins( "read_complete" );

        setTimeout( ()=>{
            this.verifyContent();
        }, 50 );
    }

    componentWillUnmount() {
        run.Event( "read_end" );
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
                setting.Render( ()=>setTimeout( ()=>se.Render(), 500 ));
                break;
            case "siteeditor":
                $( "panel-bg" ).length > 0 && $( "panel-bg" )[0].click();
                setTimeout( ()=>se.Render(), 500 );
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
                $( "panel-bg" ).length > 0 && $( "panel-bg" ).trigger( "click" );
                new Notify().Render({ content: "移动鼠标选择不想显示的内容，可多次选择，使用 ESC 退出。", delay: 5000 });
                highlight.Multi( dom => {
                    const path = storage.pr.Utils().dom2Xpath( dom ),
                          site = { ...storage.pr.current.site };
                    site.exclude.push( `[[\`${path}\`]]` );
                    if ( storage.pr.state == "temp" ) {
                        const include = storage.pr.Utils().dom2Xpath( storage.pr.dom );
                        site.name     = site.name.replace( "tempread::", "" );
                        site.include  = `[[\`${include}\`]]`;
                    }
                    storage.pr.Updatesite( 'local', storage.current.url, [ site.url, storage.pr.Cleansite(site) ]);
                    storage.Writesite( storage.pr.sites, () => {
                        //new Notify().Render( 0, "已加入到排除列表。" );
                        storage.pr.current.site.name    = site.name;
                        storage.pr.current.site.include = site.include;
                    });
                    $(dom).remove();
                });
                break;
            case "highlight":
                new Notify().Render( "移动鼠标选择高亮区域，以便生成阅读模式，将会在页面刷新后失效。" );
                this.exit();
                Highlight().done( dom => {
                    const rerender = element => {
                        storage.pr.TempMode( "read", element );
                        Render();
                    };
                    storage.current.highlight ? 
                        highlight.Control( dom ).done( newDom => {
                            rerender( newDom );
                        }) : rerender( dom );
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
 * @param {boolean} true: call mathJaxMode(); false: @see mathJaxMode
 */
function Render( callMathjax = true ) {
    loadPlugins( "read_start" );
    callMathjax && mathJaxMode();
    storage.pr.ReadMode();
    if ( typeof storage.pr.html.include == "string" && storage.pr.html.include.startsWith( "<sr-rd-content-error>" ) ) {
        console.warn( '=== Adapter failed call Readability View ===' )
        storage.pr.Readability();
        storage.pr.ReadMode();
    } else console.warn( '=== Normal Read mode ===' )
    console.warn( "=== Current PuRead object is ===", storage.pr )
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
        action && setting.Render( ()=>setTimeout( ()=>se.Render(), 500 ));
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
 * MathJax Mode
 */
function mathJaxMode() {
    if ( storage.pr.isMathJax() && storage.pr.state == "temp" ) {
        console.warn( '=== MathJax Mode ===' )
        const dom = storage.pr.MathJaxMode();
        console.log( 'current get dom is ', dom )
        if ( typeof dom == "undefined" ) {
            new Notify().Render( "智能感知失败，请移动鼠标框选。" );
            Highlight().done( dom => {
                const rerender = element => {
                    storage.pr.TempMode( "read", element );
                    Render( false );
                };
                storage.current.highlight ? 
                    highlight.Control( dom ).done( newDom => {
                        rerender( newDom );
                    }) : rerender( dom );
            });
        } else if ( typeof dom == "string" ) {
            const html = storage.pr.GetDom( dom, "html" );
            storage.pr.Newsite( "read", html );
        } else {
            storage.pr.TempMode( "read", dom[0] );
        }
    }
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
