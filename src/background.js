
import local from 'local';
import { storage } from 'storage';

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
chrome.contextMenus.create( readmenu  );

/**
 * Listen contextMenus message
 */
chrome.contextMenus.onClicked.addListener( function( info, tab ) {
    console.log( "background contentmenu Listener", info, tab );
    if ( info.pageUrl == tab.url ) {
        chrome.tabs.sendMessage( tab.id, { type: info.menuItemId });
    }
});

/**
 * Listen runtime message, include: `shortcuts` `browser_action`
 */
chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    console.log( "background runtime Listener", request );
    switch ( request.type ) {
        case "shortcuts":
            getCurTab( function( tabs ) { chrome.tabs.sendMessage( tabs[0].id, request ); });
            break;
        case "browser_action":
            const icon = request.value != -1 ? "" : "-disable";
            chrome.browserAction.setIcon({ path: chrome.extension.getURL( `assets/images/icon72${icon}.png` ) });
            break;
    }
});

/**
 * Listen chrome tab active message, include: `tab_selected` 
 */
chrome.tabs.onActivated.addListener( function( active ) {
    console.log( "background tabs Listener", active );
    chrome.tabs.sendMessage( active.tabId, { type : "tab_selected", value: active.tabId });
});

/**
 * Get current tab object
 * 
 * @param {function} callback
 */
function getCurTab( callback ) {
    chrome.tabs.query({ "active": true, "currentWindow": true }, function( tabs ) { callback( tabs ); });
}