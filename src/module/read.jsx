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

export default class ReadOpt extends React.Component {

    parse( value ) {
        const news = parseInt( value );
        return isNaN(news) ? 0 : news;
    }

    changeBgColor( theme ) {
        this.props.option.theme = theme;
        th.Change( this.props.option.theme );
        this.props.onChange && this.props.onChange( `theme_${theme}` );
        console.log( "this.props.option.theme = ", this.props.option.theme )
    }

    changeShortcuts( shortcuts ) {
        this.props.option.shortcuts = shortcuts;
        this.props.onChange && this.props.onChange( `shortcuts_${shortcuts}` );
        console.log( "this.props.option.shortcuts = ", this.props.option.shortcuts )
    }

    changeFontfamily( name, value ) {
        value.trim() == "" && ( value = "default" );
        conf.fontfamily.forEach( obj => {
            return obj.name == name && ( value = obj.value );
        })
        ss.FontFamily( value );
        this.props.option.fontfamily = value;
        this.props.onChange && this.props.onChange( `fontfamily_${value}` );
        console.log( "this.props.option.fontfamily = ", value, name )
    }

    changeFontsize( value ) {
        this.props.option.fontsize = value + "%";
        ss.FontSize( this.props.option.fontsize );
        this.props.onChange && this.props.onChange( `fontsize_${this.props.option.fontsize}` );
        console.log( "this.props.option.fontsize = ", this.props.option.fontsize )
    }

    changeLayout( value ) {
        this.props.option.layout = `${ 100 - value }%`;
        ss.Layout( this.props.option.layout );
        this.props.onChange && this.props.onChange( `layout_${this.props.option.layout}` );
        console.log( "this.props.option.layout = ", this.props.option.layout )
    }

    changeStyle( value, type ) {
        let news = value
        if ( value == 0 ) {
            news = "";
        } else news = type != "lineHeight" ? value + "px" : value;
        this.props.option.custom.art[type] = news;
        ss.Custom( "art", this.props.option.custom.art );
        this.props.onChange && this.props.onChange( `custom_${this.props.option.custom.art[type]}`, type );
        console.log( "this.props.option.custom.art", this.props.option.custom.art[type] )
    }

    render() {
        const slider_width = location.protocol.includes( "extension" ) ? "660.09px" : undefined;
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
                    <Slider min="45" max="100" step="1" width={slider_width} value={ this.parse( this.props.option.fontsize == "" ? "60%" : this.props.option.fontsize ) } onChange={ (v)=>this.changeFontsize(v) }/>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>版面宽度</sr-opt-label>
                    <Slider min="70" max="100" step="1" width={slider_width} value={ 100 - this.parse( this.props.option.layout == "" ? "20%" : this.props.option.layout ) } onChange={ (v)=>this.changeLayout(v) }/>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>字间距</sr-opt-label>
                    <Slider min="0" max="10" step="1" width={slider_width} value={ this.parse( this.props.option.custom.art.letterSpacing ) } onChange={ (v)=>this.changeStyle(v, "letterSpacing") }/>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>行间距</sr-opt-label>
                    <Slider min="0" max="5" step="1" width={slider_width} value={ this.parse( this.props.option.custom.art.lineHeight ) } onChange={ (v)=>this.changeStyle(v, "lineHeight") }/>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>单词间距</sr-opt-label>
                    <Slider min="0" max="10" step="1" width={slider_width} value={ this.parse( this.props.option.custom.art.wordSpacing ) } onChange={ (v)=>this.changeStyle(v, "wordSpacing") }/>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>首行缩进</sr-opt-label>
                    <Slider min="0" max="30" step="1" width={slider_width} value={ this.parse( this.props.option.custom.art.textIndent ) } onChange={ (v)=>this.changeStyle(v, "textIndent") }/>
                </sr-opt-gp>
            </sr-opt-read>
        )
    }
}
