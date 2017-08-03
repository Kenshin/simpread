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
        if ( !ss.VerifyCustom( "theme", this.props.option.custom ) ) {
            this.props.option.theme = theme;
            th.Change( this.props.option.theme );
            console.log( "this.props.option.theme = ", this.props.option.theme )
        } else {
            new Notify().Render( '「自定义样式」已设定相关项，因此无法生效，关于此功能 <a href="https://github.com/Kenshin/simpread/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98" target="_blank">请看这里</a>。' );
        }
    }

    changeShortcuts( shortcuts ) {
        this.props.option.shortcuts = shortcuts;
        console.log( "this.props.option.shortcuts = ", this.props.option.shortcuts )
    }

    changeFontfamily( value, name ) {
        if ( !ss.VerifyCustom( "fontfamily", this.props.option.custom ) ) {
            ss.FontFamily( value );
            this.props.option.fontfamily = value;
            console.log( "this.props.option.fontfamily = ", value, name )
        } else {
            new Notify().Render( '「自定义样式」已设定相关项，因此无法生效，关于此功能 <a href="https://github.com/Kenshin/simpread/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98" target="_blank">请看这里</a>。' );
        }
    }

    changeFontsize( value, name ) {
        if ( !ss.VerifyCustom( "fontsize", this.props.option.custom ) ) {
            ss.FontSize( value );
            this.props.option.fontsize = value;
            console.log( "this.props.option.fontsize = ", value, name )
        } else {
            new Notify().Render( '「自定义样式」已设定相关项，因此无法生效，关于此功能 <a href="https://github.com/Kenshin/simpread/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98" target="_blank">请看这里</a>。' );
        }
    }

    changeLayout( value, name ) {
        if ( !ss.VerifyCustom( "margin", this.props.option.custom ) ) {
            ss.Layout( value );
            this.props.option.layout = value;
            console.log( "this.props.option.layout = ", value, name )
        } else {
            new Notify().Render( '「自定义样式」已设定相关项，因此无法生效，关于此功能 <a href="https://github.com/Kenshin/simpread/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98" target="_blank">请看这里</a>。' );
        }
    }

    changeTitle() {
        if ( event.target.value.trim() == "" ) {
            this.props.flag.title = -2;
            this.setState({ errtitle : "当前输入不能为空。" });
        }
        else if ( verifyHtml( event.target.value.trim() )[0] != -1 ) {
            this.setState({ errtitle : "" });
            this.props.option.site.title = event.target.value.trim();
            this.props.flag.title = 0;
            console.log( "this.props.option.site.title = ", this.props.option.site.title )
        } else {
            this.props.flag.title = -1;
            this.setState({ errtitle : "当前输入为非法。" });
        }
    }

    changeDesc() {
        if ( verifyHtml( event.target.value.trim() )[0] != -1 ) {
            this.setState({ errdesc : "" });
            this.props.option.site.desc = event.target.value.trim();
            this.props.flag.desc = 0;
            console.log( "this.props.option.site.desc = ", this.props.option.site.desc )
        } else {
            this.props.flag.desc = -1;
            this.setState({ errdesc : "当前输入为非法。" });
        }
    }

    changeInclude( value, code ) {
        this.props.option.site.include = value;
        this.props.flag.include        = code;
        console.log( "this.props.option.site.include = ", this.props.option.site.include )
    }

    changeExclude( value, code ) {
        this.props.option.site.exclude = value;
        this.props.flag.exclude        = code;
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
                            placeholder="必填，不可为空。"
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
                        <Include mode="read" include={ this.props.option.site.include } changeInclude={ (v,c)=>this.changeInclude(v,c) } />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <Exclude exclude={ this.props.option.site.exclude } changeExclude={ (v,c)=>this.changeExclude(v,c) } />
                    </sr-opt-gp>
                </sr-opt-items>
                }
            </sr-opt-read>
        )
    }
}
