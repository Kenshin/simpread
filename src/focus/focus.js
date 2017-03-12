console.log( "=== simpread focus load ===" );

var util     = require( "util" ),
    fcontrol = require( "controlbar" ),
    tooltip  = require( "tooltip" ),
    waves    = require( "waves" ),
    focus    = ( function () {

    var $parent,
        tag,
        focuscls   = "ks-simpread-focus",
        focusstyle = "z-index: 2147483646; overflow: visible; position: relative;",
        maskcls    = "ks-simpread-mask",
        maskstyle  = "z-index: auto; opacity: 1; overflow: visible; transform: none; animation: none; position: relative;",
        bgcls      = "simpread-focus-root",
        bgtmpl     = "<div class=" + bgcls + "></div>",
        bgclsjq    = "." + bgcls;

    function Focus() { this.$target = null; }

    /**
     * Add focus mode
     * 
     * @param {jquery} jquery object
     * @param {array}  exclude html array
     * @param {string} background color style
     */
    Focus.prototype.Render = function( $target, exclude, bgcolor ) {
        console.log( "=== simpread focus add ===" );
        this.$target = $target;

        // set include style
        includeStyle( $target, focusstyle, focuscls, "add" );

        // set exclude style
        excludeStyle( $target, exclude, "delete" );

        // add ks-simpread-mask
        $parent = $target.parent();
        tag     = $parent[0].tagName;
        while ( tag.toLowerCase() != "body" ) {
            includeStyle( $parent, maskstyle, maskcls, "add" );
            $parent = $parent.parent();
            tag     = $parent[0].tagName;
        }

        // add background
        $( "body" ).append( bgtmpl );

        // add background color
        $( bgclsjq ).css({ "background-color" : bgcolor });

        // add control bar
        fcontrol.Render( bgclsjq );

        // add tooltip and waves
        tooltip.Render( bgclsjq );
        waves.Render({ root: bgcls, name: "sr-fab" });

        // click mask remove it
        $( bgclsjq ).on( "click", function( event ) {
            if ( $( event.target ).attr("class") != bgcls ) return;

            // remove include style
            includeStyle( $target, focusstyle, focuscls, "delete" );

            // remove exclude style
            excludeStyle( $target, exclude, "add" );

            // remove tooltip
            tooltip.Exit( bgclsjq );

            // remove background
            $( bgclsjq ).off( "click" );
            $( bgclsjq ).remove();

            // remove ks-simpread-mask style
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
     * Verify exit
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
     * Get focus
     * 
     * @param {string} storage.current.site.include
     * @return {jquery} focus jquery object or undefined
     */
    Focus.prototype.GetFocus = function( include ) {
        var $focus = [],
            sel, range, node, tag,
            target;
        target = util.selector( include );
        if ( util.specTest( target) ) {
            var value = util.specAction( include )[0];
            $focus = $( "body" ).find( value );
        } else if ( target ) {
            $focus = $( "body" ).find( target );
        }
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
                    return undefined;
                }
            }
        }
        return fixFocus( $focus );
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

/**
 * Set exclude style
 * 
 * @param {jquery} jquery object
 * @param {array}  hidden html
 * @param {string} include: 'add' 'delete'
 */
function excludeStyle( $target, exclude, type ) {
    const tags = util.exclude( $target, exclude );
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