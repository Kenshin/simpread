console.log( "=== simpread option dialog ===" )

import FocusOpt  from 'focusopt';
import {storage} from 'storage';

let [ option, site ] = [ {}, {} ];

const optbgcls = "ks-simpread-option-bg",
      optbg    = `<div class="${ optbgcls }"></div>`;

/**
 * Dialog Rect component
 */
export default class Dialog extends React.Component {

    // close dialog
    close( restore = true ) {
        if ( restore ) storage.Restore( "focus" );
        $( "." + optbgcls ).addClass( "ks-simpread-option-bg-hide" );
        $( "." + optbgcls ).one( "animationend", () => $( "." + optbgcls ).remove() );
    }

    // save dialog focus option
    save() {
        console.log( "dialog click submit button.", option, site )
        storage.Setsite( "focus", site );
        storage.Set();
        this.close( false );
    }

    constructor( props ) {
        super( props );
    }

    render() {
        option = storage.focus;
        site   = storage.Getsite( "focus" );
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