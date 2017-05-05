console.log( "=== simpread background load ===" )

import local       from 'local';
import { storage } from 'storage';
import * as msg    from 'message';
import {browser}   from 'browser';
import * as ver    from 'version';

/**
 * Sevice: storage Get data form chrome storage
 */
storage.Read( () => {
    if ( local.Firstload() ) {
        local.Version( ver.version );
        browser.tabs.create({ url: browser.extension.getURL( "options/options.html#firstload?ver=" + ver.version ) });
    }
    else {
        !local.Count() && storage.GetNewsites( "remote" );
        ver.version != storage.version && storage.Write( () => {
                local.Version( ver.version );
                browser.tabs.create({ url: browser.extension.getURL( "options/options.html#update?ver=" + ver.version ) });
            }, ver.Verify( storage.version, storage.simpread ) );
    }
});

/**
 * Create context menus
*/
const menu = {
        "type"     : "normal",
        "contexts" :  [ "all" ],
        "documentUrlPatterns" : [ "http://*/*" , "https://*/*" ]
    },
    foucsmenu = {},
    readmenu  = {},
    linkmenu  = {};

Object.assign( foucsmenu, menu, { id: "focus", "title" : "聚焦模式" });
Object.assign( readmenu,  menu, { id: "read",  "title" : "阅读模式" });
Object.assign( linkmenu,  menu, { id: "link",  "title" : "使用阅读模式打开此链接" });

browser.contextMenus.create( foucsmenu );
let rdmenuid = browser.contextMenus.create( readmenu );
browser.contextMenus.create( linkmenu );

/**
 * Listen contextMenus message
 */
browser.contextMenus.onClicked.addListener( function( info, tab ) {
    console.log( "background contentmenu Listener", info, tab );
    if ( info.menuItemId == "link" ) {
        info.linkUrl && browser.tabs.create({ url: info.linkUrl + "?simpread_mode=read" });
    } else {
        if ( !tab.url.startsWith( "chrome://" ) ) browser.tabs.sendMessage( tab.id, msg.Add(info.menuItemId));
    }
});

/**
 * Listen runtime message, include: `shortcuts` `browser_action`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    console.log( "background runtime Listener", request );
    switch ( request.type ) {
        case  msg.MESSAGE_ACTION.shortcuts:
            getCurTab( function( tabs ) { browser.tabs.sendMessage( tabs[0].id, msg.Add( msg.MESSAGE_ACTION.shortcuts )); });
            break;
        case  msg.MESSAGE_ACTION.browser_action:
            getCurTab( tabs => {
                if ( tabs[0].url == request.value.url ) {
                    setMenuAndIcon( tabs[0].id, request.value.code );
                }
            });
            break;
        case msg.MESSAGE_ACTION.new_tab:
            browser.tabs.create({ url: request.value.url });
            break;
    }
});

/**
 * Listen chrome tab active message, include: `tab_selected`
 */
browser.tabs.onActivated.addListener( function( active ) {
    getCurTab( (tabs) => {
        if ( tabs[0].status == "complete" ) {
            console.log( "background tabs Listener:active", active );
            if ( !tabs[0].url.startsWith( "chrome://" ) ) {
                browser.tabs.sendMessage( tabs[0].id, msg.Add( msg.MESSAGE_ACTION.tab_selected ));
            } else {
                setMenuAndIcon( tabs[0].id, -1 );
            }
        }
    });
});

/**
 * Listen chrome tab update message, include: `tab_selected`
 */
browser.tabs.onUpdated.addListener( function( tabId, changeInfo, tab ) {
    if ( changeInfo.status == "complete" ) {
        console.log( "background tabs Listener:update", tabId, changeInfo, tab );
        if ( !tab.url.startsWith( "chrome://" ) ) {
            browser.tabs.sendMessage( tabId, msg.Add( msg.MESSAGE_ACTION.tab_selected ));
        } else {
            setMenuAndIcon( tab.id, -1 );
        }
    }
});

/**
 * Listen chrome page, include: `read`
 */
browser.pageAction.onClicked.addListener( function( tab ) {
    browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.read_mode ));
});

/**
 * Get current tab object
 * 
 * @param {function} callback
 */
function getCurTab( callback ) {
    browser.tabs.query({ "active": true, "currentWindow": true }, function( tabs ) { callback( tabs ); });
}

/**
 * Set page action icon and context menu
 * 
 * @param {int} tab.id
 * @param {int} -1: disable icon;
 */
function setMenuAndIcon( id, code ) {
    let icon = "";
    if ( code == -1 ) {
        icon = "-disable";
        browser.pageAction.hide( id );
        if ( rdmenuid ) {
            browser.contextMenus.remove( rdmenuid );
            rdmenuid = undefined;
        }
    } else {
        browser.pageAction.show( id );
        if ( !rdmenuid ) {
            delete readmenu.generatedId;
            rdmenuid = browser.contextMenus.create( readmenu );
        }
    }
    browser.pageAction.setIcon({ tabId: id, path: browser.extension.getURL( `assets/images/icon72${icon}.png` ) });
}