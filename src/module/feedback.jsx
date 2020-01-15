console.log( "===== simpread feedback load =====" )

import Switch    from 'switch';
import TextField from 'textfield';
import Button    from 'button';

import {browser}  from 'browser';
import * as msg   from 'message';

export class Feedback extends React.Component {

    static defaultProps = {
        user     : {},
        url      : "",
        version  : "",
        anonymous: false,
        product  : "https://support.qq.com/product/" + 117464,
    }

    static propType = {
        user     : React.PropTypes.object,
        url      : React.PropTypes.string,
        version  : React.PropTypes.string,
        anonymous: React.PropTypes.bool,
        product  : React.PropTypes.string,
    }

    state = {
        mode: "github",
    };

    onURLChange( event ) {
        this.props.url = event.target.value.trim();
    }

    onAnonymousChange( value ) {
        this.props.anonymous = value;
    }

    onChangeMode( mode ) {
        this.setState({ mode });
    }

    onClose() {
        $( this.refs.target )
            .addClass( "hide" )[0]
            .addEventListener( 'animationend', () => {
                ReactDOM.unmountComponentAtNode( $( ".simpread-feedback" )[0] );
                $( ".simpread-feedback" ).remove();
        }, false );
    }

    onSubmitClick() {
        this.state.mode == "github" ? this.onGithubClick() : this.onTucaoClick();
    }

    onGithubClick() {
        const content = `**小提示**

> 简悦已经服务 70K+ 的用户，所以你的很多问题，或许已经被前人解决了，所以试着看看以下几个列表中的内容：

- [用好 Github issues 能解决你大部分的疑问](https://github.com/Kenshin/simpread/issues/533)

- [常见问题汇总](https://github.com/Kenshin/simpread/issues/618)

- [代码段的专项整治](https://github.com/Kenshin/simpread/issues/500)

***

> 如上述内容无法解决你的问题，那么请将上述内容删除，并按照下方的提示书写~  😀 

**请说明发生问题的环境**

> 简悦包含了很多平台的版本，所以为了方便定位，建议告诉我一些必要信息

- 操作系统 **${window.navigator.platform}**

- 浏览器版本 **e.g. Chrome 78.0.3904.108**

- 简悦版本 **${ this.props.version }**

- 发生问题的地址 <${ this.props.url }>

**请描述你的问题**

> 请使用可以 **准确定位到错误** 的语句来告诉我。😀

**截图**

> 一图胜千言，所以方便的话，可以试着贴图。
`, url = encodeURI( `https://github.com/Kenshin/simpread/issues/new?title=<请描述你的问题>&labels=to do&body=${content}` )
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url }));
    }

    onTucaoClick() {
        const data = {
            "nickname"     : this.props.anonymous ? "简悦用户" : this.props.user.name,
            "avatar"       : `https://api.adorable.io/avatars/285/${ this.props.user.name || this.props.user.uid.substr( 0,13 ) }.png`,
            "openid"       : this.props.user.uid,
            "clientVersion": this.props.version,
            "clientInfo"   : window.navigator.userAgent,
            "customInfo"   : "https://github.com/erguotou520/tucao-dingtalk-webhook"
        };
        $.ajax({
            url: this.props.product,
            method: "POST",
            data
        }).done( ( result, textStatus, jqXHR ) => {
            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url: this.props.product }));
        }).fail( error => {
            console.log( "count failed ", error )
        });
    }

    render() {
        return (
            <simpread-feedback ref="target" class="active">
                <sr-fb-head>
                    <sr-fb-label>有了你们的帮助简悦才会变得更好 🙏</sr-fb-label>
                </sr-fb-head>
                <sr-fb-content>
                    <sr-fb-label>提交的站点，默认为当前页面的地址，可为空</sr-fb-label>
                    <TextField multi={ false } value={ this.props.url } onChange={ (e)=>this.onURLChange(e) } />
                </sr-fb-content>
                <sr-fb-content>
                    <sr-fb-label>支持两种提交方式</sr-fb-label>
                    <span style={{ 'display': 'flex' }}>
                        <Button
                            text="有 Github Issues 帐号" type="raised" waves="md-waves-effect"
                            color="#fff" backgroundColor="#2196F3" width="50%" style={{ 'margin-left': '0', 'font-weight': 'bold' }}
                            tooltip={{ text: "如果有 Github 帐号，请首选此方式" }} onClick={ ()=>this.onChangeMode( "github" ) } />
                        <Button
                            text="无 Github Issues 帐号" type="raised" mode="secondary" waves="md-waves-effect"
                            color="#fff" backgroundColor="#757575" width="50%" style={{ 'margin-right': '0', 'font-weight': 'bold' }}
                            tooltip={{ text: "腾讯旗下的一款用户反馈收集系统，无需注册" }} onClick={ ()=>this.onChangeMode( "tucao" ) } />
                    </span>
                </sr-fb-content>
                { this.state.mode == "tucao" &&
                    <sr-fb-content>
                        <sr-fb-content>
                            <Switch width="100%" checked={ this.props.anonymous }
                                    thumbedColor="#2163f7" trackedColor="#6699FF" waves="md-waves-effect"
                                    label="支持匿名提交，但建议不要勾选此项"
                                    onChange={ (v)=>this.onAnonymousChange( v ) } />
                        </sr-fb-content>
                        <sr-fb-content>
                            <sr-fb-label><b>吐个槽</b> 是腾讯旗下的一款用户反馈收集系统，具有如下特点：</sr-fb-label>
                            <sr-fb-label>· 无需注册，点击后会自动使用简悦的注册系统</sr-fb-label>
                            <sr-fb-label>· 如需实时收到反馈，请根据提示关注（腾讯官方）微信号</sr-fb-label>
                            <sr-fb-label>· 你的提交内容，他人无法看到</sr-fb-label>
                        </sr-fb-content>
                    </sr-fb-content>
                }
                <sr-fb-content>
                    <sr-fb-label><b>方便的话，请帮助简悦，使其变得更好 👉 <sr-fb-a onClick={ ()=>window.open( 'https://wj.qq.com/s2/3611463/7260/', '_blank') }>调查问卷</sr-fb-a></b></sr-fb-label>
                </sr-fb-content>
                <sr-fb-footer>
                    <Button text="取 消" mode="secondary" color="#333" waves="md-waves-effect" onClick={ ()=>this.onClose() } />
                    <Button text="提 交" waves="md-waves-effect" color="#2163f7" style={{ 'font-weight': 'bold' }} onClick={ ()=>this.onSubmitClick() } />
                </sr-fb-footer>
            </simpread-feedback>
        )
    }
}

function Render( version, user ) {
    if ( $( "simpread-feedback" ).length > 0 ) return;
    $( "html" ).append( `<div class="simpread-feedback"></div>` );
    ReactDOM.render( <Feedback version={ version } user={ user } url={ location.href }/>, $( ".simpread-feedback" )[0] );
}

export {
    Render
}