console.log( "=== simpread keyboard ===" )

import Mousetrap   from 'mousetrap';

import {browser}   from 'browser';
import * as msg    from 'message';

let   $root, current_mode, links = [];
const trigger = "s r";

Mousetrap.bind( "esc", ( event, combo ) => {
    if ( current_mode == "open_links" ) {
        removeOpenLink();
    }
});

Mousetrap.bind( trigger + " f", ( event, combo ) => {
    task( combo.replace( trigger, "" ).trim());
});

function render( $target ) {
    $root = $target;
}

function task( key ) {
    switch ( key ) {
        case "f":
            openLink();
            break;
    }
}

function openLink() {
    links = [];
    const charts  = [ "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z" ],
          getName = idx => {
              return idx <= 26 ? charts[idx] : charts[idx[0]] + charts[idx[1]];
          };
    $root.find( "a" ).map( ( idx, item ) => {
        const key = getName( idx + "" );
        $(item).addClass( "sr-kbd-a" ).append( `<sr-kbd id=${key}>${key}</sr-kbd>` );
        links.push( key.toLowerCase() );
        current_mode = "open_links";
    });
    links.length > 0 && 
    Mousetrap.bind( links, ( event, combo ) => {
        console.log( combo, links, current_mode )
        const $target = $root.find( `sr-kbd[id=${combo.toUpperCase()}]` );
        if ( $target && $target.is( "sr-kbd" ) ) {
            const url = $target.parent()[0].href;
            url && url.startsWith( "http" ) && browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url } ));
            url && url.startsWith( "http" ) && removeOpenLink();
        }
    });
}

function removeOpenLink() {
    $( "sr-kbd" ).remove();
    $root.find( "a" ).removeClass( "sr-kbd-a" );
    Mousetrap.unbind( links );
    links        = [];
    current_mode = "";
}

export {
    $root,
    render as Render,
}