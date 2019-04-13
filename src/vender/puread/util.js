console.log( "=== PureRead: Util load ===" )

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
 * Get URI
 * 
 * @return {string} e.g. current site url is http://www.cnbeta.com/articles/1234.html return http://www.cnbeta.com/articles/
 */
function getURI() {
    const name = (pathname) => {
        pathname = pathname != "/" && pathname.endsWith("/") ? pathname = pathname.replace( /\/$/, "" ) : pathname;
        return pathname.replace( /\/[%@#.~a-zA-Z0-9_-]+$|^\/$/g, "" );
    },
    path = name( window.location.pathname );
    return `${ window.location.protocol }//${ window.location.hostname }${ path }/`;
}

/**
 * Get url and parser location
 * 
 * @param {string} url 
 */
function getLocation( href ) {
    if ( document ) {
        const a = document.createElement( "a" );
        a.href  = href;
        return a;
    } else {
        const match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
        return match && {
            href    : href,
            protocol: match[1],
            host    : match[2],
            hostname: match[3],
            port    : match[4],
            pathname: match[5],
            search  : match[6],
            hash    : match[7]
        }
    }
}

/**
 * Verify html
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
 * Conver html to jquery object
 * 
 * @param  {string} input include html tag, e.g.:
    <div class="article fmt article__content">
 *
 * @return {string} formatting e.g.:
            h2#news_title
            div.introduction
            div.content
            div.clearfix
            div.rating_box
            span
            special tag, @see specTest
                 e.g. [['<strong>▽</strong>']]        [[[$('.article-btn')]]]
                      [[/src=\\S+(342459.png)\\S+'/]] [[{$('.content').html()}]]
 *
 */
function selector( html ) {
    const [ code, item ] = verifyHtml( html );
    if ( code == 2 ) return html;
    else if ( code == 1 ) {
        let [tag, prop, value] = item[0].trim().replace( /['"<>]/g, "" ).replace( / /ig, "=" ).split( "=" );  // ["h2", "class", "title"]
        if      ( !prop ) prop = tag;
        else if ( prop.toLowerCase() === "class") prop = `${tag}.${value}`;
        else if ( prop.toLowerCase() === "id"   ) prop = `${tag}#${value}`;
        return prop;
    } else {
        return null;
    }
}

/**
 * Verify special action, action include:
   - [[{juqery code}]] // new Function, e.g. $("xxx").xxx() return string
   - [['text']]        // remove '<text>'
   - [[/regexp/]]      // regexp e.g. $("sr-rd-content").find( "*[src='http://ifanr-cdn.b0.upaiyun.com/wp-content/uploads/2016/09/AppSo-qrcode-signature.jpg']" )
   - [[[juqery code]]] // new Function, e.g. $("xxx").find() return jquery object

 * 
 * @param  {string} verify content
 * @return {boolen} verify result
 */
function specTest( content ) {
    return /^(\[\[)[\[{'/]{1}[ \S]+[}'/\]]\]\]{1}($)/g.test( content );
}

/**
 * Exec special action, action include: @see specTest
 * type: 0, 3 - be chiefly used in include logic
 * type: 1, 2 - be chiefly used in exclude logic
 * 
 * @param  {string} content
 * @return {array}  0: result; 1: type( include: -1:error 0:{} 1:'' 2:// 3:[])
 */
function specAction( content ) {
    let [ value, type ] = [ content.replace( /(^)\[\[|\]\]$/g, "" ) ];
    switch (value[0]) {
        case "{":
            value      = value.replace( /^{|}$/g, "" );
            content    = ( v=>new Function( `return ${v}` )() )(value);
            type       = 0;
            break;
        case "'":
            content    = value.replace( /^'|'$/g, "" );
            const name = content.match(/^<[a-zA-Z0-9_-]+>/g).join("").replace( /<|>/g, "" );
            const str  = content.replace( /<[/a-zA-Z0-9_-]+>/g, "" );
            content    =  `${name}:contains(${str})`;
            type       = 1;
            break;
        case "/":
            content    = value.replace( /^\/|\/$/g, "" ).replace( /\\{2}/g, "\\" ).replace( /'/g, '"' );
            type       = 2;
            break;
        case "[":
            value      = value.replace( /^{|}$/g, "" );
            content    = ( v=>new Function( `return ${v}` )() )(value)[0];
            type       = 3;
            break;
        default:
            console.error( "Not support current action.", content )
            type       = -1;
            break;
    }
    return [ content, type ];
}

export {
    clone,
    getURI,
    getLocation,
    verifyHtml,
    selector,
    specTest,
    specAction
}