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

function wrap( site ) {
    const wrapper  = Clone( site ),
          title   = util.selector( site.title   ),
          desc    = util.selector( site.desc    ),
          include = util.selector( site.include );

    wrapper.title   = $root.find( title ).text().trim();
    wrapper.desc    = $root.find( desc ).text().trim();
    wrapper.include = $root.find( include ).html();
    //util.excludeStyle( $root, site.exclude, "hide" );

    return wrapper;
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

export { Render };