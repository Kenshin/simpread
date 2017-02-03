
import local       from 'local';
import { storage } from 'storage';
import * as msg    from 'message';

/**
 * Save local/remote website_list.json to chrome storage
 */
storage.Get( function() {
    if ( local.Firstload() )  storage.GetNewsites( "local"  );
    else if( !local.Count() ) storage.GetNewsites( "remote" );
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
    readmenu  = {};

Object.assign( foucsmenu, menu, { id: "focus", "title" : "聚焦模式" });
Object.assign( readmenu,  menu, { id: "read",  "title" : "阅读模式" });

chrome.contextMenus.create( foucsmenu );
let rdmenuid = chrome.contextMenus.create( readmenu  );

/**
 * Listen contextMenus message
 */
chrome.contextMenus.onClicked.addListener( function( info, tab ) {
    console.log( "background contentmenu Listener", info, tab );
    if ( !tab.url.startsWith( "chrome://" ) ) {
        //chrome.tabs.sendMessage( tab.id, { type: info.menuItemId });
        //msg.Pub( msg.MESSAGE_MODE.tabs, info.menuItemId, {}, tab.id );
        chrome.tabs.sendMessage( tab.id, msg.Add(info.menuItemId));
    }
});

/**
 * Listen runtime message, include: `shortcuts` `browser_action`
 */
chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    console.log( "background runtime Listener", request );
    switch ( request.type ) {
        case  msg.MESSAGE_ACTION.shortcuts:
            getCurTab( function( tabs ) {
                //chrome.tabs.sendMessage( tabs[0].id, request );
                //msg.Pub( msg.MESSAGE_MODE.tabs, msg.MESSAGE_ACTION.shortcuts, {}, tabs[0].id );
                chrome.tabs.sendMessage( tabs[0].id, msg.Add( msg.MESSAGE_ACTION.shortcuts ));
            });
            break;
        case  msg.MESSAGE_ACTION.browser_action:
            getCurTab( tabs => {
                if ( tabs[0].url == request.value.url ) {
                    setMenuAndIcon( tabs[0].id, request.value.code );
                }
            });
            break;
    }
});

/**
 * Listen chrome tab active message, include: `tab_selected`
 */
chrome.tabs.onActivated.addListener( function( active ) {
    getCurTab( (tabs) => {
        if ( tabs[0].status == "complete" ) {
            console.log( "background tabs Listener:active", active );
            if ( !tabs[0].url.startsWith( "chrome://" ) ) {
                //chrome.tabs.sendMessage( tabs[0].id, { type : "tab_selected" });
                //msg.Pub( msg.MESSAGE_MODE.tabs, msg.MESSAGE_ACTION.tab_selected, {}, tabs[0].id );
                chrome.tabs.sendMessage( tabs[0].id, msg.Add( msg.MESSAGE_ACTION.tab_selected ));
            } else {
                setMenuAndIcon( tabs[0].id, -1 );
            }
        }
    });
});

/**
 * Listen chrome tab update message, include: `tab_selected`
 */
chrome.tabs.onUpdated.addListener( function( tabId, changeInfo, tab ) {
    if ( changeInfo.status == "complete" ) {
        console.log( "background tabs Listener:update", tabId, changeInfo, tab );
        if ( !tab.url.startsWith( "chrome://" ) ) {
            //chrome.tabs.sendMessage( tabId, { type : "tab_selected" });
            //msg.Pub( msg.MESSAGE_MODE.tabs, msg.MESSAGE_ACTION.tab_selected, {}, tabId );
            chrome.tabs.sendMessage( tabId, msg.Add( msg.MESSAGE_ACTION.tab_selected ));
        } else {
            setMenuAndIcon( tab.id, -1 );
        }
    }
});

/**
 * Listen chrome page, include: `read`
 */
chrome.pageAction.onClicked.addListener( function( tab ) {
    //chrome.tabs.sendMessage( tab.id, { type: "read" });
    //msg.Pub( msg.MESSAGE_MODE.tabs, msg.MESSAGE_ACTION.read_mode, {}, tab.id );
    chrome.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.read_mode ));
});

/**
 * Get current tab object
 * 
 * @param {function} callback
 */
function getCurTab( callback ) {
    chrome.tabs.query({ "active": true, "currentWindow": true }, function( tabs ) { callback( tabs ); });
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
        chrome.pageAction.hide( id );
        if ( rdmenuid ) {
            chrome.contextMenus.remove( rdmenuid );
            rdmenuid = undefined;
        }
    } else {
        chrome.pageAction.show( id );
        if ( !rdmenuid ) {
            delete readmenu.generatedId;
            rdmenuid = chrome.contextMenus.create( readmenu );
        }
    }
    chrome.pageAction.setIcon({ tabId: id, path: chrome.extension.getURL( `assets/images/icon72${icon}.png` ) });
}