console.log( "=== simpread storage load ===" )

import "babel-polyfill";
import * as st from 'site';

/**
 * Read and Write Chrome storage
 * 
 * @class
 */

const name = "simpread",
    remote = "http://ojec5ddd5.bkt.clouddn.com/website_list.json",
    local  = chrome.extension.getURL( "website_list.json" ),
    mode   = {
        focus     : "focus",
        read      : "read",
        option    : "option",
    },
    site   = {
        name      : "",   // only read mode
        title     : "",   // only read mode
        desc      : "",   // only read mode
        exclude   : [],
        include   : "",
    },
    focus  = {
        version   : "2016-12-29",
        bgcolor   : "rgba( 235, 235, 235, 0.9 )",
        opacity   : 90,
        shortcuts : "A S",
        sites     : [],    // e.g. [ "<url>", site ]
    },
    read   = {
        version   : "2017-01-07",
        shortcuts : "A A",
        theme     : "theme1",
        fontfamily: "",
        fontsize  : 14,
        sites     : []    // e.g. [ "<url>", site ]
    };

let current  = {},
    origin   = {},
    simpread = {
        focus,
        read,
        sites  : [],
        option : {},
    };

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
     * Get simpread.read data structure
     * 
     * @return {object} simpread["read"]
     */
    get read() {
        return simpread[ mode.read ];
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
     * Set current object, current object structure include:
     * 
     * focus mode: { url, mode, site, shortcuts, bgcolor, opacity }
     * read  mode: { url, mode, site, shortcuts, theme, fontsize, fontfamily }
     * 
     * @param {string} @see mode
     * @param {int} -1: not found; 0: simpread.read.sites; 1: simpread.sites
     */
    Setcur( key ) {
        let code = 0;
        const [ url, sites ] = [ st.GetURI(), new Map( simpread[key].sites )];
        current      = swap( simpread[key], {} );
        current.url  = url;
        current.mode = key;
        current.site = sites.get( url );
        while( !current.site ) {
            const arr = st.Getsite( new Map( simpread.sites ), url );
            if ( arr ) {
                current.site = arr[0];
                current.url  = arr[1];
                code = 1;
            } else {
                sites.set( url, clone( site ));
                current.site = sites.get( url );
                code = -1;
            }
            simpread[key].sites.push([ current.url, current.site ]);
        }
        console.log( "current site object is ", current )
        return code;
    }

    /**
     * Save simpread to chrome storage
     * 
     * @param {string} @see mode
     */
    Set( key ) {
        swap( current, simpread[key] );
        save();
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
            console.log( "chrome storage read success!", simpread, origin, result );
        });
    }

    /**
     * Get local/remote JSON usage async
     * 
     * @param {string} url, e.g. chrome-extension://xxxx/website_list.json or http://xxxx.xx/website_list.json
     */
    async GetNewsites( type ) {
        try {
            const url    = type === "remote" ? remote : local,
                response = await fetch( url + "?_=" + Math.round(+new Date()) ),
                sites    = await response.json(),
                len      = simpread.sites.length;
            if ( len == 0 ) {
                simpread.sites = formatSites( sites );
            }
            if ( len == 0 || addsites( formatSites( sites )) ) {
                save();
            }
        } catch ( error ) {
            console.error( error );
        }
    }

    /**
     * Verity current changed
     * 
     * @param {string} @see mode
     */
    VerifyCur( type ) {
        return ( current.mode && current.mode != type ) ||
               ( current.url  && current.url != st.GetURI() ) ||
               $.isEmptyObject( current );
    }

}

/**
 * Swap source and target property
 * 
 * @param {object} source origin
 * @param {object} target origin
 */
function swap( source, target ) {
    for ( const key of Object.keys( source ) ) {
        if ( ![ "site", "sites", "version", "url", "mode" ].includes( key ) ) {
            target[key] = source[key];
        }
    }
    return target;
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
 * @param  {array} new sites from local or remote
 * @return {boolean} true: update; false:not update
 */
function addsites( sites ) {
    const old  = new Map( simpread.sites ),
          urls = [ ...old.keys() ];
    let   update = false;
    sites.map( ( site, index ) => {
        if ( !urls.includes( site[0] ) ) {
            simpread.sites.push([ site[0], site[1] ]);
            update = true;
        } else if ( urls.includes( site[0] ) && site[1].override ) {
            simpread.sites.splice( index, 1, site );
            update = true;
        }
    });
    return update;
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
    mode  as STORAGE_MODE,
    clone as Clone
};