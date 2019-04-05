console.log( "=== PureRead: Beautify load ===" )

/**
 * Beautify html
 * 
 * @param {string} storage.current.site.name
 */
function specbeautify( name, $target ) {
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
        case "jianshu.com":
            $target.find( ".image-package" ).map( ( index, item ) => {
                const $target = $( item ),
                    $div    = $target.find( "img" );
                $target.html( $div );
            });
            break;
        case "medium.com":
            $target.find( "figure" ).map( ( index, item ) => {
                const $target = $(item),
                      $img    = $target.find( "img" );
                $target.replaceWith( `<div class="sr-rd-content-center"><img class="sr-rd-content-nobeautify" src="${ $img.attr('data-src') }" style="max-width:100%"></div>` );
            });
            break;
        case "worldcup.fifa.com":
            $target.find( "iframe" ).css({ width: "790px", height: "450px" });
            $target.find( "div" ).removeClass();
            break;
    }
}

/**
 * Remove spare tag
 * 
 * @param {string} storage.current.site.name
 * @param {jquery} jquery object
 */
function removeSpareTag( name, $target ) {
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
 * Beautify html, incldue:
 * 
 * - change all <blockquote> to <sr-blockquote>
 * - remove useless <br>
 * 
 * @param {jquery} jquery object
 */
function htmlbeautify( $target ) {
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
function commbeautify( name, $target ) {
    $target.find( "img:not(.sr-rd-content-nobeautify)" ).map( ( index, item ) => {
        const $target = $(item),
              $orgpar = $target.parent(),
              $img    = $( "<img class='sr-rd-content-img-load'>" ),
              src     = $target.attr( "src" ),
              lazysrc = $target.attr( "data-src" ),
              zuimei  = $target.attr( "data-original" ),
              cnbeta  = $target.attr( "original" ),
              jianshu = $target.attr( "data-original-src" ),
              sina    = $target.attr( "real_src" ),
              fixOverflowImgsize = () => {
                  $img.removeClass( "sr-rd-content-img-load" );
                  if ( $img[0].clientWidth < 400 ) {
                      $img.parent().removeClass( "sr-rd-content-center" ).addClass( "sr-rd-content-center-small" );
                  } else if ( $img[0].clientWidth > 1000 ) {
                      $img.css( "zoom", "0.6" );
                  } else if ( $img[0].clientHeight > 620 ) {
                    if ( /win|mac/i.test(navigator.platform) ) {
                        $img.attr( "height", 620 );
                        if ( $img[0].clientWidth < $("sr-rd-content").width()) $img.css({ "width":"auto" });
                    }
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
        newsrc = jianshu ? jianshu : newsrc;
        newsrc = sina    ? sina    : newsrc;
        // hack code
        location.host.includes( "infoq.com" ) && ( newsrc = src );
        !newsrc.startsWith( "http" ) && ( newsrc = newsrc.startsWith( "//" ) ? location.protocol + newsrc : location.origin + newsrc );
        $img.attr( "src", newsrc )
            .replaceAll( $target )
            .wrap( "<div class='sr-rd-content-center'></div>" );
        if ( !/win|mac/i.test(navigator.platform) ) {
            $img.on( "load",  ()=>fixOverflowImgsize() )
                .on( "error", ()=>loaderrorHandle()    );
        } else {
            $img.one( "load",  ()=>fixOverflowImgsize() )
                .one( "error", ()=>loaderrorHandle()    );
        }
    });
    $target.find( "sr-blockquote" ).map( ( index, item ) => {
        const $target = $(item),
              $parent = $target.parent();
        $target.removeAttr( "style" ).removeAttr( "class" );
        if ( name == "dgtle.com" ) {
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

export {
    specbeautify,
    removeSpareTag,
    htmlbeautify,
    commbeautify,
}