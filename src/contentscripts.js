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
        sel, range, node, tag,
        maskstyle  = "z-index: auto; opacity: 1; overflow: visible; transform: none; animation: none; position: relative;",
        focusstyle = "z-index: 2147483647; overflow: visible; position: relative;";

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
    focusStyle( $focus, focusstyle, "ks-simpread-focus", "add" );

    // add ks-simpread-mask
    $parent = $focus.parent();
    tag     = $parent[0].tagName;
    while ( tag.toLowerCase() != "body" ) {
        focusStyle( $parent, maskstyle, "ks-simpread-mask", "add" );
        $parent = $parent.parent();
        tag     = $parent[0].tagName;
    }

    // background mask
    $( "body" ).append( '<div class="ks-simpread-bg"></div>' )

    // click mask remove it
    $( ".ks-simpread-bg" ).one( "click", function( event ) {
        //$focus.removeClass( "ks-simpread-focus" );
        focusStyle( $focus, focusstyle, "ks-simpread-focus", "delete" );
        $( ".ks-simpread-bg" ).remove();

        // remove ks-simpread-mask
        $parent = $focus.parent();
        tag     = $parent[0].tagName;
        while ( tag.toLowerCase() != "body" ) {
            focusStyle( $parent, maskstyle, "ks-simpread-mask", "delete" );
            $parent = $parent.parent();
            tag     = $parent[0].tagName;
        }
    });

    return false;
}

/*
    Set focus style
    @param $target: jquery object
    @param style  : set style string
    @param cls    : set class string
    @param type   : include 'add' and 'delete'
*/
function focusStyle( $target, style, cls, type ) {
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