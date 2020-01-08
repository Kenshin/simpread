console.log( "=== simpread util load ===" )

/**
 * Verify html from puread/util verifyHtml()
 * 
 * @param  {string} input include html tag, e.g.:
    <div class="article fmt article__content">
 *
 * @return {array} 0: int include ( -1: fail； 0: empty html; 1: success; 2: special tag )
 *                 1: result
 */
function verifyHtml( html ) {
    if ( html == "" ) return [ 0, html ];
    else if ( specTest( html )) return [ 2, html ];
    const item = html.match( /<\S+ (class|id)=("|')?[\w-_=;:' ]+("|')?>?$|<[^/][-_a-zA-Z0-9]+>?$/ig );
    if ( item && item.length > 0 ) {
        return [ 1, item ];
    } else {
        return [ -1, undefined ];
    }
}

/**
 * Verify special action from puread/util specTest()
 * action include:
   - [[{juqery code}]] // new Function, e.g. $("xxx").xxx() return string
   - [['text']]        // remove '<text>'
   - [[/regexp/]]      // regexp e.g. $("sr-rd-content").find( "*[src='http://ifanr-cdn.b0.upaiyun.com/wp-content/uploads/2016/09/AppSo-qrcode-signature.jpg']" )
   - [[[juqery code]]] // new Function, e.g. $("xxx").find() return jquery object
   - [[`xpath`]]       // /html[1]/div[1]/sr-read[1]/sr-rd-content[1]/p[1]

 * 
 * @param  {string} verify content
 * @return {boolen} verify result
 */
function specTest( content ) {
    return /^(\[\[)[\[{`'/]{1}[ \S]+[}`'/\]]\]\]{1}($)/g.test( content );
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
    const bad  = [ "sup", "hr", "section", "applet", "base", "basefont", "bgsound", "blink", "body", "button", "dir", "embed", "fieldset", "form", "frame", "frameset", "head", "html", "iframe", "ilayer", "input", "isindex", "label", "layer", "legend", "link", "marquee", "menu", "meta", "noframes", "noscript", "object", "optgroup", "option", "param", "plaintext", "script", "select", "style", "textarea", "xml" ],
          good = [ "a", "abbr", "acronym", "address", "area", "b", "bdo", "big", "blockquote", "br", "caption", "center", "cite", "code", "col", "colgroup", "dd", "del", "dfn", "div", "dl", "dt", "em", "font", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "ins", "kbd", "li", "map", "ol", "p", "pre", "q", "s", "samp", "small", "span", "strike", "strong", "sub", "sup", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "tt", "u", "ul", "var", "xmp"];

    $( "html" ).append( `<div id="simpread-en" style="display: none;">${html}</div>` );
    $target = $( "#simpread-en" );
    $target.find( "img" ).map( ( index, item ) => {
        $( '<simpread-img></simpread-img>' ).attr({ src: item.src, style: "max-width:100%;height:auto;" }).replaceAll( $(item) );
    });
    $target.find( bad.join( "," ) ).remove();
    // remove element all atrr
    $target.find( "*" ).map( ( index, item ) => {
        const tag = item.tagName.toLowerCase();
        if ( tag.startsWith( "sr" ) && /sr-\S[^>]+/ig.test( tag )) {
            $(item).remove();
        }
        else if ( item.attributes.length > 0 ) {
            for ( let i = item.attributes.length - 1; i >= 0; i-- ) {
                const name = item.attributes[i].name;
                if ( tag == "a" && name == "href" ) {
                    let value = item.attributes[i].value;
                    value.startsWith( "//" ) && ( item.attributes[i].value += location.protocol );
                    continue;
                } else if ( tag == "simpread-img" ) {
                    continue;
                }
                item.removeAttribute( name )
            }
        }
    });
    str = $target.html();
    $target.remove();

    try {
        const href = url.indexOf("chksm") > 0 ? "" : `，原文地址 <a href="${url}" target="_blank">${url}</a>`;
        str = `<blockquote>本文由 <a href="http://ksria.com/simpread" target="_blank">简悦 SimpRead</a> 转码${href}</blockquote><hr></hr><br></br>` + str;
        str = str.replace( /(id|class|onclick|ondblclick|accesskey|data|dynsrc|tabindex|name)="[\S ][^"]*"/ig, "" )
                //.replace( / style=[ \w="-:\/\/:#;]+/ig, "" )             // style="xxxx"
                .replace( /label=[\u4e00-\u9fa5 \w="-:\/\/:#;]+"/ig, "" )  // label="xxxx"
                .replace( / finallycleanhtml=[\u4e00-\u9fa5 \w="-:\/\/:#;]+"/ig, "" )  // finallycleanhtml="xxxx"
                //.replace( /<img[ \w="-:\/\/?!]+>/ig, "" )                // <img>
                .replace( /<simpread-img/ig, "<img" )                      // <simpread-img>  → <img>
                .replace( /<\/simpread-img>/ig, "</img>" )                 // </simpread-img> → </img>
                .replace( /data[-\w]*=[ \w=\-.:\/\/?!;+"]+"[ ]?/ig, "" )   // data="xxx" || data-xxx="xxx"
                .replace( /href="javascript:[\w()"]+/ig, "" )              // href="javascript:xxx"
                .replace( /sr-blockquote/ig, "blockquote" )                // sr-blockquote to blockquote
                .replace( /<p[ -\w*= \w=\-.:\/\/?!;+"]*>/ig, "" )          // <p> || <p > || <p xxx="xxx">
                //.replace( /<figcaption[ -\w*= \w=\-.:\/\/?!;+"]*>/ig, "" ) // <figcaption >
                //.replace( /<\/figcaption>/ig, "" )                        // </figcaption>
                .replace( /<(figcaption|figure)/ig, "<div" )               // <figcaption|figure>  → <div>
                .replace( /<\/(figcaption|figure)>/ig, "</div>" )          // </figcaption|figure> → </div>
                .replace( /<\/br>/ig, "" )                                 // </br>
                .replace( /<br>/ig, "<br></br>" )
                .replace( / >/ig, ">" )
                .replace( /<\/p>/ig, "<br></br>" );

        return str;

    } catch( error ) {
        return `<div>转换失败，原文地址 <a href="${url}" target="_blank">${url}</a></div>`
    }
}

/**
 * Markdown to ENML
 * 
 * @param {string} str
 * @return {string} format str
 */
function md2enml( result ) {
    result = result.replace( /</ig, "&lt;" ).replace( />/ig, "&gt;" );
    let str = "";
    result.split( "\n" ).forEach( item => str += `<div>${item}</div>` );
    return str;
}

/**
 * Multi to ENML
 * 
 * @param {string} str
 * @return {string} format str
 */
function multi2enml( str ) {
    return str.replace( / data-\S+">/ig, ">" )
              .replace( /sr-[\w-]+/ig, "div" )
              .replace( /dangerouslysetinnerhtml="\[object Object\]"/ig, "" );
}

/**
 * Clear Html to MD, erorr <tag>
 * 
 * @param {string} convert string
 * @param {boolen} header
 * 
 * @return {string} format string
 */
function clearMD( str, header = true ) {
    header && ( str = `> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 ${ window.location.href } \r\n\r\n ${str}` );
    str = str.replace( /<\/?(ins|font|span|div|canvas|noscript|fig\w+)[ -\w*= \w=\-.:&\/\/?!;,%+()#'"{}\u4e00-\u9fa5]*>/ig, "" )
             .replace( /sr-blockquote/ig, "blockquote" )
             .replace( /<\/?style[ -\w*= \w=\-.:&\/\/?!;,+()#"\S]*>/ig, "" )
             .replace( /(name|lable)=[\u4e00-\u9fa5 \w="-:\/\/:#;]+"/ig, "" )
             return str;
}

/**
 * Clean HTML
 * 
 * @param {string} str
 * @return {string} optimze str
 */
function clearHTML( str ) {
    const url  = location.href,
          href = url.indexOf("chksm") > 0 || url.indexOf("#") > 0 ? "" : `，原文地址 <a href="${url}" target="_blank">${url}</a>`;
    str = `<blockquote>本文由 <a href="http://ksria.com/simpread" target="_blank">简悦 SimpRead</a> 转码${href}</blockquote><hr></hr><br></br>` + str;
    str = str.replace( /(id|class|onclick|ondblclick|accesskey|data|dynsrc|tabindex|name)="[\S ][^"]*"/ig, "" )
             .replace( /&/ig, "&amp;" )
    return str;
}

/**
 * Exclusion
 * 
 * @param  {object} minimatch
 * @param  {object} simpread.read
 * @return {boolen} true: exist; false: not exist
 */
function exclusion( minimatch, data ) {
    const url = window.location.origin + window.location.pathname;
    return data.exclusion.findIndex( item => {
        item == null && ( item = "" );
        item = item.trim();
        if ( item.startsWith( "[[/" ) && item.endsWith( "/]]" ) ) {
            return location.href.replace( new RegExp( item.replace( /\[\[\/|\/\]\]/ig, "" ), "g" ), "" ) == "" ? true : false;
        } else return item.startsWith( "http" ) ? minimatch( url, item ) : item == data.site.name;
    }) != -1 ? true : false;
}

/**
 * Whitelist
 * 
 * @param  {object} minimatch
 * @param  {object} simpread.read
 * @return {boolean} 
 */
function whitelist( minimatch, data ) {
    const url = window.location.origin + window.location.pathname;
    return data.whitelist.findIndex( item => {
        item == null && ( item = "" );
        item = item.trim();
        if ( item.startsWith( "[[/" ) && item.endsWith( "/]]" ) ) {
            return location.href.replace( new RegExp( item.replace( /\[\[\/|\/\]\]/ig, "" ), "g" ), "" ) == "" ? true : false;
        } else return item.startsWith( "http" ) ? minimatch( url, item ) : item == data.site.name;
    }) != -1 ? true : false;
}

/**
 * Blacklist
 * 
 * @param  {object} minimatch
 * @param  {object} simpread.read
 * @return {boolean} true: is blacklist; false: is't blacklist
 */
function blacklist( minimatch, data ) {
    return data.blacklist.findIndex( item => {
       item == null && ( item = "" );
       item = item.trim();
       if ( item.startsWith( "[[/" ) && item.endsWith( "/]]" ) ) {
           return location.href.replace( new RegExp( item.replace( /\[\[\/|\/\]\]/ig, "" ), "g" ), "" ) == "" ? true : false;
       } else return item.startsWith( "http" ) ? minimatch( location.href, item ) : location.hostname.includes( item );
    }) != -1 ? true : false;
}

/**
 * Lazyload
 * 
 * @param  {object} minimatch
 * @param  {object} simpread.read
 * @return {boolean} true: is blacklist; false: is't blacklist
 */
function lazyload( minimatch, data ) {
    return data.lazyload.findIndex( item => {
       item == null && ( item = "" );
       item = item.trim();
       if ( item.startsWith( "[[/" ) && item.endsWith( "/]]" ) ) {
           return location.href.replace( new RegExp( item.replace( /\[\[\/|\/\]\]/ig, "" ), "g" ), "" ) == "" ? true : false;
       } else return item.startsWith( "http" ) ? minimatch( location.href, item ) : location.hostname.includes( item );
    }) != -1 ? true : false;
}

/**
 * Get page info
 * 
 * @return {object} include: url, title, favicon, img, desc
 */
function getPageInfo() {
    const url     = location.href,
          title   = $( "sr-read" ).find( "sr-rd-title" ).text() || $( "head" ).find( "title" ).text() || "",
          favicon = $( `head link[rel~=icon]` ).attr( "href" ) || "",
          img     = $( `head meta[property="og:image"]` ).attr( "content" ) || $( "sr-read" ).find( "img" ).attr( "src" ) || "",
          desc    = $( "sr-read" ).find( "sr-rd-desc" ).text() || $( `head meta[property="og:description"]` ).attr( "content" ) || $( 'meta[name=description]' ).attr( 'content' ) || "";
    return { url, title: title.trim(), favicon, img, desc: desc.trim() };
}

export {
    verifyHtml     as verifyHtml,
    html2enml      as HTML2ENML,
    md2enml        as MD2ENML,
    multi2enml     as MULTI2ENML,
    clearMD        as ClearMD,
    clearHTML      as ClearHTML,
    exclusion      as Exclusion,
    whitelist      as Whitelist,
    blacklist      as Blacklist,
    lazyload       as Lazyload,
    getPageInfo    as GetPageInfo,
}