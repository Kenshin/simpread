console.log( "===== simpread option read mode load =====" )

import th             from 'theme';
import * as ss        from 'stylesheet';
import * as conf      from 'config';

import TextField      from 'textfield';
import SelectField    from 'selectfield';
import Slider         from 'slider';
import AC             from 'ac';

import ThemeSel       from 'themesel';
import Shortcuts      from 'shortcuts';

const getName = ( value, items ) => {
    for ( const item of items ) {
        if ( value == "" ) return item.name;
        else if ( item.value == value ) return item.name;
    }
};
let notify;

export default class ReadOpt extends React.Component {

    verify( type ) {
        if ( ss.VerifyCustom( type, this.props.option.custom ) ) {
            !notify && ( notify = new Notify().Render({ state: "holdon", content: '由于已使用 自定义样式，因此当前操作无效，详细说明 <a href="https://github.com/Kenshin/simpread/wiki/自定义样式" target="_blank">请看这里</a>', callback:()=>notify=undefined }));
            return false;
        }
        return true;
    }

    changeBgColor( theme ) {
        if ( this.verify( "theme" ) ) {
            this.props.option.theme = theme;
            th.Change( this.props.option.theme );
            console.log( "this.props.option.theme = ", this.props.option.theme )
        }
    }

    changeShortcuts( shortcuts ) {
        this.props.option.shortcuts = shortcuts;
        console.log( "this.props.option.shortcuts = ", this.props.option.shortcuts )
    }

    changeFontfamily( name, value ) {
        if ( this.verify( "fontfamily" ) ) {
            value.trim() == "" && ( value = "default" );
            conf.fontfamily.forEach( obj => {
                return obj.name == name && ( value = obj.value );
            })
            ss.FontFamily( value );
            this.props.option.fontfamily = value;
            console.log( "this.props.option.fontfamily = ", value, name )
        }
    }

    changeFontsize( value ) {
        if ( this.verify( "fontsize" ) ) {
            this.props.option.fontsize = value + "%";
            ss.FontSize( this.props.option.fontsize );
            console.log( "this.props.option.fontsize = ", this.props.option.fontsize )
        }
    }

    changeLayout( value ) {
        if ( this.verify( "margin" ) ) {
            this.props.option.layout = `${ 100 - value }%`;
            ss.Layout( this.props.option.layout );
            console.log( "this.props.option.layout = ", this.props.option.layout )
        }
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
                    <sr-opt-label>字体类型</sr-opt-label>
                    <AC value={ this.props.option.fontfamily }
                        placeholder="请输入 font-family 值"
                        items={ conf.fontfamily }
                        onChange={ (n,v)=>this.changeFontfamily(n,v) }
                    />
                </sr-opt-gp>
                <sr-opt-gp>
                <sr-opt-label>字体大小</sr-opt-label>
                    <Slider min="45" max="100" step="1" value={ parseInt( this.props.option.fontsize ) } tooltip={{ text: "字体大小，取值为百分比，如需固定值，请使用【自定义样式】" }} onChange={ (v)=>this.changeFontsize(v) }/>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>版面宽度</sr-opt-label>
                    <Slider min="70" max="100" step="1" value={ 100 - parseInt( this.props.option.layout ) } tooltip={{ text: "版本布局的宽窄度，取值为百分比，如需固定值，请使用【自定义样式】" }} onChange={ (v)=>this.changeLayout(v) }/>
                </sr-opt-gp>
            </sr-opt-read>
        )
    }
}
