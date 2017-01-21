console.log( "=== simpread read load ===" )

import pangu       from 'pangu';
import ProgressBar from 'readschedule';
import Footer      from 'readfooter';

import { ReadCtlbar, ReadCtlAdapter } from 'readctlbar';
import { storage, Clone } from 'storage';
import * as util          from 'util';

const rdcls   = "ks-simpread-read",
      bgtmpl  = `<div class="${rdcls}"></div>`,
      rdclsjq = "." + rdcls,
      $root   = $( "html" ),
      theme   = `sr-rd-theme-bg`;

const errorpage = `
        <sr-rd-content-error>
            <p>当前页面解析后 <b style="color: #E57373;">无法正常显示</b>，您可能需要 <b style="color: #E57373;">手动添加</b>，请使用 <span style="color: #4183c4;">快捷键</span> 或 <span style="color: #4183c4;">侧栏手动</span> 打开 <span style="color: #4183c4;">选项页面</span>。</p>
            <p>
                或者 <a href="https://github.com/Kenshin/simpread/issues/new" target="_blank">报告此页面</a> 以便让 简悦 <a href="http://ksria.com/simpread" target="_blank">SimpRead</a> 变得更加出色，谢谢。
            </p>
        </sr-rd-content-error>`;

class Read extends React.Component {

    componentWillMount() {
        $( "body" ).addClass( "ks-simpread-body-hide" );
    }

    async componentDidMount() {
        await excludes( $("sr-rd-content"), this.props.wrapper.exclude );
        await specbeautify( $( "sr-rd-content" ));
        await commbeautify( $( "sr-rd-content" ));
        $root.addClass( theme ).find( rdclsjq ).addClass( theme );
        pangu.spacingElementByClassName( rdcls );
    }

    componentWillUnmount() {
        $root.removeClass( theme );
        $( "body" ).removeClass( "ks-simpread-body-hide" );
        $( rdclsjq ).addClass( "ks-simpread-read-hide" );
        $( rdclsjq ).one( "animationend", () => {
            $( rdclsjq ).remove();
        });
    }

    constructor( props ) {
        super( props );
        switch ( this.props.read.theme ) {
            case "theme1":
               require( "theme1" );
               break;
            case "theme2":
               require( "theme2" );
               break;
        }
    }

   // exit read mode
   exit() {
        ReactDOM.unmountComponentAtNode( getReadRoot() );
    }

    render() {
        return(
            <sr-read class="sr-rd-font">
                <ProgressBar />
                <sr-rd-title>{ this.props.wrapper.title }</sr-rd-title>
                <sr-rd-desc>{ this.props.wrapper.desc }</sr-rd-desc>
                <sr-rd-content dangerouslySetInnerHTML={{__html: this.props.wrapper.include }} ></sr-rd-content>
                <Footer />
                <ReadCtlbar exit={ ()=> this.exit() } />
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
 * Verify ks-simpread-read tag exit
 * 
 * @return {boolean}
 */
function Exist( action = true ) {
    if ( $root.find( rdclsjq ).length > 0 ) {
        if (action) ReadCtlAdapter( "setting" );
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
 * @param  {string} type, incldue: text and html
 * @return {string} query result
 */
function query( content, type = "text" ) {
    if ( util.specTest( content ) ) {
        content = util.specAction( content )[0];
    } else if ( type == "html" ) {
        content = rules( getcontent( $root.find( content ) ));
    } else {
        content = $root.find( content ).text().trim();
    }
    return content;
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
 * Special beautify html with other webiste, incldue:
 * - sspai.com, mzdm.com, infoq.com, douban.com, qdaily.com, huxiu.com
 * - news.mtime.com
 * 
 * @param {jquery}
 */
async function specbeautify( $target ) {
    switch ( storage.current.site.name ) {
        case "sspai.com":
            $target.find( ".relation-apps" ).map( (index, item) => {
                // TO-DO
                $(item).remove();
            });
            break;
        case "smzdm.com":
            $target.find( "img.face, .insert-outer" ).map( (index, item) => {
                if ( $(item).is("img") ) {
                    $(item).addClass( "sr-rd-content-nobeautify" );
                } else {
                    $(item).find( "img" ).addClass( "sr-rd-content-nobeautify" );
                }
            });
            break;
        case "infoq.com":
            $target.find( "img" ).map( (index, item) => {
                if ( $(item).css("float") == "left" ) {
                    $(item).addClass( "sr-rd-content-nobeautify" );
                }
            });
            break;
        case "douban.com":
            $target.find( ".review-content" ).children().unwrap();
            $target.find( "table" ).addClass( "sr-rd-content-center" );
            break;
        case "qdaily.com":
            $target.find( "img" ).map( (index, item) => {
                const $target = $(item),
                      height  = Number.parseInt($target.css("height"));
                if ( height == 0 ) $target.remove();
            });
            $target.find( ".com-insert-images" ).map( (index, item) => {
                const $target = $(item),
                      imgs    = $target.find( "img" ).map( (index, item)=>`<div>${item.outerHTML}</div>` ),
                      str     = imgs.get().join( "" );
                $target.empty().removeAttr( "class" ).append( str );
            });
            break;
        case "news.mtime.com":
            removeSpareSpace( $target, "div" );
            $target.find( ".newspictool" ).map( ( index, item ) => {
                const $target = $(item),
                      $img    = $target.find( "img" ),
                      $label  = $target.find( "p:last" );
                $target.removeAttr( "class" ).addClass( "sr-rd-content-center" ).empty().append( $img ).append( $label );
            });
            break;
        case "blog.csdn.net":
            $target.find( ".save_code" ).remove();
            $target.find( ".pre-numbering" ).remove();
            $target.find( "pre" ).removeAttr( "style" ).removeAttr( "class" );
            $target.find( "code" ).removeAttr( "style" );
        case "news.sohu.com":
            $target.find( ".conserve-photo" ).remove();
            $target.find( "table" ).addClass( "sr-rd-content-center" );
        default:
            if ([ "lib.csdn.net", "huxiu.com", "my.oschina.net", "caixin.com", "163.com" ].includes( storage.current.site.name )) {
                removeSpareSpace( $target, "p" );
            } else if ([ "nationalgeographic.com.cn" ].includes( storage.current.site.name )) {
                removeSpareSpace( $target, "div" );
            }
            break;
    }
}

/**
 * Common Beautify html, include:
 * - task: all webiste image, remove old image and create new image
 * - task: all webiste sr-blockquote, remove style
 * - task: all webiste iframe, embed add center style
 * - task: all hr tag add sr-rd-content-exclude class
 * - task: all pre tag remove class
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
                  if ( $img[0].clientHeight > 620 ) {
                      $img.attr( "height", 620 );
                      if ( $img[0].clientWidth < $("sr-rd-content").width()) $img.css({ "width":"auto" });
                  }
                  if ( $img[0].clientWidth > $("sr-rd-content").width()) $img.addClass( "sr-rd-content-img" );
              },
              loaderrorHandle = () => {
                  $img.addClass( "sr-rd-content-exclude" );
                  if ( $img.parent().hasClass( "sr-rd-content-center" )) {
                      $img.parent().removeAttr( "class" ).addClass( "sr-rd-content-exclude" );
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
            .prependTo( $parent )
            .wrap( "<div class='sr-rd-content-center'></div>" );
        $target.remove();

        // origin style
        /*if ( tagname !== "sr-read" && !$parent.hasClass( "sr-rd-content-exclude" ) ) {
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
        if ( !$parent.hasClass( "sr-rd-content-exclude" ) ) {
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
    $target.find( "iframe, embed" ).map( ( index, item )=> {
        $(item).wrap( "<div class='sr-rd-content-center'></div>" );
    });
    $target.find( "hr" ).map( ( index, item )=> {
        $(item).addClass( "sr-rd-content-exclude" );
    });
    $target.find( "pre" ).map( ( index, item )=> {
        $(item).find( "code" ).removeAttr( "class" );
    });
}

/**
 * Format html, include:
 * - change all blockquote to sr-blockquote
 * 
 * @param  {string} html string
 * @return {string} format html string
 */
function rules( html ) {
    return html.trim().replace( /<\/?blockquote/g, (value) => value[1] == "/" ? "</sr-blockquote" : "<sr-blockquote" );
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
            // TO-DO
            html = errorpage;
            break;
        case 1:
            html = $target.html().trim();
            break;
        default:
            html = $target.map( (index, item) => $(item).html() ).get().join( "" );
            break;
    }
    return html;
}

/**
 * Remove spare space
 * 
 * @param {jquery} jquery object
 * @param {string} html tag, e.g. div p
 */
function removeSpareSpace( $target, tag ) {
    $target.find( tag ).map( ( index, item ) => {
        const str = $(item).text().toLowerCase().trim();
        if ( $(item).find( "img" ).length == 0 && str == "" ) $(item).remove();
    });
}

export { Render, Exist };