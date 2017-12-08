console.log( "=== simpread storage load ===" )

import "babel-polyfill";
import * as st   from 'site';
import {browser} from 'browser';
import {version} from 'version';

/**
 * Read and Write Chrome storage
 * 
 * @class
 */

const name = "simpread",
    remote = "http://ojec5ddd5.bkt.clouddn.com/website_list_v3.json",
    origins= "http://ojec5ddd5.bkt.clouddn.com/website_list_origins.json",
    local  = browser.extension.getURL( "website_list.json" ),
    mode   = {
        focus     : "focus",
        read      : "read",
        option    : "option",
        unrdist   : "unrdist",
    },
    site   = {
        name      : "",   // only read mode
        title     : "",   // only read mode
        desc      : "",   // only read mode
        exclude   : [],
        include   : "",
        avatar    : [],
        paging    : [],
    },
    focus  = {
        version   : "2016-12-29",
        bgcolor   : "rgba( 235, 235, 235, 0.9 )",
        controlbar: true,
        mask      : true,
        highlight : true,
        opacity   : 90,
        shortcuts : "A S",
        sites     : [],    // e.g. [ "<url>", site ]
    },
    read   = {
        version   : "2017-03-16",
        progress  : true,
        auto      : false,
        controlbar: true,
        highlight : true,
        shortcuts : "A A",
        toc       : true,
        toc_hide  : true,
        theme     : "github",
        fontfamily: "default",
        whitelist : [],
        exclusion : [
            "v2ex.com","issue.github.com","readme.github.com","question.zhihu.com","douban.com","nationalgeographic.com.cn","tech.163.com","docs.microsoft.com","msdn.microsoft.com","baijia.baidu.com","code.oschina.net","http://www.ifanr.com","http://www.ifanr.com/news","http://www.ifanr.com/app","http://www.ifanr.com/minapp","http://www.ifanr.com/dasheng","http://www.ifanr.com/data","https://www.ifanr.com/app","http://www.ifanr.com/weizhizao","http://www.thepaper.cn","http://www.pingwest.com","http://tech2ipo.com","https://www.waerfa.com/social"
        ],
        fontsize  : "",  // default 62.5%
        layout    : "",  // default 20%
        sites     : [],  // e.g. [ "<url>", site ]
        custom    : {
            global: {
                fontFamily : "",
                marginLeft : "",
                marginRight: "",
            },
            title : {
                fontFamily : "",
                fontSize   : "",
                color      : "",
            },
            desc  : {
                fontFamily : "",
                fontSize   : "",
                color      : "",
            },
            art   : {
                fontFamily : "",
                fontSize   : "",
                color      : "",
                fontWeight : "",
                wordSpacing: "",
                letterSpacing: "",
                lineHeight : "",
                textIndent : "",
            },
            pre  : {
                textShadow : "",
            },
            code  : {
                fontFamily : "",
                fontSize   : "",
            },
            css   : "",
        },
    },
    option = {
        version   : "2017-04-03",
        create    : "",
        update    : "",
        sync      : "",
        focus     : 0,
        read      : 0,
        esc       : true,
        br_exit   : false,
        secret    : false,
        menu      : {
            focus : true,
            read  : true,
            link  : true,
            list  : false,
        },
        origins   : [],
    },
    unread = {
        idx       : 0,
        create    : "",
        url       : "",
        title     : "",
        desc      : "",
    };

let current  = {},
    curori   = {},
    origin   = {},
    sync     = {},
    simpread = {
        version,
        option,
        focus,
        read,
        unrdist : [],
        sites   : [],
        websites: {
            origins: [],
        }
    },
    secret = {
        version   : "2017-11-22",
        "dropbox" : {
            "access_token": ""
        },
        "pocket"  : {
            "access_token": "",
            "tags"        : "",
        },
        "linnk"   : {
            access_token  : "",
            "group_name"  : "",
        },
        "instapaper"   : {
            access_token  : "",
            token_secret  : "",
        },
        "yinxiang" : {
            access_token  : "",
        },
        "evernote" : {
            access_token  : "",
        },
        "onenote"  : {
            access_token  : "",
        },
        "gdrive"   : {
            access_token  : "",
            folder_id     : "",
        },
    },
    stcode = -1;

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
     * Get read site code, include: simpread.sites and simpread.read.sites
     * 
     * @return {int} @see FindSite
     */
    get stcode() {
        return stcode;
    }

    /**
     * Get unread list
     * 
     * @return {array} unread list
     */
    get unrdist() {
        return simpread[ mode.unrdist ];
    }

    /**
     * Get version
     * 
     * @return {string} version
     */
    get version() {
        return simpread.version;
    }

    /**
     * Get simpread data structure clone
     * 
     * @return {string} version
     */
    get simpread() {
        return { ...simpread };
    }

    /**
     * Get secret data structure
     * 
     * @return {object} secret object
     */
    get secret() {
        return secret;
    }

    /**
     * Get simpread.websites data structure
     * 
     * @return {object} secret object
     */
    get websites() {
        return simpread.websites;
    }

    /**
     * Get simpread object from chrome storage
     * 
     * @param {function} callback
     */
    Read( callback ) {
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
     * @param {object}   new simpread data structure
     */
    Write( callback, new_val = undefined ) {
        new_val && Object.keys( new_val ).forEach( key => simpread[ key ] = new_val[key] );
        save( callback, new_val );
    }

    /**
     * Get current object, current object structure include:
     * 
     * focus mode: { url, mode, site, shortcuts, bgcolor, opacity }
     * read  mode: { url, mode, site, shortcuts, theme, fontsize, fontfamily, layout }
     * 
     * @param {string} @see mode
     * @param {object} meta data
     */
    Getcur( key, meta ) {
        const [ url, sites, other ] = [ st.GetURI(), new Map( simpread[key].sites ), key == "read" ? "focus" : "read" ];
        current      = swap( simpread[key], {} );
        current.url  = url;
        current.mode = key;
        if ( meta ) {
            current.auto = meta.auto;
            delete meta.auto;
            current.site = { ...meta };
        } else {
            let arr       = st.Getsite( new Map( simpread[key].sites ), url );
            !arr && ( arr = st.Getsite( new Map( simpread[other].sites ), url ));
            !arr && ( arr = st.Getsite( new Map( simpread.sites ), url ));
            if ( arr ) {
                current.site = arr[0];
                current.url  = arr[1];
            } else {
                sites.set( url, clone( site ));
                current.site = sites.get( url );
            }
        }
        curori      = { ...current };
        curori.site = { ...current.site };
        console.log( "current site object is ", current )
    }

    /**
     * Set current to chrome storage and save
     * 
     * @param {string} @see mode
     */
    Setcur( key ) {
        const { code } = compare();
        if ( code != 0 ) {
            if ( [ 2, 3 ].includes( code ) ) {
                let idx = simpread[key].sites.findIndex( item => item[0] == curori.url );
                idx == -1 && ( idx = simpread[key].sites.length );
                simpread[key].sites.splice( idx, 1, [ current.url, current.site ] );
            }
            swap( current, simpread[key] );
            save( undefined, true );
        }
        return code;
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

    /**
     * Find site, code include:
     * 
     * - -1: not found
     * -  1: simpread.site
     * -  2: simpread.read.site
     * -  3: meta data
     * 
     * @param {object} meta data
     */
    FindSite( meta ) {
        const url = st.GetURI();
        if ( meta ) {
            stcode = 3;
        } else {
            let arr = st.Getsite( new Map( simpread.sites ), url );
            stcode = -1;
            if ( arr ) {
                stcode = 1;
            } else {
                arr = st.Getsite( new Map( simpread.read.sites ), url );
                !arr && ( arr = st.Getsite( new Map( simpread.focus.sites ), url ));
                arr && arr[0].name != "" && ( stcode = 2 );
            }
        }
    }

    /**
     * Add new site( read only )
     * 
     * @param {string} include: focus, read
     * @param {string} when read html is dom.outerHTML
     */
    Newsite( mode, html ) {
        const new_site = { mode, url: window.location.href, site: { name: `tempread::${window.location.host}`, title: "<title>", desc: "", include: "", exclude: "" } };
        html && ( new_site.site.html = html );
        current.mode = new_site.mode,
        current.url  = new_site.url;
        current.site = { ...new_site.site };
        console.log( "【read only】current site object is ", current )
    }

    /**
     * Clone current site
     * 
     * @return {object} new site
     */
    Clonesite() {
        const site = { ...current.site };
        site.url   = current.url;
        site.name  == "" && ( site.name = "tempread::" + location.host );
        ( !site.avatar || site.avatar.length == 0 ) && ( site.avatar = [{ name: "" }, { url: ""  }]);
        ( !site.paging || site.paging.length == 0 ) && ( site.paging = [{ prev: "" }, { next: "" }]);
        return site;
    }

    /**
     * Update current.site from param
     * 
     * @param {string} include: focus, read 
     * @param {object} new site
     * @param {func}   callback
     */
    Updatesite( key, site, callback ) {
        current.url  = site.url;
        current.site = { ...site };
        current.site.avatar[0].name == "" && delete current.site.avatar;
        current.site.paging[0].prev == "" && delete current.site.paging;
        current.site.html                 && delete current.site.html;

        let idx = simpread[key].sites.findIndex( item => item[0] == curori.url );
        idx == -1 && ( idx = simpread[key].sites.length );
        simpread[key].sites.splice( idx, 1, [ current.url, current.site ] );
        
        save( callback, true );
    }

    /**
     * Delete site from simpread[key].site
     * 
     * @param {string} include: focus, read 
     * @param {object} site
     * @param {func}   callback
     */
    Deletesite( key, site, callback ) {
        let idx = simpread[key].sites.findIndex( item => item[0] == curori.url );
        simpread[key].sites.splice( idx, 1 );
        idx != -1 ? save( callback, true ) : callback( idx );
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
                newsites = await response.json(),
                len      = simpread.sites.length;
            let count    = 0;
            if ( len == 0 ) {
                simpread.sites = formatSites( newsites );
                count          = simpread.sites.length;
                save( undefined, type );
            }
            else {
                count = addsites( formatSites( newsites )).count;
                save( undefined, type );
            }
            callback && callback( { count }, undefined );
        } catch ( error ) {
            console.error( error );
            callback && callback( {}, error );
        }
    }

    /**
     * Get origins from http://xxxx.xx/website_list_origins.json
     * 
     * @param {func} callback 
     */
    async GetOrigins( callback ) {
        try {
            const response = await fetch( origins + "?_=" + Math.round(+new Date()) ),
                  result   = await response.json();
            if ( result && result.origins.length > 0 ) {
                const urls = result.origins.map( item => item.url );
                callback( urls );
            } else callback( undefined, "error" );
        } catch ( error ) {
            callback( undefined, "error" );
        }
    }

    async AddOrigin( url, callback ) {
        try {
            const response = await fetch( url + "?_=" + Math.round(+new Date()) ),
                  result   = await response.json(),
                  len      = result.sites.length;
            let count      = 0;
            if ( result && len > 0 ) {
                const arr = formatSites( result );
                callback( { url, sites: arr }, undefined );
            } else callback( undefined, "error" );
        } catch ( error ) {
            callback( undefined, error );
        }
    }

    /**
     * Sync simpread data structure
     * 
     * @param {string} include: set, get
     * @param {function} callback
     */
    /*
    Sync( state, callback ) {
        if ( state == "set" ) {
            sync = { ...simpread };
            sync.option.update = now();
            delete sync.sites;
            browser.storage.sync.set( { name : sync }, () => {
                console.log( "chrome storage sync[set] success!" )
                simpread.option.update = sync.option.update;
                save( callback( sync.option.update ));
            });
        } else {
            browser.storage.sync.get( name , result => {
                console.log( "chrome storage sync[get] success!", result, simpread )
                let success = false;
                if ( result && !$.isEmptyObject( result )) {
                    success = true;
                    Object.keys( mode ).forEach( key => {
                        simpread[ key ] = result[ name ][ key ];
                    });
                }
                callback( success );
            });
        }
    }
    */

    /**
     * Statistics simpread same info
     * 
     * @param {string} include: create, focus, read
     */
    Statistics( type ) {
        if ( type == "create" ) {
            simpread.option.create = now();
        } else {
            simpread.option[ type ] = simpread.option[ type ] + 1;
        }
        save( undefined, type == "create" );
    }

    /**
     * Unread list
     * 
     * @param {type} include: add remove
     * @param {any} include: object( @see unread ) or index
     * @param {function} callback
     */
    UnRead( type, args, callback ) {
        let success = true;
        switch ( type ) {
            case "add":
                const len = simpread.unrdist.length;
                args.create = now();
                args.idx = len > 0 ? simpread.unrdist[0].idx + 1 : 0;
                simpread.unrdist.findIndex( item => item.url == args.url ) == -1 ?
                    simpread.unrdist.splice( 0, 0, args ) : success = false;
                break;
            case "remove":
                const idx = simpread.unrdist.findIndex( item => item.idx == args );
                idx != -1 && simpread.unrdist.splice( idx, 1 );
                idx == -1 && ( success = false );
                break;
        }
        callback && save( callback( success ) );
    }

    /**
     * Verify simpread data structure
     * 
     * @param  {object} verify simpread data structure, when undefined, verify self
     * @return {object} option: { code: 0|-1|-2, keys: [ "bgcolor", "layout" ] }
     *         code: 0: valid success; -1: field name failed; -2: site field name failed;
     */
    Verify( data = undefined ) {
        const pendding = data ? { ...data } : { simpread },
              valid    = ( value, source ) => {
            let result = { code: 0, keys: [] }, target = pendding[ value ];
            if ( Object.keys( target ).length !== Object.keys( source ).length ) {
                result.code = -1;
            } else {
                Object.keys( target ).forEach( key => {
                    if ( !Object.keys( source ).includes( key ) ||
                       ( key != "sites" && value != "option" && typeof target == "string" && target[key] == "" )) {
                        result.keys.push( key );
                    }
                    if ( key == "sites" ) {
                        target.sites.forEach( items => {
                            const site_keys = Object.keys( items[1] );
                            if ( !site_keys.includes( "avatar" ) && site_keys.includes( "paging" ) ) {
                                if ( site_keys.length != Object.keys( site ).length ) {
                                    result.code = -2;
                                } else {
                                    site_keys.forEach( key => {
                                        ( !Object.keys( site ).includes( key ) ) && result.keys.push( `site::${key}` );
                                    });
                                }
                            }
                        });
                    }
                });
                result.keys.length > 0 && result.code == 0 && ( result.code = -3 );
            }
            return result;
        }

        let opt  = valid( "option", option ),
            focu = valid( "focus",  focus ),
            rd   = valid( "read",   read );

        console.log( "storage.Verify() result ", opt, focu, rd )
        return { option: opt, focus: focu, read: rd };
    }

    /**
     * Safe set/get, secret not import/export
     * 
     * @param {object}   secret
     * @param {function} callback
     */
    Safe( callback, data ) {
        const safesave = obj => {
            if ( secret.version != obj.version ) {
                obj.version = secret.version;
                Object.keys( secret ).forEach( item => {
                    obj[item] == undefined && ( obj[item] = secret[item] );
                });
            }
            return obj;
        };
        if ( data ) {
            secret = { ...data };
            browser.storage.local.set( { ["secret"] : secret }, () => {
                console.log( "chrome storage safe set success!", secret );
                callback && callback();
            });
        } else {
            browser.storage.local.get( ["secret"], result => {
                console.log( "chrome storage safe get success!", result );
                result && !$.isEmptyObject( result ) && ( secret = safesave( result["secret"] ));
                callback && callback();
            });
        }
    }

    /**
     * Export, only include: version, option, focus, read, unrdist
     * 
     * @return {string} object json stringify
     */
    Export() {
        const download = {
            version: version,
            option : { ...this.option },
            focus  : { ...this.focus  },
            read   : { ...this.read   },
            unrdist: this.unrdist,
        };
        this.option.secret && ( download.secret = { ...secret });
        return JSON.stringify( download );
    }

    /**
     * Restore simpread[key]
     * 
     * @param {string} @see mode
     */
    Restore( key ) {
        simpread[key] = clone( origin[key] );
        this.Getcur( key );
    }

    /**
     * Clear simpread data structure
     * 
     * @param {string}   include: local remote all
     * @param {function} callback
     */
    Clear( state, callback ) {
        browser.storage.local.clear( callback );
    }

    /**
     * Fix simpread.read.site only old 1.0.0 and 1.0.1
     * 
     * @param  {array} changed target
     * @param  {string} old version
     * @param  {string} new version
     * 
     * @return {array} new sites
     */
    Fix( target, curver, newver ) {
        target.forEach( ( site, idx ) => {
            let url      = site[0],
                { name } = site[1];
            if ( curver == "1.0.0" || curver == "1.0.1" ) {
                for ( let item of simpread.sites ) {
                    if ( name == item[1].name ) {
                        item[1].avatar  && ( site[1].avatar  = item[1].avatar  );
                        item[1].paging  && ( site[1].paging  = item[1].paging  );
                        item[1].include && ( site[1].include = item[1].include );
                        target[idx][1] = { ...item[1] };
                        target[idx][0] = item[0];
                        continue;
                    }
                }
            }
        });
        return target;
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
 * @return {object} count: new sites; forced: update sites( discard, all site must be forced update)
 */
function addsites( newsites ) {
    const oldsites = new Map( simpread.sites ),
          urls     = [ ...oldsites.keys() ];
    let   [ count, forced ] = [ 0, 0 ];
    newsites.map( site => {
        if ( !urls.includes( site[0] ) ) {
            count++;
        } else if ( urls.includes( site[0] )) {
            forced++;
        }
    });
    simpread.sites = newsites;
    return { count, forced };
}

/**
 * Call chrome storage set
 * 
 * @param {function} callback
 * @param {object}   when exist no_update = false
 */
function save( callback, no_update ) {
    !no_update && ( simpread.option.update = now());
    browser.storage.local.set( { [name] : simpread }, function() {
        console.log( "chrome storage save success!", simpread );
        origin      = clone( simpread );
        curori      = { ...current };
        curori.site = { ...current.site };
        callback && callback();
    });
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
        if ( ( typeof curori.site[key] == "object" && ![ "avatar", "paging" ].includes( key ) && curori.site[key].join( "" ) != current.site[key].join( "" ) ) || curori.site[key] != current.site[key] ) {
            changed.push( key );
            site_changed = true;
        }
    }
    changed.includes( "url" ) && ( site_changed = true );
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
    return date.getFullYear() + "年" + format( date.getUTCMonth() + 1 ) + "月" + format( date.getUTCDate() ) + "日 " + format( date.getHours() ) + "-" + format( date.getMinutes() ) + "-" + format( date.getSeconds() );
}

const storage = new Storage();

export {
    storage,
    mode  as STORAGE_MODE,
    clone as Clone,
    now   as Now,
};