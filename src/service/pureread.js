console.log( "=== simpread storage load ===" )

import minimatch from 'minimatch';

let meta;
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

export default class PureRead {

    constructor( url, origins ) {
        this.url     = getURI();
        this.origins = origins;
        this.current = {};
        this.state   = "none";  // include: meta, txt, adapter, none, temp
        meta         = metadata();
    }

    Getsites() {
        const matching         = [];
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
            getsite( "local",  new Map( this.origins.local  ), this.url, matching );
            getsite( "global", new Map( this.origins.global ), this.url, matching );
            getsite( "custom", new Map( this.origins.custom ), this.url, matching );
            if ( matching.length > 0 ) {
                const found       = matching[0];
                this.current.url  = found[0];
                this.current.site = safesite({ ...found[1] }, found[2], found[0] );
                this.state        = "adapter";
            } else {
                this.current.site = clone( site );
            }
        }
        this.current.site.matching = matching;
    }

    TempMode( html ) {
        const new_site = { url: window.location.href, site: { name: `tempread::${window.location.host}`, title: "<title>", desc: "", include: "", exclude: [] } };
        html && ( new_site.site.html = html );
        this.state        = "temp";
        this.current.url  = new_site.url;
        this.current.site = safesite({ ...new_site.site }, "local", new_site.url );
    }
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
 * Get URI
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
 * Safe site, add all site props
 * 
 * @param {object} modify site 
 * @param {string} target include: global custom local
 * @param {string} url 
 * @returns {object} site
 */
function safesite( site, target, url ) {
    site.url    = url;
    site.target = target;
    site.name  == "" && ( site.name = "tempread::" );
    ( !site.avatar || site.avatar.length == 0 ) && ( site.avatar = [{ name: "" }, { url: ""  }]);
    ( !site.paging || site.paging.length == 0 ) && ( site.paging = [{ prev: "" }, { next: "" }]);
    return site;
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
            matching.push( [ cur, clone( sites.get( cur )), type ] );
        } else if ( cur.match( /\*/g ) && cur.match( /\*/g ).length == 1 && !isroot() && cur.endsWith( "*" ) && uri.includes( sufname ) && hostname == sufname && url.includes( name ) ) {
            // e.g. https://www.douban.com/* http://mp.weixin.qq.com/*
            matching.push( [ cur, clone( sites.get( cur )), type ] );
        } else if ( minimatch( window.location.origin + window.location.pathname, cur ) ) {
            matching.push( [ cur, clone( sites.get( cur )), type ] );
        }
    }
}
