console.log( "===== simpread url scheme load =====" )

import Switch    from 'switch';
import TextField from 'textfield';
import Button    from 'button';
import Dropdown  from 'dropdown';

import * as puplugin from 'puplugin';

const category = [
    { name: "黑名单", value: "blacklist" },
    { name: "白名单", value: "whitelist" },
    { name: "排除列表", value: "exclusion" },
    { name: "延迟加载", value: "lazyload" },
];

export class URLScheme extends React.Component {

    static defaultProps = {
        type: "",
        url:  "",
        off:  false,
    }

    static propType = {
        type     : React.PropTypes.string,
        url      : React.PropTypes.string,
        off      : React.PropTypes.bool,
        onChange : React.PropTypes.func,
    }

    state = {
        error : "",
        disable: false,
    };

    onDropdownChange( value ) {
        this.props.type = value;
    }

    onURLChange( event ) {
        const minimatch = puplugin.Plugin( "minimatch" ),
              value     = event.target.value.trim();
        if ( value == "" ) {
            this.setState({ error : "不能为空", disable: true });
        } else if ( value.startsWith( "[[/" ) && value.endsWith( "/]]" ) && !new RegExp( value.replace( /\[\[\/|\/\]\]/ig, "" ) ).test( location.href ) ) {
            this.setState({ error : "正则表达式错误", disable: true });
        } else if ( !value.startsWith( "[[/" ) && !value.startsWith( "http" ) && value != location.hostname.replace( "www.", "" ) ) {
            this.setState({ error : "主域名不匹配", disable: true });
        } else if ( !value.startsWith( "[[/" ) && value.startsWith( "http" ) && !minimatch( location.href, value ) ) {
            this.setState({ error : "minimatch 适配错误", disable: true });
        } else {
            this.setState({ error : "", disable: false });
            this.props.url = value;
        }
    }

    onOpenedChange( value ) {
        this.props.off = value;
    }

    onClose() {
        $( this.refs.target )
            .addClass( "hide" )[0]
            .addEventListener( 'animationend', () => {
                ReactDOM.unmountComponentAtNode( $( ".simpread-urlscheme" )[0] );
                $( ".simpread-urlscheme" ).remove();
        }, false );
    }

    onSave() {
        this.props.onChange && this.props.onChange( this.props.type, this.props.off, this.props.url );
        this.onClose();
    }

    render() {
        return (
            <simpread-urlscheme ref="target" class="active">
                <sr-urls-head>
                    <sr-urls-label>请选择添加模式</sr-urls-label>
                    <Dropdown name={ category.filter( item => item.value == this.props.type )[0].name } items={ category } width="100%" onChange={ (v)=>this.onDropdownChange(v) } />
                </sr-urls-head>
                <sr-urls-content>
                    <sr-urls-label>支持 域名 · 主域名 · 正则表达式 · minimatch 等规则，详细 <sr-urls-a onClick={ ()=>window.open( 'http://ksria.com/simpread/docs/#/右键菜单?id=URL编辑器', '_blank') }>请看这里</sr-urls-a> </sr-urls-label>
                    <TextField
                        multi={ false }
                        value={ this.props.url }
                        errortext={ this.state.error }
                        onChange={ (e)=>this.onURLChange(e) }
                    />
                </sr-urls-content>
                <sr-urls-content>
                    <Switch width="100%" checked={ this.props.off }
                            thumbedColor="#2163f7" trackedColor="#6699FF" waves="md-waves-effect"
                            label="默认弹出编辑框，取消后意味着直接保存"
                            onChange={ (v)=>this.onOpenedChange( v ) } />
                </sr-urls-content>
                <sr-urls-footer>
                    <Button text="取 消" mode="secondary" color="#333" waves="md-waves-effect" onClick={ ()=>this.onClose() } />
                    <Button text="确 认" waves="md-waves-effect" color="#2163f7" disable={ this.state.disable } style={{ 'font-weight': 'bold' }} onClick={ ()=>this.onSave() } />
                </sr-urls-footer>
            </simpread-urlscheme>
        )
    }
}

function Render( type, opened, callback ) {
    if ( $( "simpread-urlscheme" ).length > 0 ) return;
    $( "html" ).append( `<div class="simpread-urlscheme"></div>` );
    ReactDOM.render( <URLScheme type={ type } off={ opened } url={ location.href } onChange={ (t,f,v)=>callback(t,f,v) } />, $( ".simpread-urlscheme" )[0] );
}

export {
    Render
}