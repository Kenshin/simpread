console.log( "=== simpread contentscripts load ===" )

import './assets/css/simpread.css';
import './assets/css/option.css';
import './vender/notify/notify.css';

import Velocity  from 'velocity';
import Notify    from 'notify';

import {focus}   from 'focus';
import * as read from 'read';
import * as modals from 'modals';
import * as kbd  from 'keyboard';

import * as st   from 'site';
import { storage, STORAGE_MODE as mode } from 'storage';
import * as msg  from 'message';
import {browser} from 'browser';
import * as watch from 'watch';

import PureRead  from 'pureread';

let pr; // pure read object
let current_url = location.href; // current page url ( when changed page changed )

/**
 * Sevice: storage Get data form chrome storage
 */
storage.Read( () => {
    bindShortcuts();
    autoOpen();
});

/**
 * Listen runtime message, include: `focus` `read` `shortcuts` `tab_selected`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    console.log( "contentscripts runtime Listener", request );
    switch ( request.type ) {
        case msg.MESSAGE_ACTION.focus_mode:
            if ( storage.option.br_exit ) focus.Exist( false ) ? focus.Exit() : focusMode();
            else focusMode();
            break;
        case msg.MESSAGE_ACTION.shortcuts:
            bindShortcuts();
            break;
        case msg.MESSAGE_ACTION.tab_selected:
            browserAction( request.value.is_update );
            break;
        case msg.MESSAGE_ACTION.read_mode:
        case msg.MESSAGE_ACTION.browser_click:
            watch.Verify( ( state, result ) => {
                if ( state ) {
                    console.log( "watch.Lock()", result );
                    new Notify().Render( "配置文件已更新，刷新当前页面后才能生效。", "刷新", ()=>window.location.reload() );
                } else {
                     if ( storage.option.br_exit ) {
                        modals.Exist()  && modals.Exit();
                        !modals.Exist() && read.Exist( false ) ? read.Exit() : readMode();
                     }
                     else readMode();
                }
            });
            break;
    }
});

/**
 * Keyboard event handler
 */
function bindShortcuts() {
    kbd.Bind( [ storage.focus.shortcuts.toLowerCase() ], focusMode );
    kbd.Bind( [ storage.read.shortcuts.toLowerCase()  ], readMode  );
    kbd.ListenESC( combo => {
        if ( combo == "esc" && storage.option.esc ) {
            modals.Exist()  && modals.Exit();
            !modals.Exist() && focus.Exist() && focus.Exit();
            !modals.Exist() && read.Exist()  && read.Exit();
        }
    });
}

/**
 * Focus mode
 */
function focusMode() {
    console.log( "=== simpread focus mode active ===" )

    if ( !entry( focus, read, "阅读", "聚焦" )) return;

    watch.Verify( ( state, result ) => {
        if ( state ) {
            console.log( "watch.Lock()", result );
            new Notify().Render( "配置文件已更新，刷新当前页面后才能生效。", "刷新", ()=>window.location.reload() );
        } else {
            getCurrent( mode.focus );
            if ( storage.current.site.name.startsWith( "txtread:" ) ) {
                new Notify().Render( "当前为 <a href='https://github.com/Kenshin/simpread/wiki/TXT-阅读器' target='_blank'>TXT 阅读器模式</a>，并不能使用设定功能。" )
                return;
            }
            focus.GetFocus( pr.Include(), storage.current.site.include ).done( result => {
                storage.current.site.name == "" && pr.TempMode( mode.focus, result[0].outerHTML );
                //storage.current.site.name == "" && storage.Newsite( mode.focus, pr.current.site );
                storage.Statistics( mode.focus );
                focus.Render( result, pr, storage.current.bgcolor );
            }).fail( () => {
                new Notify().Render( 2, "当前并未获取任何正文，请重新选取。" );
            });
        }
    });
}

/**
 * Read mode
 */
function readMode() {
    console.log( "=== simpread read mode active ===" )

    if ( !entry( read, focus, "聚焦", "阅读" )) return;

    watch.Verify( ( state, result ) => {
        if ( state ) {
            console.log( "watch.Lock()", result );
            new Notify().Render( "配置文件已更新，刷新当前页面后才能生效。", "刷新", ()=>window.location.reload() );
        } else {
            getCurrent( mode.read );
            switch ( st.Verify( storage.current.site.name ) ) {
                case 0:
                    storage.Statistics( mode.read );
                    read.Render( pr );
                    break;
                case -1:
                    new Notify().Render( "当前并未适配阅读模式，请移动鼠标手动生成 <a href='https://github.com/Kenshin/simpread/wiki/%E4%B8%B4%E6%97%B6%E9%98%85%E8%AF%BB%E6%A8%A1%E5%BC%8F' target='_blank' >临时阅读模式</a>。" );
                    read.Highlight().done( dom => {
                        pr.TempMode( mode.read, dom.outerHTML );
                        //storage.Newsite( mode.read, pr.current.site );
                        storage.Statistics( mode.read );
                        read.Render( pr );
                    });
                    break;
            }
        }
    });
}

/**
 * Auto open read mode
 */
function autoOpen() {
    getCurrent( mode.read );
    if   ( window.location.href.includes( "simpread_mode=read"     ) ||
         ( storage.current.auto && st.Exclusion(  storage.current )) ||
         ( !storage.current.auto && st.Whitelist( storage.current ))
        ) {
        switch ( storage.current.site.name ) {
            case "my.oschina.net":
            case "36kr.com":
            case "chiphell.com":
            case "question.zhihu.com":
                $( () => readMode() );
                break;
            case "post.juejin.im":
            case "entry.juejin.im":
                setTimeout( ()=>readMode(), 2500 );
                break;
            case "kancloud.cn":
            case "sspai.com":
                setTimeout( ()=>readMode(), 1000 );
                break;
            default:
                pr.state == "adapter" && readMode();
                break;
        }
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
 * @param {string} value is mode.focus or mode.read or undefined
 */
function getCurrent( mode ) {
    if ( mode && storage.VerifyCur( mode ) ) {
        //storage.Getcur( mode, st.GetMetadata() );
        pRead();
        storage.Getcur( mode, pr.current.site );
    }
}

/**
 * Browser action
 * 
 * @param {boolean} when set icon is_update = true
 */
function browserAction( is_update ) {
    if ( is_update && current_url != location.href ) {
        current_url = location.href;
        autoOpen();
    }
    browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.browser_action, { code: storage.current.site.name == "" ? -1 : 0 , url: window.location.href } ));
}

/** 
 * Pure Read
*/
function pRead() {
    pr = new PureRead( storage.sites );
    pr.Getsites();
    console.log( "current pureread object is   ", pr )
}