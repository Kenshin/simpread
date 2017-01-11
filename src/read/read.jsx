console.log( "=== simpread read  load ===" )

import { storage, Clone } from 'storage';
import * as util          from 'util';

const rdcls   = "ks-simpread-read",
      bgtmpl  = `<div class="${rdcls}"></div>`,
      rdclsjq = "." + rdcls,
      $root   = $( "html" );

class Read extends React.Component {

    componentWillMount() {
        $( "body" ).css({ "display": "none" });
    }

    componentDidMount() {
        const theme = `sr-rd-${ this.props.read.theme }`;
        $root.addClass( theme ).find( rdclsjq ).addClass( theme );
        //beautiHtml();
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

    render() {
        return(
            <sr-read class="sr-rd-font">
                <sr-rd-title>{ this.props.wrapper.title }</sr-rd-title>
                <sr-rd-desc>{ this.props.wrapper.desc }</sr-rd-desc>
                <sr-rd-content dangerouslySetInnerHTML={{__html: this.props.wrapper.include }} ></sr-rd-content>
            </sr-read>
        )
    }

}

/**
 * Render entry
 * 
 * @method 
 */
function Render() {
    ReactDOM.render( <Read read={ storage.current } wrapper={ wrap(storage.current.site) } />, getReadRoot() );
}

/**
 * Wrap storage.current.site object
 * 
 * @param  {object} storage.current.site object
 * @return {object} wrapper object
 */
function wrap( site ) {
    const wrapper  = Clone( site ),
          title   = util.selector( site.title   ),
          desc    = util.selector( site.desc    ),
          include = util.selector( site.include );
    wrapper.title   = $root.find( title ).text().trim();
    wrapper.desc    = $root.find( desc ).text().trim();
    wrapper.include = rules($root.find( include ).html());
    //util.excludeStyle( $root, site.exclude, "hide" );
    return wrapper;
}

/**
 * Format html
 * 
 * @param  {string} html string
 * @return {string} format html string
 */
function rules( html ) {
    return html.trim().replace( / style="[a-zA-Z0-9-_: ;#.]+"/g, "" );
            /*.replace( /<\/?[0-9a-z]+/g, item => {
                if ( [ "<p", "<div", "<span" ].includes( item ) ) {
                    if ( item[1] == "/" ) {
                        item = "</sr-rd-" + item.substr(2);
                    } else {
                        item = "<sr-rd-" + item.substr(1);
                    }
                }
                console.log(item)
                return item;
            })*/
}

/*
function beautiHtml() {
    const $target = $("sr-rd-content");
    $target.find( "img" ).map( function( index, item ) {
        console.log(item)
    })
}
*/

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

export { Render };