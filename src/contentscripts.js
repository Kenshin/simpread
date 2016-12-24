console.log( "=== simpread contentscripts load ===" )

/*
    Golbal jQuery variable
*/
var $ = require( "jquery" );

// import Mousetrap
var Mousetrap = require( "mousetrap" );

// import notify css file
require( "./common/notify.css" );
var Notify = require( "notify" );

/*
    import focus from ./focus/focus.js
*/
var focus = require( "focus" );

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
    Focus mode
*/
function focuseMode() {
    console.log( "=== simpread focus mode active ===" )

    var $focus,
        sel, range, node, tag;

    // Uniqueness verification
    if ( !focus.Verify() ) return;

    // get focus tag
    if ( $( "body" ).find( "article" ).length > 0 ) {
        // find article tag
        $focus = $( "body" ).find( "article" );
    }
    else {
        // focus
        try {
            sel    = window.getSelection();
            range  = sel.getRangeAt( sel.rangeCount - 1 );
            node   = range.startContainer.nodeName;
        if ( node.toLowerCase() === "body" ) throw( "selection area is body tag." );
            $focus = $( range.startContainer.parentNode );
        } catch ( error ) {
            console.log( sel, range, node )
            console.error( error )
            new Notify().Render( 1, "当前并未获取任何正文，请重新选取。" );
            return;
        }
    }

    // add focus mode
    focus.Render( fixFocus( $focus ));
}

/*
    Fix $focus get bad tag, include: p, span, section
    good tag include: div, article
 */
function fixFocus( $focus ) {
    var tag = $focus[0].tagName.toLowerCase();
    while ( 
        ( tag === "p"      ) ||
        ( tag === "span"   ) ||
        ( tag === "strong" ) ||
        ( tag === "ul"     ) ||
        ( tag === "li"     ) ||
        ( tag === "pre"    ) ||
        ( tag === "section" )
        ) {
            $focus = $focus.parent();
            tag    = $focus[0].tagName.toLowerCase();
    }
    return $focus;
}