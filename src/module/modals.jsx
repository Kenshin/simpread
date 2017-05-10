console.log( "=== simpread option dialog ===" )

import FocusOpt     from 'focusopt';
import ReadOpt      from 'readopt';

import { storage, STORAGE_MODE } from 'storage';
import * as msg     from 'message';
import {browser}    from 'browser';
import th           from 'theme';
import Notify       from 'notify';
import * as ss      from 'stylesheet';

import Button       from 'button';
import * as tooltip from 'tooltip';
import * as waves   from 'waves';
import * as dia     from 'dialog';

const optbgcls   = "simpread-option-root",
      optbgclsjq = `.${optbgcls}`,
      optbg      = `<div class="${ optbgcls } simpread-font"></div>`;

/**
 * Dialog Rect component
 */
export default class Dialog extends React.Component {

    // close dialog
    close( restore = rollback() ) {
        $( optbgclsjq )
            .addClass( "simpread-option-root-hide" )
            .velocity({ opacity: 0 }, { complete: ()=>{
                tooltip.Exit( optbgclsjq );
                $( optbgclsjq ).remove();
            }});
    }

    // save dialog focus option
    save() {
        console.log( "dialog click submit button.", storage.current )
        const code = storage.Setcur( storage.current.mode );
        if ( code != 0 ) {
            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.shortcuts, { url: window.location.href } ));
            if ( storage.current.mode == STORAGE_MODE.read ) browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.browser_action, { code: storage.rdstcode, url: window.location.href }));
            code == 1 ? new Notify().Render( 0, "更新成功！" ) : new Notify().Render( 0, "更新成功，重新进入后生效！" )
        } else {
            new Notify().Render( 0, "没有改变任何内容。" );
        }
        this.close( false );
    }

    constructor( props ) {
        super( props );
    }

    componentDidMount() {
        waves.Render({ root: optbgclsjq });
        tooltip.Render( optbgclsjq );
        $( optbgclsjq )
            .velocity({ opacity: 1 })
            .addClass( "simpread-option-root-show" );
        $( "dialog-content" ).height() < 585 && $( "dialog-footer" ).css( "border-top", "none" );
    }

    render() {
        const Option = storage.current.mode == STORAGE_MODE.focus ? FocusOpt : ReadOpt;

        return (
            <dia.Dialog>
                <dia.Content>
                    <Option option={ storage.current } />
                </dia.Content>
                <dia.Footer>
                    <Button text="取 消" mode="secondary" waves="md-waves-effect" onClick={ ()=>this.close() } />
                    <Button text="确 认" waves="md-waves-effect" onClick={ ()=>this.save() } />
                </dia.Footer>
            </dia.Dialog>
        )

    }
}

/**
 * Roll back when cancel button click
 */
function rollback() {
    storage.Restore( storage.current.mode );
    if ( storage.current.mode == STORAGE_MODE.focus ) $( ".simpread-focus-root" ).css({ "background-color" : storage.current.bgcolor });
    if ( storage.current.mode == STORAGE_MODE.read ) {
        th.theme != storage.current.theme && th.Change( storage.current.theme );
        ss.FontFamily( storage.current.fontfamily );
        ss.FontSize( storage.current.fontsize );
        ss.Layout( storage.current.layout );
    }
}

/**
 * get Dialog background document
 * 
 * @param  {string} target include: body and html
 * @return {jquery} simpread-option-root jquery object
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