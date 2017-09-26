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
        $prev = undefined;
        dtd.resolve( event.target );
    });
    $( "body" ).one( "keydown", event => {
        if ( event.keyCode == 27 && $prev ) {
            $( event.target ).find( `.${highlight_class}` ).removeClass( highlight_class );
            $( "body"       ).off( "mousemove", mousemoveEvent );
            $prev = undefined;
        }
    });
    $( "body" ).on( "mousemove", mousemoveEvent );
    return dtd;
}

export {
    start as Start,
}