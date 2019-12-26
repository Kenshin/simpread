console.log( "=== simpread snapshot load ===" )

let dtd, startPos, endPos, dragStart = false, position;

function start() {
    dtd       = $.Deferred();
    dragStart = false;
    $( ".simpread-read-root" ).append( `<simpread-snapshot><sr-mask></sr-mask></simpread-snapshot>` );
    $( "simpread-snapshot" )
        .on( "mousemove", event => {
            if ( dragStart == false ) return;
            endPos       = { left: event.clientX, top: event.clientY };
            const width  = endPos.left - startPos.left,
                  height = endPos.top  - startPos.top;
            position     = {
                left  : width  >= 0 ? startPos.left : endPos.left,
                top   : height >= 0 ? startPos.top  : endPos.top,
                width : Math.abs( width ),
                height: Math.abs( height ),
            }
            $( event.currentTarget ).find( "sr-mask" ).css( position );
        })
        .on( "mousedown", event => {
            startPos  = { left: event.clientX, top: event.clientY };
            dragStart = true;
        })
        .on( "mouseup", event =>{
            dragStart = false;
            controlbar();
        });
    return dtd;
}

function remove() {
    $( ".simpread-read-root" ).find( "simpread-snapshot" ).remove();
}

function controlbar() {
    if ( $( "simpread-snapshot sr-highlight-ctl" ).length > 0 ) return;
    const html = `<sr-snapshot-ctlbar>
                    <sr-highlight-ctl class="done"><svg t="1560496955945" viewBox="0 0 1024 1024" version="1.1" width="15" height="15"><defs><style type="text/css"></style></defs><path d="M416.832 798.08C400.64 798.08 384.512 791.872 372.16 779.52L119.424 525.76C94.784 500.992 94.784 460.8 119.424 436.032 144.128 411.264 184.128 411.264 208.768 436.032L416.832 644.928 814.4 245.76C839.04 220.928 879.04 220.928 903.744 245.76 928.384 270.528 928.384 310.656 903.744 335.424L461.504 779.52C449.152 791.872 432.96 798.08 416.832 798.08Z" p-id="1755" fill="#ffffff"></path></svg></sr-highlight-ctl>
                    <sr-highlight-ctl class="none"><svg t="1560499513561" viewBox="0 0 1024 1024" version="1.1" width="15" height="15"><defs><style type="text/css"></style></defs><path d="M649.179 512l212.839-212.84c37.881-37.881 37.881-99.298 0-137.179s-99.298-37.881-137.179 0L512 374.821l-212.839-212.84c-37.881-37.881-99.298-37.881-137.179 0s-37.881 99.298 0 137.179L374.821 512 161.982 724.84c-37.881 37.881-37.881 99.297 0 137.179 18.94 18.94 43.765 28.41 68.589 28.41 24.825 0 49.649-9.47 68.589-28.41L512 649.179l212.839 212.84c18.94 18.94 43.765 28.41 68.589 28.41s49.649-9.47 68.59-28.41c37.881-37.882 37.881-99.298 0-137.179L649.179 512z" p-id="1990" fill="#ffffff"></path></svg></sr-highlight-ctl>
                    <sr-highlight-ctl class="help"><svg t="1560573280563" viewBox="0 0 1024 1024" version="1.1" width="15" height="15"><defs><style type="text/css"></style></defs><path d="M512 958.326255c247.255337 0 447.696462-200.441125 447.696462-447.696462s-200.441125-447.696462-447.696462-447.696462-447.696462 200.441125-447.696462 447.696462S264.74364 958.326255 512 958.326255zM512 217.681788c35.32146 0 63.956637 28.635177 63.956637 63.956637 0 35.323507-28.635177 63.956637-63.956637 63.956637s-63.956637-28.633131-63.956637-63.956637C448.043363 246.316965 476.67854 217.681788 512 217.681788zM448.043363 510.629793c0-35.32146 28.635177-63.956637 63.956637-63.956637s63.956637 28.635177 63.956637 63.956637l0 223.848231c0 35.323507-28.635177 63.956637-63.956637 63.956637s-63.956637-28.633131-63.956637-63.956637L448.043363 510.629793z" p-id="1979" fill="#ffffff"></path></svg></sr-highlight-ctl>
                  </sr-snapshot-ctlbar>`;
    $( "simpread-snapshot" ).append( html );
    $( "simpread-snapshot" ).on( "click", "sr-highlight-ctl", event => {
        const cls = $( event.currentTarget ).attr( "class" );
        if ( cls == "done" ) {
            dtd.resolve( position );
        } else if ( cls == "none" ) {
            remove();
        } else if ( cls == "help" ) {
            const $a = $( `<a style="display:none" target="_blank" href="http://ksria.com/simpread/docs/#/截图"></a>` ).appendTo( "body" );
            $a[0].click();
            $a.remove();
        }
    });
}

export {
    start  as Start,
    remove as End,
}