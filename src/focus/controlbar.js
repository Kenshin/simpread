console.log( "=== simpread focus controlbar load ===" )

var fcontrol = ( function() {
    var $target,
        template = '<div class="ks-simpread-constrolbar">\
                        <ul>\
                            <li><span class="topicon"></span></li>\
                            <li><span class="settingicon"></span></li>\
                            <li><span class="closeicon"></span></li>\
                        </ul>\
                    </div>';

    function FControl() {}

    /*
        Add focus constrol bar
    */
    FControl.prototype.Init = function( root ) {
        console.log( "=== simpread focus controlbar add ===" );
        this.constructor.prototype.$root = $(root);
        $( root ).append( template );
        $target = $( ".ks-simpread-constrolbar" ).find( "span" );
        addStyle();
        addEventHandler();
    }

    /*
        Remove focus constrol bar
    */
    FControl.prototype.Remove = function() {
        console.log( "=== simpread focus controlbar remove ===" );
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
                    console.log("==== focus control top active ====")
                    break;
                case "settingicon":
                    console.log("==== focus control setting active ====")
                    break;
                case "closeicon":
                    console.log("==== focus control close active ====")
                    FControl.prototype.$root.click();
                    break;
            }
        })
    }

    return new FControl();
})();
