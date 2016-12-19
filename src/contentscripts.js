console.log( "=== simpread init ===" )

/*
    keyboard event handler
*/
Mousetrap.bind([ "a s" ], focuseMode );

/*
    message request listener
*/
chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    console.log( request );
    focuseMode();
});

/*
    focus mode logic
*/
function focuseMode() {
    console.log( "=== simpread start ===" )

    var $focus, $parent,
        sel, range, node,
        tag, bakstyle,
        mask = "z-index: auto; opacity: 1; overflow: visible; transform: none; animation: none; position: relative;";

    // find article tag
    if ( $( "body" ).find( "article" ).length > 0 ) {
        $focus = $( "body" ).find( "article" );
    }
    else {
        // focus
        try {
            sel    = window.getSelection();
            range  = sel.getRangeAt( sel.rangeCount - 1 );
            node   = range.startContainer.nodeName;
        if ( node.toLowerCase() === "body" ) throw( "selection area is body tag." );
            $focus = $( range.startContainer.parentNode.parentNode );
        } catch ( error ) {
            // TO-DO notifcation
            console.log( sel, range, node )
            console.error( error )
            return;
        }
    }
    $focus.addClass( "ks-simpread-focus" );

    // add ks-simpread-mask
    $parent = $focus.parent();
    tag     = $parent[0].tagName;
    while ( tag.toLowerCase() != "body" ) {
        bakstyle = $parent.attr( "style" ) == undefined ? "" : $parent.attr( "style" );
        $parent.attr( "style", bakstyle + mask ).addClass("ks-simpread-mask");
        $parent = $parent.parent();
        tag     = $parent[0].tagName;
    }

    // background mask
    $( "body" ).append( '<div class="ks-simpread-bg"></div>' )

    // click mask remove it
    $( ".ks-simpread-bg" ).one( "click", function( event ) {
        $focus.removeClass( "ks-simpread-focus" );
        $( ".ks-simpread-bg" ).remove();

        // remove ks-simpread-mask
        $parent = $focus.parent();
        tag     = $parent[0].tagName;
        while ( tag.toLowerCase() != "body" ) {
            bakstyle = $parent.attr( "style" );
            bakstyle = bakstyle.replace( mask, "" );
            $parent.attr( "style", bakstyle ).removeClass( "ks-simpread-mask" );
            $parent = $parent.parent();
            tag     = $parent[0].tagName;
        }
    });

    return false;
}
