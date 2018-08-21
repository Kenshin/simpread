console.log( "=== simpread background load ===" )

import local       from 'local';
import { storage } from 'storage';
import * as msg    from 'message';
import {browser}   from 'browser';
import * as ver    from 'version';
import * as menu   from 'menu';
import * as watch  from 'watch';

import PureRead    from 'puread';

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
        case msg.MESSAGE_ACTION.auth:
            browser.tabs.create({ url: browser.extension.getURL( "options/options.html#labs?auth=" + request.value.name.toLowerCase() ) });
            break;
        case msg.MESSAGE_ACTION.update_site:
            browser.tabs.create({ url: browser.extension.getURL( "options/options.html#sites?update=" + encodeURI( JSON.stringify( request.value.site ))) });
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
        case msg.MESSAGE_ACTION.track:
            tracked( request.value );
            break;
        case msg.MESSAGE_ACTION.speak:
            browser.tts.speak( request.value.content );
            break;
        case msg.MESSAGE_ACTION.speak_stop:
            browser.tts.stop();
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
        } else if ( tab.url.startsWith( "http://simpread.ksria.cn/plugins/install/" )) {
            const url = tab.url.replace( "http://simpread.ksria.cn/plugins/install/", "" );
            browser.tabs.create({ url: browser.extension.getURL( "options/options.html#plugins?install=" + encodeURIComponent(url) ) });
            browser.tabs.remove( tabId );
        } else if ( tab.url.startsWith( "http://simpread.ksria.cn/sites/install/" )) {
            const url = tab.url.replace( "http://simpread.ksria.cn/sites/install/", "" );
            browser.tabs.create({ url: browser.extension.getURL( "options/options.html#sites?install=" + encodeURIComponent(url) ) });
            browser.tabs.remove( tabId );
        } else if ( tab.url == browser.runtime.getURL( "options/options.html#sites?update=success" ) ) {
            browser.tabs.remove( tabId );
        } else if ( tab.url == browser.runtime.getURL( "options/options.html#sites?update=failed" ) ) {
            browser.tabs.remove( tabId );
        }

        if ( !tab.url.startsWith( "chrome://" ) ) {
            browser.tabs.sendMessage( tabId, msg.Add( msg.MESSAGE_ACTION.tab_selected, { is_update: true } ));
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
        browser.pageAction.hide( id );
        menu.Update( "tempread" );
    } else {
        icon = "-enable";
        browser.pageAction.show( id );
        storage.option.menu.read === true && menu.Create( "read" );
        menu.Update( "read" );
    }
    browser.pageAction.setIcon({ tabId: id, path: browser.extension.getURL( `assets/images/icon16${icon}.png` ) });
}

/**
 * Track
 * 
 * @param {object} google analytics track object
 */
function tracked({ eventCategory, eventAction, eventLabel }) {
    console.log( "current track is", eventCategory, eventAction, eventLabel )
    ga( 'send', {
        hitType      : 'event',
        eventCategory,
        eventAction,
        eventLabel
    });
}

/**
 * Google analytics
 */
analytics();
function analytics() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-405976-12', 'auto');
    ga('send', 'pageview');
}