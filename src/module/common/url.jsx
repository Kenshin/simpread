console.log( "===== simpread option common: URL =====" )

import * as puplugin from 'puplugin';

import TextField from 'textfield';

export default class URL extends React.Component {

    static defaultProps = {
        flag: {},
    }

    static propType = {
        flag : React.PropTypes.object,
    }

    state = {
        error : ""
    };

    changeURL( event ) {
        let  code = 0;
        const url = event.target.value.trim(),
              minimatch = puplugin.Plugin( "minimatch" );

        if ( url == "" ) {
            code = -2;
            this.setState({ error : "当前输入不能为空。" });
        } else if ( url.startsWith( "[[/" ) && url.endsWith( "/]]" ) && !new RegExp( url.replace( /^\[\[\/|\/\]\]/g, "" ) ).test( location.href )) {
            location.protocol != "chrome-extension:" && this.setState({ error : "请输入与当前网址匹配的域名，正则表达式出现错误。" });
        }  else if ( !url.startsWith( "[[/" ) && !/^http[s|*]?:\/\//.test( url ) ) {
            code = -1;
            this.setState({ error : "请输入有效的 url " });
        } else if ( !url.startsWith( "[[/" ) && location.protocol.startsWith( "http" ) && !minimatch( window.location.href, url ) && url != this.props.url ) {
            code = -1;
            this.setState({ error : "请输入与当前网址匹配的域名，支持 minimatch " });
        } else {
            this.setState({ error : "" });
        }
        this.props.changeURL( url, code );
    }

    render() {
        return (
            <TextField 
                multi={ false } 
                placeholder={ "必填，支持 minimatch " }
                floatingtext="域名" 
                value={ this.props.url }
                errortext={ this.state.error }
                onChange={ evt=>this.changeURL(evt) }
            />
        )
    }

}