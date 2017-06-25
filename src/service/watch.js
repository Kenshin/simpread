console.log( "=== simpread storage load ===" )

import * as msg    from 'message';
import {browser}   from 'browser';

const watcher = {
        site : false,
    },
    tabs = new Map();

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
    watcher[type] = value;
}

/**
 * Pull( remove ) watcher by tabid
 * 
 * @param {string} tab id
 */
function pull( tabid ) {
    tabs.delete( tabid );
}

/**
 * Lock
 * 
 * @param  {string} url
 * @return {boolen} when url exist tabs status is lock( true ), else is unlock( false )
 */
function lock( url ) {
    try {
        return { site: [ ...tabs.values()].includes( url ) };
    } catch( error ) {
        console.error( "watch.Lock has same failed, ", error );
        return false;
    }
}

/**
 * Verify
 * 
 * @param {fucntion} callback watch.Lock() result
 */
function verify( callback ) {
    browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.save_verify, { url: window.location.href }), result => {
        callback( result );
    });
}

/**
 * Get current all tabs
 * 
 * @param {string} @see wathc.Push()
 */
function getCurAllTabs( type ) {
    browser.tabs.query( {}, result => {
        result.forEach( tab => tabs.set( tab.id, tab.url ));
    });
}

export {
    message as SendMessage,
    push    as Push,
    pull    as Pull,
    verify  as Verify,
    lock    as Lock,
}