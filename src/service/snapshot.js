console.log( "=== simpread snapshot load ===" )

let startPos, endPos, dragStart = false, position;

function start() {
    const dtd = $.Deferred();
    dragStart = false;
    $( ".simpread-read-root" ).append( `<sr-snapshot><sr-mask></sr-mask></sr-snapshot>` );
    $( "sr-snapshot" )
        .on( "mousemove", event => {
            if ( dragStart == false ) {
                $( event.currentTarget ).css({ left: event.clientX, top: event.clientY });
            } else {
                endPos   = { left: event.clientX, top: event.clientY };
                position = {
                    left  : startPos.left,
                    top   : startPos.top,
                    width : endPos.left - startPos.left,
                    height: endPos.top  - startPos.top,
                }
                $( event.currentTarget ).addClass( "active" ).find( "sr-mask" ).css( position );
            }
        })
        .on( "mousedown", event => {
            startPos  = { left: event.clientX, top: event.clientY };
            $( event.currentTarget ).removeAttr( "style" );
            dragStart = true;
        })
        .on( "mouseup", event =>{
            dragStart = false;
            dtd.resolve( position );
        });
    return dtd;
}

export {
    start as Start,
}