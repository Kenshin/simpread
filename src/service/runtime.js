console.log( "=== simpread runtime load ===" )

import nanoid    from 'nanoid';
import {browser} from 'browser';
import {storage, Clone} from 'storage';

/**
 * Generate ID
 * 
 * @param {string} generate id, include: user id( uuid v4 ), plugin id( like t.co/cKPFh3Qsh4 )
 */
function generateID( type ) {
    if ( type == "user" ) {
        const random = "0123456789abcdefghijklmnopqrstuvwxyz",
              first  = nanoid( random, 8 ),
              second = nanoid( random, 4 ),
              third  = nanoid( random, 4 ),
              fourth = nanoid( random, 4 ),
              fifth  = nanoid( random, 12 );
        return `${first}-${second}-${third}-${fourth}-${fifth}`;
    } else if ( type == "plugin" ) {
        return nanoid( "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 10 );
    }
}

/**
 * Install plugin
 * 
 * @param {string} id  e.g. kw36BtjGu0
 * @param {string} url
 */
function install( id, url, callback ) {
    url = id ? `http://simpread.ksria.cn/plugins/srplug/${id}.srplug` : url;
    url = url + `?${+new Date()}`;
    console.log( "install url is", url )
    $.ajax({ url, dataType: "json" })
    .done( result => callback( result, undefined  ))
    .fail( ()     => callback( undefined, "error" ));
}

/**
 * Execute
 * 
 * @param {string} state, include: read_start, read_loading, read_complete, read_end
 * @param {string} site name, inlcude: "", "xxx", "xxx, yyy"
 * @param {object} plugin object
 */
function exec( state, site, plugin ) {
    if ( plugin.enable == false ) return;
    if ( plugin.run_at != state ) return;
    if ( plugin.site   != "" && !plugin.site.split(",").includes( site ) ) return;
    console.log( "current plugin is running", plugin )
    new Function( func( plugin.script ) )();
    plugin.style != "" && addStyle( plugin.style );
}

/**
 * Contact (function(){})() string
 * 
 * @param {string} source 
 */
function func( source ) {
    window.Notify  = Notify;
    window.browser = browser;
    window.current = Clone( storage.pr.current );
    window.read    = Clone( storage.read );
    return `( function ( $$version, $title, $desc, $content, $footer, $process, $toc, Notify, browser, $$current, $$read ) {
        ${ source }
    })( "0.0.1", $( "sr-rd-title" ), $( "sr-rd-desc" ), $( "sr-rd-content" ), $( "sr-rd-footer" ), $( "read-process" ), $( "toc" ), Notify, browser, current, read );`
}

/**
 * Add style
 * 
 * @param {string} add css to head
 */
function addStyle( str ) {
    $( "head" ).append(`<style type="text/css">${str}</style>`);
}

/**
 * Test Plugin
 * 
 * @param {func} style func
 * @param {func} plugin func
 */
function testPlugin( style, plugin ) {
    style  && addStyle( style() );
    plugin && plugin( "0.0.1", $( "sr-rd-title" ), $( "sr-rd-desc" ), $( "sr-rd-content" ), $( "sr-rd-footer" ), $( "read-process" ), $( "toc" ), Notify, browser, storage.pr.current, storage.read );
}

window.simpread = { testPlugin };

export {
    install as Install,
    exec    as Exec,
    generateID as ID,
}