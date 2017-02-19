console.log( "===== simpread option read mode load =====" )

import { verifyHtml } from 'util';
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

    changeTitle() {
        if ( verifyHtml( event.target.value.trim() )[0] != -1 ) {
            this.props.option.site.title = event.target.value.trim();
            console.log( "this.props.option.site.title = ", this.props.option.site.title )
        }
    }

    changeDesc() {
        if ( verifyHtml( event.target.value.trim() )[0] != -1 ) {
            this.props.option.site.desc = event.target.value.trim();
            console.log( "this.props.option.site.desc = ", this.props.option.site.desc )
        }
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
        this.refs.title.value = this.props.option.site.title;
        this.refs.desc.value  = this.props.option.site.desc;
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
                    <sr-opt-label>标题：</sr-opt-label>
                    <sr-opt-item sr-type="title">
                        <input ref="title" type="text" onChange={ ()=>this.changeTitle() } />
                    </sr-opt-item>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>描述：</sr-opt-label>
                    <sr-opt-item sr-type="desc">
                        <input ref="desc" type="text" placeholder="默认为空" onChange={ ()=>this.changeDesc() } />
                    </sr-opt-item>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>高亮区域：</sr-opt-label>
                    <sr-opt-item sr-type="include">
                        <Include include={ this.props.option.site.include } changeInclude={ val=>this.changeInclude(val) } />
                    </sr-opt-item>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>隐藏列表：</sr-opt-label>
                    <sr-opt-item sr-type="exclude">
                        <Exclude exclude={ this.props.option.site.exclude } changeExclude={ val=>this.changeExclude(val) } />
                    </sr-opt-item>
                </sr-opt-gp>
            </sr-opt-focus>
        )
    }
}
