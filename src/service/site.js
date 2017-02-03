console.log( "=== simpread site load ===" )

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
        return pathname.replace( /\/[@#.~a-zA-Z0-9_-]+$|^\/$/g, "" );
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
        if ( !isroot() && cur == url ) {
            found = cur;
            break;
        }
        else if ( !isroot() && cur.endsWith( "*" ) && uri.includes( sufname ) && hostname == sufname && url.includes( name ) ) {
            //if ( /\/[a-zA-Z0-9]+\/\*/g.test( cur )) {
            //    if    ( suffix != url ) return undefined;
            //} else if ( suffix == url ) return undefined;
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
 * @return {number} 0: success; -1: not exsit; -2: tieba.com; -3: chiphell.com
 */
function verify( name ) {
    const [ hostname, pathname, href ] = [ window.location.hostname, window.location.pathname, window.location.href ];
    if ( hostname == "tieba.baidu.com" && !href.includes( "see_lz=1" ) ) {
        return -2;
    } else if ( hostname == "www.chiphell.com" ) {
        if ( pathname == "/forum.php" && window.location.search.includes( "mod=viewthread" ) ) {
            return 0;
        } else if ( pathname.includes( "thread" ) && window.location.search == "" ) {
            return -3;
        } else {
            return -1;
        }
    } else if ( name === "" ) {
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
            $target.find( ".relation-apps" ).map( (index, item) => {
                // TO-DO
                $(item).remove();
            });
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
            break;
        case "question.zhihu.com":
            $target.find( ".zu-edit-button" ).remove();
            break;
        case "chiphell.com":
            $target.find( "img" ).map( ( index, item ) => {
                const $target = $(item),
                      $parent = $target.parent(),
                      src     = $target.attr( "src" );
                if ( $parent.is( "ignore_js_op" )) $target.unwrap();
                if ( src && src.includes( "static/image/smiley" ) ) $target.addClass( "sr-rd-content-nobeautify" );
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
            $target.find( ".cnblogs_code_toolbar" ).remove();
            break;
        case "news.cnblogs.com":
            $target.find( ".topic_img" ).remove();
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

export {
    getURI         as GetURI,
    findSitebyURL  as Getsite,
    specbeautify   as Beautify,
    removeSpareTag as RemoveTag,
    verify         as Verify
}