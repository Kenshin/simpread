console.log( "=== simpread contentscripts load ===" )

import './assets/css/simpread.css';
import './assets/css/option.css';
import './vender/notify/notify.css';

import Mousetrap from 'mousetrap';
import Velocity  from 'velocity';
import Notify    from 'notify';

import {focus}   from 'focus';
import * as read from 'read';
import * as modals from 'modals';

import * as st   from 'site';
import { storage, STORAGE_MODE as mode } from 'storage';
import * as msg  from 'message';
import {browser} from 'browser';
import * as watch from 'watch';

/**
 * Sevice: storage Get data form chrome storage
 */
storage.Read( () => {
    bindShortcuts();
    getCurrent( mode.read );
    autoOpen();
});

/**
 * Listen runtime message, include: `focus` `read` `shortcuts` `tab_selected`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    console.log( "contentscripts runtime Listener", request );
    switch ( request.type ) {
        case msg.MESSAGE_ACTION.focus_mode:
            focusMode();
            break;
        case msg.MESSAGE_ACTION.read_mode:
            readMode();
            break;
        case msg.MESSAGE_ACTION.shortcuts:
            bindShortcuts();
            break;
        case msg.MESSAGE_ACTION.tab_selected:
            getCurrent( mode.read );
            break;
    }
});

/**
 * Keyboard event handler
 */
function bindShortcuts() {
    Mousetrap.bind( [ storage.focus.shortcuts.toLowerCase() ], focusMode );
    Mousetrap.bind( [ storage.read.shortcuts.toLowerCase()  ], readMode   );
    Mousetrap.bind( "esc", () => {
        if ( storage.option.esc ) {
            modals.Exist()  && modals.Exit();
            !modals.Exist() && focus.Exist() && focus.Exit();
            !modals.Exist() && read.Exist()  && read.Exit();
        }
    })
}

/**
 * Focus mode
 */
function focusMode() {
    console.log( "=== simpread focus mode active ===" )

    if ( !entry( focus, read, "阅读", "聚焦" )) return;

    watch.Verify( result => {
        if ( result.site ) {
            new Notify().Render( "适配列表已更新，请刷新当前页面后才能生效。", "刷新", ()=>window.location.reload() );
        } else {
            getCurrent( mode.focus, false );
            const $focus = focus.GetFocus( storage.current.site.include );
            if ( $focus ) {
                storage.Statistics( mode.focus );
                focus.Render( $focus, storage.current.site.exclude, storage.current.bgcolor );
            } else {
                new Notify().Render( 2, "当前并未获取任何正文，请重新选取。" );
            }
        }
    });
}

/**
 * Read mode
 */
function readMode() {
    console.log( "=== simpread read mode active ===" )

    if ( !entry( read, focus, "聚焦", "阅读" )) return;

    watch.Verify( result => {
        if ( result.site ) {
            new Notify().Render( "适配列表已更新，请刷新当前页面后才能生效。", "刷新", ()=>window.location.reload() );
        } else {
            getCurrent( mode.read );
            switch ( st.Verify( storage.current.site.name ) ) {
                case 0:
                    storage.Statistics( mode.read );
                    read.Render();
                    break;
                case -1:
                    new Notify().Render( "当前页面没有适配，如需要请看 <a href='https://github.com/Kenshin/simpread/wiki/%E7%AB%99%E7%82%B9%E7%BC%96%E8%BE%91%E5%99%A8#%E5%A6%82%E4%BD%95%E6%96%B0%E5%A2%9E' target='_blank' >站点编辑器</>" );
                    break;
                case -2:
                    new Notify().Render( "只有选中【只看楼主】后，才能进入阅读模式。" );
                    new Notify().Render( "是否直接进入阅读模式？", "直接进入", ()=>{
                        document.location = document.location.href + "?see_lz=1&simpread_mode=read";
                    });
                    break;
                case -3:
                    new Notify().Render( 2, "只有选中【只看该作者】后，才能进入阅读模式。" );
                    break;
            }
        }
    });
}

/**
 * Auto open read mode
 */
function autoOpen() {
    if ( !window.location.href.includes( "simpread_mode=read" ) && !storage.current.auto ) return;
    switch ( storage.current.site.name ) {
        case "36kr.com":
            $( () => readMode() );
            break;
        case "post.juejin.im":
        case "entry.juejin.im":
            setTimeout( ()=>readMode(), 2500 );
            break;
        case "sspai.com":
            setTimeout( ()=>readMode(), 500 );
            break;
        default:
            storage.current.site.name != "" && readMode();
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
        new Notify().Render( `请先退出${str[0]}模式，才能进入${str[1]}模式。` );
        return false;
    }
    if ( current.Exist(true) ) return false;
    return true;
}

/**
 * Get storage.current
 * 
 * @param {string}  value is mode.focus or mode.read or undefined
 * @param {boolean} when true, push message
 */
function getCurrent( mode = undefined, upicon = true ) {
    if ( mode && storage.VerifyCur( mode ) ) {
        storage.Getcur( mode );
    }
    if ( upicon ) browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.browser_action, { code: storage.rdstcode, url: window.location.href } ));
}
