console.log( "=== simpread focus load ===" );

var focus = ( function () {

    var $parent,
        focuscls   = "ks-simpread-focus",
        focusstyle = "z-index: 2147483647; overflow: visible; position: relative;",
        maskcls    = "ks-simpread-mask",
        maskstyle  = "z-index: auto; opacity: 1; overflow: visible; transform: none; animation: none; position: relative;",
        bgcls      = "ks-simpread-bg",
        bgtmpl     = "<div class=" + bgcls + "></div>",
        bgclsjq    = "." + bgcls;

    function Focus() {}

    /*
        Add focus mode
    */
    Focus.prototype.Init = function( $target ) {
        console.log( "=== simpread focus add ===" );
        this.constructor.prototype.$target = $target;
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
        fcontrol.Init( bgclsjq );

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
            while ( tag.toLowerCase() != "body" ) {
                focusStyle( $parent, maskstyle, maskcls, "delete" );
                $parent = $parent.parent();
                tag     = $parent[0].tagName;
            }

            console.log( "=== simpread focus remove ===" );
        });

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