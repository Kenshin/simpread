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
        rate     : false,
        product  : "https://support.qq.com/product/" + 117464,
        star     : `<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="35" height="35"><path d="M512 837.12L255.6928 950.0672c-14.336 6.3488-31.1296-0.2048-37.4784-14.5408-1.9456-4.5056-2.7648-9.4208-2.2528-14.336l28.16-278.6304-186.5728-208.896c-10.4448-11.6736-9.4208-29.696 2.2528-40.1408 3.6864-3.2768 8.0896-5.5296 12.9024-6.5536L346.5216 327.68 487.424 85.7088c7.8848-13.6192 25.2928-18.1248 38.912-10.24 4.3008 2.4576 7.7824 6.0416 10.24 10.24L677.4784 327.68l273.7152 59.2896c15.36 3.2768 25.088 18.432 21.8112 33.792-1.024 4.8128-3.2768 9.216-6.5536 12.9024l-186.6752 208.896L807.936 921.1904c1.536 15.6672-9.8304 29.5936-25.3952 31.1296-4.9152 0.512-9.8304-0.3072-14.336-2.2528L512 837.12z" fill="#E3E3E3"></path></svg>`,
        stared   : `<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="35" height="35"><path d="M512 837.12L255.6928 950.0672c-14.336 6.3488-31.1296-0.2048-37.4784-14.5408-1.9456-4.5056-2.7648-9.4208-2.2528-14.336l28.16-278.6304-186.5728-208.896c-10.4448-11.6736-9.4208-29.696 2.2528-40.1408 3.6864-3.2768 8.0896-5.5296 12.9024-6.5536L346.5216 327.68 487.424 85.7088c7.8848-13.6192 25.2928-18.1248 38.912-10.24 4.3008 2.4576 7.7824 6.0416 10.24 10.24L677.4784 327.68l273.7152 59.2896c15.36 3.2768 25.088 18.432 21.8112 33.792-1.024 4.8128-3.2768 9.216-6.5536 12.9024l-186.6752 208.896L807.936 921.1904c1.536 15.6672-9.8304 29.5936-25.3952 31.1296-4.9152 0.512-9.8304-0.3072-14.336-2.2528L512 837.12z" fill="#FFB82F"</path></svg>`,
    }

    static propType = {
        user     : React.PropTypes.object,
        url      : React.PropTypes.string,
        version  : React.PropTypes.string,
        anonymous: React.PropTypes.bool,
        rate     : React.PropTypes.bool,
        product  : React.PropTypes.string,
    }

    state = {
        mode: "github",
        rate: this.props.rate,
        stars: 0,
    };

    onStarClick( idx ) {
        $( this.refs.stars ).find( "i" ).removeClass( "active" );
        for( let i = 0; i < 5; i++ ) {
            const $target = $( $( this.refs.stars ).find( "i" )[i] );
            if ( i < idx ) $target.addClass( "active" ).html( this.props.stared );
            else $target.html( this.props.star );
        }
        $( this.refs.emoji ).css({ 'transform': `translateY(-${idx}00px)` });
        this.setState({ stars: idx });
    }

    onStarHover( idx ) {
        $( this.refs.emoji ).css({ 'transform': `translateY(-${idx}00px)` });
    }

    onRateClick() {
        if ( this.state.stars < 4 ) {
            this.setState({ rate: false });
        } else {
            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url: "https://chrome.google.com/webstore/detail/simpread-reader-view/ijllcpnolfcooahcekpamkbidhejabll/reviews" }));
            setTimeout( () => this.onClose(), 200 );
        }
    }

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
            "nickname"     : this.props.anonymous ? "简悦用户" : this.props.user.name || "简悦用户",
            "avatar"       : `https://api.adorable.io/avatars/285/${ this.props.user.name || this.props.user.uid.substr( 0,13 ) }.png`,
            "openid"       : this.props.user.uid.substr( 0,13 ),
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
            { this.state.rate == false ?
                <sr-block style={{ 'width': '100%' }}>
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
                        <Button text="评个分" color="#FF5252" waves="md-waves-effect" style={{ 'font-weight': 'bold' }} onClick={ ()=>this.setState({ rate: true }) } />
                        <Button text="取 消" mode="secondary" color="#333" waves="md-waves-effect" onClick={ ()=>this.onClose() } />
                        <Button text="提 交" waves="md-waves-effect" color="#2163f7" style={{ 'font-weight': 'bold' }} onClick={ ()=>this.onSubmitClick() } />
                    </sr-fb-footer>
                </sr-block>
                :
                <sr-block style={{ 'width': '100%' }}>
                    <sr-close onClick={ ()=>this.onClose() }><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M649.179 512l212.839-212.84c37.881-37.881 37.881-99.298 0-137.179s-99.298-37.881-137.179 0L512 374.821l-212.839-212.84c-37.881-37.881-99.298-37.881-137.179 0s-37.881 99.298 0 137.179L374.821 512 161.982 724.84c-37.881 37.881-37.881 99.297 0 137.179 18.94 18.94 43.765 28.41 68.589 28.41 24.825 0 49.649-9.47 68.589-28.41L512 649.179l212.839 212.84c18.94 18.94 43.765 28.41 68.589 28.41s49.649-9.47 68.59-28.41c37.881-37.882 37.881-99.298 0-137.179L649.179 512z" fill="#E3E3E3"></path></svg></sr-close>
                    <sr-emojis>
                        <sr-emoji ref="emoji">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#ffd93b"></circle><path d="M512 256c0 141.44-114.64 256-256 256-80.48 0-152.32-37.12-199.28-95.28 43.92 35.52 99.84 56.72 160.72 56.72 141.36 0 256-114.56 256-256 0-60.88-21.2-116.8-56.72-160.72C474.8 103.68 512 175.52 512 256z" fill="#f4c534"></path><ellipse transform="scale(-1) rotate(31.21 715.433 -595.455)" cx="166.318" cy="199.829" rx="56.146" ry="56.13" fill="#fff"></ellipse><ellipse transform="rotate(-148.804 180.87 175.82)" cx="180.871" cy="175.822" rx="28.048" ry="28.08" fill="#3e4347"></ellipse><ellipse transform="rotate(-113.778 194.434 165.995)" cx="194.433" cy="165.993" rx="8.016" ry="5.296" fill="#5a5f63"></ellipse><ellipse transform="scale(-1) rotate(31.21 715.397 -1237.664)" cx="345.695" cy="199.819" rx="56.146" ry="56.13" fill="#fff"></ellipse><ellipse transform="rotate(-148.804 360.25 175.837)" cx="360.252" cy="175.84" rx="28.048" ry="28.08" fill="#3e4347"></ellipse><ellipse transform="scale(-1) rotate(66.227 254.508 -573.138)" cx="373.794" cy="165.987" rx="8.016" ry="5.296" fill="#5a5f63"></ellipse><path d="M370.56 344.4c0 7.696-6.224 13.92-13.92 13.92H155.36c-7.616 0-13.92-6.224-13.92-13.92s6.304-13.92 13.92-13.92h201.296c7.696.016 13.904 6.224 13.904 13.92z" fill="#3e4347"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#ffd93b"></circle><path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"></path><path d="M328.4 428a92.8 92.8 0 0 0-145-.1 6.8 6.8 0 0 1-12-5.8 86.6 86.6 0 0 1 84.5-69 86.6 86.6 0 0 1 84.7 69.8c1.3 6.9-7.7 10.6-12.2 5.1z" fill="#3e4347"></path><path d="M269.2 222.3c5.3 62.8 52 113.9 104.8 113.9 52.3 0 90.8-51.1 85.6-113.9-2-25-10.8-47.9-23.7-66.7-4.1-6.1-12.2-8-18.5-4.2a111.8 111.8 0 0 1-60.1 16.2c-22.8 0-42.1-5.6-57.8-14.8-6.8-4-15.4-1.5-18.9 5.4-9 18.2-13.2 40.3-11.4 64.1z" fill="#f4c534"></path><path d="M357 189.5c25.8 0 47-7.1 63.7-18.7 10 14.6 17 32.1 18.7 51.6 4 49.6-26.1 89.7-67.5 89.7-41.6 0-78.4-40.1-82.5-89.7A95 95 0 0 1 298 174c16 9.7 35.6 15.5 59 15.5z" fill="#fff"></path><path d="M396.2 246.1a38.5 38.5 0 0 1-38.7 38.6 38.5 38.5 0 0 1-38.6-38.6 38.6 38.6 0 1 1 77.3 0z" fill="#3e4347"></path><path d="M380.4 241.1c-3.2 3.2-9.9 1.7-14.9-3.2-4.8-4.8-6.2-11.5-3-14.7 3.3-3.4 10-2 14.9 2.9 4.9 5 6.4 11.7 3 15z" fill="#fff"></path><path d="M242.8 222.3c-5.3 62.8-52 113.9-104.8 113.9-52.3 0-90.8-51.1-85.6-113.9 2-25 10.8-47.9 23.7-66.7 4.1-6.1 12.2-8 18.5-4.2 16.2 10.1 36.2 16.2 60.1 16.2 22.8 0 42.1-5.6 57.8-14.8 6.8-4 15.4-1.5 18.9 5.4 9 18.2 13.2 40.3 11.4 64.1z" fill="#f4c534"></path><path d="M155 189.5c-25.8 0-47-7.1-63.7-18.7-10 14.6-17 32.1-18.7 51.6-4 49.6 26.1 89.7 67.5 89.7 41.6 0 78.4-40.1 82.5-89.7A95 95 0 0 0 214 174c-16 9.7-35.6 15.5-59 15.5z" fill="#fff"></path><path d="M115.8 246.1a38.5 38.5 0 0 0 38.7 38.6 38.5 38.5 0 0 0 38.6-38.6 38.6 38.6 0 1 0-77.3 0z" fill="#3e4347"></path><path d="M131.6 241.1c3.2 3.2 9.9 1.7 14.9-3.2 4.8-4.8 6.2-11.5 3-14.7-3.3-3.4-10-2-14.9 2.9-4.9 5-6.4 11.7-3 15z" fill="#fff"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#ffd93b"></circle><path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"></path><path d="M336.6 403.2c-6.5 8-16 10-25.5 5.2a117.6 117.6 0 0 0-110.2 0c-9.4 4.9-19 3.3-25.6-4.6-6.5-7.7-4.7-21.1 8.4-28 45.1-24 99.5-24 144.6 0 13 7 14.8 19.7 8.3 27.4z" fill="#3e4347"></path><path d="M276.6 244.3a79.3 79.3 0 1 1 158.8 0 79.5 79.5 0 1 1-158.8 0z" fill="#fff"></path><circle cx="340" cy="260.4" r="36.2" fill="#3e4347"></circle><g fill="#fff"><ellipse transform="rotate(-135 326.4 246.6)" cx="326.4" cy="246.6" rx="6.5" ry="10"></ellipse><path d="M231.9 244.3a79.3 79.3 0 1 0-158.8 0 79.5 79.5 0 1 0 158.8 0z"></path></g><circle cx="168.5" cy="260.4" r="36.2" fill="#3e4347"></circle><ellipse transform="rotate(-135 182.1 246.7)" cx="182.1" cy="246.7" rx="10" ry="6.5" fill="#fff"></ellipse></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#ffd93b"></circle><path d="M407.7 352.8a163.9 163.9 0 0 1-303.5 0c-2.3-5.5 1.5-12 7.5-13.2a780.8 780.8 0 0 1 288.4 0c6 1.2 9.9 7.7 7.6 13.2z" fill="#3e4347"></path><path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"></path><g fill="#fff"><path d="M115.3 339c18.2 29.6 75.1 32.8 143.1 32.8 67.1 0 124.2-3.2 143.2-31.6l-1.5-.6a780.6 780.6 0 0 0-284.8-.6z"></path><ellipse cx="356.4" cy="205.3" rx="81.1" ry="81"></ellipse></g><ellipse cx="356.4" cy="205.3" rx="44.2" ry="44.2" fill="#3e4347"></ellipse><g fill="#fff"><ellipse transform="scale(-1) rotate(45 454 -906)" cx="375.3" cy="188.1" rx="12" ry="8.1"></ellipse><ellipse cx="155.6" cy="205.3" rx="81.1" ry="81"></ellipse></g><ellipse cx="155.6" cy="205.3" rx="44.2" ry="44.2" fill="#3e4347"></ellipse><ellipse transform="scale(-1) rotate(45 454 -421.3)" cx="174.5" cy="188" rx="12" ry="8.1" fill="#fff"></ellipse></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#ffd93b"></circle><path d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z" fill="#f4c534"></path><path d="M232.3 201.3c0 49.2-74.3 94.2-74.3 94.2s-74.4-45-74.4-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z" fill="#e24b4b"></path><path d="M96.1 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2C80.2 229.8 95.6 175.2 96 173.3z" fill="#d03f3f"></path><path d="M215.2 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z" fill="#fff"></path><path d="M428.4 201.3c0 49.2-74.4 94.2-74.4 94.2s-74.3-45-74.3-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z" fill="#e24b4b"></path><path d="M292.2 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2-77.8-65.7-62.4-120.3-61.9-122.2z" fill="#d03f3f"></path><path d="M411.3 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z" fill="#fff"></path><path d="M381.7 374.1c-30.2 35.9-75.3 64.4-125.7 64.4s-95.4-28.5-125.8-64.2a17.6 17.6 0 0 1 16.5-28.7 627.7 627.7 0 0 0 218.7-.1c16.2-2.7 27 16.1 16.3 28.6z" fill="#3e4347"></path><path d="M256 438.5c25.7 0 50-7.5 71.7-19.5-9-33.7-40.7-43.3-62.6-31.7-29.7 15.8-62.8-4.7-75.6 34.3 20.3 10.4 42.8 17 66.5 17z" fill="#e24b4b"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g fill="#ffd93b"><circle cx="256" cy="256" r="256"></circle><path d="M512 256A256 256 0 0 1 56.8 416.7a256 256 0 0 0 360-360c58 47 95.2 118.8 95.2 199.3z"></path></g><path d="M512 99.4v165.1c0 11-8.9 19.9-19.7 19.9h-187c-13 0-23.5-10.5-23.5-23.5v-21.3c0-12.9-8.9-24.8-21.6-26.7-16.2-2.5-30 10-30 25.5V261c0 13-10.5 23.5-23.5 23.5h-187A19.7 19.7 0 0 1 0 264.7V99.4c0-10.9 8.8-19.7 19.7-19.7h472.6c10.8 0 19.7 8.7 19.7 19.7z" fill="#e9eff4"></path><path d="M204.6 138v88.2a23 23 0 0 1-23 23H58.2a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z" fill="#45cbea"></path><path d="M476.9 138v88.2a23 23 0 0 1-23 23H330.3a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z" fill="#e84d88"></path><g fill="#38c0dc"><path d="M95.2 114.9l-60 60v15.2l75.2-75.2zM123.3 114.9L35.1 203v23.2c0 1.8.3 3.7.7 5.4l116.8-116.7h-29.3z"></path></g><g fill="#d23f77"><path d="M373.3 114.9l-66 66V196l81.3-81.2zM401.5 114.9l-94.1 94v17.3c0 3.5.8 6.8 2.2 9.8l121.1-121.1h-29.2z"></path></g><path d="M329.5 395.2c0 44.7-33 81-73.4 81-40.7 0-73.5-36.3-73.5-81s32.8-81 73.5-81c40.5 0 73.4 36.3 73.4 81z" fill="#3e4347"></path><path d="M256 476.2a70 70 0 0 0 53.3-25.5 34.6 34.6 0 0 0-58-25 34.4 34.4 0 0 0-47.8 26 69.9 69.9 0 0 0 52.6 24.5z" fill="#e24b4b"></path><path d="M290.3 434.8c-1 3.4-5.8 5.2-11 3.9s-8.4-5.1-7.4-8.7c.8-3.3 5.7-5 10.7-3.8 5.1 1.4 8.5 5.3 7.7 8.6z" fill="#fff" opacity=".2"></path></svg>
                        </sr-emoji>
                    </sr-emojis>
                    <sr-stars ref="stars">
                        <i data-balloon-pos="up" aria-label="吐个槽 😡" onMouseEnter={ () => this.onStarHover( 1 ) } onClick={ () => this.onStarClick( 1 ) } dangerouslySetInnerHTML={{__html: this.props.star }}></i>
                        <i data-balloon-pos="up" aria-label="一般般 💔" onMouseEnter={ () => this.onStarHover( 2 ) } onClick={ () => this.onStarClick( 2 ) } dangerouslySetInnerHTML={{__html: this.props.star }}></i>
                        <i data-balloon-pos="up" aria-label="还不错 😁" onMouseEnter={ () => this.onStarHover( 3 ) } onClick={ () => this.onStarClick( 3 ) } dangerouslySetInnerHTML={{__html: this.props.star }}></i>
                        <i data-balloon-pos="up" aria-label="我喜欢 😘" onMouseEnter={ () => this.onStarHover( 4 ) } onClick={ () => this.onStarClick( 4 ) } dangerouslySetInnerHTML={{__html: this.props.star }}></i>
                        <i data-balloon-pos="up" aria-label="棒棒哒 👍" onMouseEnter={ () => this.onStarHover( 5 ) } onClick={ () => this.onStarClick( 5 ) } dangerouslySetInnerHTML={{__html: this.props.star }}></i>
                    </sr-stars>
                    <sr-stars-footer>
                        { this.state.stars == 0 && <Button text="投个票，有你的参与简悦才能变得更美好" waves="md-waves-effect" color="#2163f7" style={{ 'font-weight': 'bold' }} /> }
                        { this.state.stars > 0 && this.state.stars < 4 && <Button text="吐个槽？" waves="md-waves-effect"  color="#FF5252" style={{ 'font-weight': 'bold' }} onClick={ () => this.onRateClick() }/> }
                        { this.state.stars > 3 && <Button color="#fff" backgroundColor="#2196F3" text="谢谢，方便请前往 Chrome 应用商店投票 👉" waves="md-waves-effect" style={{ 'font-weight': 'bold' }} onClick={ () => this.onRateClick() }/> }
                    </sr-stars-footer>
                </sr-block> }
            </simpread-feedback>
        )
    }
}

/**
 * 
 * @param {string} storage.version
 * @param {object} storage.user
 * @param {boolen} rate, true: show rating; false: show feedback
 */
function Render( version, user, rate = false ) {
    if ( $( "simpread-feedback" ).length > 0 ) return;
    $( "html" ).append( `<div class="simpread-feedback"></div>` );
    ReactDOM.render( <Feedback version={ version } user={ user } url={ location.href } rate={ rate }/>, $( ".simpread-feedback" )[0] );
}

export {
    Render
}