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

function annotate() {
    const dtd = $.Deferred();
    $( "html" ).one( "mouseup", event => {
        let userSelection;
        if ( window.getSelection ) {
            userSelection = window.getSelection();
        } else if ( document.selection ) {
            userSelection = document.selection.createRange();
        }
        let selectedText = userSelection;
        if (userSelection.text) selectedText = userSelection.text;

        if ( selectedText != '' ) {
            selectedText = "" + selectedText + "";
            window.getSelection().removeAllRanges();
            dtd.resolve( selectedText );
        }
    });
    return dtd;
}

export {
    start as Start,
    annotate as Annotate,
}