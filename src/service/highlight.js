console.log( "=== simpread highlight load ===" )

const highlight_class = "simpread-highlight-selector";

/**
 * Highlight
 * 
 * @return {promise} promise
 */
function start() {
    let $prev;
    const dtd            = $.Deferred(),
          mousemoveEvent = event => {
            if ( !$prev ) {
                $( event.target ).addClass( highlight_class );
            } else {
                $prev.removeClass( highlight_class );
                $( event.target ).addClass( highlight_class );
            }
            $prev = $( event.target );
    };
    $( "html" ).one( "click", event => {
        if ( !$prev ) return;
        $( event.target ).removeClass( highlight_class );
        $( "html"       ).off( "mousemove", mousemoveEvent );
        $prev = undefined;
        dtd.resolve( event.target );
        return false;
    });
    $( "html" ).one( "keydown", event => {
        if ( event.keyCode == 27 && $prev ) {
            $( "html" ).find( `.${highlight_class}` ).removeClass( highlight_class );
            $( "html" ).off( "mousemove", mousemoveEvent );
            $prev = undefined;
            event.preventDefault();
            return false;
        }
    });
    $( "html" ).on( "mousemove", mousemoveEvent );
    return dtd;
}

/**
 * Multi Highlight
 * 
 * @return {func} callback
 */
function multi( callback ) {
    let $prev;
    const mousemoveEvent = event => {
            if ( !$prev ) {
                $( event.target ).addClass( highlight_class );
            } else {
                $prev.removeClass( highlight_class );
                $( event.target ).addClass( highlight_class );
            }
            $prev = $( event.target );
    },
    removeDomHander = event => {
        callback( event.target );
        return false;
    };
    $( "html" ).on( "click", removeDomHander );
    $( "html" ).on( "keydown", event => {
        if ( event.keyCode == 27 && $prev ) {
            $( "html" ).find( `.${highlight_class}` ).removeClass( highlight_class );
            $( "html" ).off( "mousemove", mousemoveEvent );
            $( "html" ).off( "click", removeDomHander );
            $prev = undefined;
            event.preventDefault();
            return false;
        }
    });
    $( "html" ).on( "mousemove", mousemoveEvent );
}

function annotate() {
    const dtd = $.Deferred();
    $( "html" ).one( "mouseup", event => {
        let userSelection;
        if ( window.getSelection ) {
            userSelection = window.getSelection();
        } else if ( document.selection ) {
            userSelection = document.selection.createRange();
        }
        let selectedText = userSelection;
        if (userSelection.text) selectedText = userSelection.text;

        if ( selectedText != '' ) {
            selectedText = "" + selectedText + "";
            window.getSelection().removeAllRanges();
            dtd.resolve( selectedText );
        }
    });
    return dtd;
}

/**
 * Highlight and controlbar
 * 
 * @param {element} dom 
 */
function controlbar( dom ) {
    let $target = $( dom );
    const dtd  = $.Deferred(),
          tmpl = `<sr-highlight-group>
                        <sr-highlight-ctl class="add"><svg t="1560496884701" viewBox="0 0 1024 1024" version="1.1" width="15" height="15"><defs><style type="text/css"></style></defs><path d="M876.089 439.182h-291.271v-291.271c0-40.268-32.549-72.818-72.818-72.818s-72.818 32.549-72.818 72.818v291.271h-291.271c-40.268 0-72.818 32.549-72.818 72.818s32.549 72.818 72.818 72.818h291.271v291.271c0 40.268 32.549 72.818 72.818 72.818s72.818-32.549 72.818-72.818v-291.271h291.271c40.268 0 72.818-32.549 72.818-72.818s-32.549-72.818-72.818-72.818z" p-id="1998" fill="#ffffff"></path></svg></sr-highlight-ctl>
                        <sr-highlight-ctl class="sub"><svg t="1560496679351" viewBox="0 0 1024 1024" version="1.1" width="15" height="15"><defs><style type="text/css"></style></defs><path d="M127.289058 490.154459l0 43.770899c0 32.338522 27.009144 57.108672 58.774615 58.734706 0 0 132.448568 13.021571 325.936327 13.021571s325.936327-13.021571 325.936327-13.021571c31.765471-1.626034 58.774615-26.396183 58.774615-58.734706l0-43.770899c0-32.338522-26.51591-57.068763-58.774615-58.734706 0 0-128.005372-12.005428-325.942467-12.005428s-325.930187 12.005428-325.930187 12.005428C153.804968 433.085696 127.289058 457.815937 127.289058 490.154459z" p-id="3204" fill="#ffffff"></path></svg></sr-highlight-ctl>
                        <sr-highlight-ctl class="done"><svg t="1560496955945" viewBox="0 0 1024 1024" version="1.1" width="15" height="15"><defs><style type="text/css"></style></defs><path d="M416.832 798.08C400.64 798.08 384.512 791.872 372.16 779.52L119.424 525.76C94.784 500.992 94.784 460.8 119.424 436.032 144.128 411.264 184.128 411.264 208.768 436.032L416.832 644.928 814.4 245.76C839.04 220.928 879.04 220.928 903.744 245.76 928.384 270.528 928.384 310.656 903.744 335.424L461.504 779.52C449.152 791.872 432.96 798.08 416.832 798.08Z" p-id="1755" fill="#ffffff"></path></svg></sr-highlight-ctl>
                        <sr-highlight-ctl class="none"><svg t="1560499513561" viewBox="0 0 1024 1024" version="1.1" width="15" height="15"><defs><style type="text/css"></style></defs><path d="M649.179 512l212.839-212.84c37.881-37.881 37.881-99.298 0-137.179s-99.298-37.881-137.179 0L512 374.821l-212.839-212.84c-37.881-37.881-99.298-37.881-137.179 0s-37.881 99.298 0 137.179L374.821 512 161.982 724.84c-37.881 37.881-37.881 99.297 0 137.179 18.94 18.94 43.765 28.41 68.589 28.41 24.825 0 49.649-9.47 68.589-28.41L512 649.179l212.839 212.84c18.94 18.94 43.765 28.41 68.589 28.41s49.649-9.47 68.59-28.41c37.881-37.882 37.881-99.298 0-137.179L649.179 512z" p-id="1990" fill="#ffffff"></path></svg></sr-highlight-ctl>
                        <sr-highlight-ctl class="help"><svg t="1560573280563" viewBox="0 0 1024 1024" version="1.1" width="15" height="15"><defs><style type="text/css"></style></defs><path d="M512 958.326255c247.255337 0 447.696462-200.441125 447.696462-447.696462s-200.441125-447.696462-447.696462-447.696462-447.696462 200.441125-447.696462 447.696462S264.74364 958.326255 512 958.326255zM512 217.681788c35.32146 0 63.956637 28.635177 63.956637 63.956637 0 35.323507-28.635177 63.956637-63.956637 63.956637s-63.956637-28.633131-63.956637-63.956637C448.043363 246.316965 476.67854 217.681788 512 217.681788zM448.043363 510.629793c0-35.32146 28.635177-63.956637 63.956637-63.956637s63.956637 28.635177 63.956637 63.956637l0 223.848231c0 35.323507-28.635177 63.956637-63.956637 63.956637s-63.956637-28.633131-63.956637-63.956637L448.043363 510.629793z" p-id="1979" fill="#ffffff"></path></svg></sr-highlight-ctl>
                  </sr-highlight-group>`;
    $target.addClass( "simpread-highlight-controlbar" ).prepend( tmpl );
    $target.find( "sr-highlight-ctl" ).on( "click", event => {
        const cls = $( event.currentTarget ).attr( "class" );
        if ( cls == "add" ) {
            $target.removeClass( "simpread-highlight-controlbar" );
            $target = $target.parent();
            $target.addClass( "simpread-highlight-controlbar" );
        } else if ( cls == "sub" ) {
            $target.removeClass( "simpread-highlight-controlbar" );
            $target = $($target.children()[0]);
            $target.addClass( "simpread-highlight-controlbar" );
        } else if ( cls == "none" ) {
            $target.removeClass( "simpread-highlight-controlbar" );
            $( "sr-highlight-group" ).remove();
        } else if ( cls == "help" ) {
            const $a = $( `<a style="display:none" target="_blank" href="http://ksria.com/simpread/docs/#/手动框选"></a>` ).appendTo( "body" );
            $a[0].click();
            $a.remove();
        } else {
            $target.removeClass( "simpread-highlight-controlbar" );
            $( "sr-highlight-group" ).remove();
            dtd.resolve( $target[0] );
        }
    });
    return dtd;
}

export {
    start as Start,
    multi as Multi,
    annotate as Annotate,
    controlbar as Control,
}