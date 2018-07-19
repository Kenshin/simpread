console.log( "===== simpread option enhancesite load =====" )

import TextField   from 'textfield';
import Button      from 'button';
import Dropdown    from 'dropdown';

let notify, secret, cur_user = {}, ori_user = {};

function loadingState( state, str ) {
    if ( state == "init" ) {
        notify = new Notify().Render({ content: "数据处理中，请稍等...", state: "loading" });
    } else if ( state == "success" ) {
        notify && notify.complete();
        notify = undefined;
        new Notify().Render( str + "成功。" );
    } else {
        notify && notify.complete();
        notify = undefined;
        new Notify().Render( 2, str );
    }
}

/**
 * Get serivce url
 * 
 * @param {string} method name
 */
function getService( method ) {
    return ( location.hostname == "simpread.ksria.cn" ? "http://localhost:3000" : "http://simpread.ksria.cn" ) + method;
}

/**
 * Service Fail
 * 
 * @param {object} xhr 
 * @param {string} textStatus 
 * @param {object} error 
 */
function fail( xhr, textStatus, error ) {
    console.error( xhr, status, error )
    loadingState( "fail" );
}

export default class Import extends React.Component {

    state = {
        login: false,
    }

    onSecretChange( event ) {
        secret = event.target.value;
    }

    login() {
        loadingState( "init" );
        $.ajax({
            url     : getService( "/users/service/get/" + this.props.uid ),
            type    : "POST",
            data    : {secret}
        }).done( ( result, textStatus, jqXHR ) => {
            if ( result.code == 200 ) {
                loadingState( "success", "登录" );
                this.setState({ login: true });
                cur_user = result.data;
                ori_user = $.extend( true, {}, cur_user );
                console.log( "current user is ", cur_user )
            } else if ( result.code == 401 ) {
                loadingState( "faile", "管理员登陆失败，请验证管理员密匙！" );
            } else loadingState( "faile", "获取后台服务失败，请稍后再试！" );
        }).fail( fail );
    }

    import() {
        $.isEmptyObject( cur_user ) && new Notify().Render({ mode: "snackbar", content: "需要先登录到服务器后才能提交！", action: "登录", cancel: "取消", callback: type => {
            type == "action" && this.login();
        }});
    }

    render() {
        return (
            <div>
                <div style={{display: location.search == '?rule=administrator' ? 'block' : 'none'}}>
                    <TextField
                        multi={ false } placeholder="请输入管理员密匙"
                        onChange={ event=>this.onSecretChange( event )}
                    />
                </div>
                <Button type="raised" text="提交新站到服务器"
                    style={{ "margin": "0 0 25px 0" }} width="100%"
                    color="#fff" backgroundColor="#4CAF50"
                    waves="md-waves-effect md-waves-button"
                    onClick={ ()=>this.import() } />
                    { this.state.login ?
                        <Button type="raised" text="退出登录"
                            style={{ "margin": "25px 0 0 0" }} width="100%"
                            color="#fff" backgroundColor="#1976d2"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.logout() } /> :
                        <Button type="raised" text="登录到服务器"
                            style={{ "margin": "25px 0 0 0" }} width="100%"
                            color="#fff" backgroundColor="#FF5252"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.login() } /> }
            </div>
        )
    }
}
