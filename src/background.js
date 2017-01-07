
import local from 'local';
import { storage, GetNewsites } from 'storage';

/**
 * Create context menus
*/
chrome.contextMenus.create({
    "type"     : "normal",
    "title"    : "简阅 - 聚焦模式",
    "contexts" :  [ "all" ],
    "documentUrlPatterns" : [ "http://*/*" , "https://*/*" ],
    "onclick"  : function( info ) {
        getCurTab( function( tabs ) {
            if ( tabs[0].url == info.pageUrl ) {
                chrome.tabs.sendMessage( tabs[0].id, { type: "focus" });
            }
            else {
                // TO-DO
                // notifcation 
            }
        });
    }
});

/**
 * Listen runtime message
 */
chrome.runtime.onMessage.addListener( function( request ) {
    getCurTab( function( tabs ) { chrome.tabs.sendMessage( tabs[0].id, request ); });
});

/**
 * Get current tab object
 */
function getCurTab( callback ) {
    chrome.tabs.query({ "active": true, "currentWindow": true }, function( tabs ) { callback( tabs ); });
}

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

// load new sites
if ( local.Firstload() ) {
    storage.GetNewsites( chrome.extension.getURL( "website_list.json" ));
}

const ismaxcount = local.Count();
console.log( "count     = ",local.curcount, ismaxcount )

/*
const firstload = local.Firstload();
console.log( "firstload = ",firstload )

GetNewsites( chrome.extension.getURL( "website_list.json" )).then( result => {
    console.log( result )
});

if ( ismaxcount ) {
    storage.GetNewsites();  // remote url http://ojec5ddd5.bkt.clouddn.com/website_list.json
    storage.Set( "read" );
}
*/