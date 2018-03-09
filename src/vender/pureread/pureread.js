console.log( "=== PureRead: pureread load ===" )

import minimatch from 'minimatch';
import pangu     from './plugin/pangu.min';

import * as util from './util';
import * as be   from './beautify';

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

    constructor( sites ) {
        this.url     = util.getURI();
        this.sites   = sites;
        this.current = {};
        this.state   = "none";  // include: meta, txt, adapter, none, temp
        this.html    = {};      // clone site, include: title, desc, include, avatar, paging
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
                this.current.site = safesite({ ...found[1] }, found[2], found[0] );
                this.state        = "adapter";
            } else {
                this.current.site = util.clone( site );
            }
        }
        this.current.site.matching = matching;
    }

    /**
     * Create temp read mode
     * 
     * @param {string} html
     */
    TempMode( html ) {
        const new_site = { url: window.location.href, site: { name: `tempread::${window.location.host}`, title: "<title>", desc: "", include: "", exclude: [] } };
        html && ( new_site.site.html = html );
        this.state        = "temp";
        this.current.url  = new_site.url;
        this.current.site = safesite({ ...new_site.site }, "local", new_site.url );
    }

    /**
     * Get read mode html
     */
    ReadMode() {
        this.html = wrap( this.current.site );
    }

    /**
     * Get highlight( focus ) jquery, only usage focus mode
     * 
     * @return {jquery} jquery object
     */
    Include() {
        let   include = this.current.site.include,
              $focus  = [];
        const target  = util.selector( include );
        try {
            if ( util.specTest( target ) ) {
                const [ value, state ] = util.specAction( include );
                if ( state == 0 ) {
                    include = include.replace( /\[\[{\$\(|}\]\]|\).html\(\)/g, "" );
                    $focus  = $( util.specAction( `[[[${include}]]]` )[0] );
                } else if ( state == 3 ) {
                    $focus  = value;
                }
            } else if ( target ) {
                $focus = $( "body" ).find( target );
            }
        } catch ( error ) {
            console.error( "Get $focus failed", error )
        }
        return $focus;
    }

    /**
     * Get exlcude jquery selector array list
     * 
     * @param  {jquery} jquery object
     * @return {array} jquery selector
     */
    Exclude( $target ) {
        return excludeSelector( $target, this.current.site.exclude );
    }

    /**
     * Beautify html
     * 
     * @param {jquery} jquery
     */
    Beautify( $target ) {
        be.specbeautify(   this.current.site.name, $target );
        be.removeSpareTag( this.current.site.name, $target );
        be.htmlbeautify( $target );
        be.commbeautify( this.current.site.name, $target );
    }

    Format( cls ) {
        pangu.spacingElementByClassName( cls );
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
 * Wrap storage.current.site object
 * 
 * @param  {object} storage.current.site object
 * @return {object} wrapper object
 */
function wrap( site ) {
    const wrapper   = util.clone( site ),
          title     = util.selector( site.title == "" ? "<title>" : site.title ),
          desc      = util.selector( site.desc    ),
          include   = util.selector( site.include );
    wrapper.title   = query( title );
    wrapper.desc    = query( desc  );
    wrapper.include = site.include == "" && site.html != "" ? site.html : query( include, "html" );
    wrapper.avatar && wrapper.avatar.length > 0  && wrapper.avatar[0].name == "" && delete wrapper.avatar;
    wrapper.paging && wrapper.paging.length > 0  && wrapper.paging[0].prev == "" && delete wrapper.paging;
    wrapper.avatar && wrapper.avatar.forEach( item => {
        const key   = Object.keys( item ).join(),
              value = item[key];
        item[key]   = query( util.selector( value ), "html" );
    });
    wrapper.paging && wrapper.paging.forEach( item => {
        const key   = Object.keys( item ).join(),
              value = item[key];
        item[key]   = query( util.selector( value ) );
    });
    return wrapper;
}

/**
 * Query content usage jquery
 * 
 * @param  {string} query content
 * @param  {string} type, incldue: text,  html and multi
 * @return {string} query result
 */
function query( content, type = "text" ) {
    const $root = $( "html" );
    if ( util.specTest( content ) ) {
        const [ value, state ] = util.specAction( content );
        if ( state == 0 ) {
            content = value;
        } else if ( state == 3 ) {
            content = getcontent( $root.find( value ) );
        }
    } else if ( type == "html" ) {
        content = getcontent( $root.find( content ) );
    } else if ( type == "multi" ) {
        // TO-DO
    } else {
        content = $root.find( content ).text().trim();
    }
    return content;
}

/**
 * Get content from current.site.include
 * 
 * @param  {jquery} jquery object e.g. $root.find( content )
 * @return {string} $target html
 */
function getcontent( $target ) {
    let html = "";
    switch ( $target.length ) {
        case 0:
            html = "<sr-rd-content-error></sr-rd-content-error>";
            break;
        case 1:
            html = $target.html().trim();
            break;
        default:
            html = $target.map( (index, item) => $(item).html() ).get().join( "<br>" );
            break;
    }
    return html;
}

/**
 * Get exclude tags list
 * 
 * @param  {jquery} jquery object
 * @param  {array}  hidden html
 * @return {string} tags list string
 */
function excludeSelector( $target, exclude ) {
    let tags = [], tag = "";
    for ( let content of exclude ) {
        if ( util.specTest( content )) {
             const [ value, type ] = util.specAction( content );
             if ( type == 1 ) {
                 tag = value;
             } else if ( type == 2 ) {
                 const arr = $target.html().match( new RegExp( value, "g" ) );
                 if ( arr && arr.length > 0 ) {
                    const str = arr.join( "" );
                    tag = `*[${str}]`;
                 } else {
                     tag = undefined;
                 }
             } else if ( type == 3 ) {
                 value.remove();
             }
        } else {
            tag = util.selector( content );
        }
        if ( tag ) tags.push( tag );
    }
    return tags.join( "," );
}