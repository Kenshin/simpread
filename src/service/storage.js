console.log( "=== simpread storage load ===" )

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
    name = "simpread";

let site  = {
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
    simpread = {
        focus,
        read   : {},
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
    const pathname = window.location.pathname,
          arr      = pathname.split( "/" ),
          end      = arr.pop(),
          str      = arr.join( "" ) === "" ? arr.join( "" ) : arr.join( "" ) + "/";
    return `${ window.location.protocol }//${ window.location.hostname }/${ str }`;
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

const storage = new Storage();
export { storage, mode as STORAGE_MODE };