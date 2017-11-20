console.log( "=== simpread keyboard ===" )

import Mousetrap   from 'mousetrap';

import {browser}   from 'browser';
import * as msg    from 'message';

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

function listen( callback ) {
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
    const tmpl    = `
    <kbd-mapping>
        <kbd-map-title>简悦快捷键一览</kbd-map-title>
        <kbd-maps>
            <kbd-maps-group>
                <kbd-maps-title>全局</kbd-maps-title>
                <kbd-map>
                    <kbd-name><kbd>sr</kbd></kbd-name>
                    <kbd-desc>快捷键触发条件</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>,</kbd></kbd-name>
                    <kbd-desc>打开/关闭快捷键一览</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>f</kbd></kbd-name>
                    <kbd-desc>打开当前页面的任意链接</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>esc</kbd></kbd-name>
                    <kbd-desc>退出当前模式</kbd-desc>
                </kbd-map>
            </kbd-maps-group>
            <kbd-maps-group>
                <kbd-maps-title>控制栏 - 导出</kbd-maps-title>
                <kbd-map>
                    <kbd-name><kbd>md</kbd></kbd-name>
                    <kbd-desc>导出为 Markdown</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>pg</kbd></kbd-name>
                    <kbd-desc>导出为 png</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>pf</kbd></kbd-name>
                    <kbd-desc>导出为 pdf</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>ep</kbd></kbd-name>
                    <kbd-desc>导出为 epub</kbd-desc>
                </kbd-map>
            </kbd-maps-group>
            <kbd-maps-group>
                <kbd-maps-title>控制栏 - 生产力工具</kbd-maps-title>
                <kbd-map>
                    <kbd-name><kbd>yx</kbd></kbd-name>
                    <kbd-desc>保存到 印象笔记</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>er</kbd></kbd-name>
                    <kbd-desc>保存到 Evernote</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>dd</kbd></kbd-name>
                    <kbd-desc>保存到 Dropbox</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>on</kbd></kbd-name>
                    <kbd-desc>保存到 Onenote</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>gr</kbd></kbd-name>
                    <kbd-desc>保存到 Google 云端硬盘</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>kd</kbd></kbd-name>
                    <kbd-desc>保存到 Kindle</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>ln</kbd></kbd-name>
                    <kbd-desc>保存到 Linnk</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>pk</kbd></kbd-name>
                    <kbd-desc>保存到 Pocket</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>rl</kbd></kbd-name>
                    <kbd-desc>保存到 稍后读</kbd-desc>
                </kbd-map>
            </kbd-maps-group>
            <kbd-maps-group>
                <kbd-maps-title>控制栏 - 其它</kbd-maps-title>
                <kbd-map>
                    <kbd-name><kbd>ff</kbd></kbd-name>
                    <kbd-desc>改变字体样式，取值 1 ~ 5</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>fs</kbd></kbd-name>
                    <kbd-desc>改变字体大小，取值 1 ~ 3</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>lo</kbd></kbd-name>
                    <kbd-desc>改变版面布局，取值 1 ~ 3</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>th →</kbd></kbd-name>
                    <kbd-desc>更换为后一个主题</kbd-desc>
                </kbd-map>
                <kbd-map>
                    <kbd-name><kbd>th →</kbd></kbd-name>
                    <kbd-desc>更换为前一个主题</kbd-desc>
                </kbd-map>
            </kbd-maps-group>
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
    render as Render,
    listen as Listen,
}