/*
    create context menus
*/
chrome.contextMenus.create({
    "type"     : "normal",
    "title"    : "简阅 - 聚焦模式",
    "contexts" :  [ "all" ],
    "onclick"  : function( info ) {
        chrome.tabs.query({ "active": true, "currentWindow": true }, function( tabs ) {
            if ( tabs[0].url == info.pageUrl ) {
                chrome.tabs.sendMessage( tabs[0].id, tabs[0] );
            }
            else {
                // TO-DO
                // notifcation 
            }
        });
    }
});