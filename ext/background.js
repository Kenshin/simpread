console.log( "=== simpread background load ===" )

import local       from 'local';
import { storage } from 'storage';
import * as msg    from 'message';
import {browser,br}from 'browser';
import * as ver    from 'version';
import * as menu   from 'menu';
import * as watch  from 'watch';

import PureRead    from 'pureread';

/**
 * Sevice: storage Get data form chrome storage
 */
storage.Read( () => {
    storage.puread = new PureRead( storage.sites );
    if ( local.Firstload() ) {
        local.Version( ver.version );
        browser.tabs.create({ url: browser.extension.getURL( "options/options.html#firstload?ver=" + ver.version ) });
    }
    else {
       !local.Count() && storage.GetRemote( "remote", ( result, error ) => {
            if ( !error ) {
                storage.pr.Addsites( result );
                storage.Writesite( storage.pr.sites, getNewsitesHandler );
            }
        });
        ver.version != storage.version && storage.GetRemote( "local", ( result, error ) => {
            storage.pr.Addsites( result );
            storage.Writesite( storage.pr.sites, () => {
                ver.version != storage.version &&
                storage.Fix( storage.read.sites, storage.version, ver.version, storage.focus.sites );
                ver.version != storage.version && storage.Write( () => {
                        local.Version( ver.version );
                        browser.tabs.create({ url: browser.extension.getURL( "options/options.html#update?ver=" + ver.version ) });
                }, ver.Verify( storage.version, storage.simpread ) );
                getNewsitesHandler( result );
            });
        });
        // only firefox and only usage 1.1.0.3024
        if ( ver.version == storage.version && ver.sub_ver == "3024" && !localStorage["bg-3024"] ) {
            browser.tabs.create({ url: browser.extension.getURL( "options/options.html#firstload?ver=" + ver.version ) });
            localStorage["bg-3024"] = ver.sub_ver;
        }
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
    } else if ( info.menuItemId == "list" ) {
        browser.tabs.create({ url: browser.extension.getURL( "options/options.html#later" ) });
    } else {
        if ( !tab.url.startsWith( "moz-extension://" ) ) browser.tabs.sendMessage( tab.id, msg.Add(info.menuItemId));
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
        case msg.MESSAGE_ACTION.auth:
            browser.tabs.create({ url: browser.extension.getURL( "options/options.html#labs?auth=" + request.value.name.toLowerCase() ) });
            break;
        case msg.MESSAGE_ACTION.auth_success:
            getCurTab( { url: request.value.url }, tabs => {
                if ( tabs && tabs.length > 0 ) {
                    browser.tabs.remove( tabs[0].id );
                    getCurTab( { "active": true }, tabs => {
                        tabs.forEach( tab => browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.export, {type: request.value.name.toLowerCase()} )) );
                    });
                }
            });
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
            if ( tabs && tabs.length > 0 && !tabs[0].url.startsWith( "moz-extension://" ) ) {
                browser.tabs.sendMessage( tabs[0].id, msg.Add( msg.MESSAGE_ACTION.tab_selected, { is_update: false } ));
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

        if ( tab.url.startsWith( "http://ksria.com/simpread/auth.html" )) {
            const url = tab.url.replace( "http://ksria.com/simpread/auth.html?id=", "" ),
                  id  = url.includes( "#" ) || url.includes( "&" ) ? url.substr( 0, url.search( /\S(#|&)/ ) + 1 ) : url ;
            browser.tabs.query( {}, tabs => {
                const opts = tabs.find( tab => tab.url.includes( browser.extension.getURL( "options/options.html" ) ));
                if ( opts ) {
                    browser.tabs.sendMessage( opts.id, msg.Add( msg.MESSAGE_ACTION.redirect_uri, { uri: tab.url, id } ));
                    browser.tabs.remove( tabId );
                }
            });
        }

        if ( !tab.url.startsWith( "moz-extension://" ) ) {
            browser.tabs.sendMessage( tabId, msg.Add( msg.MESSAGE_ACTION.tab_selected, { is_update: true } ));
            storage.ReadAsync( ( simpread, secret ) => {
                browser.tabs.sendMessage( tabId, msg.Add( msg.MESSAGE_ACTION.storage, { simpread, secret } ));
            });
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
    browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.browser_click ));
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
        menu.Update( "tempread" );
        browser.pageAction.setTitle({ tabId: id, title: "简悦 - 当前页面未适配阅读模式，点击进入临时阅读模式"});
    } else {
        icon = "-enable";
        storage.option.menu.read === true && menu.Create( "read" );
        menu.Update( "read" );
        browser.pageAction.setTitle({ tabId: id, title: "简悦 - 当前页面已适配阅读模式"});
    }
    browser.pageAction.show( id );
    browser.pageAction.setIcon({ tabId: id, path: browser.extension.getURL( `assets/images/icon16${icon}.png` ) });
}

/**
 * Listen browser page action
 */
browser.browserAction.onClicked.addListener( () => browser.runtime.openOptionsPage() );