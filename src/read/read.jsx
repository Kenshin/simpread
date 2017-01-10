console.log( "=== simpread read  load ===" )

import { storage, Clone } from 'storage';
import * as util          from 'util';

const rdcls   = "ks-simpread-read",
      bgtmpl  = `<div class="${rdcls}"></div>`,
      rdclsjq = "." + rdcls,
      $root   = $( "body" );

class Read extends React.Component {

    componentDidMount() {
        //$root.css({ "overflow": "hidden" });
        $root.find( rdclsjq ).addClass( `sr-rd-${ this.props.read.theme }` );
    }

    render() {
        return(
            <sr-read class="sr-rd-font">
                <sr-rd-title>{ this.props.wraper.title }</sr-rd-title>
                <sr-rd-desc>{ this.props.wraper.desc }</sr-rd-desc>
                <sr-rd-content dangerouslySetInnerHTML={{__html: this.props.wraper.include }} ></sr-rd-content>
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
    ReactDOM.render( <Read read={ storage.current } wraper={ wrap(storage.current.site) } />, getReadRoot() );
}

function wrap( site ) {
    const wraper  = Clone( site ),
          title   = util.selector( site.title   ),
          desc    = util.selector( site.desc    ),
          include = util.selector( site.include );

    wraper.title   = $root.find( title ).text().trim();
    wraper.desc    = $root.find( desc ).text().trim();
    wraper.include = $root.find( include ).html();
    //util.excludeStyle( $root, site.exclude, "hide" );

    return wraper;
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