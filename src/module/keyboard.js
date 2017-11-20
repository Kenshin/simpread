console.log( "=== simpread keyboard ===" )

import Mousetrap   from 'mousetrap';

import {browser}   from 'browser';
import * as msg    from 'message';
import * as conf   from 'config';

let   $root, current_mode; // include: open_link, help
const trigger = "s r",
      key     = [ "f", "," ],
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

Mousetrap.bind( global_keys, ( event, combo ) => {
    task( combo.replace( trigger, "" ).trim());
});

function task( key ) {
    switch ( key ) {
        case "f":
            openLink();
            break;
        case ",":
            keyboradmap();
            break;
    }
}

function listenESC( callback ) {
    const cb = $.Callbacks();
    cb.add( callback );
    Mousetrap.bind( "esc", ( event, combo ) => {
        if ( helpExist() ) {
            removeHelp();
        } else if ( openLinkExist() ) {
            removeOpenLink();
        } else {
            cb.fire( combo );
        }
    });
}

function listen( callback ) {
    const cb = $.Callbacks();
    cb.add( callback );
    let keys = new Map();
    Object.values( conf.keyboard ).forEach( item => {
        Object.values( item ).forEach( obj => {
            const kbd  = `${obj.kbd[0]} ${obj.kbd[1]}`,
                  loop = ( item, idx ) => {
                const type = obj.type.replace( "_", "" );
                keys.delete( kbd );
                keys.set( `${kbd} ${idx+1}`, obj.type + conf.Shortcuts[type].name[idx] );
            };
            keys.set( kbd, obj.type );
            switch ( obj.type ) {
                case "fontfamily_":
                    Array(5).fill(1).forEach( loop );
                    break;
                case "fontsize_":
                case "layout_":
                    Array(3).fill(1).forEach( loop );
                    break;
                case "theme_next":
                    keys.delete( kbd );
                    keys.set( `${kbd} right`, obj.type );
                    break;
                case "theme_prev":
                    keys.delete( kbd );
                    keys.set( `${kbd} left`, obj.type );
                    break;
            }
        });
    });
    console.log( "current shortcuts is", keys )
    Mousetrap.bind( [ ...keys.keys() ] , ( event, combo ) => {
        cb.fire( keys.get( combo ) )
    });
}

/***********************
 * Task: Open link
 ***********************/
let links = [];

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
        current_mode = "open_link";
    });
    links.length > 0 && $( "html" ).on( "keypress", openLinkEventHander );
}

function openLinkEventHander( event ) {
    const combo = event.key;
    if ( links.includes( combo.toLowerCase() ) ) {
        const $target = $root.find( `sr-kbd[id=${combo.toUpperCase()}]` );
        if ( $target && $target.is( "sr-kbd" ) ) {
            const url = $target.parent()[0].href;
            url && url.startsWith( "http" ) && browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url } ));
            url && url.startsWith( "http" ) && removeOpenLink();
        }
    } else {
        new Notify().Render( "当前已进入链接模式，如需其它操作，请使用 ESC 退出此模式。" );
    }
}

function removeOpenLink() {
    $( "sr-kbd" ).remove();
    $root.find( "a" ).removeClass( "sr-kbd-a" );
    $( "html" ).off( "keypress", openLinkEventHander );
    links        = [];
    current_mode = "";
}

function openLinkExist() {
    return $( "sr-kbd" ).length > 0 ? true : false;
}

/***********************
 * Keyboard map
 ***********************/

function keyboradmap() {
    let html = "";
    Object.keys( conf.keyboard ).forEach( item => {
        let maptml = "";
        Object.keys( conf.keyboard[item] ).forEach( ( map, idx ) => {
            const obj = conf.keyboard[item][map];
            maptml += `<kbd-map><kbd-name><kbd id="${obj.type}">${obj.kbd}</kbd></kbd-name><kbd-desc>${obj.desc}</kbd-desc></kbd-map>`
        });
        html += `<kbd-maps-group><kbd-maps-title>${item}</kbd-maps-title>${maptml}</kbd-maps-group>`;
    });
    const tmpl    = `
    <kbd-mapping>
        <kbd-map-title>简悦快捷键一览</kbd-map-title>
        <kbd-maps>
            <kbd-maps-group>
                <kbd-maps-title>全局</kbd-maps-title>
                <kbd-map><kbd-name><kbd>sr</kbd></kbd-name><kbd-desc>快捷键触发条件</kbd-desc></kbd-map>
                <kbd-map><kbd-name><kbd>,</kbd></kbd-name><kbd-desc>打开/关闭快捷键一览</kbd-desc></kbd-map>
                <kbd-map><kbd-name><kbd>f</kbd></kbd-name><kbd-desc>打开当前页面的任意链接</kbd-desc></kbd-map>
                <kbd-map><kbd-name><kbd>esc</kbd></kbd-name><kbd-desc>退出当前模式</kbd-desc></kbd-map>
            </kbd-maps-group>
            ${ html }
        </kbd-maps>
    </kbd-mapping>
    `;
    helpExist() ? removeHelp() : $root.parent().append( `<kbd-bg>${tmpl}</kbd-bg>` );
    current_mode = "help";
}

function removeHelp() {
    $root.parent().find( "kbd-bg" ).remove();
    current_mode = "";
}

function helpExist() {
    return $( "kbd-bg" ).length > 0 ? true : false;
}
/***********************
 * Export
 ***********************/

export {
    render    as Render,
    listenESC as ListenESC,
    listen    as Listen,
}