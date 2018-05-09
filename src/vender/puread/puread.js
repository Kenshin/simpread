console.log( "=== PureRead: PureRead load ===" )

import * as util  from './util';
import AdapteSite from './adaptesite';

export default class PureRead extends AdapteSite {

    constructor( sites ) {
        super( sites );
        this.version = "0.0.2";
        this.html    = {}; // clone site, include: title, desc, include, avatar, paging
    }

    /**
     * Add Plugin
     * 
     * @param {object} plugin object
     */
    AddPlugin( plugin ) {
        super.minimatch = plugin.minimatch;
        this.pangu      = plugin.pangu;
        this.beautify   = plugin.beautify;
        this.stylesheet = plugin.style;
    }

    /**
     * Create temp read mode
     * 
     * @param {string} html
     */
    TempMode( mode, html ) {
       this.state        = "temp";
       this.Newsite( mode, html );
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
        if ( this.beautify ) {
            this.beautify.specbeautify(   this.current.site.name, $target );
            this.beautify.removeSpareTag( this.current.site.name, $target );
            this.beautify.htmlbeautify( $target );
            this.beautify.commbeautify( this.current.site.name, $target );
        }
    }

    /**
     * Format usage pangu plugin
     * 
     * @param {string} class name
     */
    Format( cls ) {
        this.pangu &&
            this.pangu.spacingElementByClassName( cls );
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