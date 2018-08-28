console.log( "=== simpread keyboard ===" )

import Mousetrap   from 'mousetrap';

import {browser}   from 'browser';
import * as msg    from 'message';
import * as conf   from 'config';

let   $root, current_mode = ""; // include: keyboard
const trigger = "s r",
      key     = [ ".", "," ],
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

Mousetrap.bind( trigger, () => {
    if ( $( "html" ).find( ".simpread-read-root" ).length == 0 ) return;
    if ( current_mode == "" ) {
        current_mode = "keyboard";
        new Notify().Render( "已进入快捷键操作模式，退出请使用 sr，帮助请按," );
    } else {
        current_mode = "";
        new Notify().Render( "已退出快捷键操作模式！" );
    }
});

Mousetrap.bind( key, ( event, combo ) => {
    current_mode == "keyboard" && task( combo );
});

function task( key ) {
    switch ( key ) {
        case ".":
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
        } else if ( current_mode == "keyboard" ) {
            Mousetrap.trigger( trigger );
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
                keys.set( `${kbd} ${idx+1}`, obj.type + conf.shortcuts[type].name[idx] );
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
        current_mode == "keyboard" && cb.fire( keys.get( combo ) )
    });
}

function bind( combo, callback ) {
    Mousetrap.bind( combo, callback );
}

/***********************
 * Task: Open link
 ***********************/
let links     = [];
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

function openLink() {
    if ( openLinkExist() ) {
        removeOpenLink();
        return;
    }
    $root.find( "a" ).map( ( idx, item ) => {
        const key = getName( idx + "" );
        $(item).addClass( "sr-kbd-a" ).append( `<sr-kbd id=${key}>${key}</sr-kbd>` );
        links.push( key.toLowerCase() );
    });
    links.length > 0 && $( "html" ).on( "keypress", openLinkEventHander );
}

function openLinkEventHander( event ) {
    const combo  = event.key.toUpperCase(),
          result = links.join("").match( new RegExp( combo, "ig" ) );
    if ( combo == "." ) return;
    if ( result ) {
        if ( result.length == 1 ) {
            const $target = $root.find( `sr-kbd[id=${combo}]` );
            if ( $target && $target.is( "sr-kbd" ) ) {
                const url = $target.parent()[0].href;
                url && url.startsWith( "http" ) && browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url } ));
                url && url.startsWith( "http" ) && removeOpenLink();
            }
        } else {
            new Notify().Render( "已缩小查询范围。" );
            links   = [];
            let idx = 0;
            $root.find( `sr-kbd` ).map( ( _, item ) => {
                if ( item.id.includes( combo ) ) {
                    const key      = getName( idx + "" );
                    item.outerHTML = `<sr-kbd id=${key}>${key}</sr-kbd>`
                    links.push( key.toLowerCase() );
                    idx++;
                } else {
                    $(item).remove();
                }
            });
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
}

function openLinkExist() {
    return $root && $root.find( $( "sr-kbd" ) ).length > 0 ? true : false;
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
        <kbd-map-title>快捷键一览</kbd-map-title>
        <kbd-maps>
            <kbd-maps-group>
                <kbd-maps-title>全局</kbd-maps-title>
                <kbd-map><kbd-name><kbd>esc</kbd></kbd-name><kbd-desc>退出当前模式</kbd-desc></kbd-map>
                <kbd-map><kbd-name><kbd>←</kbd></kbd-name><kbd-desc>前一页</kbd-desc></kbd-map>
                <kbd-map><kbd-name><kbd>→</kbd></kbd-name><kbd-desc>后一页</kbd-desc></kbd-map>
            </kbd-maps-group>
            <kbd-maps-group>
                <kbd-maps-title>阅读模式</kbd-maps-title>
                <kbd-map><kbd-name><kbd>sr</kbd></kbd-name><kbd-desc>快捷键开启/关闭条件</kbd-desc></kbd-map>
                <kbd-map><kbd-name><kbd>,</kbd></kbd-name><kbd-desc>打开/关闭快捷键一览</kbd-desc></kbd-map>
                <kbd-map><kbd-name><kbd>.</kbd></kbd-name><kbd-desc>打开当前页面的任意链接</kbd-desc></kbd-map>
            </kbd-maps-group>
            ${ html }
        </kbd-maps>
    </kbd-mapping>
    `;
    helpExist() ? removeHelp() : $root.parent().append( `<kbd-bg>${tmpl}</kbd-bg>` );
}

function removeHelp() {
    $root.parent().find( "kbd-bg" ).remove();
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
    bind      as Bind,
}