console.log( "===== simpread option common: Shortcuts =====" )

import TextField from 'textfield';

let [ shortcuts, prevShortcuts, keyword ] = [ [], null, null ];

export default class Shortcuts extends React.Component {

    state = {
        id    : Math.round(+new Date()),
        error : "",
        value : this.props.shortcuts,
    };

    changeShortcuts( event ) {
        if ( event.type === "keydown" ) {
            const key = fixKey( event );
            keyword   =  key == "control" ? "ctrl" : key;
            if ( verifyShortkey( keyword )) {
                prevShortcuts = updateShortcuts( this.state.id );
                shortcuts[ this.state.id ] = prevShortcuts;
                this.setState({ error : "" });
                this.props.changeShortcuts( prevShortcuts );
            } else if ( keyword.length == 0 || !/^[0-9a-z]{1}$/ig.test( keyword )) {
                this.setState({ error : `当前输入: ${keyword} 不合法，快捷键只能包括：ctrl, shift, alt, 数字, 字母。` });
            }
        } else {
            if ( /^[0-9a-z]{1}$/ig.test( keyword ) ) {
                prevShortcuts = updateShortcuts( this.state.id );
                shortcuts[ this.state.id ] = prevShortcuts;
                this.setState({ error : "" });
                this.props.changeShortcuts( prevShortcuts );
            }
        }
        prevShortcuts = shortcuts[ this.state.id ];
        this.setState({ value: prevShortcuts });
    }

    componentDidMount() {
        prevShortcuts = this.state.value;
        shortcuts[ this.state.id ] = prevShortcuts;
        console.log( "asdfasdfasdf", shortcuts )
    }

    render() {
        return (
            <TextField 
                multi={ false } override="true"
                floatingtext="快捷键" 
                value={ this.state.value }
                errortext={ this.state.error }
                onKeyDown={ (event)=> this.changeShortcuts(event) } onChange={ (event)=>this.changeShortcuts(event) }
            />
        )
    }

}

/**
 * Update new shortcuts
 * 
 * @param  {number} this state id
 * @return {string} new shortcuts, e.g. [a s]
 */
function updateShortcuts( id ) {
    prevShortcuts = shortcuts[ id ];
    const arr     = prevShortcuts.toLowerCase().trim().split(" ");
    let newshort  = null;
    switch ( arr.length ) {
        case 1:
            newshort = `${arr[0]} ${keyword}`;
            break;
        case 2:
            newshort = keyword;
            break;
        default:
            console.log( "发生了一些错误。", prevShortcuts, keyword )
            newshort = prevShortcuts;
            break;
    }
    return newshort;
}

/**
 * Verify shortkey
 * 
 * @param  {string} shortkey, only include: ctrl shift alt number letters
 *                  e.g. [a b] [a 1] [1 b] [shift a] [a ctrl] [1 alt] [1 shift]
 * 
 * @return {boolean}
 */
function verifyShortkey( key ) {
    if ([ "control", "ctrl", "alt", "shift" ].includes( key )) {
        return true;
    } else {
        return false;
    }
}

/**
 * Fix keyboard event key undefinde
 * 
 * @param  {event} keyboard event
 * @return {string} valid key, include 0~9 a~z ctrl shift alt
 */
function fixKey( event ) {
    const keycode = event.keyCode;
    if ( [ 16, 17, 18 ].includes( keycode ) ) {
        return event.key.toLowerCase().trim();
    } else if ( keycode >= 49 || keycode <= 90 ) {
        return event.code.toLowerCase().trim().replace( /(digit|key)/ig, "" );
    }
}
