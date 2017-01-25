
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
    console.log( info, tab )
    if ( info.pageUrl == tab.url ) {
        chrome.tabs.sendMessage( tab.id, { type: info.menuItemId });
    }
});

/**
 * Listen runtime message, include: `browser_action`
 */
chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    console.log( request );
    switch ( request.type ) {
        case "browser_action":
            const icon = request.value != -1 ? "" : "-disable";
            chrome.browserAction.setIcon({ path: chrome.extension.getURL( `assets/images/icon72${icon}.png` ) });
            break;
    }
});

/**
 * Listen runtime message
 */
chrome.runtime.onMessage.addListener( function( request ) {
    getCurTab( function( tabs ) { chrome.tabs.sendMessage( tabs[0].id, request ); });
});

/**
 * Listen chrome tab active message
 */
chrome.tabs.onActivated.addListener( function( selected ){
    console.log( selected )
    chrome.tabs.sendMessage( selected.tabId, { type : "tab_selected", value: selected.tabId });
});

/**
 * Get current tab object
 */
function getCurTab( callback ) {
    chrome.tabs.query({ "active": true, "currentWindow": true }, function( tabs ) { callback( tabs ); });
}
