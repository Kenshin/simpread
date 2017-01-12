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
        tag  = getSelector( exclude[i] );
        if ( tag ) tags.push( tag )
    }
    if ( type == "delete" )   $target.find( tags.join(",") ).hide();
    else if ( type == "add" ) $target.find( tags.join(",") ).show();
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

export {
    includeStyle as include,
    excludeStyle as exclude,
    getSelector  as selector
}