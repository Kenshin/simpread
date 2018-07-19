console.log( "===== simpread option enhancesite load =====" )

import TextField   from 'textfield';
import Button      from 'button';
import Dropdown    from 'dropdown';

import {storage}   from 'storage';
import * as run    from 'runtime';

let notify, secret, cur_user = {}, ori_user = {}, site_info = {};

const category = [
    {name: "科技媒体", value: "科技媒体"},
    {name: "传统媒体", value: "传统媒体"},
    {name: "新闻", value: "新闻"},
    {name: "技术", value: "技术"},
    {name: "博客", value: "博客"},
    {name: "论坛", value: "论坛"},
    {name: "其它", value: "其它"},
];

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
    return ( location.hostname != "simpread.ksria.cn" ? "http://localhost:3000" : "http://simpread.ksria.cn" ) + method;
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

/**
 * Site info Render
 */
function siteinfoRender() {
    $( ".siteinfo" ).removeClass( 'hide' ).empty();
    ReactDOM.render( <SiteInfo />, $( ".siteinfo" )[0] );
}

class SiteInfo extends React.Component {

    onChange( id, event ) {
        site_info[id] = event.target.value
    }

    onDropdownChange( value ) {
        site_info.category = value;
    }

    render() {
        return(
            <div>
                <div className="row box-large">
                    <TextField value={ site_info.id }
                        multi={ false } floatingtext="ID" disable={true}
                    />
                    <span className="space"></span>
                    <TextField value={ site_info.title }
                        multi={ false } floatingtext="当前站点名称" disable={true}
                        onChange={ event=>this.onChange( "title", event )}
                    />
                </div>
                <div className="row box-large">
                    <TextField value={ site_info.create }
                        multi={ false } floatingtext="建立时间" disable={false}
                        onChange={ event=>this.onChange( "create", event )}
                    />
                    <span className="space"></span>
                    <TextField value={ site_info.update == "" ? "没有任何更新时间" : site_info.update }
                        multi={ false } floatingtext="更新时间" disable={false}
                        onChange={ event=>this.onChange( "update", event )}
                    />
                </div>
                <div className="row box-large">
                    <TextField value={ site_info.color }
                        multi={ false } floatingtext="前景色" disable={true}
                        onChange={ event=>this.onChange( "color", event )}
                    />
                    <span className="space"></span>
                    <TextField value={ site_info.bgColor }
                        multi={ false } floatingtext="背景色" disable={true}
                        onChange={ event=>this.onChange( "bgColor", event )}
                    />
                </div>
                <div className="row box-large">
                    <TextField value={ site_info.global }
                        multi={ false } floatingtext="是否已经审核" disable={true}
                    />
                    <span className="space"></span>
                    <Dropdown name={ site_info.category } items={ category } width="100%" onChange={(v)=>this.onDropdownChange(v)} />
                </div>
            </div>
        )
    }
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
                this.getSites( this.props.uid, "all" );
            } else if ( result.code == 401 ) {
                loadingState( "faile", "管理员登陆失败，请验证管理员密匙！" );
            } else loadingState( "faile", "获取后台服务失败，请稍后再试！" );
        }).fail( fail );
    }

    getSites( uid, id ) {
        loadingState( "init" );
        $.ajax({
            url     : getService( "/sites/service/get/" + id ),
            data    : { uid },
            type    : "POST",
        }).done( ( result, textStatus, jqXHR ) => {
            loadingState( "success", "获取当前用户全部站点" );
            console.log( "asdfadfadfs", result )
            if ( result.code == 200 ) {
                // TO-DO
            } else if ( result.code == 404 ) {
                loadingState( "faile", "当前用户没有任何站点，可以先新建 或 上传一个站点。" );
            } else loadingState( "faile", "获取当前用户的站点获取失败，请稍后再试！" );
        }).fail( fail );
    }

    update() {
        $.isEmptyObject( cur_user ) && new Notify().Render({ mode: "snackbar", content: "需要先登录到服务器后才能提交！", action: "登录", cancel: "取消", callback: type => {
            type == "action" && this.login();
            return;
        }});
        if ( !storage.site ) {
            new Notify().Render( "当前没有选择站点，请通过 新建 或选择一个本地站点。" );
            return;
        }
        if ( !storage.site.info ) {
            new Notify().Render( "上传站点时需要录入一些必要信息。" );
            site_info = {id: run.ID("site"), title: "", category: "其它", create: "<无需填写，自动生成>", update: "", global: false, release: false, color: "#fff", bgColor: "#00bcd4" };
            storage.site.info = site_info;
            siteinfoRender();
            return;
        }
        console.log( "adfasasdf", storage.site.info )
    }

    logout() {
        location.reload();
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
                <Button type="raised" text="提交新站到服务器"
                    style={{ "margin": "25px 0 0 0" }} width="100%"
                    color="#fff" backgroundColor="#4CAF50"
                    waves="md-waves-effect md-waves-button"
                    onClick={ ()=>this.update() } />
            </div>
        )
    }
}
