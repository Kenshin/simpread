console.log( "=== simpread focus load ===" );

var storage  = require( "storage" ).storage,
    util     = require( "util" ),
    highlight= require( "highlight"  ),
    fcontrol = require( "controlbar" ),
    tooltip  = require( "tooltip" ),
    waves    = require( "waves" ),
    browser  = require( "browser" ).browser,
    msg      = require( "message" ),
    focus    = ( function () {

    var $parent,
        tag,
        focuscls   = "simpread-focus-highlight",
        focusstyle = "z-index: 2147483646; overflow: visible; position: relative;",
        maskcls    = "simpread-focus-mask",
        maskstyle  = "z-index: auto; opacity: 1; overflow: visible; transform: none; animation: none; position: relative;",
        bgcls      = "simpread-focus-root",
        bgtmpl     = "<div class=" + bgcls + "></div>",
        ctrlbar    = "sr-controlbar-bg",
        ctrlbarbg  = "<div class=" + ctrlbar + "></div>",
        ctrlbarjq  = "." + ctrlbar,
        bgclsjq    = "." + bgcls;

    function Focus() { this.$target = null; }

    /**
     * Add focus mode
     * 
     * @param {jquery} jquery object
     * @param {string} background color style
     */
    Focus.prototype.Render = function( $target, bgcolor ) {
        console.log( "=== simpread focus add ===" );
        this.$target = $target;

        // set include style
        includeStyle( $target, focusstyle, focuscls, "add" );

        // set exclude style
        excludeStyle( $target, "delete" );

        // add simpread-focus-mask
        $parent = $target.parent();
        tag     = $parent[0].tagName;
        while ( tag.toLowerCase() != "body" ) {
            includeStyle( $parent, maskstyle, maskcls, "add" );
            $parent = $parent.parent();
            tag     = $parent[0].tagName;
        }

        // add background
        $( "body" ).append( bgtmpl );
        $( "html" ).append( ctrlbarbg );

        // add background color
        $( bgclsjq )
            .css({ "background-color" : bgcolor })
            .sreffect({ opacity: 1 });

        // add control bar
        fcontrol.Render( ctrlbarjq, bgclsjq, dom => {
            storage.pr.dom = dom;
            Focus.prototype.Render( $(dom), storage.current.bgcolor );
        });

        // add tooltip and waves
        tooltip.Render( bgclsjq );
        waves.Render({ root: bgclsjq });
        storage.Statistics( "focus" );
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.track, { eventCategory: "mode", eventAction: "focusmode", eventValue: "focusmode" }) );

        // click mask remove it
        $( bgclsjq ).on( "click", function( event, data ) {
            if ( ( event.target.tagName.toLowerCase() == "i" && event.target.id !="exit" ) ||
                $( event.currentTarget ).attr("class") != bgcls ||
                ( !storage.current.mask && !data )) return;
             $( bgclsjq ).sreffect({ opacity: 0 }, {
                 complete: ()=> {
                    includeStyle( $target, focusstyle, focuscls, "delete" );
                    excludeStyle( $target, "add" );
                    tooltip.Exit( bgclsjq );
                    $( ctrlbarjq ).remove();
                    $( bgclsjq   ).remove();
                    $( bgclsjq   ).off( "click" );
                }
             });

            // remove simpread-focus-mask style
            $parent = $target.parent();
            tag     = $parent[0].tagName;
            while ( tag && tag.toLowerCase() != "body" ) {
                includeStyle( $parent, maskstyle, maskcls, "delete" );
                $parent = $parent.parent();
                tag     = $parent[0].tagName;
            }

            console.log( "=== simpread focus remove ===" );
        });

    }

    /**
     * Get focus
     * 
     * @param {jquery} focus jquery object
     * @param {string} storage.current.site.include
     * @return {jquery} focus jquery object or undefined
     */
    Focus.prototype.GetFocus = function( $focus, include ) {
        var dtd    = $.Deferred(),
            sel, range, node, tag;
        if ( storage.current.highlight && $focus.length == 0 ) {
            new Notify().Render( "已启动手动聚焦模式，请移动鼠标进行选择，支持 ESC 退出。" );
            highlight.Start().done( result => {
                $focus = $( result );
                dtd.resolve( $focus );
            });
        } else {
            while ( $focus.length == 0 ) {
                if ( $( "body" ).find( "article" ).length > 0 ) {
                    $focus = $( "body" ).find( "article" );
                }
                else {
                    try {
                        sel    = window.getSelection();
                        range  = sel.getRangeAt( sel.rangeCount - 1 );
                        node   = range.startContainer.nodeName;
                    if ( node.toLowerCase() === "body" ) throw( "selection area is body tag." );
                        $focus = $( range.startContainer.parentNode );
                    } catch ( error ) {
                        console.log( sel, range, node )
                        console.error( error )
                        return dtd.reject();
                    }
                }
            }
            return dtd.resolve( $focus );
        }
        return dtd;
    }

    /**
     * Exist
     * 
     * @param  {boolean} when true, call fcontrol.Click()
     * @return {boolen} true: exist; false: not exist
     */
    Focus.prototype.Exist = function( action ) {
        if ( $( "body" ).find( "." + focuscls ).length > 0 ) {
            if (action) fcontrol.elem.onAction( undefined, "setting" );
            return true;
        } else {
            return false;
        }
    }

    /**
     * Exit
     */
    Focus.prototype.Exit = function() {
        $( bgclsjq ).trigger( "click", "okay" );
    }

    return new Focus();

})();

/**
 *  Set include style
 * 
 *  @param {jquery} jquery object
 *  @param {string} set style string
 *  @param {string} set class string
 *  @param {string} include 'add' and 'delete'
*/
function includeStyle( $target, style, cls, type ) {
    $target.each(function(index){
        var bakstyle;
        var selector = $(this);
        if ( type === "add" ) {
            bakstyle = selector.attr( "style" ) == undefined ? "" : selector.attr( "style" );
            selector.attr( "style", bakstyle + style ).addClass( cls );
        } else if (  type === "delete" ) {
            bakstyle = selector.attr( "style" );
            bakstyle = bakstyle.replace( style, "" );
            selector.attr( "style", bakstyle ).removeClass( cls );
        }
    });
}

/**
 * Set exclude style
 * 
 * @param {jquery} jquery object
 * @param {string} include: 'add' 'delete'
 */
function excludeStyle( $target, type ) {
    const tags = storage.pr.Exclude( $target );
    if ( type == "delete" )   $target.find( tags ).hide();
    else if ( type == "add" ) $target.find( tags ).show();
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

exports.focus       = focus;