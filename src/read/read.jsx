console.log( "=== simpread read load ===" )

import toMarkdown  from 'to-markdown';
import pangu       from 'pangu';

import ProgressBar from 'schedule';
import ReadCtlbar  from 'readctlbar';
import * as modals from 'modals';

import { storage, Clone } from 'storage';
import * as util          from 'util';
import * as st            from 'site';
import th                 from 'theme';
import * as ss            from 'stylesheet';

import * as tooltip       from 'tooltip';
import * as waves         from 'waves';

const rdcls   = "simpread-read-root",
      bgtmpl  = `<div class="${rdcls}"></div>`,
      rdclsjq = "." + rdcls,
      $root   = $( "html" ),
      theme   = "simpread-theme-root";

const errorpage = `
        <sr-rd-content-error>
            <p>当前页面使用 <span style="color: #4183c4;">阅读模式</span> 解析后 <b style="color: #E57373;">无法正常显示</b>，暂时不支持 <b style="color: #E57373;">手动添加</b>，请换用 <span style="color: #4183c4;">聚焦模式</span>。
  </p>
            <p>或者<a href="https://github.com/Kenshin/simpread/issues/new" target="_blank">报告此页面</a> 以便让 <a href="http://ksria.com/simpread" target="_blank">简悦 - SimpRead</a> 变得更加出色，谢谢。</p>
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
            case "scroll":
                $( "sr-read" ).velocity( "scroll", { offset: $( "body" ).scrollTop() + value });
                break;
            case "fontfamily":
            case "fontsize":
            case "layout":
            case "theme":
                storage.current[type]=value;
                storage.Setcur( storage.current.mode );
                break;
            case "markdown":
                new Notify().Render( "请注意，这是一个实验性功能，不一定能导出成功。" );
                const { include } = this.props.wrapper;
                try {
                    const md   = toMarkdown( include, { gfm: true }),
                          data = "data:text/plain;charset=utf-8," + encodeURIComponent( md ),
                          $a   = $( `<a style="display:none" href=${data} download="simpread-${ this.props.wrapper.title.trim() }.md"></a>` ).appendTo( "body" );
                    $a[0].click();
                    $a.remove();
                } catch( e ) {
                    new Notify().Render( 1, "转换 Markdown 格式失败！" );
                }
                break;
        }
    }

   // exit read mode
   exit() {
        $( rdclsjq ).velocity( { opacity: 0 }, {
            delay: 100,
            complete: ( elements ) => {
                ReactDOM.unmountComponentAtNode( getReadRoot() );
            }
        }).addClass( "simpread-read-root-hide" );
    }

    render() {
        return(
            <sr-read>
                <ProgressBar show={ this.props.read.progress } />
                <sr-rd-title>{ this.props.wrapper.title }</sr-rd-title>
                <sr-rd-desc>{ this.props.wrapper.desc }</sr-rd-desc>
                <sr-rd-content dangerouslySetInnerHTML={{__html: this.props.wrapper.include }} ></sr-rd-content>
                <Footer />
                <ReadCtlbar site={{ title: this.props.wrapper.title, url: window.location.href }} onAction={ (t,v)=>this.onAction( t,v ) } />
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
 * Verify simpread-read-root tag exit
 * 
 * @return {boolean}
 */
function Exist( action = true ) {
    if ( $root.find( rdclsjq ).length > 0 ) {
        action && modals.Render();
        return true;
    } else {
        return false;
    }
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

export { Render, Exist };
