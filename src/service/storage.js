
import "babel-polyfill";

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
     */
    Setcur( key ) {
        const [ url, sites ] = [getURI(), new Map( simpread[key].sites )];
        current      = swap( simpread[key], {} );
        current.url  = url;
        current.mode = key;
        current.site = sites.get( url );
        while( !current.site ) {
            const arr = findSitebyURL( url );
            if ( arr ) {
                current.site = arr[0];
                current.url  = arr[1];
            } else {
                sites.set( url, clone( site ));
                current.site = sites.get( url );
            }
            simpread[key].sites.push([ current.url, current.site ]);
        }
        console.log( "current site object is ", current )
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
     * @param  {string} url, e.g. chrome-extension://xxxx/website_list.json or http://xxxx.xx/website_list.json
     */
    async GetNewsites( type ) {
        try {
            const url    = type === "remote" ? remote : local,
                response = await fetch( url + "?_=" + Math.round(+new Date()) ),
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
        return ( current.mode && current.mode != type ) || $.isEmptyObject( current );
    }

    /**
     * Adapter site
     * 
     * @return {number} 0: success; -1: not exsit; -2:tieba.com; -3:chiphell.com
     */
    Adapter() {
        const [ hostname, pathname, href ] = [ window.location.hostname, window.location.pathname, window.location.href ];
        if ( hostname == "tieba.baidu.com" && !href.includes( "see_lz=1" ) ) {
            return -2;
        } else if ( hostname == "www.chiphell.com" ) {
            if ( pathname == "/forum.php" && window.location.search.includes( "mod=viewthread" ) ) {
                return 0;
            } else if ( pathname.includes( "thread" ) && window.location.search == "" ) {
                return -3;
            } else {
                return -1;
            }
        } else if ( current.site.name === "" ) {
            return -1;
        } else {
            return 0;
        }
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
 * Get URI
 * 
 * @return {string} e.g. current site url is http://www.cnbeta.com/articles/1234.html return http://www.cnbeta.com/articles/
 */
function getURI() {
    const arr = window.location.pathname.match( /(\S+\/\b|^\/)/g );
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
    for ( const site of sites ) {
        if ( !urls.includes( site[0] ) ) {
            simpread.sites.push([ site[0], site[1] ]);
        }
    }
}

/**
 * Find site by url from simpread.sites, include wildcard, support: *
 * 
 * @param  {string} url
 * @return {array} arr[0]: current site; arr[1]: current url
 */
function findSitebyURL( url ) {
    const sites    = new Map( simpread.sites ),
          urls     = [ ...sites.keys() ],
          arr      = url.match( /[.a-zA-z0-9-_]+/g ),
          wildcard = arr[1],
          trueurl  = window.location.href,
          href     = trueurl.endsWith("/") ? trueurl : trueurl + "/";
    for ( const cur of urls ) {
        const name   = sites.get(cur).name;
        let   suffix = cur.replace( "*", "" );
        if ( name == "chiphell.com" ) suffix = url;
        else if ( cur.includes( "*" ) && wildcard.includes( name ) ) {
            if ( /\/[a-zA-Z0-9]+\/\*/g.test( cur )) {
                if    ( suffix != url ) return undefined;
            } else if ( suffix == url ) return undefined;
            suffix = url;
        }
        if ( suffix == url && href != url ) {
            return [ clone( sites.get( cur )), cur ];
        }
    }
    return undefined;
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