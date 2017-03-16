console.log( "===== simpread option read mode load =====" )

import { verifyHtml } from 'util';
import th             from 'theme';
import * as ss        from 'stylesheet';

import TextField      from 'textfield';
import SelectField    from 'selectfield';

import ThemeSel       from 'themesel';
import Shortcuts      from 'shortcuts';
import Include        from 'include';
import Exclude        from 'exclude';

const fontfamily = [{
            value : "default",
            name  : "系统默认",
            info  : "F + 1",
        },{
            value : "PingFang SC",
            name  : "苹果苹方字体",
            info  : "F + 2",
            style : {
                text: { fontFamily: "PingFang SC" }
            }
        },{
            value : "Microsoft Yahei",
            name  : "微软雅黑",
            info  : "F + 3",
            style : {
                text: { fontFamily: "Microsoft Yahei" }
            }
      },{
            value : "Source Han Sans CN",
            name  : "思源黑体",
            info  : "F + 4",
            style : {
                text: { fontFamily: "Source Han Sans CN" }
            }
      }],
      fontsize = [{
            value : "70%",
            name  : "增大",
            info  : "S + 1",
        },{
            value : "62.5%",
            name  : "正常",
            info  : "S + 2",
        },{
            value : "58%",
            name  : "减小",
            info  : "S + 3",
      }],
      layout = [{
            value : "15%",
            name  : "宽栏",
            info  : "W + 1",
        },{
            value : "20%",
            name  : "正常",
            info  : "W + 2",
        },{
            value : "25%",
            name  : "窄栏",
            info  : "W + 3",
}],
labels = [ "白练", "白磁", "卯之花色", "丁子色", "娟鼠", "月白", "百合", "紺鼠", "黒鸢" ];

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
        console.log( "this.props.option.fontfamily = ", value, name )
        ss.FontFamily( value );
    }

    changeFontsize( value, name ) {
        console.log( "this.props.option.fontsize = ", value, name )
        ss.FontSize( value );
    }

    changeLayout( value, name ) {
        console.log( "this.props.option.layout = ", value, name )
        ss.Layout( value );
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
            <sr-opt-read>
                <sr-opt-gp>
                    <sr-opt-label>主题色</sr-opt-label>
                    <ThemeSel themes={ th.colors } names={ th.names } labels={ labels } theme={ this.props.option.theme } changeBgColor={ val=>this.changeBgColor(val) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <Shortcuts shortcuts={ this.props.option.shortcuts } changeShortcuts={ val=>this.changeShortcuts(val) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <SelectField waves="sr-selectfield waves-effect waves-button" items={ fontfamily } floatingtext="字体类型" placeholder="默认为 系统类型" onChange={ (v,n)=>this.changeFontfamily(v,n) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <SelectField waves="sr-selectfield waves-effect waves-button" items={ fontsize } floatingtext="字体大小" placeholder="默认为 正常" onChange={ (v,n)=>this.changeFontsize(v,n) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <SelectField waves="sr-selectfield waves-effect waves-button" items={ layout } floatingtext="版面布局" placeholder="默认为 正常" onChange={ (v,n)=>this.changeLayout(v,n) } />
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
            </sr-opt-read>
        )
    }
}
