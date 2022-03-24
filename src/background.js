console.log( "=== simpread background load ===" )

import local       from 'local';
import { storage } from 'storage';
import * as msg    from 'message';
import {browser}   from 'browser';
import * as ver    from 'version';
import * as menu   from 'menu';
import * as watch  from 'watch';
import * as WebDAV from 'webdav';
import * as permission
                   from 'permission';
import * as tips   from 'tips';
import PureRead    from 'puread';

// global update site tab id
let upTabId = -1;

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
        ver.version == storage.version && ver.patch != storage.patch &&
            storage.Write(()=> {
                // when x.x.x.yyyy is silent update
                //browser.tabs.create({ url: browser.extension.getURL( "options/options.html#update?patch=" + ver.patch ) });
                //localStorage.setItem( "simpread-patch-update", true );
                local.Patch( "add", true );
            }, ver.FixSubver( ver.patch, storage.simpread ));
    }
    menu.CreateAll();
    setTimeout( ()=>uninstall(), 100 );
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
    tracked({ eventCategory: "menu", eventAction: "menu", eventValue: info.menuItemId });
    if ( info.menuItemId == "link" ) {
        info.linkUrl && browser.tabs.create({ url: info.linkUrl + "?simpread_mode=read" });
    } else if ( info.menuItemId == "list" ) {
        browser.tabs.create({ url: browser.extension.getURL( "options/options.html#later" ) });
    } else if ( info.menuItemId == "whitelist" ) {
        browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.menu_whitelist, {url: info.pageUrl } ));
    } else if ( info.menuItemId == "exclusion" ) {
        browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.menu_exclusion, {url: info.pageUrl } ));
    } else if ( info.menuItemId == "blacklist" ) {
        browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.menu_blacklist, {url: info.pageUrl } ));
    } else if ( info.menuItemId == "unrdist" ) {
        browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.menu_unrdist, {url: info.pageUrl } ));
    } else if ( info.menuItemId == "lazyload" ) {
        browser.tabs.sendMessage( tab.id, msg.Add( msg.MESSAGE_ACTION.menu_lazyload, {url: info.pageUrl } ));
    } else {
        if ( !tab.url.startsWith( "chrome://" ) ) browser.tabs.sendMessage( tab.id, msg.Add(info.menuItemId));
    }
});

/**
 * Listen runtime message, include: `corb`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if ( request.type == msg.MESSAGE_ACTION.CORB ) {
        $.ajax( request.value.settings )
            .done( result => {
                sendResponse({ done: result });
            })
            .fail( ( jqXHR, textStatus, errorThrown ) => {
                sendResponse({ fail: { jqXHR, textStatus, errorThrown }});
            });
    }
    return true;
});

/**
 * Listen runtime message, include: `jianguo`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if ( request.type == msg.MESSAGE_ACTION.jianguo ) {
        const { url, user, password, method } = request.value;
        const dav = new WebDAV.Fs( url, user, password );
        if ( method.type == "folder" ) {
            dav.dir( method.root ).mkdir( result => {
                dav.dir( method.root + "/" + method.folder ).mkdir( result => {
                    sendResponse({ done: result, status: result.status });
                });
            })
        } else if ( method.type == "file" ) {
            dav.file( method.path ).write( method.content, result => {
                sendResponse({ done: result, status: result.status });
            });
        } else if ( method.type == "read" ) {
            dav.file( method.path ).read( result => {
                sendResponse({ done: result.response, status: result.status });
            });
        }
    }
    //return true;
});

/**
 * Listen runtime message, include: `webdav`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if ( request.type == msg.MESSAGE_ACTION.WebDAV ) {
        const { url, user, password, method } = request.value;
        const dav = new WebDAV.Fs( url, user, password );
        if ( method.type == "folder" ) {
            dav.dir( method.root ).mkdir( result => {
                sendResponse({ done: result, status: result.status });
            })
        } else if ( method.type == "file" ) {
            dav.file( method.root + "/" + method.name ).write( method.content, result => {
                sendResponse({ done: result, status: result.status });
            });
        }
    }
    //return true;
});

/**
 * Listen runtime message, include: `download`, `base64` && `permission`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if ( request.type == msg.MESSAGE_ACTION.download ) {
        const { data, name } = request.value;
        const blob = new Blob([data], {
            type: "html/plain;charset=utf-8"
        });
        const url = URL.createObjectURL(blob);
        browser.downloads.download({
            url     : url,
            filename: name.replace( /[|]/ig, "" ),
        }, downloadId => {
            sendResponse({ done: downloadId });
        });
    } else if ( request.type == msg.MESSAGE_ACTION.base64 ) {
        const { url } = request.value;
        fetch( url )
            .then( response => response.blob() )
            .then( blob     => new Promise(( resolve, reject ) => {
                const reader = new FileReader()
                reader.onloadend = event => {
                    sendResponse({ done: { url, uri: event.target.result }});
                };
                reader.onerror = error => {
                    sendResponse({ fail: { error, url } });
                };
                reader.readAsDataURL( blob );
            }))
            .catch( error => {
                sendResponse({ fail: { error, url } });
            });
    } else if ( request.type == msg.MESSAGE_ACTION.permission ) {
        permission.Get({ permissions: [ "downloads" ] }, result => {
            sendResponse({ done: result });
        });
    }
    return true;
});

/**
 * Listen runtime message, include: `snapshot`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if ( request.type == msg.MESSAGE_ACTION.snapshot ) {
        const { left, top, width, height } = request.value;
        chrome.tabs.captureVisibleTab( { format: "png" }, base64 => {
            const image  = new Image();
            image.src    = base64;
            image.onload = () => {
                const canvas  = document.createElement( "canvas" ),
                      ctx     = canvas.getContext( "2d" ),
                      dpi     = window.devicePixelRatio,
                      sx      = left   * dpi,
                      sy      = top    * dpi,
                      sWidth  = width  * dpi,
                      sHeight = height * dpi;
                canvas.width  = sWidth;
                canvas.height = sHeight;
                ctx.drawImage( image, sx, sy, sWidth, height * dpi, 0, 0, sWidth, sHeight );
                const uri     = canvas.toDataURL( "image/png" );
                sendResponse({ done: uri });
          };
        });
    }
    return true;
});

/**
 * Listen runtime message
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
        case msg.MESSAGE_ACTION.close_tab:
            getCurTab( { "active": true }, tabs => {
                tabs.forEach( tab => {
                    tab.active && tab.url == request.value.url &&
                        browser.tabs.remove( tab.id );
                });
            });
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
            getCurTab({ active: true, url: request.value.url }, tabs => {
                tabs.length > 0 && ( upTabId = tabs[0].id );
                browser.tabs.create({ url: browser.extension.getURL( "options/options.html#sites?update=" + encodeURI( JSON.stringify( request.value.site ))) });
            });
            break;
        case msg.MESSAGE_ACTION.save_site:
            browser.tabs.create({ url: browser.extension.getURL( "options/options.html#sites?pending=" + encodeURI( JSON.stringify( request.value ))) });
            break;
        case msg.MESSAGE_ACTION.temp_site:
            browser.tabs.create({ url: browser.extension.getURL( "options/options.html#sites?temp=" + encodeURI( JSON.stringify( request.value ))) });
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
        case msg.MESSAGE_ACTION.tips:
            tips.Verify( request.value.code, sendResponse );
            break;
        case msg.MESSAGE_ACTION.tips_norepeat:
            tips.Done( request.value.code );
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
        browser.tabs.get(tabId, tab => {
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
            } else if ( tab.url.startsWith( "https://simpread.ksria.cn/plugins/install/" )) {
                const url = tab.url.replace( "https://simpread.ksria.cn/plugins/install/", "" );
                browser.tabs.create({ url: browser.extension.getURL( "options/options.html#plugins?install=" + encodeURIComponent(url) ) });
                browser.tabs.remove( tabId );
            } else if ( tab.url.startsWith( "https://simpread.ksria.cn/sites/install/" )) {
                const url = tab.url.replace( "https://simpread.ksria.cn/sites/install/", "" );
                browser.tabs.create({ url: browser.extension.getURL( "options/options.html#sites?install=" + encodeURIComponent(url) ) });
                browser.tabs.remove( tabId );
            } else if ( tab.url == browser.runtime.getURL( "options/options.html#sites?update=success" ) ) {
                browser.tabs.remove( tabId );
                upTabId > 0 && chrome.tabs.reload( upTabId, () => { upTabId == -1; });
            } else if ( tab.url == browser.runtime.getURL( "options/options.html#sites?update=failed" ) ) {
                browser.tabs.remove( tabId );
            } else if ( tab.url == browser.runtime.getURL( "options/options.html#sites?update=complete" ) ) {
                browser.tabs.remove( tabId );
            } else if ( tab.url == browser.runtime.getURL( "options/options.html#sites?update=pending" ) ) {
                browser.tabs.remove( tabId );
                upTabId > 0 && browser.tabs.sendMessage( upTabId, msg.Add( msg.MESSAGE_ACTION.pending_site ));
                upTabId == -1;
            }

            if ( !tab.url.startsWith( "chrome://" ) ) {
                browser.tabs.sendMessage( tabId, msg.Add( msg.MESSAGE_ACTION.tab_selected, { is_update: true } ));
            } else {
                setMenuAndIcon( tab.id, -1 );
            }
        });
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
function tracked({ eventCategory, eventAction, eventValue }) {
    console.log( "current track is", eventCategory, eventAction, eventValue )
    _gaq.push([ '_trackEvent', eventCategory, eventValue ]);
}

/**
 * Uninstall
 */
function uninstall() {
    browser.runtime.setUninstallURL( storage.option.uninstall ? storage.service + "/uninstall" : "" );
    tracked({ eventCategory: "install", eventAction: "install", eventValue: "uninstall" });
}