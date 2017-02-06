console.log( "===== simpread option read mode load =====" )

import Notify from 'notify';

const [ bgcolorstyl, bgcls     ] = [ "background-color", ".ks-simpread-bg" ];
let   [ prevShortcuts, keyword ] = [null, null ];
const themes = [
    "251, 251, 251,  1",
    "243, 242, 238, 1",
    "252, 252, 252, 1"
    ],
    themes_name = [ "github", "newsprint", "gothic" ];

export default class ReadOpt extends React.Component {

    changeBgColor () {
        if ( event.target.tagName.toLowerCase() == "sr-opt-theme" ) {
            const target     = event.target,
                  $target    = $(target),
                  $parent    = $target.parent(),
                  activestyl = "active",
                  theme      = $target.attr( "name" ),
                  $active    = $parent.find( 'sr-opt-theme[sr-type="active"]' );
            if ( $active ) {
                $active.removeAttr( "sr-type" );
                $target.attr( "sr-type", activestyl );
            }
            this.props.option.theme = theme;
            console.log( "this.props.option.theme = ", this.props.option.theme )
        }
    }

    changeShortcuts( event ) {
        if ( event.type === "keydown" ) {
            const key = fixKey( event );
            keyword   =  key == "control" ? "ctrl" : key;
            if ( verifyShortkey( keyword )) {
                prevShortcuts = updateShortcuts();
            } else if ( keyword.length == 0 || !/^[0-9a-z]{1}$/ig.test( keyword )) {
                new Notify().Render( 2, `当前输入不合法，快捷键只能包括：ctrl, shift, alt, 数字, 字母。` );
            }
        } else {
            console.log( "prevShortcuts, keyword = ", prevShortcuts, keyword )
            if ( /^[0-9a-z]{1}$/ig.test( keyword ) ) {
                prevShortcuts         = updateShortcuts();
            }
        }
        this.refs.shortcuts.value   = prevShortcuts;
        this.props.option.shortcuts = prevShortcuts;
    }

    changExclude() {
        this.props.option.site.exclude = getExclude( event.target.value );
        console.log( "this.props.option.site.exclude = ", this.props.option.site.exclude )
    }

    changeInclude() {
        if ( verifyHtml( event.target.value.trim() ) != -1 ) this.props.option.site.include = event.target.value.trim();
        console.log( "this.props.option.site.include = ", this.props.option.site.include )
    }

    componentDidMount() {
        setBgThemeStyle( this.props.option.theme );
        this.refs.shortcuts.value = this.props.option.shortcuts;
        this.refs.exclude.value   = this.props.option.site.exclude.join( "\n") ;
        this.refs.include.value   = this.props.option.site.include;
        prevShortcuts             = this.props.option.shortcuts;
    }

    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <sr-opt-focus>
                <sr-opt-gp>
                    <sr-opt-label>主题色：</sr-opt-label>
                    <sr-opt-themes onClick={ ()=> this.changeBgColor() }>
                        {themes.map( (theme,idx) => <sr-opt-theme style={{backgroundColor: `rgba( ${theme} )`}} name={ themes_name[idx] }></sr-opt-theme> )}
                    </sr-opt-themes>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>快捷键：</sr-opt-label>
                    <sr-opt-item sr-type="shortcuts">
                        <input ref="shortcuts" type="text" onKeyDown={ (event)=> this.changeShortcuts(event) }  onChange={ (event)=>this.changeShortcuts(event) } />
                    </sr-opt-item>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>隐藏列表：</sr-opt-label>
                    <sr-opt-item sr-type="exclude">
                        <textarea ref="exclude" placeholder="每行一个，例如：<div class='xxxx'></div>" onChange={ ()=> this.changExclude() }></textarea>
                    </sr-opt-item>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>高亮区域：</sr-opt-label>
                    <sr-opt-item sr-type="include">
                        <input ref="include" type="text" placeholder="默认为空，自动选择高亮区域。" onChange={ ()=>this.changeInclude() } />
                    </sr-opt-item>
                </sr-opt-gp>
            </sr-opt-focus>
        )
    }
}

/**
 * Get background color value
 * 
 * @param  {string} background-color, e.g. rgba(235, 235, 235, 0.901961)
 * @return {string} e.g. 235, 235, 235
 */
/*
function getColor( value ) {
    const arr = value.match( /[0-9]+, /ig );
    if ( arr.length > 0 ) {
        return arr.join( "" ).replace( /, $/, "" );
    } else {
        return null;
    }
}
*/

/**
 * Get exclude tags
 * 
 * @param  {string} input exclude html tag, e.g.:
    <div class="article fmt article__content">
    <h1>
    <div class="col-xs-12 col-md-9 main ">
    <img id="icon4weChat" style="height: 0;width: 0;">
    <div class="wsx_fade" style="pointer-events: none;"></div>
    sdasdfas
    

    <div class="ks-simpread-bg">
 *
 * @return {array} verify success htmls
    <div class="article fmt article__content">
    <h3 id="articleHeader1">原著序</h3>
    <div class="col-xs-12 col-md-9 main ">
    <img id="icon4weChat" style="height: 0;width: 0;">
    <div class="wsx_fade" style="pointer-events: none;"></div>
    <div class="ks-simpread-bg">
 * 
 */
function getExclude( htmls ) {
    let [ list, obj ]  = [[], null ];
    const arr = htmls.trim().split( "\n" );
    for( let value of arr ) {
        if ( verifyHtml( value.trim() ) > 0 ) {
            list.push( value.trim() );
        } else {
            //new Notify().Render( 2, `当前输入【 ${value} 】错误，请重新输入。` );
        }
    }
    return list;
}

/**
 * Update new shortcuts
 * 
 * @return {string} new shortcuts, e.g. [a s]
 */
function updateShortcuts() {
    console.log( "prevShortcuts = ", prevShortcuts )
    const arr     = prevShortcuts.toLowerCase().trim().split(" ");
    let shortcuts = null;
    switch ( arr.length ) {
        case 1:
            shortcuts = `${arr[0]} ${keyword}`;
            break;
        case 2:
            shortcuts = keyword;
            break;
        default:
            console.log( "发生了一些错误。", prevShortcuts, keyword )
            shortcuts = prevShortcuts;
            break;
    }
    return shortcuts;
}

/**
 * Set background style
 * 
 * @param {string} theme name
 */
function setBgThemeStyle( theme ) {
    const $themes    = $( "sr-opt-themes" ).children();

    for ( let i = 0; i < $themes.length; i++ ) {
         const $target = $($themes[i]),
               name    = $target.attr( "name" );
         if ( theme === name ) {
             $target.attr( "sr-type", "active" );
         }
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
        return event.nativeEvent.code.toLowerCase().trim().replace( /(digit|key)/ig, "" );
    }
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
 * Verify html
 * 
 * @param  {string} input include html tag, e.g.:
    <div class="article fmt article__content">
 *
 * @return {int} -1: fail； 0: emputy html; 1:success
 * 
 */
function verifyHtml( html ) {
    if ( html == "" ) return 0;
    const item = html.match( / (class|id)=("|')[\w-_]+/ig );
    if ( item && item.length > 0 ) {
        //[tag, name] = item[0].trim().replace( /'|"/ig, "" ).split( "=" );
        //return { tag, name };
        return 1;
    } else {
        return -1;
    }
}
