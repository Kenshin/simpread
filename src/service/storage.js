console.log( "=== simpread storage load ===" )

/**
 * Read and Write Chrome storage
 * 
 * 
 * @class
 */

const storagename = "simpread";

let site = {
        url  : "",
        html : {
            exclude   : [],
            include   : "",
        }
    },
    focus   = {
        version   : "2016-12-29",
        bgcolor   : "rgba( 235, 235, 235, 0.9 )",
        opacity   : 90,
        shortcuts : "A S",
        sites     : [ site ]
    },
    simpread = {
        focus  : focus,
        read   : {},
        option : {},
    },
    origin = {};

class Storage {

    get focus() {
        return simpread[ "focus" ];
    }

    Restore( key ) {
        simpread[key] = clone( origin[key] );
    }

    Getsite( key ) {
        const [ option, url ] = [ simpread[key],  getURI() ];
        let cursite = {};
        for( let obj of option.sites ) {
            if ( obj.url === url ) {
                // get origin site
                cursite     = obj;
                return cursite;
            }
        }
        // add new site object
        cursite     = clone( site );
        cursite.url = url;
        return cursite;
    }

    Setsite( key, value ) {
        const [ option, url ] = [ simpread[key],  getURI() ];
        for( let i = 0; i < option.sites.length; i++ ) {
            if ( option.sites[i].url === url ) {
                // update site
                option.sites.splice( i, 1, value );
                return;
            }
        }
        // add site
        option.sites.push( value );
    }

    Set() {
        chrome.storage.local.set( { [storagename]: simpread }, function(){
            console.log( "save chrome storage success!", simpread );
            origin   = clone( simpread );
        });
    }

    Get ( callback ) {
        chrome.storage.local.get( [storagename], function( result ) {
            console.log( "simpread storage result is", result );
            if ( result && !$.isEmptyObject( result )) {
                origin   = clone( result[storagename] );
                simpread = result[storagename];
            }
            callback();
        });
    }
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
          str      = arr.join( "" );
    return `${ window.location.protocol }//${ window.location.hostname }/${ str }/`;
}

/**
 * Deep clone object
 * 
 * @param  {object} target object
 * @return {object} new target object
 * 
 */
function clone( target ) {
    return $.extend( true, {}, target );
}

const storage = new Storage();
export {storage};