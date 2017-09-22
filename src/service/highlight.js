console.log( "=== simpread highlight load ===" )

const highlight_class = "simpread-highlight-selector";

/**
 * Highlight
 * 
 * @return {promise} promise
 */
function start() {
    let $prev;
    const dtd            = $.Deferred(),
          mousemoveEvent = event => {
            if ( !$prev ) {
                $( event.target ).addClass( highlight_class );
            } else {
                $prev.removeClass( highlight_class );
                $( event.target ).addClass( highlight_class );
            }
            $prev = $( event.target );
    };
    $( "body" ).one( "click", event => {
        $( event.target ).removeClass( highlight_class );
        $( "body"       ).off( "mousemove", mousemoveEvent );
        dtd.resolve( event.target );
    });
    $( "body" ).on( "mousemove", mousemoveEvent );
    return dtd;
}

export {
    start as Start,
}