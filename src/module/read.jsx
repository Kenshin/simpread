console.log( "===== simpread option read mode load =====" )

import { verifyHtml } from 'util';
import th             from 'theme';
import * as ss        from 'stylesheet';
import * as conf      from 'config';

import TextField      from 'textfield';
import SelectField    from 'selectfield';

import ThemeSel       from 'themesel';
import Shortcuts      from 'shortcuts';
import Include        from 'include';
import Exclude        from 'exclude';

const getName = ( value, items ) => {
    for ( const item of items ) {
        if ( value == "" ) return item.name;
        else if ( item.value == value ) return item.name;
    }
};

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

    changeFontfamily( value, name ) {
        ss.FontFamily( value );
        this.props.option.fontfamily = value;
        console.log( "this.props.option.fontfamily = ", value, name )
    }

    changeFontsize( value, name ) {
        ss.FontSize( value );
        this.props.option.fontsize = value;
        console.log( "this.props.option.fontsize = ", value, name )
    }

    changeLayout( value, name ) {
        ss.Layout( value );
        this.props.option.layout = value;
        console.log( "this.props.option.layout = ", value, name )
    }

    changeTitle() {
        if ( event.target.value.trim() == "" ) {
            this.setState({ errtitle : "当前输入不能为空。" });
        }
        else if ( verifyHtml( event.target.value.trim() )[0] != -1 ) {
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
            <sr-opt-read>
                <sr-opt-gp>
                    <sr-opt-label>主题色</sr-opt-label>
                    <ThemeSel themes={ th.colors } names={ th.names } labels={ conf.readLabels } theme={ this.props.option.theme } changeBgColor={ val=>this.changeBgColor(val) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <Shortcuts shortcuts={ this.props.option.shortcuts } changeShortcuts={ val=>this.changeShortcuts(val) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <SelectField waves="md-waves-effect"
                        name={ getName( this.props.option.fontfamily, conf.fontfamily )} items={ conf.fontfamily }
                        floatingtext="字体类型" placeholder="默认为 系统类型"
                        onChange={ (v,n)=>this.changeFontfamily(v,n) }
                    />
                </sr-opt-gp>
                <sr-opt-gp>
                    <SelectField waves="md-waves-effect"
                        name={ getName( this.props.option.fontsize, conf.fontsize )} items={ conf.fontsize }
                        floatingtext="字体大小" placeholder="默认为 正常"
                        onChange={ (v,n)=>this.changeFontsize(v,n) }
                    />
                </sr-opt-gp>
                <sr-opt-gp>
                    <SelectField waves="md-waves-effect"
                        name={ getName( this.props.option.layout, conf.layout )} items={ conf.layout }
                        floatingtext="版面布局" placeholder="默认为 正常"
                        onChange={ (v,n)=>this.changeLayout(v,n) }
                    />
                </sr-opt-gp>
                { this.props.option.site &&
                <sr-opt-items>
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
                        <Include mode="read" include={ this.props.option.site.include } changeInclude={ val=>this.changeInclude(val) } />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <Exclude exclude={ this.props.option.site.exclude } changeExclude={ val=>this.changeExclude(val) } />
                    </sr-opt-gp>
                </sr-opt-items>
                }
            </sr-opt-read>
        )
    }
}
