console.log( "=== simpread runtime load ===" )

import nanoid           from 'nanoid';

import {browser}        from 'browser';
import {storage, Clone} from 'storage';
import * as highlight   from 'highlight';
import * as watch       from 'watch';

let is_firstload = true;

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
    } else if ( type == "site" ) {
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
    url = id ? `https://simpread.ksria.cn/plugins/srplug/${id}.srplug` : url;
    url = url + `?${+new Date()}`;
    console.log( "install url is", url )
    $.ajax({ url, dataType: "json" })
    .done( result => callback( result, undefined  ))
    .fail( ()     => callback( undefined, "error" ));
}

/**
 * Dispatch event
 * 
 * @param {string} type include: export, read_ui, read_start, read_end
 * @param {string} value
 */
function dispatch( type, value ) {
    window.dispatchEvent( new CustomEvent( "simpread-plugin", { detail: { type, value }}));
}

/**
 * Execute
 * 
 * @param {string} state, include: read_start, read_loading, read_complete, read_end
 * @param {string} site name, inlcude: "", "xxx", "xxx, yyy"
 * @param {object} plugin object
 */
function exec( state, site, plugin ) {
    try {
        if ( plugin.enable == false ) return;
        if ( plugin.run_at != state ) return;
        if ( plugin.site   != "" && !plugin.site.split(",").includes( site ) ) return;
        console.log( "current plugin is running", plugin )
        new Function( func( plugin.script ) )();
        plugin.style != "" && addStyle( plugin.style );
    } catch ( error ) {
        new Notify().Render( 2, `插件 ${ plugin.name } 运行时出错，可以的话，请 <a href="https://github.com/Kenshin/simpread/issues/new" target="_blank">提交此问题</a> 😁` );
    }
}

/**
 * Contact (function(){})() string
 * 
 * @param {string} source 
 */
function func( source ) {
    window.Notify  = Notify;
    window.browser = browser;
    window.current = Clone( storage.current );
    window.read    = Clone( storage.read );
    window.highlight = highlight;
    window.db      = Storage;
    window.control = Controlbar;
    window.SRSave  = Save;
    return `( function ( $$version, $read, $title, $desc, $content, $footer, $process, $toc, Notify, $$highlight, browser, $$storage, $$current, $$read, $$control, $$save ) {
        ${ source }
    })( "0.0.2", $( "sr-read" ), $( "sr-rd-title" ), $( "sr-rd-desc" ), $( "sr-rd-content" ), $( "sr-rd-footer" ), $( "read-process" ), $( "toc" ), Notify, highlight, browser, db, current, read, control, SRSave );`
}

/**
 * Getter / Setter plugin config
 * 
 * @param {string} plugin id
 * @param {object} data
 * @param {func} callback 
 */
function Storage( id, data, callback ) {
    if ( data ) {
        browser.storage.local.set( { ["plugin-"+id] : data }, () => {
            callback && callback();
        });
    } else {
        browser.storage.local.get( ["plugin-"+id], result => {
            callback && callback( result );
        });
    }
}

/**
 * Contorlbar setting
 * 
 * @param {string} controlbar type include: markdown 
 * @param {func} callback
 */
function Controlbar( type, callback ) {
    if ( callback ) {
        is_firstload && window.addEventListener( "simpread-plugin_controlbar", event => {
            callback( event );
        });
    } else window.dispatchEvent( new CustomEvent( "simpread-plugin_controlbar", { detail: { type }}));
    is_firstload = false;
}

/**
 * Save adapter storage.Write
 * 
 * @param {object} simpread data structure
 * @param {func}   callback
 */
function Save( data, callback ) {
    if ( data ) {
        storage.Write( ()=> {
            watch.SendMessage( "option", true );
            callback();
        }, storage.simpread );
    } else {
        return {
            focus  : storage.focus,
            read   : storage.read,
            option : storage.option,
            version: storage.version
        }
    }
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
 * Add trigger
 * 
 * @param {string} add trigger to fap controlbar
 */
function addTrigger( str ) {
    let is_found = false;
    $( "fap action-bar" ).find( "sr-opt-label" ).map( ( idx, item ) => {
        if ( $(item).text() == "插件触发器" ) {
            is_found = true;
            $(item).next().append( str );
        }
    });
    if ( is_found == false ) {
        const html = `<sr-opt-gp>
                        <sr-opt-label>插件触发器</sr-opt-label>
                        <actions style="display:flex;margin:10px 0;flex-wrap:wrap;">
                            ${str}
                        </actions>
                      </sr-opt-gp>`;
        $( "fap action-bar" ).append( html );
    }
}

/**
 * Test Plugin
 * 
 * @param {func} style func
 * @param {func} plugin func
 * @param {func} trigger func
 */
function testPlugin( style, plugin, trigger ) {
    style  && addStyle( style() );
    plugin && plugin( "0.0.2",
                      $( "sr-read" ), $( "sr-rd-title" ), $( "sr-rd-desc" ), $( "sr-rd-content" ), $( "sr-rd-footer" ), $( "read-process" ), $( "toc" ),
                      Notify, highlight,
                      browser, Storage,
                      storage.current, storage.read, Controlbar, Save );
    trigger && addTrigger( trigger() );
}

window.simpread = { testPlugin };

export {
    install as Install,
    exec    as Exec,
    generateID as ID,
    dispatch as Event,
    Controlbar,
}