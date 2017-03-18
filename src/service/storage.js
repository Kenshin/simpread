console.log( "=== simpread storage load ===" )

import "babel-polyfill";
import * as st   from 'site';
import {browser} from 'browser';

/**
 * Read and Write Chrome storage
 * 
 * @class
 */

const name = "simpread",
    remote = "http://ojec5ddd5.bkt.clouddn.com/website_list.json",
    local  = browser.extension.getURL( "website_list.json" ),
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
        version   : "2017-03-16",
        shortcuts : "A A",
        theme     : "github",
        fontfamily: "default",
        fontsize  : "",  // default 62.5%
        layout    : "",  // default 20%
        sites     : []   // e.g. [ "<url>", site ]
    };

let current  = {},
    curori   = {},
    origin   = {},
    simpread = {
        focus,
        read,
        sites  : [],
        option : {},
    },
    rdstcode = -1;

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
     * Get read site code
     * 
     * @return {int} @see setCode
     */
    get rdstcode() {
        return rdstcode;
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
     * read  mode: { url, mode, site, shortcuts, theme, fontsize, fontfamily, layout }
     * 
     * @param {string} @see mode
     */
    Setcur( key ) {
        const [ url, sites ] = [ st.GetURI(), new Map( simpread[key].sites )];
        current      = swap( simpread[key], {} );
        current.url  = url;
        current.mode = key;
        let arr = st.Getsite( new Map( simpread[key].sites ), url );
        arr  ? setCode( key, 0 ) : setCode( key, 1 );
        !arr && ( arr = st.Getsite( new Map( simpread.sites ), url ));
        if ( arr ) {
            current.site = arr[0];
            current.url  = arr[1];
        } else {
            sites.set( url, clone( site ));
            current.site = sites.get( url );
            setCode( key, -1 );
        }
        curori      = { ...current };
        curori.site = { ...current.site };
        console.log( "current site object is ", current )
    }

    /**
     * Save simpread to chrome storage
     * 
     * @param {string} @see mode
     */
    Set( key ) {
        const { code } = compare();
        if ( code != 0 ) {
            ( code == 2 || code == 3 ) && simpread[key].sites.push([ current.url, current.site ]);
            swap( current, simpread[key] );
            save();
        }
        return code;
    }

    /**
     * Get simpread object from chrome storage
     * 
     * @param {function} callback
     */
    Get ( callback ) {
        browser.storage.local.get( [name], function( result ) {
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
    const update   = new Map( simpread.sites ),
          urls     = [ ...update.keys() ];
    let   isupdate = false;
    sites.map( ( site ) => {
        if ( !urls.includes( site[0] ) ) {
            simpread.sites.push([ site[0], site[1] ]);
            isupdate = true;
        } else if ( urls.includes( site[0] ) && site[1].override ) {
            update.set( site[0], site[1] );
            simpread.sites = [ ...update ];
            isupdate = true;
        }
    });
    return isupdate;
}

/**
 * Call chrome storage set
 */
function save() {
    browser.storage.local.set( { [name] : simpread }, function() {
        console.log( "chrome storage save success!", simpread );
        origin      = clone( simpread );
        curori      = { ...current };
        curori.site = { ...current.site };
    });
}

/**
 * Set read site code
 * 
 * @param {string} mode type
 * @param {int}    -1: not found; 0: simpread.read.sites; 1: simpread.sites
 */
function setCode( type, value ) {
    if ( type == mode.read ) rdstcode = value;
}

/**
 * Compare current and curori( origin_current )
 * 
 * return {object}
 *      code    {number} include 0: equal； 1: option changed; 2: site changed; 3: all changed
 *      changed {array}  changed key, e.g. [ "theme", "title", "exclude" ]
 */
function compare() {
    let key, code = 0, changed = [], site_changed = false;
    for ( key of Object.keys( curori ) ) {
        if ( typeof curori[key] == "string" && curori[key] != current[key] ) {
            changed.push( key );
            code = 1;
        }
    }
    for ( key of Object.keys( curori.site ) ) {
        if ( ( typeof curori.site[key] == "object" && curori.site[key].join( "" ) != current.site[key].join( "" ) ) || curori.site[key] != current.site[key] ) {
            changed.push( key );
            site_changed = true;
        }
    }
    site_changed && ( code = code + 2 );
    console.log( "current changed state is ", code, changed );
    return { code, changed };
}
const storage = new Storage();

export {
    storage,
    mode  as STORAGE_MODE,
    clone as Clone
};