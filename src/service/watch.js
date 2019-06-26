console.log( "=== simpread watch load ===" )

import * as msg    from 'message';
import {br,browser}from 'browser';

const watcher = {
        site   : new Map(),
        import : new Map(),
        version: new Map(),
        option : new Map(),
    };

/**
 * Message watcher push
 * 
 * @param {string} type watcher object, incude: site
 * @param {string} value watcher object state
 */
function message( type, value ) {
    browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.updated, { type, value } ));
}

/**
 * Push watcher target
 * 
 * @param {string} type watcher object, incude: site
 * @param {string} value watcher object state
 */
function push( type, value ) {
    getCurAllTabs( type );
}

/**
 * Pull( remove ) watcher by tabid
 * 
 * @param {string} tab id
 */
function pull( tabid ) {
    Object.values( watcher ).forEach( item => item.delete( tabid ));
}

/**
 * Lock
 * 
 * @param  {string} url
 * @return {object} return wacher item, when url exist tabs status is lock( true ), else is unlock( false )
 */
function lock( url ) {
    try {
        return {
            site   : [ ...watcher.site.values()   ].includes( url ),
            import : [ ...watcher.import.values() ].includes( url ),
            version: [ ...watcher.version.values()].includes( url ),
            option : [ ...watcher.option.values() ].includes( url ),
        };
    } catch( error ) {
        console.error( "watch.Lock has same failed, ", error );
        return { site: false, import: false };
    }
}

/**
 * Verify
 * 
 * @param {fucntion} callback watch.Lock() state, result
 */
function verify( callback ) {
    !br.isFirefox() ?
    browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.save_verify, { url: window.location.href }), result => {
        callback( result.site || result.import || result.version || result.option, result );
    }) : callback( false );
}

/**
 * Get current all tabs
 * 
 * @param {string} @see wathc.Push()
 */
function getCurAllTabs( type ) {
    browser.tabs.query( {}, result => {
        result.forEach( tab => watcher[type].set( tab.id, tab.url ));
    });
}

export {
    message as SendMessage,
    push    as Push,
    pull    as Pull,
    verify  as Verify,
    lock    as Lock,
}