console.log( "=== simpread focus controlbar load ===" )

var fcontrol = ( function() {
    var $target;

    function FControl() {}

    /*
        Add focus constrol bar
    */
    FControl.prototype.Init = function( root ) {
        var me = this;
        $.get( chrome.extension.getURL( "/focus/template.html" ), function( tmpl ) {
            me.constructor.prototype.$root = $(root);
            $( root ).append( tmpl );
                $target = $( ".ks-simpread-constrolbar" ).find( "span" );
                addStyle();
                addEventHandler();
        });
    }

    /*
        Remove focus constrol bar
    */
    FControl.prototype.Remove = function() {
        $target.off( "click" );
        $target.remove();
    }

    /*
        Add focus constrol bar style
    */
    function addStyle() {
        var path = chrome.extension.getURL("/");
        $($target[0]).attr( "style", "background-image:url(" + path + "assets/images/top.png)"     );
        $($target[1]).attr( "style", "background-image:url(" + path + "assets/images/setting.png)" );
        $($target[2]).attr( "style", "background-image:url(" + path + "assets/images/close.png)"   );
    }

    /*
        Add focus constrol bar event
    */
    function addEventHandler() {
        $target.click( function( event) {
            switch ( $(event.currentTarget).attr( "class" ) ) {
                case "topicon":
                    console.log("111")
                    break;
                case "settingicon":
                    console.log("222")
                    break;
                case "closeicon":
                    console.log("333")
                    FControl.prototype.$root.click();
                    break;
            }
        })
    }

    return new FControl();
})();
