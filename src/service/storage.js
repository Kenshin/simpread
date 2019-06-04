console.log( "=== simpread storage load ===" )

import "babel-polyfill";

import {browser, br}  from 'browser';
import {version,patch}from 'version';

/**
 * Read and Write Chrome storage
 * 
 * @class
 */

const name = "simpread",
    remote = "http://sr.ksria.cn/website_list_v4.json",
    origins= "http://sr.ksria.cn/website_list_origins.json",
    versions= "http://sr.ksria.cn/versions.json",
    local  = browser.extension.getURL( "website_list.json" ),
    mode   = {
        focus     : "focus",
        read      : "read",
        option    : "option",
        unrdist   : "unrdist",
    },
    site   = {
        url       : "",
        target    : "",
        matching  : [],
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
        //sites     : [],    // e.g. [ "<url>", site ]
    },
    read   = {
        version   : "2017-03-16",
        progress  : false,
        auto      : false,
        controlbar: true,
        fap       : true,
        highlight : true,
        shortcuts : "A A",
        toc       : true,
        toc_hide  : true,
        theme     : "github",
        fontfamily: "default",
        cleanup   : true,
        pure      : true,
        whitelist : [],
        exclusion : [
            "v2ex.com","issue.github.com","readme.github.com","question.zhihu.com","douban.com","nationalgeographic.com.cn","tech.163.com","docs.microsoft.com","msdn.microsoft.com","baijia.baidu.com","code.oschina.net","http://www.ifanr.com","http://www.ifanr.com/news","http://www.ifanr.com/app","http://www.ifanr.com/minapp","http://www.ifanr.com/dasheng","http://www.ifanr.com/data","https://www.ifanr.com/app","http://www.ifanr.com/weizhizao","http://www.thepaper.cn","http://www.pingwest.com","http://tech2ipo.com","https://www.waerfa.com/social"
        ],
        fontsize  : "",  // default 62.5%
        layout    : "",  // default 20%
        //sites     : [],  // e.g. [ "<url>", site ]
        custom    : {
            // remove by 1.1.1
            //global: {
            //    fontFamily : "",
            //    marginLeft : "",
            //    marginRight: "",
            //},
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
        save_at   : "dropbox", // include: dropbox | jianguo
        notice    : true,
        //focus   : 0,
        //read    : 0,
        esc       : true,
        br_exit   : false,
        secret    : false,
        preload   : true,
        lazyload  : [],
        menu      : {
            focus : true,
            read  : true,
            link  : true,
            list  : false,
            whitelist: false,
            exclusion: false,
            blacklist: false,
            unrdist: false,
        },
        origins   : [],
        blacklist : [
            "google.com",
            "youtube.com"
        ],
        plugins   : [], // plugin id, e.g. kw36BtjGu0
    },
    statistics = {
        "focus"   : 0,
        "read"    : 0,
        "service" : {
            "linnk"      : 0,
            "instapaper" : 0,
            "pocket"     : 0,
            "readlater"  : 0,
            "epub"       : 0,
            "pdf"        : 0,
            "png"        : 0,
            "markdown"   : 0,
            "html"       : 0,
            "evernote"   : 0,
            "yinxiang"   : 0,
            "dropbox"    : 0,
            "onenote"    : 0,
            "gdrive"     : 0,
            "kindle"     : 0,
            "temp"       : 0,
        }
    },
    user   = {
        uid       : "",
        name      : "",
        contact   : "",
        email     : "",
        avatar    : "",
        permission: "",
    },
    notice = {
        latest: 0,
        read  : []
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
        patch,
        option,
        focus,
        read,
        unrdist : [],
        sites   : [],
        websites: {
            person : [],
            custom : [],
            local  : [], // include focus.sites and read.sites
        },
        statistics,
        notice,
        user,
    },
    plugins  = {},
    secret   = {
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
        "yuque"  : {
            access_token  : "",
            repos_id: "",
        },
        "jianguo"  : {
            username      : "",
            password      : "",
            access_token  : "",
        },
        "webdav"  : []
    };
    //stcode = -1;

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
     * @return {int} @see Findsite
     */
    /*
    get stcode() {
        return stcode;
    }
    */

    /**
     * Get unread list
     * 
     * @return {array} unread list
     */
    get unrdist() {
        return simpread[ mode.unrdist ];
    }

    /**
     * Get notice
     * 
     * @return {object} notice
     */
    get notice() {
        return simpread.notice;
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
     * Get patch version
     * 
     * @return {string} patch version
     */
    get patch() {
        return simpread.patch;
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
     * Get statistics
     * 
     * @return {object} statistics object
     */
    get statistics() {
        return simpread.statistics;
    }

    /**
     * Get user info
     * 
     * @return {object} user object
     */
    get user() {
        return simpread.user;
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
     * Get plugins data structure
     * 
     * @return {object} plugins object
     */
    get plugins() {
        return plugins;
    }

    /**
     * Get all sites structure
     * 
     * @return {object} all sites
     */
    get sites() {
        return {
            global: simpread.sites,
            person: simpread.websites.person,
            custom: simpread.websites.custom,
            local : simpread.websites.local,
        }
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
     * Set puread object
     * 
     * @param {object} pure read
     */
    set puread( value ) {
        this.pr = value;
    }

    /**
     * Get puread object
     * 
     * @return {object} pure read
     */
    get puread() {
        return this.pr;
    }

    /**
     * Get service url
     * 
     * @return {string} url
     */
    get service() {
        //return "http://localhost:3000";
        return "https://simpread.ksria.cn";
    }

    /**
     * Get notice service url
     * 
     * @return {string} url
     */
    get notice_service() {
        return {
            latest: "http://simp.red/notice/latest",
            message: "http://simp.red/notice",
        }
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
     * Read storage usage aync only firefox
     * 
     * @param {func} callback 
     */
    ReadAsync( callback ) {
        const db = browser.storage.local.get();
        const safesave = obj => {
            if ( secret && secret.version != obj.version ) {
                obj.version = secret.version;
                Object.keys( secret ).forEach( item => {
                    obj[item] == undefined && ( obj[item] = secret[item] );
                });
            }
            return { ...obj };
        };
        db.then( result => {
            let firstload = true;
            if ( result && !$.isEmptyObject( result )) {
                secret    = result[ "secret" ] && safesave( result[ "secret" ]);
                simpread  = result[name];
                plugins   = result["plugins"];
                firstload = false;
            }
            origin = clone( simpread );
            callback( simpread, secret, plugins );
            console.log( "chrome storage read success!", simpread, origin, result );
        }, error => {
            console.log(`Error: ${error}`);
        });
    }

    /**
     * Write Object only firefox
     * 
     * @param {object} simpread object 
     * @param {object} secret object 
     * @param {object} plugins object 
     */
    WriteAsync( simp, sec, plugs ) {
        simpread  = simp;
        origin    = clone( simpread );
        sec   && ( secret  = sec    );
        plugs && ( plugins = plugs  );
        browser.storage.local.set( { ["secret"] : secret }, () => {
            console.log( "firefox storage secret set success!", secret );
        });
        browser.storage.local.set( { ["plugins"] : plugins }, () => {
            console.log( "firefox storage plugins set success!", plugins );
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
     * Set simpread sites to chrome storage
     * 
     * @param {object} all sites, @see this.sites
     * @param {function} callback
     */
    Writesite( sites, callback ) {
        simpread.sites           = sites.global;
        simpread.websites.person = sites.person;
        simpread.websites.custom = sites.custom;
        simpread.websites.local  = sites.local;
        callback && save( callback, true );
    }

    Getcur( key, site ) {
        current      = swap( simpread[key], {} );
        current.url  = site.url;
        current.mode = key;
        current.site = site;
        curori       = { ...current };
        curori.site  = { ...current.site };
        console.log( "current site object is ", current )
    }

    /**
     * Set current to simpread[key]
     * 
     * @param {string} @see mode
     */
    Setcur( key ) {
        swap( current, simpread[key] );
        save( undefined, true );
    }

    /**
     * Verity current changed
     * 
     * @param {string} @see mode
     */
    VerifyCur( type ) {
        return current.mode != type    ||
               current.url != getURI() ||
               $.isEmptyObject( current );
    }

    /**
     * Compare focus and read setting is changed
     * 
     * @param  {string} inlcude: focus, read
     * @return {object} option: option changed, st: site changed
     */
    Compare( type ) {
        const target = { ...current },
              read   = [ "theme", "shortcuts", "fontfamily", "fontsize", "layout" ],
              focus  = [ "bgcolor", "opacity", "shortcuts" ],
              site   = [ "title", "include", "exclude", "desc" ],
              option = [],
              st     = [],
              source = type == "read" ? read : focus;
        source.forEach( item => {
            curori[item] != current[item] && option.push({ item, old: curori[item], newer: current[item] });
        });
        site.forEach( item => {
            curori.site[item] != current.site[item] && st.push({ item, old: curori.site[item], newer: current.site[item] });
        });
        return { option, st };
    }

    /**
     * Get remote from type
     * 
     * @param {string} include: local, remote, origins, versions and <urls>
     * @param {func} callback
     */
    async GetRemote( type, callback ) {
        let url;
        switch ( type ) {
            case "local":
                url = local;
                break;
            case "remote":
                url = remote;
                break;
            case "origins":
                url = origins;
                break;
            case "versions":
                url = versions;
                break;
            default:
                url = type;
        }
        try {
            const response = await fetch( url + "?_=" + Math.round(+new Date()) ),
                  result   = await response.json();
            result ? callback( result ) : callback( undefined, "error" );
        } catch ( error ) {
            callback( undefined, "error" );
        }
    }

    /**
     * Statistics simpread same info
     * 
     * @param {string} include: create, focus, read, service
     * @param {string} include: service type, e.g. pdf png onenote
     */
    Statistics( type, service ) {
        if ( type == "create" ) {
            simpread.option.create = now();
        } else {
            service ? simpread.statistics.service[ service ]++ : simpread.statistics[ type ]++;
        }
        console.log( "current statistics is ", simpread.statistics )
        browser.runtime.sendMessage({ type: "track", value: { eventAction: type, eventCategory: "read mode", eventLabel: "click" } });
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
            rd   = valid( "read",    read ),
            stat = valid( "statistics", statistics );

        console.log( "storage.Verify() result ", opt, focu, rd, stat )
        return { option: opt, focus: focu, read: rd, stat: stat };
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
            if ( br.isFirefox() && window.location.protocol != "moz-extension:" ) {
                callback && callback();
            } else {
                browser.storage.local.get( ["secret"], result => {
                    console.log( "chrome storage safe get success!", result );
                    result && !$.isEmptyObject( result ) && ( secret = safesave( result["secret"] ));
                    callback && callback();
                });
            }
        }
    }

    /**
     * Notice set/get
     * 
     * @param {object}   notice
     * @param {function} callback
     */
    Notice( callback, data ) {
        if ( data ) {
            browser.storage.local.set( { ["notice"] : data }, () => {
                console.log( "chrome storage notice set success!", data );
                callback && callback();
            });
        } else {
            if ( br.isFirefox() && window.location.protocol != "moz-extension:" ) {
                callback && callback();
            } else {
                browser.storage.local.get( ["notice"], result => {
                    console.log( "chrome storage notice get success!", result );
                    callback && callback( result );
                });
            }
        }
    }

    /**
     * Plugins set/get, plugins not import/export
     * 
     * @param {object}   plugins
     * @param {function} callback
     */
    Plugins( callback, data ) {
        if ( data ) {
            plugins = { ...data };
            browser.storage.local.set( { ["plugins"] : plugins }, () => {
                console.log( "chrome storage plugins set success!", plugins );
                callback && callback();
            });
        } else {
            browser.storage.local.get( ["plugins"], result => {
                console.log( "chrome storage plugins get success!", result );
                result && !$.isEmptyObject( result ) && ( plugins = result["plugins"] );
                callback && callback();
            });
        }
    }

    /**
     * Export
     * 
     * @return {string} object json stringify
     */
    Export() {
        const download = {
            version : version,
            option  : { ...this.option },
            focus   : { ...this.focus  },
            read    : { ...this.read   },
            websites: { ...this.websites },
            statistics: { ...this.statistics },
            user    : { ...this.user },
            notice  : { ...this.notice },
            unrdist : this.unrdist,
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
        this.Getcur( key, curori.site );
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
     * Fix simpread.read.site only old 1.0.0 / 1.0.1 and 1.1.0
     * 
     * @param  {array} changed target
     * @param  {string} old version
     * @param  {string} new version
     * @param  {object} simpread.focus.site
     */
    Fix( target, curver, newver, source ) {
        if ( curver == "1.0.0" || curver == "1.0.1" ) {
            target.forEach( ( site, idx ) => {
                let url      = site[0],
                    { name } = site[1];
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
            });
        }
        if ( newver == "1.1.0" ) {
            const map = new Map( target );
            source.forEach( site => {
                map.get( site[0] ) &&
                    ( site[0] = site[0].endsWith( "*" ) ? site[0] + "*" : site[0] + "**" );
                site[1].name == "" &&
                    ( site[1].name = "tempfocus" );
            });
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
 * Deep clone object
 * 
 * @param  {object} target object
 * @return {object} new target object
 */
function clone( target ) {
    return $.extend( true, {}, target );
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
 * Get now time
 * 
 * @return {string} return now, e.g. 2017年04月03日 11:43:53
 */
function now() {
    const date   = new Date(),
          format = value => value = value < 10 ? "0" + value : value;
    return date.getFullYear() + "年" + format( date.getUTCMonth() + 1 ) + "月" + format( date.getUTCDate() ) + "日 " + format( date.getHours() ) + ":" + format( date.getMinutes() ) + ":" + format( date.getSeconds() );
}

/**
 * Get URI from puread/util getURI()
 * 
 * @return {string} e.g. current site url is http://www.cnbeta.com/articles/1234.html return http://www.cnbeta.com/articles/
 */
function getURI() {
    const name = (pathname) => {
        pathname = pathname != "/" && pathname.endsWith("/") ? pathname = pathname.replace( /\/$/, "" ) : pathname;
        return pathname.replace( /\/[%@#.~a-zA-Z0-9_-]+$|^\/$/g, "" );
    },
    path = name( window.location.pathname );
    return `${ window.location.protocol }//${ window.location.hostname }${ path }/`;
}

const storage = new Storage();

export {
    storage,
    mode  as STORAGE_MODE,
    clone as Clone,
    now   as Now,
};