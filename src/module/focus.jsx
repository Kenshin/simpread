console.log( "===== simpread option focus mode load =====" )

import ThemeSel  from 'themesel';
import Shortcuts from 'shortcuts';

import Slider    from 'slider';

import * as ss   from 'stylesheet';
import * as conf from 'config';

export default class FocusOpt extends React.Component {

    changeBgColor( bgcolor, $target ) {
        bgcolor = $target.css( "background-color" );
        this.props.option.bgcolor = ss.BgColor( bgcolor, this.props.option.opacity );
        console.log( "this.props.option.bgcolor = ", this.props.option.bgcolor )
    }

    changeOpacity( value ) {
        const bgcolor = ss.Opacity( value );
        bgcolor && ( this.props.option.bgcolor = bgcolor );
        this.props.option.opacity = value;
        console.log( "this.props.option.opacity = ", this.props.option.opacity )
    }

    changeShortcuts( shortcuts ) {
        this.props.option.shortcuts = shortcuts;
        console.log( "this.props.option.shortcuts = ", this.props.option.shortcuts )
    }

    render() {
        const slider_width = location.protocol.includes( "extension" ) ? "565.8px" : undefined;
        return (
            <sr-opt-focus>
                <sr-opt-gp>
                    <sr-opt-label>主题色</sr-opt-label>
                    <ThemeSel themes={ conf.focusThemes } names={ conf.focusThemes } labels={ conf.focusLabels } theme={ ss.GetColor(this.props.option.bgcolor) + ", 0.9" } changeBgColor={ (val,target)=>this.changeBgColor(val,target) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>透明度</sr-opt-label>
                    <Slider min="50" max="95" step="1" width={slider_width} value={ this.props.option.opacity } onChange={ (v)=>this.changeOpacity(v) }/>
                </sr-opt-gp>
                <sr-opt-gp>
                    <Shortcuts shortcuts={ this.props.option.shortcuts } changeShortcuts={ val=>this.changeShortcuts(val) } />
                </sr-opt-gp>
            </sr-opt-focus>
        )
    }
}