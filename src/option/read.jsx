console.log( "===== simpread option read mode load =====" )

import th        from 'theme';

import ThemeSel  from 'themesel';
import Shortcuts from 'shortcuts';
import Include   from 'include';
import Exclude   from 'exclude';

export default class ReadOpt extends React.Component {

    changeBgColor( theme ) {
        this.props.option.theme = theme;
        th.Change( this.props.option.theme );
        console.log( "this.props.option.theme = ", this.props.option.theme )
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

    render() {
        return (
            <sr-opt-focus>
                <sr-opt-gp>
                    <sr-opt-label>主题色：</sr-opt-label>
                    <ThemeSel themes={ th.colors } names={ th.names } theme={ this.props.option.theme } changeBgColor={ val=>this.changeBgColor(val) } />
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
            </sr-opt-focus>
        )
    }
}
