
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
    if ( !tab.url.startsWith( "chrome://" ) ) {
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
            getCurTab( tabs => {
                if ( tabs[0].url == request.value.url ) {
                    setBrowserIcon( tabs[0].id, request.value.code );
                }
            });
            break;
    }
});

/**
 * Listen chrome tab active message, include: `tab_selected`
 */
chrome.tabs.onActivated.addListener( function( active ) {
    console.log( "background tabs Listener", active );
    getCurTab( (tabs) => {
        if ( !tabs[0].url.startsWith( "chrome://" ) ) {
            chrome.tabs.sendMessage( tabs[0].id, { type : "tab_selected" });
        } else {
            setBrowserIcon( tabs[0].id, -1 );
        }
    });
});

/**
 * Listen chrome page, include: `read`
 */
chrome.pageAction.onClicked.addListener( function( tab ) {
    chrome.tabs.sendMessage( tab.id, { type: "read" });
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
 * Set brower action icon
 * 
 * @param {int} tab.id
 * @param {int} -1: disable icon;
 */
function setBrowserIcon( id, code ) {
    let icon = "";
    if ( code == -1 ) {
        chrome.pageAction.hide( id );
        icon = "-disable";
    } else {
        chrome.pageAction.show( id );
    }
    chrome.pageAction.setIcon({ tabId: id, path: chrome.extension.getURL( `assets/images/icon72${icon}.png` ) });
}