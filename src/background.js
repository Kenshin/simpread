/**
    Create context menus
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
    Listen runtime message
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
