console.log( "=== simpread focus controlbar load ===" )

/*
    import
*/
var setting  = require( "foucsetting" ),
    fcontrol = ( function() {
    var timer,
        template = '<sr-focus-ctl>\
                        <sr-ul>\
                            <sr-li><sr-span class="topicon"></sr-span></sr-li>\
                            <sr-li><sr-span class="settingicon"></sr-span></sr-li>\
                            <sr-li><sr-span class="closeicon"></sr-span></sr-li>\
                        </sr-ul>\
                    </sr-focus-ctl>';

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
        this.$target = $( "sr-focus-ctl" ).find( "sr-span" );
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
        Open focus constrol bar item
    */
    FControl.prototype.Click = function( type ) {
        if ( type == "setting" ) {
            $(this.$target[1]).click();
        }
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

    return new FControl();
})();

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

module.exports = fcontrol;