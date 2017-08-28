console.log( "=== simpread read load ===" )

import pangu       from 'pangu';

import ProgressBar from 'schedule';
import * as spec   from 'special';
import ReadCtlbar  from 'readctlbar';
import * as modals from 'modals';

import { storage, Clone } from 'storage';
import * as util          from 'util';
import * as st            from 'site';
import th                 from 'theme';
import * as ss            from 'stylesheet';
import * as exp           from 'export';
import {browser}          from 'browser';
import * as msg           from 'message';

import * as tooltip       from 'tooltip';
import * as waves         from 'waves';

const rdcls   = "simpread-read-root",
      bgtmpl  = `<div class="${rdcls}"></div>`,
      rdclsjq = "." + rdcls,
      $root   = $( "html" ),
      theme   = "simpread-theme-root";

const errorpage = `
        <sr-rd-content-error>
            <p>当前页面使用 <span style="color: #4183c4;">阅读模式</span> 解析后 <b style="color: #E57373;">无法正常显示</b>，暂时不支持 <b style="color: #E57373;">手动添加</b>，请换用 <span style="color: #4183c4;">聚焦模式</span> 或者 将当前页面加入到<a href="https://github.com/Kenshin/simpread/wiki/入门指南（-操作指引-）#排除列表" target="_blank">排除列表</a> 。</p>
            <p>报告<a href="https://github.com/Kenshin/simpread/issues/new" target="_blank">此页面</a> 以便让 <a href="http://ksria.com/simpread" target="_blank">简悦 - SimpRead</a> 变得更加出色，谢谢。</p>
        </sr-rd-content-error>`;

const Footer = () => {
    return (
        <sr-rd-footer>
            <sr-rd-footer-text>全文完</sr-rd-footer-text>
            <sr-rd-footer-copywrite>本文由 简悦 <a href="http://ksria.com/simpread" target="_blank">SimpRead</a> 优化，用以提升阅读体验。</sr-rd-footer-copywrite>
        </sr-rd-footer>
    )
}

class Read extends React.Component {

    componentWillMount() {
        $( "body" ).addClass( "simpread-hidden" );
        th.Change( this.props.read.theme );
    }

    async componentDidMount() {
        $root
            .addClass( "simpread-font" )
            .addClass( theme )
            .find( rdclsjq )
                .addClass( theme )
                .velocity( { opacity: 1 }, { delay: 100 })
                .addClass( "simpread-read-root-show" );

        this.props.read.fontfamily && ss.FontFamily( this.props.read.fontfamily );
        this.props.read.fontsize   && ss.FontSize( this.props.read.fontsize );
        this.props.read.layout     && ss.Layout( this.props.read.layout );
        ss.Preview( this.props.read.custom );

        if ( $("sr-rd-content-error").length > 0 ) $("sr-rd-footer").remove();
        if ( $( "sr-rd-desc" ).html() == "" ) $( "sr-rd-desc" ).addClass( "simpread-hidden" );
        await excludes( $("sr-rd-content"), this.props.wrapper.exclude );
        await st.Beautify( storage.current.site.name, $( "sr-rd-content" ) );
        await st.RemoveTag( storage.current.site.name, $( "sr-rd-content" ) );
        await htmlbeautify( $( "sr-rd-content" ));
        await commbeautify( $( "sr-rd-content" ));
        pangu.spacingElementByClassName( rdcls );
        tooltip.Render( rdclsjq );
        waves.Render({ root: rdclsjq });
    }

    componentWillUnmount() {
        $root.removeClass( theme )
             .removeClass( "simpread-font" );
        $root.attr("style") && $root.attr( "style", $root.attr("style").replace( "font-size: 62.5%!important", "" ));
        $( "body" ).removeClass( "simpread-hidden" );
        $( rdclsjq ).remove();
        tooltip.Exit( rdclsjq );
    }

    /**
     * Controlbar action event
     * @param {string} type, include: exit, setting, save, scroll, option
     * @param {string} value 
     */
    onAction( type, value ) {
        switch ( type ) {
            case "exit":
                this.exit();
                break;
            case "setting":
                modals.Render();
                break;
            case "save":
                const [ url, title, desc ] = [ window.location.href.replace( /(\?|&)simpread_mode=read/, "" ), $("sr-rd-title").text().trim(), $("sr-rd-desc").text().trim() ];
                storage.UnRead( "add", { url, title, desc }, success => {
                    success  && new Notify().Render( 0, "成功加入未读列表。" );
                    !success && new Notify().Render( 0, "已加入未读列表，请勿重新加入。" );
                });
                break;
            /*
            case "scroll":
                $( "sr-read" ).velocity( "scroll", { offset: $( "body" ).scrollTop() + value });
                break;
            */
            case "fontfamily":
            case "fontsize":
            case "layout":
            case "theme":
                storage.current[type]=value;
                storage.Setcur( storage.current.mode );
                break;
            case "markdown":
                exp.MDWrapper( st.ClearMD( $("sr-rd-content").html()), `simpread-${ this.props.wrapper.title.trim() }.md`, new Notify() );
                /*
                exp.Markdown( st.ClearMD( $("sr-rd-content").html()), `simpread-${ this.props.wrapper.title.trim() }.md`, error => {
                    new Notify().Render( 2, "转换 Markdown 格式失败，这是一个实验性功能，不一定能导出成功。" );
                });
                */
                break;
            case "png":
                try {
                    new Notify().Render( "下载已开始，请稍等..." );
                    $( "sr-rd-crlbar" ).css({ "opacity": 0 });
                    setTimeout( () => {
                        exp.PNG( $( ".simpread-read-root" )[0], `simpread-${ this.props.wrapper.title.trim() }.png`, result => {
                            $( "sr-rd-crlbar" ).removeAttr( "style" );
                            !result && new Notify().Render( 2, "转换 PNG 格式失败，这是一个实验性功能，不一定能导出成功。" );
                        });
                    }, 1000 );
                } catch ( e ) {
                    new Notify().Render( 1, "转换 PNG 格式失败，请注意，这是一个实验性功能，不一定能导出成功。" );
                }
                break;
            case "pdf":
                $( "sr-rd-crlbar" ).css({ "opacity": 0 });
                setTimeout( () => {
                    exp.PDF();
                    $( "sr-rd-crlbar" ).removeAttr( "style" );
                }, 500 );
                break;
            case "kindle":
                new Notify().Render( "开始转码阅读模式并上传到服务器，请稍等..." );
                const style = {
                    theme     : storage.read.theme,
                    fontsize  : storage.read.fontsize,
                    fontfamily: storage.read.fontfamily,
                    layout    : storage.read.layout,
                    custom    : storage.read.custom,
                }
                exp.kindle.Read( location.href, $( "sr-rd-title" ).text(), $( "sr-rd-desc" ).html(), $( "sr-rd-content" ).html(), style, ( result, error ) => {
                    error  && new Notify().Render( 2, "保存到 Kindle 失败，请稍候再试！" );
                    !error && new Notify().Render( "保存成功，3 秒钟后将跳转到发送页面。" );
                    !error && setTimeout( ()=>{ exp.kindle.Send(); }, 3000 );
                });
                break;
        }
    }

    /**
     * Controlbar action event: Service, inlcude: "dropbox", "pocket", "linnk", "yinxiang","evernote", "onenote", "gdrive"
     * @param {string} type, include: exit, setting, save, scroll, option
     * @param {string} value 
     */
    onService( type, value ) {
        const { dropbox, pocket, linnk, evernote, onenote, gdrive } = exp,
              title = $( "sr-rd-title" ).text().trim();
        let id   = type,
            name = type.replace( /\S/i, $0=>$0.toUpperCase() );
        type == "yinxiang" && ( id   = "evernote" );
        type == "yinxiang" && ( name = "印象笔记" );
        type == "gdrive"   && ( name = "Google 云端硬盘" );

        storage.Safe( ()=> {
            if ( storage.secret[type].access_token ) {
                Object.keys( storage.secret[type] ).forEach( item => exp[id][item] = storage.secret[type][item] );
                new Notify().Render( `开始保存到 ${name}，请稍等...` );
                service( type );
            } else {
                new Notify().Render( `请先获取 ${name} 的授权，才能使用此功能！`, "授权", ()=>{
                    browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url: browser.extension.getURL( "options/options.html#labs" ) } ));
                });
                return;
            }
        });

        const service = type => {
            switch( type ) {
                case "dropbox":
                    exp.MDWrapper( st.ClearMD( $("sr-rd-content").html()), undefined, new Notify() ).done( result => {
                        dropbox.Write( `${ title }.md`, result, ( _, resp, error ) => {
                            !error && new Notify().Render( "已成功保存到 Dropbox！" );
                            error  && new Notify().Render( 2, error == "error" ? "保存失败，请稍后重新再试。" : error );
                        }, "md/" );
                    });
                    break;
                case "pocket":
                    pocket.Add( window.location.href, title, ( result, error ) => {
                        !error && new Notify().Render( "已成功保存到 Pocket！" );
                        error  && new Notify().Render( 2, error == "error" ? "保存失败，请稍后重新再试。" : error );
                    });
                    break;
                case "linnk":
                    linnk.GetSafeGroup( linnk.group_name, ( result, error ) => {
                        if ( !error ) {
                            linnk.group_id = result.data.groupId;
                            linnk.Add( window.location.href, title, ( result, error ) => {
                                !error && result.code == 200 && new Notify().Render( "已成功保存到 Linnk！" );
                                error  && new Notify().Render( 2, "保存失败，请稍后重新再试。" );
                            });
                        } else new Notify().Render( 2, "保存失败，请稍后重新再试。" );
                    });
                    break;
                case "evernote":
                case "yinxiang":
                    const name = type == "evernote" ? "Evernote" : "印象笔记";
                    evernote.Add( title, st.HTML2ENML( $("sr-rd-content").html(), window.location.href ), ( result, error ) => {
                        !error && new Notify().Render( `已成功保存到 ${name}！` );
                        error  && new Notify().Render( 2, `转码失败，此功能为实验性功能，报告 <a href="https://github.com/Kenshin/simpread/issues/new" target="_blank">此页面</a>` );
                        error  && new Notify().Render( "建议使用 Onenote 能更完美的还原被保存页面。" );
                    });
                    break;
                case "onenote":
                    onenote.Add( onenote.Wrapper( window.location.href, title, $("sr-rd-content").html() ),  ( result, error ) => {
                        !error && new Notify().Render( "已成功保存到 Onenote！" );
                        error  && new Notify().Render( 2, error == "error" ? "保存失败，请稍后重新再试。" : error );
                    });
                    break;
                case "gdrive":
                    exp.MDWrapper( st.ClearMD( $("sr-rd-content").html()), undefined, new Notify() ).done( result => {
                        gdrive.Add( "file",( result, error ) => {
                            !error && new Notify().Render( "已成功保存到 Google 云端硬盘！" );
                            error  && new Notify().Render( 2, error == "error" ? "保存失败，请稍后重新再试。" : error );
                        }, gdrive.CreateFile( `${title}.md`, result ));
                    });
                    break;
            }
        };
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
                <ReadCtlbar show={ this.props.read.controlbar } site={{ title: this.props.wrapper.title, url: window.location.href }} onAction={ (t,v)=>this.onAction( t,v ) } onService={ (t,v)=>this.onService( t,v ) } />
            </sr-read>
        )
    }

}

/**
 * Render entry
 * 
 */
function Render() {
    ReactDOM.render( <Read read={ storage.current } wrapper={ wrap(storage.current.site) } />, getReadRoot() );
}

/**
 * Verify simpread-read-root tag exit
 * 
 * @param  {boolean}
 * @return {boolean}
 */
function Exist( action ) {
    if ( $root.find( rdclsjq ).length > 0 ) {
        action && modals.Render();
        return true;
    } else {
        return false;
    }
}

/**
 * Exit
 */
function Exit() {
    $( rdclsjq ).velocity( { opacity: 0 }, {
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
 * Wrap storage.current.site object
 * 
 * @param  {object} storage.current.site object
 * @return {object} wrapper object
 */
function wrap( site ) {
    const wrapper   = Clone( site ),
          title     = util.selector( site.title   ),
          desc      = util.selector( site.desc    ),
          include   = util.selector( site.include );
    wrapper.title   = query( title );
    wrapper.desc    = query( desc  );
    wrapper.include = query( include, "html" );
    wrapper.avatar && wrapper.avatar.forEach( item => {
        const key   = Object.keys( item ).join(),
              value = item[key];
        item[key]   = query( util.selector( value ), "html" );
    });
    wrapper.paging && wrapper.paging.forEach( item => {
        const key   = Object.keys( item ).join(),
              value = item[key];
        item[key]   = query( util.selector( value ) );
    });
    return wrapper;
}

/**
 * Query content usage jquery
 * 
 * @param  {string} query content
 * @param  {string} type, incldue: text,  html and multi
 * @return {string} query result
 */
function query( content, type = "text" ) {
    if ( util.specTest( content ) ) {
        const [ value, state ] = util.specAction( content );
        if ( state == 0 ) {
            content = value;
        } else if ( state == 3 ) {
            content = getcontent( $root.find( value ) );
        }
    } else if ( type == "html" ) {
        content = getcontent( $root.find( content ) );
    } else if ( type == "multi" ) {
        // TO-DO
    } else {
        content = $root.find( content ).text().trim();
    }
    return content;
}

/**
 * Get content from current.site.include
 * 
 * @param  {jquery} jquery object e.g. $root.find( content )
 * @return {string} $target html
 */
function getcontent( $target ) {
    let html = "";
    switch ( $target.length ) {
        case 0:
            html = errorpage;
            break;
        case 1:
            html = $target.html().trim();
            break;
        default:
            html = $target.map( (index, item) => $(item).html() ).get().join( "<br>" );
            break;
    }
    return html;
}

/**
 * Set exclude style
 * 
 * @param {jquery} jquery object
 * @param {array}  hidden html
 */
async function excludes( $target, exclude ) {
    const tags = util.exclude( $target, exclude );
    $target.find( tags ).remove();
}

/**
 * Beautify html, incldue:
 * 
 * - change all <blockquote> to <sr-blockquote>
 * - remove useless <br>
 * 
 * @param {jquery} jquery object
 */
async function htmlbeautify( $target ) {
    try {
        $target.html( ( index, html ) => {
            return html.trim()
                    .replace( /<\/?blockquote/g, (value) => value[1] == "/" ? "</sr-blockquote" : "<sr-blockquote" )
                    .replace( /<br>\n?<br>(\n?<br>)*/g, "<br>" )
                    .replace( /\/(div|p)>\n*(<br>\n)+/g, (value) =>value.replace( "<br>", "" ));
        });
    } catch ( error ) {
        console.error( error );
        return $target.html();
    }
}

/**
 * Common Beautify html, include:
 * - task: all webiste image, remove old image and create new image
 * - task: all webiste sr-blockquote, remove style
 * - task: all webiste iframe, embed add center style
 * - task: all hr tag add simpread-hidden class
 * - task: all pre/code tag remove class
 * - task: all a tag remove style
 * 
 * @param {jquery}
 */
async function commbeautify( $target ) {
    $target.find( "img:not(.sr-rd-content-nobeautify)" ).map( ( index, item ) => {
        const $target = $(item),
              $orgpar = $target.parent(),
              $img    = $( "<img class='sr-rd-content-img-load'>" ),
              src     = $target.attr( "src" ),
              lazysrc = $target.attr( "data-src" ),
              zuimei  = $target.attr( "data-original" ),
              cnbeta  = $target.attr( "original" ),
              fixOverflowImgsize = () => {
                  $img.removeClass( "sr-rd-content-img-load" );
                  if ( $img[0].clientWidth > 1000 ) {
                      $img.css( "zoom", "0.6" );
                  }
                  else if ( $img[0].clientHeight > 620 ) {
                      $img.attr( "height", 620 );
                      if ( $img[0].clientWidth < $("sr-rd-content").width()) $img.css({ "width":"auto" });
                  }
                  if ( $img[0].clientWidth > $("sr-rd-content").width()) $img.addClass( "sr-rd-content-img" );
              },
              loaderrorHandle = () => {
                  $img.addClass( "simpread-hidden" );
                  if ( $img.parent().hasClass( "sr-rd-content-center" )) {
                      $img.parent().removeAttr( "class" ).addClass( "simpread-hidden" );
                  }
              };
        let  newsrc,
             $parent = $target.parent(),
             tagname = $parent[0].tagName.toLowerCase();

        // remove current image and create new image object
        newsrc = cnbeta  ? cnbeta  : src;
        newsrc = lazysrc ? lazysrc : newsrc;
        newsrc = zuimei  ? zuimei  : newsrc;
        $img.attr( "src", newsrc )
            .one( "load",  ()=>fixOverflowImgsize() )
            .one( "error", ()=>loaderrorHandle()    )
            .replaceAll( $target )
            .wrap( "<div class='sr-rd-content-center'></div>" );

        // origin style
        /*if ( tagname !== "sr-read" && !$parent.hasClass( "simpread-hidden" ) ) {
            $img.parent().unwrap();
        }*/

        // beautify style
        /* remove other class and add center class
        while ( ![ "p", "div", "span" ].includes( tagname ) ) {
            $parent = $parent.parent();
            tagname = $parent[0].tagName.toLowerCase();
            if ( tagname == "sr-read" ) {
                const $p = $( "<p>" );
                $p.append( $img );
                $orgpar.append( $p );
                $parent = $p;
                tagname = $parent[0].tagName.toLowerCase();
            }
        }
        if ( !$parent.hasClass( "simpread-hidden" ) ) {
            $parent.removeAttr( "style" ).removeClass( $parent.attr("class") ).addClass( "sr-rd-content-center" );
        }
        */
    });
    $target.find( "sr-blockquote" ).map( ( index, item ) => {
        const $target = $(item),
              $parent = $target.parent();
        $target.removeAttr( "style" ).removeAttr( "class" );
        if ( storage.current.site.name == "dgtle.com" ) {
           $parent.removeClass( "quote" );
        }
    });
    $target.find( "iframe:not(.sr-rd-content-nobeautify), embed:not(.sr-rd-content-nobeautify)" ).map( ( index, item )=> {
        $(item).wrap( "<div class='sr-rd-content-center'></div>" );
    });
    $target.find( "hr" ).map( ( index, item )=> {
        $(item).addClass( "simpread-hidden" );
    });
    $target.find( "pre" ).map( ( index, item )=> {
        $(item).find( "code" ).removeAttr( "class" );
    });
    $target.find( "pre" ).removeAttr( "class" );
    $target.find( "a" ).removeAttr( "style" );
}

export { Render, Exist, Exit };
