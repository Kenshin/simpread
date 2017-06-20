console.log( "=== simpread menu load ===" )

import {storage} from 'storage';
import {browser} from 'browser';

/**
 * Create context menus
*/
const context = {
        focus : { id: "", menu: {} },
        read  : { id: "", menu: {} },
        link  : { id: "", menu: {} },
    },
    menu = {
        "type"     : "normal",
        "contexts" :  [ "all" ],
        "documentUrlPatterns" : [ "http://*/*" , "https://*/*" ]
    };

Object.assign( context.focus.menu, menu, { id: "focus", "title" : "聚焦模式" });
Object.assign( context.read.menu,  menu, { id: "read",  "title" : "阅读模式" });
Object.assign( context.link.menu,  menu, { id: "link",  "title" : "使用阅读模式打开此链接", contexts: [ "link" ] });

/**
 * Listen contextMenus message
 */
function onClicked( callback ) {
    browser.contextMenus.onClicked.addListener( callback );
}

/**
 * Create all context menu
 */
function createAll() {
    storage.option.menu.focus &&
        ( context.focus.id = browser.contextMenus.create( context.focus.menu ));

    storage.option.menu.read &&
        ( context.read.id  = browser.contextMenus.create( context.read.menu ));

    storage.option.menu.link &&
        ( context.link.id  = browser.contextMenus.create( context.link.menu ));
}

/**
 * Create menu from type
 * 
 * @param {string} include: foucs read link
 */
function create( type ) {
    if ( !context[type].id ) {
        delete context[type].menu.generatedId;
        context[type].id = browser.contextMenus.create( context[type].menu );
    }
}

/**
 * Remove menu from type
 * 
 * @param {string} include: foucs read link
 */
function remove( type ) {
    if ( context[type].id ) {
        browser.contextMenus.remove( context[type].id );
        context[type].id = undefined;
    }
}

export {
    createAll as CreateAll,
    create    as Create,
    remove    as Remove,
    onClicked as OnClicked,
}