console.log( "=== simpread keyboard ===" )

import Mousetrap   from 'mousetrap';

import {browser}   from 'browser';
import * as msg    from 'message';

let   $root, current_mode, links = [];
const trigger = "s r",
      key     = [ "f", "?" ],
      global_keys = key.map( item => `${trigger} ${item}` );

/***********************
 * Entry: Render
 ***********************/

function render( $target ) {
    $root = $target;
}

/***********************
 * Golbal
 ***********************/

Mousetrap.bind( "esc", ( event, combo ) => {
    if ( current_mode == "open_links" ) {
        removeOpenLink();
    }
    return true;
});

Mousetrap.bind( global_keys, ( event, combo ) => {
    task( combo.replace( trigger, "" ).trim());
});

function task( key ) {
    switch ( key ) {
        case "f":
            openLink();
            break;
    }
}

/***********************
 * Task: Open link
 ***********************/

function openLink() {
    const charts  = [ "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z" ],
          getName = idx => {
              switch ( true ) {
                  case idx < 26:
                    return charts[idx];
                  case idx >= 26 && idx <= 99:
                    return charts[idx[0]] + charts[idx[1]];
                  case idx > 99:
                    return charts[idx[0]] + charts[idx[1]] + charts[idx[2]];
              }
          };
    $root.find( "a" ).map( ( idx, item ) => {
        const key = getName( idx + "" );
        $(item).addClass( "sr-kbd-a" ).append( `<sr-kbd id=${key}>${key}</sr-kbd>` );
        links.push( key.toLowerCase() );
        current_mode = "open_links";
    });
    links.length > 0 && $( "html" ).on( "keypress", openLinkEventHander );
}

function openLinkEventHander( event ) {
    const combo = event.key;
    if ( current_mode == "open_links" && links.includes( combo.toLowerCase() ) ) {
        const $target = $root.find( `sr-kbd[id=${combo.toUpperCase()}]` );
        if ( $target && $target.is( "sr-kbd" ) ) {
            const url = $target.parent()[0].href;
            url && url.startsWith( "http" ) && browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url } ));
            url && url.startsWith( "http" ) && removeOpenLink();
        }
    }
}

function removeOpenLink() {
    $( "sr-kbd" ).remove();
    $root.find( "a" ).removeClass( "sr-kbd-a" );
    $( "html" ).off( "keypress", openLinkEventHander );
    links        = [];
    current_mode = "";
}

/***********************
 * Export
 ***********************/

export {
    render as Render,
}