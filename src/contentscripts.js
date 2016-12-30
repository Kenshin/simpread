console.log( "=== simpread contentscripts load ===" )

/*
    import css files
*/
require( "./vender/notify/notify.css" );

/*
    Golbal jQuery variable
*/
var $         = require( "jquery" ),
    Mousetrap = require( "mousetrap" ),
    Notify    = require( "notify" ),
    focus     = require( "focus" ),
    storage   = require( "storage" ).storage,
    mode      = require( "storage" ).STORAGE_MODE,
    selector  = require( "storage" ).selector;

/**
 * Sevice:storage Get data form chrome storage
 */
storage.Get( function() {
    // keyboard event handler
    Mousetrap.bind( [ storage.focus.shortcuts.toLowerCase() ], focuseMode );
});

/**
 * Message request listener
 */
chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    console.log( request );
    focuseMode();
});

/**
 * Focus mode
 */
function focuseMode() {
    console.log( "=== simpread focus mode active ===" )

    var $focus,
        sel, range, node, tag,
        site   = storage.Getsite( mode.focus ),
        target = selector( site.html.include );

    // uniqueness verification
    if ( !focus.Verify() ) return;

    // get focus tag
    if ( target ) {
        // get tag from chrome storage
        $focus = $( "body" ).find( target );
    } else if ( $( "body" ).find( "article" ).length > 0 ) {
        // find article tag
        $focus = $( "body" ).find( "article" );
    }
    else {
        // auto get focus
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

/**
 * Fix $focus get bad tag, get good tag and return
 * Good tag include: div, article
 * 
 * @param  {jquery} jquery object
 * @return {jquery} jquery object
 */
function fixFocus( $focus ) {
    var tag = $focus[0].tagName.toLowerCase();
    while ( [ "p", "span", "strong", "ul", "li", "code", "pre", "pre" ].includes( tag )) {
            $focus = $focus.parent();
            tag    = $focus[0].tagName.toLowerCase();
    }
    return $focus;
}