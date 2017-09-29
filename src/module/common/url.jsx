console.log( "===== simpread option common: URL =====" )

import minimatch from 'minimatch';

import TextField from 'textfield';

export default class URL extends React.Component {

    state = {
        error : ""
    };

    changeURL() {
        const url = event.target.value.trim();
        if ( !/^http(s)?:\/\//.test( url ) ) {
            this.setState({ error : "请输入有效的 url " });
        } else if ( !minimatch( window.location.href, url ) ) {
            this.setState({ error : "请输入与当前网址匹配的域名，支持 minimatch " });
        } else {
            this.setState({ error : "" });
            this.props.changeURL( url );
        }
    }

    render() {
        return (
            <TextField 
                multi={ false } 
                placeholder={ "必填，支持 minimatch " }
                floatingtext="域名" 
                value={ this.props.url }
                errortext={ this.state.error }
                onChange={ ()=>this.changeURL() }
            />
        )
    }

}