console.log( "=== simpread background load ===" )

import local       from 'local';
import { storage } from 'storage';
import * as msg    from 'message';
import {browser}   from 'browser';
import * as ver    from 'version';
import * as menu   from 'menu';
import * as watch  from 'watch';

/**
 * Sevice: storage Get data form chrome storage
 */
storage.Read( () => {
    if ( local.Firstload() ) {
        local.Version( ver.version );
        browser.tabs.create({ url: browser.extension.getURL( "options/options.html#firstload?ver=" + ver.version ) });
    }
    else {
        !local.Count() && storage.GetNewsites( "remote", getNewsitesHandler );
        ver.version != storage.version && storage.GetNewsites( "local", result => {
            ver.version != storage.version &&
                ( storage.read.sites = storage.Fix( storage.read.sites, storage.version, ver.version ));
            ver.version != storage.version && storage.Write( () => {
                    local.Version( ver.version );
                    browser.tabs.create({ url: browser.extension.getURL( "options/options.html#update?ver=" + ver.version ) });
                }, ver.Verify( storage.version, storage.simpread ) );
            getNewsitesHandler( result );            
        });
    }
    menu.CreateAll();
});

/**
 * Get newsites handler
 * @param {object} count: update site cou
 */
function getNewsitesHandler( result ) {
    watch.Push( "site", true );
}

/**
 * Listen menu event handler
 */
menu.OnClicked( ( info, tab ) => {
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
        case msg.MESSAGE_ACTION.shortcuts:
            getCurTab( { url: request.value.url }, tabs => {
                browser.tabs.sendMessage( tabs[0].id, msg.Add( msg.MESSAGE_ACTION.shortcuts ));
            });
            break;
        case msg.MESSAGE_ACTION.browser_action:
            getCurTab( { url: request.value.url }, tabs => {
                if ( tabs && tabs.length > 0 && tabs[0].url == request.value.url ) {
                    setMenuAndIcon( tabs[0].id, request.value.code );
                } else console.error( request );
            });
            break;
        case msg.MESSAGE_ACTION.new_tab:
            browser.tabs.create({ url: request.value.url });
            break;
        case msg.MESSAGE_ACTION.menu:
            const { id, value } = request.value;
            // hack code refresh options menu changed, and not saved storage
            storage.option.menu[id] = value;
            value === true ? menu.Create( id ) : menu.Remove( id );
            break;
        case msg.MESSAGE_ACTION.updated:
            watch.Push( request.value.type, request.value.value );
            break;
        case msg.MESSAGE_ACTION.save_verify:
            sendResponse( watch.Lock( request.value.url ));
            break;
    }
});

/**
 * Listen chrome tab active message, include: `tab_selected`
 */
browser.tabs.onActivated.addListener( function( active ) {
    getCurTab( { "active": true, "currentWindow": true }, tabs => {
        if ( tabs && tabs.length > 0 && tabs[0].status == "complete" ) {
            console.log( "background tabs Listener:active", active );
            if ( tabs && tabs.length > 0 && !tabs[0].url.startsWith( "chrome://" ) ) {
                browser.tabs.sendMessage( tabs[0].id, msg.Add( msg.MESSAGE_ACTION.tab_selected ));
            } else {
                setMenuAndIcon( tabs[0].id, -1 );
            }
        } else console.error( "onActivated.addListener error" );
    });
});

/**
 * Listen chrome tab update message, include: `tab_selected`
 */
browser.tabs.onUpdated.addListener( function( tabId, changeInfo, tab ) {
    watch.Pull( tabId );
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
 * Listen chrome tab remove message
 */
browser.tabs.onRemoved.addListener( tabId => watch.Pull( tabId ));

/**
 * Listen chrome page, include: `read`
 */
browser.pageAction.onClicked.addListener( function( tab ) {
    browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.read_mode ));
});

/**
 * Get current tab object
 * 
 * @param {object}   query
 * @param {function} callback
 */
function getCurTab( query, callback ) {
    if ( query.url && query.url.includes( "#" ) ) {
        browser.tabs.query( {}, tabs => callback( tabs.filter( tab => tab.url == query.url && tab.active ) ) );
    } else browser.tabs.query( query, function( tabs ) { callback( tabs ); });
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
        browser.pageAction.hide( id );
        menu.Remove( "read" );
    } else {
        icon = "-enable";
        browser.pageAction.show( id );
        storage.option.menu.read === true && menu.Create( "read" );
    }
    browser.pageAction.setIcon({ tabId: id, path: browser.extension.getURL( `assets/images/icon16${icon}.png` ) });
}