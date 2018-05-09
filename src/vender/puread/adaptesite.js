console.log( "=== PureRead: AdapteSite load ===" )

import * as util from './util';

const site   = {
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
};
let minimatch;

export default class AdapteSite {

    constructor( sites = { global:[], custom:[], local:[] } ) {
        this.url     = util.getURI();
        this.sites   = sites;   // include: global, custom, local
        this.current = {};
        this.state   = "none";  // include: meta, txt, adapter, none, temp
        this.origins = [];
    }

    /**
     * Set global minimatch
     */
    SetMinimatch( value ) {
        minimatch = value;
    }

    /**
     * Get site from url
     * 
     * @param {string} include: global, custom, local
     * @param {string} url 
     */
    Getsite( type, url ) {
       return this.sites[type].find( item => item[0] == url );
    }

    /**
     * Get sites from url
     */
    Getsites() {
        const matching         = [],
              meta             = metadata();
        this.current.url       = this.url;
        if ( meta ) {
            this.current.auto  = meta.auto;
            this.current.url   = meta.url;
            delete meta.auto;
            delete meta.url;
            this.current.site  = { ...meta };
            this.current.site.name.startsWith( "metaread::" ) && ( this.state = "meta" );
            this.current.site.name.startsWith( "txtread::"  ) && ( this.state = "txt" );
        } else {
            getsite( "local",  new Map( this.sites.local  ), this.url, matching );
            getsite( "global", new Map( this.sites.global ), this.url, matching );
            getsite( "custom", new Map( this.sites.custom ), this.url, matching );
            if ( matching.length > 0 ) {
                const found       = matching[0];
                this.current.url  = found[0];
                this.current.site = this.Safesite({ ...found[1] }, found[2], found[0] );
                this.state        = "adapter";
            } else {
                this.current.site = util.clone( site );
            }
        }
        this.current.site.matching = matching;
    }

    /**
     * Add sites from url result
     * 
     * @param {object} sites.[array]
     * @return {int} update sites count
     */
    Addsites( result ) {
        let count = 0;
        if ( this.sites.global.length == 0 ) {
            this.sites.global = this.Formatsites( result );
            count             = this.sites.global.length;
        }
        else {
            const obj         = addsites( this.Formatsites( result ), this.sites.global );
            count             = obj.count;
            this.sites.global = obj.newsites;
        }
        return count;
    }

    /**
     * Add new site( read only )
     * 
     * @param {string} include: focus, read
     * @param {string} when read html is dom.outerHTML
     */
    Newsite( mode, html ) {
        const new_site = { mode, url: window.location.href, site: { name: `tempread::${window.location.host}`, title: "<title>", desc: "", include: "", exclude: [] } };
        html && ( new_site.site.html = html );
        this.current.mode = new_site.mode,
        this.current.url  = new_site.url;
        this.current.site = this.Safesite({ ...new_site.site }, "local", new_site.url );
        console.log( "【read only】current site object is ", this.current )
    }

    /**
     * Update url and site from param
     * 
     * @param {string} value is: global, custom, local
     * @param {string} older url
     * @param {array}  [ url, new site]
     */
    Updatesite( key, older, newer ) {
        let idx = this.sites[key].findIndex( item => item[0] == older );
        idx == -1 && ( idx = this.sites[key].length );
        this.sites[key].splice( idx, 1, newer );
    }

    /**
     * Delete site from this.sites.local
     * 
     * @param {string} value is: global, custom, local
     * @param {string} older url
     * @param {func}   callback
     */
    Deletesite( key, older, callback ) {
       let idx = this.sites[key].findIndex( item => item[0] == older );
       idx != -1 && this.sites[key].splice( idx, 1 );
       callback( idx );
    }

    /**
     * Safe site, add all site props
     * 
     * @param {object} modify site 
     * @param {string} target include: global custom local
     * @param {string} url 
     * @returns {object} site
     */
    Safesite( site, target, url ) {
        site.url    = url;
        site.target = target;
        site.name  == "" && ( site.name = "tempread::" );
        ( !site.avatar || site.avatar.length == 0 ) && ( site.avatar = [{ name: "" }, { url: ""  }]);
        ( !site.paging || site.paging.length == 0 ) && ( site.paging = [{ prev: "" }, { next: "" }]);
        return site;
    }

    /**
     * Clean useless site props
     * 
     * @param   {object} site
     * @returns {object} site
    */
    Cleansite( site ) {
        delete site.url;
        delete site.html;
        delete site.target;
        delete site.matching;
        site.avatar && site.avatar.length > 0 && site.avatar[0].name == "" && delete site.avatar;
        site.paging && site.paging.length > 0 && site.paging[0].prev == "" && delete site.paging;
        return site;
    }

    /**
     * Format sites object from local or remote json file
     * 
     * @param  {object} sites.[array]
     * @return {array} foramat e.g. [[ <url>, object ],[ <url>, object ]]
     */
    Formatsites( result ) {
        const format = new Map();
        for ( let site of result.sites ) {
            if ( verifysite( site ) != 0 ) continue;
            const url = site.url;
            delete site.url;
            format.set( url, site );
        }
        return [ ...format ];
    }

    /**
     * Add urls to origins
     * 
     * @param {json} result json
     */
    Origins( result ) {
        let urls = result.origins.map( item => item.url );
        urls     = new Set( this.origins.concat( urls ) );
        urls.forEach( item => {
            if ( item.trim() == "" || !item.trim().startsWith( "http" ) || !item.trim().endsWith( ".json" ) ) urls.delete( item );
        });
        this.origins = [ ...urls ];
        return this.origins;
    }

    /**
     * Add new sites to this.sites.custom
     * 
     * @param  {object} new sites
     * @return {array} this.sites.custom
     */
    AddOrigins( new_sites ) {
        this.sites.custom = [ ...new_sites ];
        return this.sites.custom;
    }

    /**
     * Clear origins
     * 
     * @returns custom.length
     */
    ClearOrigins() {
        const len = this.sites.custom.length;
        this.sites.custom = [];
        return len;
    }

}

/**
 * Get metadata, inlcude: txtread and metaread
 * 
 * @return {object} meata data or undefined
 */
function metadata() {
    if ( minimatch( location.href, "file://**/*.txt" ) || minimatch( location.href, "http*://**/*.txt" ) ) {
        return readtxt();
    }
    const reg  = /<\S+ (class|id)=("|')?[\w-_=;:' ]+("|')?>?$|<[^/][-_a-zA-Z0-9]+>?$/ig, // from util.verifyHtml()
          meta = {
            name   : $( "meta[name='simpread:name']"    ).attr( "content" ),
            url    : $( "meta[name='simpread:url']"     ).attr( "content" ),
            title  : $( "meta[name='simpread:title']"   ).attr( "content" ),
            desc   : $( "meta[name='simpread:desc']"    ).attr( "content" ),
            include: $( "meta[name='simpread:include']" ).attr( "content" ),
            exp    : $( "meta[name='simpread:exclude']" ).attr( "content" ),
            auto   : $( "meta[name='simpread:auto']"    ).attr( "content" ),
            exclude: [],
    };
    if ( meta.name && meta.include ) {
        if ( meta.url && !minimatch( location.href, meta.url )) {
            return undefined;
        }
        !meta.title   && ( meta.title   = "<title>" );
        !meta.desc    && ( meta.desc    = "" );
        !meta.exp     && ( meta.exp     = "" );
        meta.name = `metaread::${meta.name}`;
        meta.auto = meta.auto == "true" ? true : false;
        const idx = [ "title", "desc", "include", "exp" ].findIndex( item => meta[item] != "" && !meta[item].match( reg ));
        meta.exclude.push( meta.exp );
        delete meta.exp;
        console.assert( idx == -1, "meta read mode error. ", meta )
        return idx == -1 ? meta : undefined;
    } else {
        console.error( "meta read mode error. ", meta )
        return undefined;
    }
}

/**
 * Read txt, include: file and http
 */
function readtxt() {
    const title = location.pathname.split( "/" ).pop(),
          type  = location.protocol == "file:" ? "local" : "remote",
          meta  = {
            name   : `txtread::${type}`,
            title  : "<title>",
            desc   : "",
            include: "<pre>",
            auto   : false,
            exclude: [],
    };
    if ( type == "remote" ) {
        meta.include = "";
        meta.html    = $( "body pre" ).html().replace( /\n/ig, "<br>" );
    }
    !$( "title" ).html() && $( "head" ).append( `<title>${ decodeURI(title.replace( ".txt", "" )) }</title>` );
    return meta;
}

/**
 * Add new sites to old sites
 * 
 * @param  {array}  new     sites from local or remote
 * @param  {array}  current sites from this.sites.global
 * @return {object} count: new sites; forced: update sites( discard, all site must be forced update)
 */
function addsites( newsites, old ) {
    const oldsites = new Map( old ),
          urls     = [ ...oldsites.keys() ];
    let   [ count, forced ] = [ 0, 0 ];
    newsites.map( site => {
        if ( !urls.includes( site[0] ) ) {
            count++;
        } else if ( urls.includes( site[0] )) {
            forced++;
        }
    });
    return { count, newsites };
}

/**
 * Find site by url from sites
 * 
 * @param  {string} type, include: global, local, custom
 * @param  {map}    sites
 * @param  {string} url
 * @param  {array}  matching sites
 * 
 * @return {array}  0: current site; 1: current url， 2: type
 */
function getsite( type, sites, url, matching = [] ) {
    const domain   = (names)=>{
            const arr = names.replace( "www.", "" ).match( /\.\S+\.\S+/g );
            if ( arr ) {
                return arr[0].substr(1);
            } else {
                return names.replace( "www.", "" );
            }
          },
          urls     = [ ...sites.keys() ],
          arr      = url.match( /[.a-zA-z0-9-_]+/g ),
          uri      = arr[1].replace( "www.", "" ),
          hostname = domain( window.location.hostname ),
          isroot   = ()=>window.location.pathname == "/" || /\/(default|index|portal).[0-9a-zA-Z]+$/.test(window.location.pathname);
    for ( const cur of urls ) {
        const name   = sites.get(cur).name,
              sufname= domain( name );
        if ( !isroot() && !cur.endsWith( "*" ) && cur.replace( /^http[s]?:/, "" ) == url.replace( /^http[s]?:/, "" ) ) {
            matching.push( [ cur, util.clone( sites.get( cur )), type ] );
        } else if ( cur.match( /\*/g ) && cur.match( /\*/g ).length == 1 && !isroot() && cur.endsWith( "*" ) && uri.includes( sufname ) && hostname == sufname && url.includes( name ) ) {
            // e.g. https://www.douban.com/* http://mp.weixin.qq.com/*
            matching.push( [ cur, util.clone( sites.get( cur )), type ] );
        } else if ( minimatch( window.location.origin + window.location.pathname, cur ) ) {
            matching.push( [ cur, util.clone( sites.get( cur )), type ] );
        }
    }
}

/**
 * Verify site validity, include:
 * - name, url, include, error is -1
 * - title include desc, error is -2
 * - paging, error is -3 ~ -6
 * - avatar, error is -7 ~ -10
 * 
 * @param {object} site 
 */
function verifysite( site ) {
    if ( !site.name || !site.url || !site.include ) return -1;
    if ( util.verifyHtml( site.title   )[0] == -1 ||
         util.verifyHtml( site.include )[0] == -1 ||
         util.verifyHtml( site.desc    )[0] == -1
        ) {
        return -2;
    }
    if ( site.paging ) {
        if ( site.paging.length != 2 ) return -3;
        if ( !site.paging[0].prev )    return -4;
        if ( !site.paging[1].next )    return -5;
        if ( util.verifyHtml( site.paging[0].prev )[0] == -1 || util.verifyHtml( site.paging[1].next )[0] == -1 ) {
            return -6;
        }
    }
    if ( site.avatar ) {
        if ( site.avatar.length != 2 ) return -7;
        if ( !site.avatar[0].name )    return -8;
        if ( !site.avatar[1].url  )    return -9;
        if ( util.verifyHtml( site.avatar[0].name )[0] == -1 || util.verifyHtml( site.avatar[1].url )[0] == -1 ) {
            return -10;
        }
    }
    return 0;
}
