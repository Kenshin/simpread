console.log( "=== simpread util load ===" )

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

export {
    verifyHtml      as verifyHtml,
}