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
    getCurrent();
});

/**
 * Listen runtime message, include: `focus` `read` `shortcuts` `tab_selected`
 */
chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    console.log( "contentscripts runtime Listener", request );
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
            getCurrent();
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

    if ( !entry( focus, read, "阅读", "聚焦" )) return;
    getCurrent( false );

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

    if ( !entry( read, focus, "聚焦", "阅读" )) return;
    getCurrent();

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

/**
 * Focus and Read mode entry
 * 
 * @param  {object}  current mode object
 * @param  {object}  other   mode object
 * @param  {array}   render str
 * @return {boolean} true:continue; false: return
 */
function entry( current, other, ...str ) {
    if ( other.Exist(false) ) {
        new Notify().Render( 1, `请先退出${str[0]}模式，才能进入${str[1]}模式。` );
        return false;
    }
    if ( current.Exist(true) ) return false;
    return true;
}

/**
 * Get storage.current
 * 
 * @param {boolean} when true, push message
 */
function getCurrent( upicon = true ) {
    if ( storage.VerifyCur( mode.read ) ) {
        storage.Setcur( mode.read );
        if ( upicon ) chrome.runtime.sendMessage({ type: "browser_action", value: { code: storage.rdstcode, url: window.location.href } });
    }
}