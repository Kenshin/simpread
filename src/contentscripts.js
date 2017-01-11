console.log( "=== simpread contentscripts load ===" )

/*
    import css files
*/
require( "./assets/css/simpread.css" );
require( "./vender/notify/notify.css" );

/*
    Golbal jQuery variable
*/
var $         = require( "jquery" ),
    Mousetrap = require( "mousetrap" ),
    Notify    = require( "notify"  ),
    focus     = require( "focus"   ).focus,
    selector  = require( "focus"   ).getSelector,
    storage   = require( "storage" ).storage,
    mode      = require( "storage" ).STORAGE_MODE,
    read      = require( "read"    );

/**
 * Sevice:storage Get data form chrome storage
 */
storage.Get( function() { bindShortcuts(); });

/**
 * Message request listener, message include: `focus` `shortcuts`
 */
chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    console.log( request );
    switch ( request.type ) {
        case "focus":
            focuseMode();
            break;
        case "read":
            readMode();
            break;
        case "shortcuts":
            bindShortcuts();
            break;
        default:
            console.error( "misinformation message ", request )
            break;
    }
});

/**
 * Keyboard event handler 
 */
function bindShortcuts() {
    Mousetrap.bind( [ storage.focus.shortcuts.toLowerCase() ], focuseMode );
    Mousetrap.bind( [ storage.read.shortcuts.toLowerCase()  ], readMode   );
}

/**
 * Focus mode
 */
function focuseMode() {
    console.log( "=== simpread focus mode active ===" )

    var $focus = [],
        sel, range, node, tag,
        target;

    if ( read.Exist(false) ) {
        new Notify().Render( 1, "请先退出阅读模式，才能进入聚焦模式。" );
        return;
    }

    if ( storage.VerifyCur( mode.focus ) ) {
         storage.Setcur( mode.focus );
    }
    target = selector( storage.current.site.include );

    // uniqueness verification
    if ( focus.Exist(true) ) return;

    // get tag from chrome storage
    if ( target ) $focus = $( "body" ).find( target );

    // get focus tag
    while ( $focus.length == 0 ) {
        if ( $( "body" ).find( "article" ).length > 0 ) {
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
    }

    // add focus mode
    focus.Render( fixFocus( $focus ), storage.current.site.exclude, storage.current.bgcolor );
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

/**
 * Read mode
 */
function readMode() {
    console.log( "=== simpread read mode active ===" )

    if ( focus.Exist(false) ) {
        new Notify().Render( 1, "请先退出聚焦模式，才能进入阅读模式。" );
        return;
    }

    if ( storage.VerifyCur( mode.read ) ) {
        storage.Setcur( mode.read );
    }

    if ( storage.current.site.name === "" ) {
        new Notify().Render( 1, "当前页面没有适配，如需要请自行添加。" );
        //TO-DO
        return;
    }

    if ( read.Exist(true) ) return;

    read.Render();
}