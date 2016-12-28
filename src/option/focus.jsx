console.log( "===== simpread option focus mode load =====" )

import Notify from 'notify';

const [ bgcolorstyl, bgcls ] = [ "background-color", ".ks-simpread-bg" ];
let prevShortcuts = null;

export default class FocusOpt extends React.Component {

    changeBgColor () {
        if ( event.target.tagName.toLowerCase() == "li" ) {

            const target     = event.target,
                  $target    = $(target),
                  activestyl = "ks-simpread-option-focus-theme-item-active",
                  $active    = $( ".ks-simpread-option-focus-theme" ).find( `.${activestyl}` ),
                  bgcolor    = $target.css( bgcolorstyl ),
                  color      = getColor( bgcolor ),
                  opacity    = getOpacity( $( bgcls ).css( bgcolorstyl ) ),
                  newval     = `rgba(${color}, ${opacity})`;

            // set new background color
            $( bgcls ).css( bgcolorstyl, newval );

            // update active
            if ( $active.length > 0 ) {
                $active.removeClass( activestyl );
                $target.addClass(    activestyl );
            }
            this.setState({ bgcolor : newval });
        }
    }

    changeOpacity() {
        const bgcolor = $( bgcls ).css( bgcolorstyl ),
              opacity = event.target.value,
              color   = getColor( bgcolor ),
              newval  = `rgba(${color}, ${opacity / 100})`;
        if ( color ) {
            $( bgcls ).css( bgcolorstyl, newval );
        }
        this.setState({ opacity : opacity });
    }

    changeShortcuts() {
        const key = control2ctrl( event.key.toLowerCase().trim() );
        if ( key.length == 1 ) {
            if ( /^[0-9a-z]{1}$/ig.test(key) ) {
                this.setState({ shortcuts : key });
            } else {
                new Notify().Render( 2, `当前输入【 ${key} 】不合法，快捷键只能包括：【ctrl】【shift】【alt】【数字】与【字母】。` );
                this.refs.shortcuts.value = this.refs.shortcuts.value.replace( key, "" );
            }
        } else if ( verifyShortkey( key )) {
            this.setState({ shortcuts : key });
        } else if ( key.length == 0 ) {
            new Notify().Render( 2, `当前输入不能为空，快捷键只能包括：【ctrl】【shift】【alt】【数字】与【字母】。` );
        } else {
            new Notify().Render( 2, `当前输入【 ${key} 】不合法，快捷键只能包括：【ctrl】【shift】【alt】【数字】与【字母】。` );
            this.refs.shortcuts.value = this.refs.shortcuts.value.replace( key, "" );
        }
    }

    changExclude() {
        this.state.exclude = getExclude( this.refs.exclude.value );
    }

    changeInclude() {
        this.state.include = getInclude( this.refs.include.value );
    }

    componentDidUpdate() {
        console.log( this.state.shortcuts, prevShortcuts )
        const arr = prevShortcuts.toLowerCase().trim().split(" ");
        switch ( arr.length ) {
            case 1:
                this.refs.shortcuts.value = `${arr[0]} ${this.state.shortcuts}`;
                prevShortcuts             = this.refs.shortcuts.value;
                break;
            case 2:
                this.refs.shortcuts.value = this.state.shortcuts;
                prevShortcuts             = this.refs.shortcuts.value;
                break;
            default:
                console.log( "发生了一些错误。", prevShortcuts, this.state.shortcuts )
                break;
        }
    }

    componentDidMount() {
        this.refs.opacity.value   = this.state.opacity;
        this.refs.shortcuts.value = this.state.shortcuts;
    }

    constructor( props ) {
        super( props );
        this.state = {
            bgcolor   : "rgba( 235, 235, 235, 0.9 )",
            opacity   : 90,
            shortcuts : "A S",
            exclude   : [],
            include   : {},
        };
        prevShortcuts = this.state.shortcuts;
    }

    render() {
        return (
            <div className="ks-simpread-option-focus">
                <div className="ks-simpread-option-focus-container">
                    <span>主题色：</span>
                    <ul className="ks-simpread-option-focus-theme" onClick={ ()=> this.changeBgColor() }>
                        <li className="ks-simpread-option-focus-theme-item ks-simpread-option-focus-theme-item-active"></li>
                        <li className="ks-simpread-option-focus-theme-item"></li>
                        <li className="ks-simpread-option-focus-theme-item"></li>
                        <li className="ks-simpread-option-focus-theme-item"></li>
                        <li className="ks-simpread-option-focus-theme-item"></li>
                        <li className="ks-simpread-option-focus-theme-item"></li>
                        <li className="ks-simpread-option-focus-theme-item"></li>
                        <li className="ks-simpread-option-focus-theme-item"></li>
                    </ul>
                </div>
                <div className="ks-simpread-option-focus-container">
                    <span>透明度：</span>
                    <div className="ks-simpread-option-focus-opacity">
                        <input ref="opacity"
                            type="range" min="50" max="95" step="5" 
                            onChange={ ()=> this.changeOpacity() }
                        />
                    </div>
                </div>
                <div className="ks-simpread-option-focus-container">
                    <span>快捷键：</span>
                    <div className="ks-simpread-option-focus-shortcuts">
                        <input ref="shortcuts" type="text" onKeyUp={ ()=> this.changeShortcuts() } />
                    </div>
                </div>
                <div className="ks-simpread-option-focus-container">
                    <span>隐藏列表：</span>
                    <div className="ks-simpread-option-focus-exclude">
                        <textarea ref="exclude" placeholder="每行一个，例如：<div class='xxxx'></div>" onChange={ ()=> this.changExclude() }></textarea>
                    </div>
                </div>
                <div className="ks-simpread-option-focus-container">
                    <span>高亮区域：</span>
                    <div className="ks-simpread-option-focus-include">
                        <input ref="include" type="text" placeholder="默认为空，自动选择高亮区域。" onChange={ ()=>this.changeInclude() } />
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * Get background opacity value
 * 
 * @param  {string} background-color, e.g. rgba(235, 235, 235, 0.901961)
 * @return {string} e.g. 0.901961
 */
function getOpacity( value ) {
    const arr = value.match( /[0-9.]+(\))$/ig );
    if ( arr.length > 0 ) {
        return arr.join( "" ).replace( ")", "" );
    } else {
        return null;
    }
}

/**
 * Get background color value
 * 
 * @param  {string} background-color, e.g. rgba(235, 235, 235, 0.901961)
 * @return {string} e.g. 235, 235, 235
 */
function getColor( value ) {
    const arr = value.match( /[0-9]+, /ig );
    if ( arr.length > 0 ) {
        return arr.join( "" ).replace( /, $/, "" );
    } else {
        return null;
    }
}

/**
 * Verify shortkey
 * 
 * @param  {string} shortkey, only include: ctrl shift alt number letters
 *                            e.g. [a b] [a 1] [1 b] [shift a] [a ctrl] [1 alt] [1 shift]
 * 
 * @return {boolean}
 */
function verifyShortkey( key ) {
    if (
        [ "control", "ctrl", "alt", "shift"].includes( key )
        /*|| key == "meta"    || key == "command"   || key == "enter"     || key == "backspace"
        || key == "arrowup" || key == "arrowdown" || key == "arrowleft" || key == "arrowright"*/
    ) {
        return true;
    } else {
        return false;
    }
}

/**
 * Control keyword conver to ctrl keyword
 * 
 * @param  {string} keyword
 * @return {string} keyword
 */
function control2ctrl( key ) {
    return key == "control" ? "ctrl" : key;
}

/**
 * Get exclude tags
 * 
 * @param  {string} input exclude html tag, e.g.:
    <div class="article fmt article__content">
    <h3 id="articleHeader1">原著序</h3>
    <div class="col-xs-12 col-md-9 main ">
    <img id="icon4weChat" style="height: 0;width: 0;">
 *
 * @return {array} formatting e.g.:
    [{ "tag" : "class", "name" : "article" },
     { "tag" : "id",    "name" : "articleHeader1" },
     { "tag" : "class", "name" : "col-xs-12" },
     { "tag" : "id",    "name" : "icon4weChat" }]
 * 
 */
function getExclude( tags ) {
    let [ list, obj ]  = [[], null ];
    const arr = tags.toLowerCase().trim().split( "\n" );
    for( let value of arr ) {
        obj = getInclude( value );
        if ( obj ) {
            list.push( obj );
        }
    }
    return list;
}

/**
 * Get include tag
 * 
 * @param  {string} input include html tag, e.g.:
    <div class="article fmt article__content">
 *
 * @return {array} formatting e.g.:
    { "tag" : "class", "name" : "article" }
 * 
 */
function getInclude( content ) {
    const item = content.match( / (class|id)=("|')[\w-_]+/ig );
    if ( item && item.length > 0 ) {
        const [tag, name] = item[0].trim().replace( /'|"/ig, "" ).split( "=" );
        return { tag, name };
    } else {
        //new Notify().Render( 2, `当前输入【 ${content} 】错误，请重新输入。` );
        return null;
    }
}