console.log( "=== simpread focus controlbar load ===" )

/*
    import
*/
var setting  = require( "foucsetting" ),
    fcontrol = ( function() {
    var timer,
        template = '<div class="ks-simpread-constrolbar">\
                        <ul>\
                            <li><span class="topicon"></span></li>\
                            <li><span class="settingicon"></span></li>\
                            <li><span class="closeicon"></span></li>\
                        </ul>\
                    </div>';

    function FControl() {
        this.$parent = null;
        this.$target = null;
    }

    /*
        Add focus constrol bar
    */
    FControl.prototype.Render = function( root ) {
        console.log( "=== simpread focus controlbar add ===" );
        this.$parent = $(root);
        $( root ).append( template );
        this.$target = $( ".ks-simpread-constrolbar" ).find( "span" );
        addEventHandler( this.$target, root );
    }

    /*
        Remove focus constrol bar
    */
    FControl.prototype.Remove = function() {
        console.log( "=== simpread focus controlbar remove ===" );
        this.$target.off( "click" );
        this.$target.remove();
    }

    /*
        Add focus constrol bar event
    */
    function addEventHandler( $target, root ) {
        $target.click( function( event) {
            switch ( $(event.currentTarget).attr( "class" ) ) {
                case "topicon":
                    console.log("==== focus control top active ====")
                    moveTop();
                    break;
                case "settingicon":
                    console.log("==== focus control setting active ====")
                    setting.Render();
                    break;
                case "closeicon":
                    console.log("==== focus control close active ====")
                    $(root).click();
                    break;
            }
        });
        /*$( document ).scroll( function( event ) {
            var osTop = document.body.scrollTop;
            if ( osTop >= document.documentElement.clientHeight ) {
                $target.find( "span" ).hide();
            }else{
                $target.find( "span" ).show();
            }
            if( !isTop ) {
                clearInterval( timer );
            }
            isTop = false;
        });*/
    }

    /*
        Move top
    */
    function moveTop() {
        timer = setInterval( function() {
            var osTop = document.body.scrollTop;
            var speed = Math.floor( -osTop / 3 );
            document.body.scrollTop = osTop + speed;
            if( osTop == 0 ) {
                clearInterval( timer );
            }
        }, 30 );
    }

    return new FControl();
})();

module.exports = fcontrol;