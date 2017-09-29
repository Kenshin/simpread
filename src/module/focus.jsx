console.log( "===== simpread option focus mode load =====" )

import ThemeSel  from 'themesel';
import Shortcuts from 'shortcuts';
import Include   from 'include';
import Exclude   from 'exclude';
import Name      from 'name';
import URL       from 'url';

import * as ss   from 'stylesheet';
import * as conf from 'config';

export default class FocusOpt extends React.Component {

    changeBgColor( bgcolor, $target ) {
        bgcolor = $target.css( "background-color" );
        this.props.option.bgcolor = ss.BackgroundColor( bgcolor, this.props.option.opacity );
        console.log( "this.props.option.bgcolor = ", this.props.option.bgcolor )
    }

    changeOpacity() {
        const opacity = event.target.value,
              bgcolor = ss.Opacity( opacity );
        bgcolor && ( this.props.option.bgcolor = bgcolor );
        this.props.option.opacity = opacity;
        console.log( "this.props.option.opacity = ", this.props.option.opacity )
    }

    changeShortcuts( shortcuts ) {
        this.props.option.shortcuts = shortcuts;
        console.log( "this.props.option.shortcuts = ", this.props.option.shortcuts )
    }

    changeName( value, code ) {
        this.props.option.site.name = value;
        this.props.flag.name        = code;
        console.log( "this.props.option.site.name = ", this.props.option.site.name )
    }

    changeURL( value, code ) {
        this.props.option.url = value;
        this.props.flag.url   = code;
        console.log( "this.props.option.url = ", this.props.option.url )
    }

    changeInclude( value ) {
        this.props.option.site.include = value;
        console.log( "this.props.option.site.include = ", this.props.option.site.include )
    }

    changeExclude( value, code ) {
        this.props.option.site.exclude = value;
        this.props.flag.exclude = code;
        console.log( "this.props.option.site.exclude = ", this.props.option.site.exclude )
    }

    componentDidMount() {
        this.refs.opacity.value   = this.props.option.opacity;
    }

    render() {
        return (
            <sr-opt-focus>
                <sr-opt-gp>
                    <sr-opt-label>主题色</sr-opt-label>
                    <ThemeSel themes={ conf.focusThemes } names={ conf.focusThemes } labels={ conf.focusLabels } theme={ ss.GetColor(this.props.option.bgcolor) + ", 0.9" } changeBgColor={ (val,target)=>this.changeBgColor(val,target) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>透明度</sr-opt-label>
                    <opacity>
                        <input ref="opacity"
                            type="range" min="50" max="95" step="5" 
                            onChange={ ()=> this.changeOpacity() }
                        />
                    </opacity>
                </sr-opt-gp>
                <sr-opt-gp>
                    <Shortcuts shortcuts={ this.props.option.shortcuts } changeShortcuts={ val=>this.changeShortcuts(val) } />
                </sr-opt-gp>
                { this.props.option.site &&
                <sr-opt-items>
                    <sr-opt-gp style={{ display: "none" }}>
                        <Name name={ this.props.option.site.name } changeName={ (v,c)=>this.changeName(v,c) } />
                    </sr-opt-gp>
                    <sr-opt-gp style={{ display: "none" }}>
                        <URL url={ this.props.option.url } changeURL={ (v,c)=>this.changeURL(v,c) } />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <Include mode="focus" include={ this.props.option.site.include } changeInclude={ val=>this.changeInclude(val) } />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        { this.props.option.site && <Exclude exclude={ this.props.option.site.exclude } changeExclude={ (v,c)=>this.changeExclude(v,c) } />}
                    </sr-opt-gp>
                </sr-opt-items>
                }
            </sr-opt-focus>
        )
    }
}