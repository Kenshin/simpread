console.log( "=== simpread option modals ===" )

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

const root   = "simpread-option-root",
      rootjq = `.${root}`;
let   callback,
      flag   = { name: 0, url: 0, title: 0, desc: 0, include: 0, exclude: 0 }; // 0: success -1: faield -2: not empty

/**
 * Modals Rect component
 */
class Modals extends React.Component {

    // close modals
    close( restore = rollback() ) {
        dia.Close();
    }

    // save modals focus option
    save() {
        console.log( "modals click submit button.", storage.current, flag )
        if ( Object.values( flag ).findIndex( key => key != 0 ) != -1 ) {
            new Notify().Render( 3, "验证内容中有错误，请确认后再提交。" );
        } else {
            const code = storage.Setcur( storage.current.mode );
            if ( code != 0 ) {
                browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.shortcuts, { url: window.location.href } ));
                code == 1 ? new Notify().Render( 0, "更新成功！" ) : new Notify().Render( 0, "更新成功，页面刷新后生效！" )
            } else {
                new Notify().Render( 0, "没有改变任何内容。" );
            }
            this.close( false );
        }
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
                    <Option option={ storage.current } flag={ flag } />
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
    flag = { title: 0, desc: 0, include: 0, exclude: 0 }
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
    callback   = cb;
    const name = storage.current.site.name;
    switch ( true ) {
        case name.startsWith( "tempread::" ):
            new Notify().Render( "当前为 <a href='https://github.com/Kenshin/simpread/wiki/%E4%B8%B4%E6%97%B6%E9%98%85%E8%AF%BB%E6%A8%A1%E5%BC%8F' target='_blank'>临时阅读模式</a>，请用【站点编辑器】保存后才能使用此功能。" );
            break;
        case name.startsWith( "metaread::" ):
            new Notify().Render( "当前为 <a href='https://github.com/Kenshin/simpread/wiki/主动适配阅读模式' target='_blank'>主动适配阅读模式</a>，并不能保存到适配列表中，保存功能将在下个版本提供。" )
            break;
        case name.startsWith( "txtread::" ):
            new Notify().Render( "当前为 <a href='https://github.com/Kenshin/simpread/wiki/小说阅读器模式' target='_blank'>小说阅读器模式</a>，并不能使用设定功能。" )
            break;
        default:
            !dia.Popup( rootjq ) && dia.Open( <Modals/>, root );
    }
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