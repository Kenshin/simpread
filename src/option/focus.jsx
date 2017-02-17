console.log( "===== simpread option focus mode load =====" )

import ThemeSel  from 'themesel';
import Shortcuts from 'shortcuts';
import Include   from 'include';
import Exclude   from 'exclude';

import TextField from 'textfield';

const [ bgcolorstyl, bgcls ] = [ "background-color", ".ks-simpread-bg" ],
      themes = [
        "235, 235, 235, 0.9",
        "216, 216, 216, 0.9",
        "229, 221, 208, 0.9",
        "243, 234, 203, 0.9",
        "176, 192, 182, 0.9",
        "28, 31, 43, 0.9",
        "61, 66, 70, 0.9",
        "17, 18, 20, 0.9"
    ];

export default class FocusOpt extends React.Component {

    changeBgColor( bgcolor, $target ) {
        bgcolor       = $target.css( bgcolorstyl );
        const color   = getColor( bgcolor ),
              opacity = getOpacity( $( bgcls ).css( bgcolorstyl ) ),
              newval  = `rgba(${color}, ${opacity})`;
        $( bgcls ).css( bgcolorstyl, newval );
        this.props.option.bgcolor = newval;
        console.log( "this.props.option.bgcolor = ", this.props.option.bgcolor )
    }

    changeOpacity() {
        const bgcolor = $( bgcls ).css( bgcolorstyl ),
              opacity = event.target.value,
              color   = getColor( bgcolor ),
              newval  = `rgba(${color}, ${opacity / 100})`;
        if ( color ) {
            $( bgcls ).css( bgcolorstyl, newval );
            this.props.option.bgcolor = newval;
        }
        this.props.option.opacity = opacity;
        console.log( "this.props.option.opacity = ", this.props.option.opacity )
    }

    changeShortcuts( shortcuts ) {
        this.props.option.shortcuts = shortcuts;
        console.log( "this.props.option.shortcuts = ", this.props.option.shortcuts )
    }

    changeInclude( value ) {
        this.props.option.site.include = value;
        console.log( "this.props.option.site.include = ", this.props.option.site.include )
    }

    changeExclude( value ) {
        this.props.option.site.exclude = value;
        console.log( "this.props.option.site.exclude = ", this.props.option.site.exclude )
    }

    componentDidMount() {
        this.refs.opacity.value   = this.props.option.opacity;
    }

    render() {
        return (
            <sr-opt-focus>
                <sr-opt-gp>
                    <sr-opt-label>主题色：</sr-opt-label>
                    <ThemeSel themes={ themes } names={ themes } theme={ getColor(this.props.option.bgcolor) + ", 0.9" } changeBgColor={ (val,target)=>this.changeBgColor(val,target) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>透明度：</sr-opt-label>
                    <sr-opt-item sr-type="opacity">
                        <input ref="opacity"
                            type="range" min="50" max="95" step="5" 
                            onChange={ ()=> this.changeOpacity() }
                        />
                    </sr-opt-item>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>快捷键：</sr-opt-label>
                    <sr-opt-item sr-type="shortcuts">
                        <Shortcuts shortcuts={ this.props.option.shortcuts } changeShortcuts={ val=>this.changeShortcuts(val) } />
                    </sr-opt-item>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>隐藏列表：</sr-opt-label>
                    <sr-opt-item sr-type="exclude">
                        <Exclude exclude={ this.props.option.site.exclude } changeExclude={ val=>this.changeExclude(val) } />
                    </sr-opt-item>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>高亮区域：</sr-opt-label>
                    <sr-opt-item sr-type="include">
                        <Include include={ this.props.option.site.include } changeInclude={ val=>this.changeInclude(val) } />
                    </sr-opt-item>
                </sr-opt-gp>
                <sr-opt-gp>
                    <TextField multi={ true } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <TextField multi={ false } />
                </sr-opt-gp>
            </sr-opt-focus>
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
