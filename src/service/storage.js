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
    },
    option = {
        version   : "2017-04-03",
        update    : "",
    };

let current  = {},
    curori   = {},
    origin   = {},
    sync     = {},
    simpread = {
        option,
        focus,
        read,
        sites  : [],
    },
    rdstcode = -1;

class Storage {

    /**
     * Get simpread.option data structure
     * 
     * @return {object} simpread["option"]
     */
    get option() {
        return simpread[ mode.option ];
    }

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
     * Sync simpread data structure
     * 
     * @param {string} include: set, get
     * @param {function} callback
     */
    Sync( state, callback ) {
        if ( state == "set" ) {
            sync = { ...simpread };
            sync.option.update = now();
            delete sync.sites;
            browser.storage.sync.set( { [name] : sync }, () => {
                console.log( "chrome storage sync[set] success!" )
                simpread.option.update = sync.option.update;
                save( callback( sync.option.update ));
            });
        } else {
            browser.storage.sync.get( [name] , result => {
                console.log( "chrome storage sync[get] success!", result, simpread )
                let success = false;
                if ( result && !$.isEmptyObject( result )) {
                    success = true;
                    Object.keys( mode ).forEach( key => {
                        simpread[ key ] = result[ name ][ key ];
                    });
                }
                save( callback( success ) );
            });
        }
    }

    /**
     * Get simpread object from chrome storage
     * 
     * @param {function} callback
     */
    Get ( callback ) {
        browser.storage.local.get( [name], function( result ) {
            let firstload = true;
            if ( result && !$.isEmptyObject( result )) {
                simpread  = result[name];
                firstload = false;
            }
            origin = clone( simpread );
            callback( firstload );
            console.log( "chrome storage read success!", simpread, origin, result );
        });
    }

    /**
     * Set simpread object to chrome storage
     * 
     * @param {function} callback
     */
    Write( callback ) {
        save( callback );
    }

    /**
     * Get local/remote JSON usage async
     * 
     * @param {string}    url, e.g. chrome-extension://xxxx/website_list.json or http://xxxx.xx/website_list.json
     * @return {function} callback, param1: object; param2: error
     */
    async GetNewsites( type, callback ) {
        try {
            const url    = type === "remote" ? remote : local,
                response = await fetch( url + "?_=" + Math.round(+new Date()) ),
                sites    = await response.json(),
                len      = simpread.sites.length;
            let [ count, forced ] = [ 0, 0 ];
            if ( len == 0 ) {
                simpread.sites = formatSites( sites );
                count          = simpread.sites.length;
                save();
            }
            else if ( { count, forced } = addsites( formatSites( sites )), count > 0 || forced > 0 ) {
                save();
            }
            callback && callback( { count, forced }, undefined );
        } catch ( error ) {
            console.error( error );
            callback && callback( undefined, error );
        }
    }

    /**
     * Clear simpread data structure
     * 
     * @param {string}   include: local remote all
     * @param {function} callback
     */
    Clear( state, callback ) {
        let code = 2;
        state == "local"  && ( code = 0 );
        state == "remote" && ( code = 1 );
        ( code == 0 || code == 2 ) && browser.storage.local.clear( callback );
        ( code == 1 || code == 2 ) && browser.storage.sync.clear( callback );
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
 * Format sites object from local or remote json file
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
 * @param  {array}  new sites from local or remote
 * @return {object} count: new sites; forced: update sites
 */
function addsites( sites ) {
    const update   = new Map( simpread.sites ),
          urls     = [ ...update.keys() ];
    let   [ count, forced ] = [ 0, 0 ];
    sites.map( ( site ) => {
        if ( !urls.includes( site[0] ) ) {
            simpread.sites.push([ site[0], site[1] ]);
            count++;
        } else if ( urls.includes( site[0] ) && site[1].override ) {
            update.set( site[0], site[1] );
            simpread.sites = [ ...update ];
            forced++;
        }
    });
    return { count, forced };
}

/**
 * Call chrome storage set
 */
function save( callback ) {
    browser.storage.local.set( { [name] : simpread }, function() {
        console.log( "chrome storage save success!", simpread );
        origin      = clone( simpread );
        curori      = { ...current };
        curori.site = { ...current.site };
        callback && callback();
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

/**
 * Get now time
 * 
 * @return {string} return now, e.g. 2017年04月03日 11:43:53
 */
function now() {
    const date   = new Date(),
          format = value => value = value < 10 ? "0" + value : value;
    return date.getFullYear() + "年" + format( date.getUTCMonth() + 1 ) + "月" + format( date.getUTCDate() ) + "日 " + format( date.getHours() ) + ":" + format( date.getMinutes() ) + ":" + format( date.getSeconds() );
}

const storage = new Storage();

export {
    storage,
    mode  as STORAGE_MODE,
    clone as Clone
};