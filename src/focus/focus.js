console.log( "=== simpread focus load ===" );

/*
    import
*/
var fcontrol = require( "controlbar" ),
    focus    = ( function () {

    var $parent,
        tag,
        focuscls   = "ks-simpread-focus",
        focusstyle = "z-index: 2147483646; overflow: visible; position: relative;",
        maskcls    = "ks-simpread-mask",
        maskstyle  = "z-index: auto; opacity: 1; overflow: visible; transform: none; animation: none; position: relative;",
        bgcls      = "ks-simpread-bg",
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

        // click mask remove it
        $( bgclsjq ).on( "click", function( event ) {
            if ( $( event.target ).attr("class") != bgcls ) return;

            // remove include style
            includeStyle( $target, focusstyle, focuscls, "delete" );

            // remove exclude style
            excludeStyle( $target, exclude, "add" );

            // remove control bar
            fcontrol.Remove();

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

    /*
        Verify ks-simpread-focus tag exit
    */
    Focus.prototype.Exist = function() {
        if ( $( "body" ).find( "." + focuscls ).length > 0 ) {
            fcontrol.Click( "setting" );
            return true;
        } else {
            return false;
        }
    }

    return new Focus();

})();

/*
    Set include style
    @param $target: jquery object
    @param style  : set style string
    @param cls    : set class string
    @param type   : include 'add' and 'delete'
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
    var i = 0, len = exclude.length, sel = "", tags = [], tag = "";
    for ( i; i < len; i++ ) {
        tag  = getSelector( exclude[i] );
        if ( tag ) tags.push( tag )
    }
    if ( type == "delete" )   $target.find( tags.join(",") ).hide();
    else if ( type == "add" ) $target.find( tags.join(",") ).show();
}

/**
 * Conver html to jquery object
 * 
 * @param  {string} input include html tag, e.g.:
    <div class="article fmt article__content">
 *
 * @return {array} formatting e.g.:
    { "tag" : "class", "name" : "article" }
 * 
 */
function getSelector( html ) {
    const item = html.match( / (class|id)=("|')[\w-_]+/ig );
    if ( item && item.length > 0 ) {
        let [tag, name] = item[0].trim().replace( /'|"/ig, "" ).split( "=" );
        if      ( tag.toLowerCase() === "class") name = `.${name}`;
        else if ( tag.toLowerCase() === "id"   ) name = `#${name}`;
        return name;
    } else {
        return null;
    }
}

exports.focus       = focus;
exports.getSelector = getSelector;