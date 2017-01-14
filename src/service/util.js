console.log( "=== simpread util load ===" )

/*
    Set include style
    @param $target: jquery object
    @param style  : set style string
    @param cls    : set class string
    @param type   : include 'add' and 'delete'
*/
function includeStyle( $target, style, cls, type ) {
    var bakstyle;
    if ( type === "add" ) {
        bakstyle = $target.attr( "style" ) == undefined ? "" : $target.attr( "style" );
        $target.attr( "style", bakstyle + style ).addClass( cls );
    } else if (  type === "delete" ) {
        bakstyle = $target.attr( "style" );
        bakstyle = bakstyle.replace( style, "" );
        $target.attr( "style", bakstyle ).removeClass( cls );
    }
}

/**
 * Set exclude style
 * 
 * @param {jquery} jquery object
 * @param {array}  hidden html
 * @param {string} include: 'add' 'delete'
 */
function excludeStyle( $target, exclude, type ) {
    var i = 0, len = exclude.length, sel = "", tags = [], tag = "";
    for ( i; i < len; i++ ) {
        const content = exclude[i];
        if ( specTest( content )) {
            tag = specAction( content );
        } else {
            tag = getSelector( content );
        }
        if ( tag ) tags.push( tag );
    }
    if ( type == "delete" )   $target.find( tags.join(",") ).addClass( "sr-rd-content-exclude" );
    else if ( type == "add" ) $target.find( tags.join(",") ).removeClass( "sr-rd-content-exclude" );
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
 *
 */
function getSelector( html ) {
    if ( specTest( html )) return html;
    const item = html.match( /<\S+ (class|id)=("|')[\w-_]+|<[^/]\S+>/ig );
    if ( item && item.length > 0 ) {
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
   - [[{juqery code}]] // new Function
   - [['text']]        // remove '<text>'
   - [[/regexp/]]      // regexp e.g. $("sr-rd-content").find( "*[src='http://ifanr-cdn.b0.upaiyun.com/wp-content/uploads/2016/09/AppSo-qrcode-signature.jpg']" )

 * 
 * @param  {string} verify content
 * @return {boolen} verify result
 */
function specTest( content ) {
    return /^(\[\[)[{'/]{1}[ \S]+[}'/]\]\]{1}($)/g.test( content );
}

/**
 * Exec special action, action include: @see specTest
 * 
 * @param  {string} content
 * @return {string} result
 */
function specAction( content ) {
    let value = content.replace( /(^)\[\[|\]\]$/g, "" );
    switch (value[0]) {
        case "{":
            value      = value.replace( /^{|}$/g, "" );
            content    = ( v=>new Function( `return ${v}` )() )(value);
            break;
        case "'":
            content    = value.replace( /^'|'$/g, "" );
            const name = content.match(/^<[a-zA-Z0-9_-]+>/g).join("").replace( /<|>/g, "" );
            const str  = content.replace( /<[/a-zA-Z0-9_-]+>/g, "" );
            content    =  `${name}:contains(${str})`;
            break;
        case "/":
            // *[src='http://ifanr-cdn.b0.upaiyun.com/wp-content/uploads/2016/09/AppSo-qrcode-signature.jpg']
            content    = value.replace( /^\/|\/$/g, "" ).replace( /\\{2}/g, "" );
            break;
        default:
            console.error( "Not support current action.", content )
            break;
    }
    return content;
}

export {
    includeStyle as include,
    excludeStyle as exclude,
    getSelector  as selector,
    specTest     as specTest,
    specAction   as specAction
}