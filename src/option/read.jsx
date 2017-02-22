console.log( "===== simpread option read mode load =====" )

import { verifyHtml } from 'util';
import th        from 'theme';
import TextField from 'textfield';

import ThemeSel  from 'themesel';
import Shortcuts from 'shortcuts';
import Include   from 'include';
import Exclude   from 'exclude';

export default class ReadOpt extends React.Component {

    state = {
        errtitle : "",
        errdesc  : "",
    };

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
            this.setState({ errtitle : "" });
            this.props.option.site.title = event.target.value.trim();
            console.log( "this.props.option.site.title = ", this.props.option.site.title )
        } else {
            this.setState({ errtitle : "当前输入为非法。" });
        }
    }

    changeDesc() {
        if ( verifyHtml( event.target.value.trim() )[0] != -1 ) {
            this.setState({ errdesc : "" });
            this.props.option.site.desc = event.target.value.trim();
            console.log( "this.props.option.site.desc = ", this.props.option.site.desc )
        } else {
            this.setState({ errdesc : "当前输入为非法。" });
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

    render() {
        return (
            <sr-opt-focus>
                <sr-opt-gp>
                    <sr-opt-label>主题色</sr-opt-label>
                    <ThemeSel themes={ th.colors } names={ th.names } theme={ this.props.option.theme } changeBgColor={ val=>this.changeBgColor(val) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <Shortcuts shortcuts={ this.props.option.shortcuts } changeShortcuts={ val=>this.changeShortcuts(val) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <TextField 
                        multi={ false } 
                        floatingtext="标题" 
                        value={ this.props.option.site.title }
                        errortext={ this.state.errtitle }
                        onChange={ ()=>this.changeTitle() }
                    />
                </sr-opt-gp>
                <sr-opt-gp>
                    <TextField 
                            multi={ false } 
                            placeholder="默认为空。" 
                            floatingtext="描述" 
                            value={ this.props.option.site.desc }
                            errortext={ this.state.errdesc }
                            onChange={ ()=>this.changeDesc() }
                    />
                </sr-opt-gp>
                <sr-opt-gp>
                    <Include include={ this.props.option.site.include } changeInclude={ val=>this.changeInclude(val) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <Exclude exclude={ this.props.option.site.exclude } changeExclude={ val=>this.changeExclude(val) } />
                </sr-opt-gp>
            </sr-opt-focus>
        )
    }
}
