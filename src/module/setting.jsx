console.log( "=== simpread option setting ===" )

import FocusOpt     from 'focusopt';
import ReadOpt      from 'readopt';

import { storage, STORAGE_MODE } from 'storage';
import * as msg     from 'message';
import {browser}    from 'browser';
import th           from 'theme';
import Notify       from 'notify';
import * as ss      from 'stylesheet';
import * as watch   from 'watch';

import Button       from 'button';
import * as tooltip from 'tooltip';
import * as waves   from 'waves';
import * as dia     from 'dialog';

const root   = "simpread-option-root",
      rootjq = `.${root}`;
let   callback;

/**
 * Modals Rect component
 */
class Modals extends React.Component {

    // close setting
    close( restore = rollback() ) {
        dia.Close();
    }

    // save setting focus option
    save() {
        console.log( "setting click submit button.", storage.current )
        watch.Verify( ( state, result ) => {
            if ( state ) {
                console.log( "watch.Lock()", result );
                new Notify().Render( "配置文件已更新，刷新当前页面后才能生效。", "刷新", ()=>window.location.reload() );
            } else {
                storage.Setcur( storage.current.mode );
                browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.shortcuts, { url: window.location.href } ));
                watch.SendMessage( "site", true );
                new Notify().Render( 0, "更新成功，刷新当前页面后才能生效！" )
                this.close( false );
            }
        });
    }

    siteeditor() {
        callback();
        this.close();
    }

    constructor( props ) {
        super( props );
    }

    componentDidMount() {
        waves.Render({ root: rootjq });
        tooltip.Render( rootjq );
    }

    render() {
        const Option = storage.current.mode == STORAGE_MODE.focus ? FocusOpt : ReadOpt;

        return (
            <dia.Dialog>
                <dia.Content>
                    <Option option={ storage.current } />
                </dia.Content>
                <dia.Footer>
                    <Button text="站点编辑器" waves="md-waves-effect" color="#fff" backgroundColor="#4caf50" onClick={ ()=>this.siteeditor() } width="70%" />
                    <div style={{ width: "100%" }}></div>
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
        ss.Preview( storage.read.custom );
    }
}

/**
 * Modals Render
 * 
 * @param {func} callback
 */
function Render( cb ) {
    callback = cb;
    !dia.Popup( rootjq ) && !storage.current.fap && dia.Open( <Modals/>, root );
    storage.current.mode == STORAGE_MODE.read && storage.current.fap && new Notify().Render( "已经启用控制栏面板，所以无法使用此功能。" );
}

/**
 * Exist
 * 
 * @return {boolean}
 */
function Exist() {
    return dia.Popup( rootjq );
}

/**
 * Exit
 */
function Exit() {
    rollback();
    dia.Close();
}

export{ Render, Exist, Exit }