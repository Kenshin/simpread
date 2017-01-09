console.log( "=== simpread storage load ===" )

import "babel-polyfill";

/**
 * Read and Write Chrome storage
 * 
 * @class
 */

/**
 * Storage mode, include `focus` `read` `option` 
 */
const mode = {
        focus  : "focus",
        read   : "read",
        option : "option",
    },
    name   = "simpread",
    remote = "http://ojec5ddd5.bkt.clouddn.com/website_list.json",
    local  = chrome.extension.getURL( "website_list.json" );

let site  = {
        name      : "",   // only read mode
        title     : "",   // only read mode
        desc      : "",   // only read mode
        exclude   : [],
        include   : "",
    },
    current = {
        bgcolor: "",
        opacity: "",
        url    : "",
        site   : site,
    },
    focus = {
        version   : "2016-12-29",
        bgcolor   : "rgba( 235, 235, 235, 0.9 )",
        opacity   : 90,
        shortcuts : "A S",
        sites     : [],    // e.g. [ "<url>", site ]
    },
    read  = {
        version   : "2017-01-07",
        theme     : "",
        fontfamily: "",
        fontsize  : 14,
        sites     : []    // e.g. [ "<url>", site ]
    },
    simpread = {
        focus,
        read,
        sites  : [],
        option : {},
    },
    origin  = {};

class Storage {

    /**
     * Get simpread.focus data structure
     * 
     * @return {object} simpread["focus"]
     */
    get focus() {
        return simpread[ mode.focus ];
    }

    /**
     * Get current data structure
     * 
     * @return {object} current
     */
    get current() {
        return current;
    }

    /**
     * Restore simpread[key]
     * 
     * @param {string} @see mode
     */
    Restore( key ) {
        simpread[key] = clone( origin[key] );
        this.Setcur( key );
    }

    /**
     * Set current object
     * 
     * @param {string} @see mode
     */
    Setcur( key ) {
        const [ url, sites ] = [getURI(), new Map( simpread[key].sites )];
        current.site = sites.get( url );
        current.url  = url;
        while( !current.site ) {
            sites.set( url, clone( site ));
            current.site = sites.get( url );
            simpread[key].sites.push([ url, sites.get(url) ]);
        }
        swap( simpread[key], current );
        console.log( "current site object is ", current )
        return current;
    }

    /**
     * Save simpread to chrome storage
     * 
     * @param {string} @see mode
     */
    Set( key ) {
        swap( current, simpread[key] );
        chrome.storage.local.set( { [name] : simpread }, function(){
            console.log( "save chrome storage success!", simpread );
            origin   = clone( simpread );
        });
    }

    /**
     * Get simpread object from chrome storage
     * 
     * @param {function} callback
     */
    Get ( callback ) {
        chrome.storage.local.get( [name], function( result ) {
            if ( result && !$.isEmptyObject( result )) {
                simpread = result[name];
            }
            origin   = clone( simpread );
            callback();
            console.log( "simpread storage result is", result, simpread, origin );
        });
    }

    /**
     * Get local/remote JSON usage async
     * 
     * @param  {string} url, e.g. chrome-extension://xxxx/website_list.json or http://xxxx.xx/website_list.json
     */
    async GetNewsites( type ) {
        const response = await fetch( type === "remote" ? remote : local ),
              sites    = await response.json(),
              len      = simpread.sites.length;
        if ( len == 0 ) {
            simpread.sites = formatSites( sites );
        } else {
            addsites( formatSites( sites ));
        }
        if ( len == 0 || len != simpread.sites.length ) {
            save();
        }
    }

}

/**
 * Swap source and target
 * 
 * @param {object} source origin
 * @param {object} target origin
 */
function swap( source, target ) {
    target.bgcolor   = source.bgcolor;
    target.shortcuts = source.shortcuts;
    target.opacity   = source.opacity;
}

/**
 * Get URI
 * 
 * @return {string} e.g. current site url is http://www.cnbeta.com/articles/1234.html return http://www.cnbeta.com/articles/
 */
function getURI() {
    const arr = window.location.pathname.match( /(\S+\/|^\/)/g );
    return `${ window.location.protocol }//${ window.location.hostname }${ arr[0] }`;
}

/**
 * Deep clone object
 * 
 * @param  {object} target object
 * @return {object} new target object
 */
function clone( target ) {
    return $.extend( true, {}, target );
}

/**
 * Format sites object from loacal or remote json file
 * 
 * @param  {object} sites.[array]
 * @return {array} foramat e.g. [[ <url>, object ],[ <url>, object ]]
 */
function formatSites( result ) {
    const format = new Map();
    for ( let site of result.sites ) {
        const url = site.url;
        delete site.url;
        format.set( url, site );
    }
    return [ ...format ];
}

/**
 * Add new sites to old sites
 * 
 * @param {array} new sites from local or remote
 */
function addsites( sites ) {
    const old  = new Map( simpread.sites );
    const urls = [ ...old.keys() ];
    let   news = [];
    for ( const site of sites ) {
        if ( !urls.includes( site[0] ) ) {
            news.push( site[0], site[1] );
        }
    }
    if ( news.length > 0 ) simpread.sites.push( news );
}

/**
 * Call chrome storage set
 */
function save() {
    chrome.storage.local.set( { [name] : simpread }, function() {
        console.log( "chrome storage save success!", simpread );
        origin   = clone( simpread );
    });
}

const storage = new Storage();

export {
    storage,
    mode as STORAGE_MODE
};