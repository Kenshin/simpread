console.log( "=== simpread option dialog ===" )

import FocusOpt  from 'focusopt';
import ReadOpt   from 'readopt';
import { storage, STORAGE_MODE } from 'storage';
import Notify from 'notify';

const optbgcls = "ks-simpread-option-bg",
      optbg    = `<div class="${ optbgcls }"></div>`;

/**
 * Dialog Rect component
 */
export default class Dialog extends React.Component {

    // close dialog
    close( restore = rollback() ) {
        $( "." + optbgcls ).addClass( "ks-simpread-option-bg-hide" );
        $( "." + optbgcls ).one( "animationend webkitAnimationEnd", () => $( "." + optbgcls ).remove() );
    }

    // save dialog focus option
    save() {
        console.log( "dialog click submit button.", storage.current )
        storage.Set( storage.current.mode );
        chrome.runtime.sendMessage({ type: "shortcuts" });
        if ( storage.current.mode == STORAGE_MODE.read ) chrome.runtime.sendMessage({ type: "browser_action", value: { code: storage.rdstcode, url: window.location.href } });
        new Notify().Render( 0, "更新成功！" );
        this.close( false );
    }

    constructor( props ) {
        super( props );
    }

    render() {
        const Option = storage.current.mode == STORAGE_MODE.focus ? FocusOpt : ReadOpt;
        return (
            <sr-dialog>
                <sr-dialog-content>
                    <Option option={ storage.current } />
                </sr-dialog-content>
                <sr-dialog-footer>
                    <sr-dialog-ctl href="javascript:void(0);" sr-type="submit" onClick={ () => this.save() }>
                        确认
                    </sr-dialog-ctl>
                    <sr-dialog-ctl href="javascript:void(0);" sr-type="cancel" onClick={ () => this.close() }>
                        取消
                    </sr-dialog-ctl>
                </sr-dialog-footer>
            </sr-dialog>
        )
    }
}

/**
 * Roll back when cancel button click
 */
function rollback() {
    storage.Restore( storage.current.mode );
    $( ".ks-simpread-bg" ).css({ "background-color" : storage.current.bgcolor });
}

/**
 * get Dialog background document
 * 
 * @param  {string} target include: body and html
 * @return {jquery} ks-simpread-option-bg jquery object
 */
export function getDialogBackground( target = "body" ) {
    if ( $(target).find( "." + optbgcls ).length == 0 ) {
        $(target).append( optbg );
    }
    return $( "." + optbgcls )[0];
}

/**
 * Verify dialog is popup
 * 
 * @return {boolean}
 */
export function isPopup() {
     if ( $("." + optbgcls ).children().length == 0 ) {
         return false;
     } else {
         return true;
     }
}