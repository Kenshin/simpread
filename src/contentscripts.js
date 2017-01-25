console.log( "=== simpread contentscripts load ===" )

import './assets/css/simpread.css';
import './vender/notify/notify.css';

import Mousetrap from 'mousetrap';
import Notify    from 'notify';
import {focus}   from 'focus';
import * as read from 'read';
import * as st   from 'site';
import { storage, STORAGE_MODE as mode } from 'storage';

/**
 * Sevice: storage Get data form chrome storage
 */
storage.Get( function() {
    bindShortcuts();
    storage.Setcur( mode.read );
    chrome.runtime.sendMessage({ type: "browser_action", value: storage.rdstcode });
});

/**
 * Listen runtime message, include: `focus` `read` `shortcuts`
 */
chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    console.log( request );
    switch ( request.type ) {
        case "focus":
            focuseMode();
            break;
        case "read":
            readMode();
            break;
        case "shortcuts":
            bindShortcuts();
            break;
        case "tab_selected":
            chrome.runtime.sendMessage({ type: "browser_action", value: storage.rdstcode });
    }
});

/**
 * Keyboard event handler 
 */
function bindShortcuts() {
    Mousetrap.bind( [ storage.focus.shortcuts.toLowerCase() ], focuseMode );
    Mousetrap.bind( [ storage.read.shortcuts.toLowerCase()  ], readMode   );
}

/**
 * Focus mode
 */
function focuseMode() {
    console.log( "=== simpread focus mode active ===" )

    if ( read.Exist(false) ) {
        new Notify().Render( 1, "请先退出阅读模式，才能进入聚焦模式。" );
        return;
    }

    if ( focus.Exist(true) ) return;

    if ( storage.VerifyCur( mode.focus ) ) {
         storage.Setcur( mode.focus );
    }

    const $focus = focus.GetFocus( storage.current.site.include );
    if ( $focus ) {
        focus.Render( $focus, storage.current.site.exclude, storage.current.bgcolor );
    } else {
        new Notify().Render( 1, "当前并未获取任何正文，请重新选取。" );
    }
}

/**
 * Read mode
 */
function readMode() {
    console.log( "=== simpread read mode active ===" )

    if ( focus.Exist(false) ) {
        new Notify().Render( 1, "请先退出聚焦模式，才能进入阅读模式。" );
        return;
    }

    if ( read.Exist(true) ) return;

    if ( storage.VerifyCur( mode.read ) ) {
        storage.Setcur( mode.read );
    }

    switch ( st.Verify( storage.current.site.name ) ) {
        case 0:
            read.Render();
            break;
        case -1:
            new Notify().Render( 1, "当前页面没有适配，如需要请自行添加。" );
            break;
        case -2:
            new Notify().Render( 1, "只有选中【只看楼主】后，才能进入阅读模式。" );
            break;
        case -3:
            new Notify().Render( 1, "只有选中【只看该作者】后，才能进入阅读模式。" );
            break;
    }
}