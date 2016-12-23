console.log( "=== simpread focus load ===" );

var focus = ( function () {

    var $parent,
        tag,
        focuscls   = "ks-simpread-focus",
        focusstyle = "z-index: 2147483647; overflow: visible; position: relative;",
        maskcls    = "ks-simpread-mask",
        maskstyle  = "z-index: auto; opacity: 1; overflow: visible; transform: none; animation: none; position: relative;",
        bgcls      = "ks-simpread-bg",
        bgtmpl     = "<div class=" + bgcls + "></div>",
        bgclsjq    = "." + bgcls;

    function Focus() { this.$target = null; }

    /*
        Add focus mode
    */
    Focus.prototype.Render = function( $target ) {
        console.log( "=== simpread focus add ===" );
        this.$target = $target;
        // add focus
        focusStyle( $target, focusstyle, focuscls, "add" );

        // add ks-simpread-mask
        $parent = $target.parent();
        tag     = $parent[0].tagName;
        while ( tag.toLowerCase() != "body" ) {
            focusStyle( $parent, maskstyle, maskcls, "add" );
            $parent = $parent.parent();
            tag     = $parent[0].tagName;
        }

        // add background mask
        $( "body" ).append( bgtmpl );

        // add control bar
        fcontrol.Render( bgclsjq );

        // click mask remove it
        $( bgclsjq ).on( "click", function( event ) {
            if ( $( event.target ).attr("class") != bgcls ) return;

            // remove focus style
            focusStyle( $target, focusstyle, focuscls, "delete" );

            // remove control bar
            fcontrol.Remove();

            // remove background
            $( bgclsjq ).off( "click" );
            $( bgclsjq ).remove();

            // remove ks-simpread-mask style
            $parent = $target.parent();
            tag     = $parent[0].tagName;
            while ( tag && tag.toLowerCase() != "body" ) {
                focusStyle( $parent, maskstyle, maskcls, "delete" );
                $parent = $parent.parent();
                tag     = $parent[0].tagName;
            }

            console.log( "=== simpread focus remove ===" );
        });

    }

    /*
        Verify ks-simpread-focus tag exit
    */
    Focus.prototype.Verify = function() {
        if ( $( "body" ).find( "." + focuscls ).length > 0 ) {
            return false;
        } else {
            return true;
        }
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

    return new Focus();

})();