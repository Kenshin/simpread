console.log( "=== simpread read load ===" )

import pangu       from 'pangu';
import ProgressBar from 'readschedule';
import Footer      from 'readfooter';

import { ReadCtlbar, ReadCtlAdapter } from 'readctlbar';
import { storage, Clone } from 'storage';
import * as util          from 'util';

const rdcls   = "ks-simpread-read",
      bgtmpl  = `<div class="${rdcls}"></div>`,
      rdclsjq = "." + rdcls,
      $root   = $( "html" ),
      theme   = `sr-rd-theme-bg`;

class Read extends React.Component {

    componentWillMount() {
        $( "body" ).addClass( "ks-simpread-body-hide" );
    }

    async componentDidMount() {
        await excludes( $("sr-rd-content"), this.props.wrapper.exclude );
        await beautify( $( "sr-rd-content" ));
        $root.addClass( theme ).find( rdclsjq ).addClass( theme );
        pangu.spacingElementByClassName( rdcls );
    }

    componentWillUnmount() {
        $root.removeClass( theme );
        $( "body" ).removeClass( "ks-simpread-body-hide" );
        $( rdclsjq ).addClass( "ks-simpread-read-hide" );
        $( rdclsjq ).one( "animationend", () => {
            $( rdclsjq ).remove();
        });
    }

    constructor( props ) {
        super( props );
        switch ( this.props.read.theme ) {
            case "theme1":
               require( "theme1" );
               break;
            case "theme2":
               require( "theme2" );
               break;
        }
    }

   // exit read mode
   exit() {
        ReactDOM.unmountComponentAtNode( getReadRoot() );
    }

    render() {
        return(
            <sr-read class="sr-rd-font">
                <ProgressBar />
                <sr-rd-title>{ this.props.wrapper.title }</sr-rd-title>
                <sr-rd-desc>{ this.props.wrapper.desc }</sr-rd-desc>
                <sr-rd-content dangerouslySetInnerHTML={{__html: this.props.wrapper.include }} ></sr-rd-content>
                <Footer />
                <ReadCtlbar exit={ ()=> this.exit() } />
            </sr-read>
        )
    }

}

/**
 * Render entry
 * 
 */
function Render() {
    ReactDOM.render( <Read read={ storage.current } wrapper={ wrap(storage.current.site) } />, getReadRoot() );
}

/**
 * Get read root
 * 
 * @return {jquery} read root jquery object
 */
function getReadRoot() {
    if ( $root.find( rdclsjq ).length == 0 ) {
        $root.append( bgtmpl );
    }
    return $( rdclsjq )[0];
}

/**
 * Verify ks-simpread-read tag exit
 * 
 * @return {boolean}
 */
function Exist( action = true ) {
    if ( $root.find( rdclsjq ).length > 0 ) {
        if (action) ReadCtlAdapter( "setting" );
        return true;
    } else {
        return false;
    }
}

/**
 * Wrap storage.current.site object
 * 
 * @param  {object} storage.current.site object
 * @return {object} wrapper object
 */
function wrap( site ) {
    const wrapper   = Clone( site ),
          title     = util.selector( site.title   ),
          desc      = util.selector( site.desc    ),
          include   = util.selector( site.include );
    wrapper.title   = query( title );
    wrapper.desc    = query( desc  );
    wrapper.include = query( include, "html" );
    return wrapper;
}

/**
 * Query content usage jquery
 * 
 * @param  {string} query content
 * @param  {string} type, incldue: text and html
 * @return {string} query result
 */
function query( content, type = "text" ) {
    if ( util.specTest( content ) ) {
        content = util.specAction( content )[0];
    } else if ( type == "html" ) {
        content = rules($root.find( content ).html().trim());
    } else {
        content = $root.find( content ).text().trim();
    }
    return content;
}

/**
 * Set exclude style
 * 
 * @param {jquery} jquery object
 * @param {array}  hidden html
 */
async function excludes( $target, exclude ) {
    const tags = util.exclude( $target, exclude );
    $target.find( tags ).remove();
}

/**
 * Beautify html, include:
 * - task: all webiste image, when style height = 0px, remove it
 * - task: rework com-insert-images class, only incldue qdaily.com
 * - task: all webiste image, remove old image and create new image
 * - task: all [sr-rd-content-exclude] remove style
 * - task: all webiste sr-blockquote, remove style
 * - task: all webiste iframe, embed add center style
 * - task: all hr tag add sr-rd-content-exclude class
 * - task: all pre tag remove class
 * 
 * @param {jquery}
 */
async function beautify( $target ) {
    $target.find( "img" ).map( (index, item) => {
        const $target = $(item),
              height  = Number.parseInt($target.css("height"));
        if ( storage.current.site.name == "qdaily.com" && height == 0 ) {
            $target.remove();
        }
    });
    $target.find( ".com-insert-images" ).map( (index, item) => {
        const $target = $(item),
              imgs    = $target.find( "img" ).map( (index, item)=>`<div>${item.outerHTML}</div>` ),
              str     = imgs.get().join( "" );
        $target.empty().removeAttr( "class" ).append( str );
    });
    $target.find( "img" ).map( ( index, item ) => {
        const $target = $(item),
              $orgpar = $target.parent(),
              $img    = $( "<img class='sr-rd-content-img-load'>" ),
              src     = $target.attr( "src" ),
              lazysrc = $target.attr( "data-src" ),
              zuimei  = $target.attr( "data-original" ),
              cnbeta  = $target.attr( "original" ),
              fixOverflowImgsize = () => {
                  $img.removeClass( "sr-rd-content-img-load" );
                  if ( $img[0].clientHeight > 620 ) $img.attr( "height", 620 );
                  if ( $img[0].clientWidth  > $("sr-rd-content").width()) $img.addClass( "sr-rd-content-img" );
              };
        let  newsrc,
             $parent = $target.parent(),
             tagname = $parent[0].tagName.toLowerCase();

        // remove current image and create new image object
        newsrc = cnbeta  ? cnbeta  : src;
        newsrc = lazysrc ? lazysrc : newsrc;
        newsrc = zuimei  ? zuimei  : newsrc;
        $img.attr( "src", newsrc );
        $img.one( "load", ()=>fixOverflowImgsize() );
        $parent.append( $img );
        $target.remove();
        $img.wrap( "<div class='sr-rd-content-center'></div>" );

        // origin style
        /*if ( tagname !== "sr-read" && !$parent.hasClass( "sr-rd-content-exclude" ) ) {
            $img.parent().unwrap();
        }*/

        // beautify style
        /* remove other class and add center class
        while ( ![ "p", "div", "span" ].includes( tagname ) ) {
            $parent = $parent.parent();
            tagname = $parent[0].tagName.toLowerCase();
            if ( tagname == "sr-read" ) {
                const $p = $( "<p>" );
                $p.append( $img );
                $orgpar.append( $p );
                $parent = $p;
                tagname = $parent[0].tagName.toLowerCase();
            }
        }
        if ( !$parent.hasClass( "sr-rd-content-exclude" ) ) {
            $parent.removeAttr( "style" ).removeClass( $parent.attr("class") ).addClass( "sr-rd-content-center" );
        }
        */
    });
    /*$target.find( "sr-rd-content-exclude" ).map( ( index, item ) => {
        $(item).removeAttr( "style" );
    });*/
    $target.find( "sr-blockquote" ).map( ( index, item ) => {
        const $target = $(item),
              $parent = $target.parent();
        $target.removeAttr( "style" ).removeAttr( "class" );
        if ( storage.current.site.name == "dgtle.com" ) {
           $parent.removeClass( "quote" );
        }
    });
    $target.find( "iframe, embed" ).map( ( index, item )=> {
        $(item).wrap( "<div class='sr-rd-content-center'></div>" );
    });
    $target.find( "hr" ).map( ( index, item )=> {
        $(item).addClass( "sr-rd-content-exclude" );
    });
    $target.find( "pre" ).map( ( index, item )=> {
        $(item).find( "code" ).removeAttr( "class" );
    });
}

/**
 * Format html, include:
 * - change all blockquote to sr-blockquote
 * 
 * @param  {string} html string
 * @return {string} format html string
 */
function rules( html ) {
    return html.trim().replace( /<\/?blockquote/g, (value) => value[1] == "/" ? "</sr-blockquote" : "<sr-blockquote" );
}

export { Render, Exist };