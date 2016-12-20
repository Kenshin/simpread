console.log( "=== simpread focus controlbar load ===" )

var $root;

/*
    Add focus constrol bar
*/
function constrolbar() {
    $.get( chrome.extension.getURL( "/focus/template.html" ), function( tmpl ) {
        $( ".ks-simpread-bg" ).append( tmpl );
            $root = $( ".ks-simpread-constrolbar" ).find( "span" );
            addStyle();
            addEventHandle();
    });
}

/*
    Add focus constrol bar style
*/
function addStyle() {
    var path = chrome.extension.getURL("/");
    $($root[0]).attr( "style", "background-image:url(" + path + "assets/images/top.png)"     );
    $($root[1]).attr( "style", "background-image:url(" + path + "assets/images/setting.png)" );
    $($root[2]).attr( "style", "background-image:url(" + path + "assets/images/close.png)"   );
}

/*
    Add focus constrol bar event
*/
function addEventHandle() {
    $root.click( function( event) {
        switch ( $(event.currentTarget).attr( "class" ) ) {
            case "topicon":
                console.log("111")
                break;
            case "settingicon":
                console.log("222")
                break;
            case "closeicon":
                $(".ks-simpread-bg").click();
                $root.off( "click" );
                break;
        }
    })
}