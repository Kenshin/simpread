console.log( "=== simpread site load ===" )

import minimatch from 'minimatch';

/**
 * Get URI
 * 
 * @return {string} e.g. current site url is http://www.cnbeta.com/articles/1234.html return http://www.cnbeta.com/articles/
 */
function getURI() {
    //const arr = window.location.pathname.match( /(\S+\/\b|^\/)/g );
    //return `${ window.location.protocol }//${ window.location.hostname }${ arr[0] }`;
    const name = (pathname) => {
        pathname = pathname != "/" && pathname.endsWith("/") ? pathname = pathname.replace( /\/$/, "" ) : pathname;
        return pathname.replace( /\/[%@#.~a-zA-Z0-9_-]+$|^\/$/g, "" );
    },
    path = name( window.location.pathname );
    return `${ window.location.protocol }//${ window.location.hostname }${ path }/`;
}

/**
 * Find site by url from simpread.sites, include wildcard, support: *
 * 
 * @param  {map}    simpread.sites
 * @param  {string} url
 * @return {array}  0: current site; 1: current url
 */
function findSitebyURL( sites, url ) {
    const domain   = (names)=>{
            const arr = names.replace( "www.", "" ).match( /\.\S+\.\S+/g );
            if ( arr ) {
                return arr[0].substr(1);
            } else {
                return names.replace( "www.", "" );
            }
          },
          urls     = [ ...sites.keys() ],
          arr      = url.match( /[.a-zA-z0-9-_]+/g ),
          uri      = arr[1].replace( "www.", "" ),
          hostname = domain( window.location.hostname ),
          isroot   = ()=>window.location.pathname == "/" || /\/(default|index|portal).[0-9a-zA-Z]+$/.test(window.location.pathname);
    let   found;
    for ( const cur of urls ) {
        const name   = sites.get(cur).name,
              sufname= domain( name );
        if ( name == "baijia.baidu.com" && url.includes(name) ) {
            found = cur;
            break;
        } else if ( !isroot() && !cur.endsWith( "*" ) && cur.replace( /^http[s]?:/, "" ) == url.replace( /^http[s]?:/, "" ) ) {
            found = cur;
            break;
        } else if ( cur.match( /\*/g ) && cur.match( /\*/g ).length == 1 && !isroot() && cur.endsWith( "*" ) && uri.includes( sufname ) && hostname == sufname && url.includes( name ) ) {
            //if ( /\/[a-zA-Z0-9]+\/\*/g.test( cur )) {
            //    if    ( suffix != url ) return undefined;
            //} else if ( suffix == url ) return undefined;
            found = cur;
            break;
        } else if ( minimatch( window.location.origin + window.location.pathname, cur ) ) {
            found = cur;
            break;
        }
    }
    if ( found ) {
        return [ clone( sites.get( found )), found ];
    }
    return undefined;
}

/**
 * Remove spare tag
 * 
 * @param {string} storage.current.site.name
 * @param {jquery} jquery object
 */
async function removeSpareTag( name, $target ) {
    let [ remove, tag ] = [ false, "" ];
    if ([ "lib.csdn.net", "huxiu.com", "my.oschina.net", "caixin.com", "163.com", "steachs.com", "hacpai.com", "apprcn.com", "mp.weixin.qq.com" ].includes( name )) {
        [ remove, tag ] = [ true, "p" ];
    } else if ([ "nationalgeographic.com.cn", "dgtle.com", "news.mtime.com" ].includes( name )) {
        [ remove, tag ] = [ true, "div" ];
    } else if ( ["chiphell.com"].includes( name ) ) {
        [ remove, tag ] = [ true, "font" ];
    }
    if ( remove ) {
        $target.find( tag ).map( ( index, item ) => {
            const str = $(item).text().toLowerCase().trim();
            if ( $(item).find( "img" ).length == 0 && str == "" ) $(item).remove();
        });
    }
}

/**
 * Verify site
 * 
 * @param  {string} storage.current.site.name
 * @return {number} 0: success; -1: not exsit; -2: tieba.com;
 */
function verify( name ) {
    const [ hostname, pathname, href ] = [ window.location.hostname, window.location.pathname, window.location.href ];
    /*if ( hostname == "tieba.baidu.com" && !href.includes( "see_lz=1" ) ) {
        return -2;
    } else */
    if ( name === "" ) {
        return -1;
    } else {
        return 0;
    }
}

/**
 * Beautify html
 * 
 * @param {string} storage.current.site.name
 */
async function specbeautify( name, $target ) {
    switch ( name ) {
        case "sspai.com":
            //TO-DO
            $target.find( ".relation-apps" ).remove();
            $target.find( ".ss-app-card"   ).remove();
            break;
        case "post.smzdm.com":
            $target.find( "img.face" ).addClass( "sr-rd-content-nobeautify" );
            $target.find( ".insert-outer img" ).addClass( "sr-rd-content-nobeautify" );
            break;
        case "infoq.com":
            $target.find( "img" ).map( (index, item) => {
                if ( $(item).css("float") == "left" ) {
                    $(item).addClass( "sr-rd-content-nobeautify" );
                }
            });
            $target.find( "script" ).remove();
            break;
        case "appinn.com":
            $target.find( ".emoji" ).addClass( "sr-rd-content-nobeautify" );
            break;
        case "hacpai.com":
            $target.find( ".emoji" ).addClass( "sr-rd-content-nobeautify" );
            break;
        case "douban.com":
            $target.find( ".review-content" ).children().unwrap();
            $target.find( "table" ).addClass( "sr-rd-content-center" );
            $target.find( "p" ).css({"white-space": "pre-wrap"});
            $target.find( ".cc" ).removeClass();
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
            $target.find( ".com-insert-embed" ).remove();
            break;
        case "news.mtime.com":
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
            $target.find( ".dp-highlighter" ).map( ( index, item )=> {
                $(item).find(".bar .tools").remove();
                if ( $(item).next().is( "pre" )) $(item).next().remove();
            });
            break;
        case "news.sohu.com":
            $target.find( ".conserve-photo" ).remove();
            $target.find( "table" ).addClass( "sr-rd-content-center" );
            break;
        case "qq.com":
            $target.find( ".rv-root-v2, #backqqcom" ).remove();
            break;
        case "azofreeware.com":
            $target.find( "iframe" ).remove();
            break;
        case "apprcn.com":
            $target.find( "img" ).map( ( index, item ) => {
                const $target = $(item),
                      src     = $target.attr( "src" );
                if ( src && src.includes( "Apprcn_Wechat_Small.jpeg" ) ) $target.parent().remove();
            });
            $target.find( "a" ).map( ( index, item ) => {
                const $target = $(item),
                      text    = $target.text();
                if ( text == "来自反斗软件" ) $target.parent().remove();
            });
            break;
        case "tieba.baidu.com":
            $target.find( ".BDE_Smiley" ).addClass( "sr-rd-content-nobeautify" );
            $target.find( ".replace_div" ).removeAttr( "class" ).removeAttr( "style" );
            $target.find( ".replace_tip" ).remove();
            $target.find( ".d_post_content, .j_d_post_content, .post_bubble_top, .post_bubble_middle, .post_bubble_bottom" ).map( ( idx, target ) => {
                $( target ).removeAttr( "class" ).removeAttr( "style" );
            });
            $( "body" ).find( ".p_author_face" ).map( ( idx, target ) => {
                const $target = $( target ).find( "img" ),
                      src     = $target.attr( "data-tb-lazyload" ),
                      name    = $target.attr( "username" );
                src && $( "sr-rd-mult-avatar" ).find( "span" ).map( ( idx, span ) => {
                    const $span = $( span ),
                          text  = $span.text();
                    if ( text == name ) {
                        $span.parent().find( "img" ).attr( "src", src );
                    }
                });
            });
            break;
        case "jingyan.baidu.com":
            $target.find( ".exp-image-wraper" ).removeAttr( "class" ).removeAttr( "href" );
            break;
        case "question.zhihu.com":
            $target.find( ".zu-edit-button" ).remove();
            $target.find( "a.external" ).map( ( idx, target ) => {
                $( target ).removeAttr( "class" )
                           .attr( "style", "border: none;" );
            });
            $target.find( ".VagueImage" ).map( ( idx, target ) => {
                const $target = $( target ),
                      src     = $target.attr( "data-src" );
                $target.replaceWith( `<img class="sr-rd-content-img" src="${ src }" style="zoom: 0.6;">` )
            });
            break;
        case "chiphell.com":
            $target.find( "img" ).map( ( index, item ) => {
                const $target = $(item),
                      $parent = $target.parent(),
                      src     = $target.attr( "src" ),
                      smilieid= $target.attr( "smilieid" );
                if ( $parent.is( "ignore_js_op" )) $target.unwrap();
                smilieid && src && src.includes( "static/image/smiley" ) &&
                    $target.addClass( "sr-rd-content-nobeautify" ).attr( "style", "width: 50px;" );
            });
            $target.find( ".quote" ).remove();
            break;
        case "jiemian.com":
            $target.find( "script" ).remove();
            break;
        case "36kr.com":
            $target.find( ".load-html-img" ).removeAttr( "class" );
            break;
        case "cnblogs.com":
            $target.find( ".cnblogs_code" ).removeClass();
            $target.find( ".cnblogs_code_hide" ).removeClass().removeAttr( "style" );
            $target.find( ".cnblogs_code_toolbar" ).remove();
            $target.find( ".code_img_opened" ).remove();
            $target.find( ".code_img_closed" ).remove();
            break;
        case "news.cnblogs.com":
            $target.find( ".topic_img" ).remove();
            break;
        case "g-cores.com":
            $target.find( ".swiper-slide-active" ).find( "img" ).map( ( index, item ) => {
                const $target = $(item);
                $target.parent().parent().parent().parent().parent().parent().removeAttr( "class" ).removeAttr( "style" ).html($target);
            });
            break;
        case "feng.com":
            $target.find( "span" ).removeAttr( "style" );
            break;
        case "young.ifeng.com":
            $target.find( "span" ).removeAttr( "style" );
            break;
        case "ftchinese.com":
            $target.find( "script" ).remove();
            break;
        case "segmentfault.com":
            $target.find( ".widget-codetool" ).remove();
            break;
        case "mp.weixin.qq.com":
            $target.find( 'section[powered-by="xiumi.us"]' ).find( "img" ).map( ( index, item ) => {
                const $target = $(item),
                      src     = $target.attr( "data-src" );
                $target.addClass( "sr-rd-content-nobeautify" ).attr( "src", src );
            });
            break;
         case "ruby-china.org":
            $target.find( ".twemoji" ).remove();
            break;
        case "w3cplus.com":
            $target.find( "iframe" ).addClass( "sr-rd-content-nobeautify" );
            break;
        case "zuojj.com":
            $target.find( ".syntaxhighlighter .Brush" ).attr( "style", "font-size: .7em !important;" )
            break;
        case "aotu.io":
            $target.find( ".highlight table" ).map( ( index, item ) => {
                const $target = $(item),
                      $pre    = $target.find( "pre" ),
                      $table  = $target.find( "table" );
                $target.html( $pre[1] );
                $table.unwrap();
            });
            $target.find( "table" ).addClass( "sr-rd-content-center" );
            break;
        case "colobu.com":
            $target.find( ".highlight table" ).map( ( index, item ) => {
                const $target = $(item),
                      $pre    = $target.find( "pre" );
                $target.html( $pre[1] );
                $target.unwrap();
            });
            break;
        case "hao.caibaojian.com":
            $target.find( ".tlink" ).map( ( index, item ) => {
                const $target = $(item);
                $target.html( "<link>" );
            });
            break;
        case "wkee.net":
            $target.find( "script" ).remove();
            break;
        case "linux.cn":
            $target.find( "pre" ).attr(  "style", "background-color: #161b20; background-image: none;" );
            $target.find( "code" ).attr( "style", "background-color: transparent; background-image: none;" );
            break;
        case "zhuanlan.zhihu.com":
            $target.find( "div[data-src]" ).map( ( index, item ) => {
                const $target = $(item),
                      src     = $target.attr( "data-src" );
                $target.replaceWith( `<div class="sr-rd-content-center"><img src="${ src }"></div>` );
            });
            break;
    }
}

/**
 * Deep clone object
 * 
 * @param  {object} target object
 * @return {object} new target object
 */
function clone( target ) {
    return $.extend( true, {}, target );
}

/**
 * Html convert to enml
 * 
 * @param  {string} convert string
 * @param  {string} url
 * 
 * @return {string} convert string
 */
function html2enml( html, url ) {
    let $target, str;
    const tags = [ "figure", "sup", "hr", "section", "applet", "base", "basefont", "bgsound", "blink", "body", "button", "dir", "embed", "fieldset", "form", "frame", "frameset", "head", "html", "iframe", "ilayer", "input", "isindex", "label", "layer", "legend", "link", "marquee", "menu", "meta", "noframes", "noscript", "object", "optgroup", "option", "param", "plaintext", "script", "select", "style", "textarea", "xml" ];
    
    $( "html" ).append( `<div id="simpread-en" style="display: none;">${html}</div>` );
    $target = $( "#simpread-en" );
    $target.find( "img:not(.sr-rd-content-nobeautify)" ).map( ( index, item ) => {
        $( "<div>" ).attr( "style", `width: ${item.naturalWidth}px; height:${item.naturalHeight}px; background: url(${item.src})` )
        .replaceAll( $(item) );
    });
    $target.find( tags.join( "," ) ).map( ( index, item ) => {
        $( "<div>" ).html( $(item).html() ).replaceAll( $(item) );
    });
    $target.find( tags.join( "," ) ).remove();
    str = $target.html();
    $target.remove();

    try {
        str = `<blockquote>本文由 <a href="http://ksria.com/simpread" target="_blank">简悦 SimpRead</a> 转码，原文地址 <a href="${url}" target="_blank">${url}</a></blockquote><hr></hr><br></br>` + str;
        str = str.replace( /(id|class|onclick|ondblclick|accesskey|data|dynsrc|tabindex)="[\w- ]+"/g, "" )
                //.replace( / style=[ \w="-:\/\/:#;]+/ig, "" )             // style="xxxx"
                .replace( /label=[\u4e00-\u9fa5 \w="-:\/\/:#;]+"/ig, "" )  // label="xxxx"
                .replace( / finallycleanhtml=[\u4e00-\u9fa5 \w="-:\/\/:#;]+"/ig, "" )  // finallycleanhtml="xxxx"
                .replace( /<img[ \w="-:\/\/?!]+>/ig, "" )                  // <img>
                .replace( /data[-\w]*=[ \w=\-.:\/\/?!;+"]+"[ ]?/ig, "" )   // data="xxx" || data-xxx="xxx"
                .replace( /href="javascript:[\w()"]+/ig, "" )              // href="javascript:xxx"
                .replace( /sr-blockquote/ig, "blockquote" )                // sr-blockquote to blockquote
                .replace( /<p[ -\w*= \w=\-.:\/\/?!;+"]*>/ig, "" )          // <p> || <p > || <p xxx="xxx">
                .replace( /<figcaption[ -\w*= \w=\-.:\/\/?!;+"]*>/ig, "" ) // <figcaption >
                .replace( /<\/figcaption>/ig, "" )                         // </figcaption>
                .replace( /<\/br>/ig, "" )                                 // </br>
                .replace( /<br>/ig, "<br></br>" )
                .replace( /<\/p>/ig, "<br></br>" );

        return str;

    } catch( error ) {
        return `<div>转换失败，原文地址 <a href="${url}" target="_blank">${url}</a></div>`
    }
}

/**
 * Clear Html to MD, erorr <tag>
 * 
 * @param {string} convert string
 */
function clearMD( str ) {
    str = `> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 ${ window.location.href } \r\n\r\n ${str}`;
    str = str.replace( /<\/?(ins|font|span|div|canvas|noscript|fig\w+)[ -\w*= \w=\-.:&\/\/?!;,%+()#'"{}\u4e00-\u9fa5]*>/ig, "" )
             .replace( /sr-blockquote/ig, "blockquote" )
             .replace( /<\/?style[ -\w*= \w=\-.:&\/\/?!;,+()#"\S]*>/ig, "" )
             .replace( /(name|lable)=[\u4e00-\u9fa5 \w="-:\/\/:#;]+"/ig, "" )
             return str;
}

/**
 * Get metadata
 * 
 * @return {object} meata data or undefined
 */
function metadata() {
    const reg  = /<\S+ (class|id)=("|')?[\w-_=;:' ]+("|')?>?$|<[^/][-_a-zA-Z0-9]+>?$/ig, // from util.verifyHtml()
          meta = {
            name   : $( "meta[name='simpread:name']"    ).attr( "content" ),
            title  : $( "meta[name='simpread:title']"   ).attr( "content" ),
            desc   : $( "meta[name='simpread:desc']"    ).attr( "content" ),
            include: $( "meta[name='simpread:include']" ).attr( "content" ),
            exp    : $( "meta[name='simpread:exclude']" ).attr( "content" ),
            auto   : $( "meta[name='simpread:auto']"    ).attr( "content" ),
            exclude: [],
    };
    if ( meta.name && meta.include ) {
        !meta.title   && ( meta.title   = "<title>" );
        !meta.desc    && ( meta.desc    = "" );
        !meta.exp     && ( meta.exp     = "" );
        meta.name = `metaread::${meta.name}`;
        meta.auto = meta.auto == "true" ? true : false;
        const idx = [ "title", "desc", "include", "exp" ].findIndex( item => meta[item] != "" && !meta[item].match( reg ));
        meta.exclude.push( meta.exp );
        delete meta.exp;
        console.assert( idx == -1, "meta read mode error. ", meta )
        return idx == -1 ? meta : undefined;
    } else {
        console.error( "meta read mode error. ", meta )
        return undefined;
    }
}

export {
    getURI         as GetURI,
    findSitebyURL  as Getsite,
    specbeautify   as Beautify,
    removeSpareTag as RemoveTag,
    verify         as Verify,
    html2enml      as HTML2ENML,
    clearMD        as ClearMD,
    metadata       as GetMetadata,
}