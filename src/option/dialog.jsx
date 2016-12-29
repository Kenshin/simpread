console.log( "=== simpread option dialog ===" )

import FocusOpt from 'focusopt'

let site = {
    url  : "",
    html : {
        exclude   : [],
        include   : {},
}};

const optbgcls = "ks-simpread-option-bg",
      optbg    = `<div class="${ optbgcls }"></div>`,
      option   = {
        version   : "2016-12-29",
        bgcolor   : "rgba( 235, 235, 235, 0.9 )",
        opacity   : 90,
        shortcuts : "A S",
        sites     : [ site ]
      };

/**
 * Dialog Rect component
 */
export default class Dialog extends React.Component {

    // close dialog
    close() {
        $( "." + optbgcls ).addClass( "ks-simpread-option-bg-hide" );
        $( "." + optbgcls ).one( "animationend", () => $( "." + optbgcls ).remove() );
    }

    // save dialog focus option
    save() {
        console.log( "dialog click submit button.", option )
        for( let i = 0; i < option.sites; i++ ) {
            const url = getURI(),
                  obj = option.sites[i];
            if ( obj.url === url ) {
                option.sites.splice( i, 1, site );
            }
        }
        // save local storage
        localStorage["simpread-focus"] = JSON.stringify( option );
        this.close();
    }

    constructor( props ) {
        super( props );
        for( let obj of option.sites ) {
            const url = getURI();
            if ( obj.url === url ) {
                site      = obj;
            } else {
                site.url  = url;
            }
        }
    }

    render() {
        return (
            <div className="ks-simpread-option-dialog">
                <div className="ks-simpread-option-content">
                    <FocusOpt option={ option } site={ site } />
                </div>
                <div className="ks-simpread-option-footer">
                    <a 
                        href="javascript:void(0);"
                        className="ks-simpread-option-btn ks-simpread-option-submit"
                        onClick={ () => this.save() }>
                        确认
                    </a>
                    <a 
                        href="javascript:void(0);"
                        className="ks-simpread-option-btn ks-simpread-option-cancel"
                        onClick={ () => this.close() }>
                        取消
                    </a>
                </div>
            </div>
        )
    }
}

/**
 * get Dialog background document
 */
export function getDialogBackground() {
    $( "body" ).append( optbg );
    return $( "." + optbgcls )[0];
}

/**
 * Get URI
 * 
 * @return {string} e.g. current site url is http://www.cnbeta.com/articles/1234.html return http://www.cnbeta.com/articles/
 */
function getURI() {
    const pathname = window.location.pathname,
          arr      = pathname.split( "/" ),
          end      = arr.pop(),
          str      = arr.join( "" );
    return `${ window.location.protocol }//${ window.location.hostname }/${ str }/`;
}