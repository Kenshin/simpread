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
    $( "html" ).one( "click", event => {
        if ( !$prev ) return;
        $( event.target ).removeClass( highlight_class );
        $( "html"       ).off( "mousemove", mousemoveEvent );
        $prev = undefined;
        dtd.resolve( event.target );
    });
    $( "html" ).one( "keydown", event => {
        if ( event.keyCode == 27 && $prev ) {
            $( "html" ).find( `.${highlight_class}` ).removeClass( highlight_class );
            $( "html" ).off( "mousemove", mousemoveEvent );
            $prev = undefined;
            event.preventDefault();
            return false;
        }
    });
    $( "html" ).on( "mousemove", mousemoveEvent );
    return dtd;
}

export {
    start as Start,
}