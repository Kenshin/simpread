console.log( "===== simpread option enhancesite load =====" )

import TextField   from 'textfield';
import Button      from 'button';
import Dropdown    from 'dropdown';

import {storage}   from 'storage';
import * as run    from 'runtime';

let notify, secret, cur_user = {}, ori_user = {}, site_info = {}, user_sites = {};

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

// hack code
window.addEventListener( "siteinfochanged", event => {
    site_info = event.data.info;
    siteinfoRender();
});

/**
 * Get serivce url
 * 
 * @param {string} method name
 */
function getService( method ) {
    return storage.service + method;
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
 * Get sites {name,value} items
 * 
 * @param {object} sites object
 */
function getSites( sites ) {
    let items = [];
    Object.keys( sites ).forEach( idx => {
        const desc = sites[idx].global == true ? "" : "（未审核）"
        items.push({ name: sites[idx].title + desc, value: idx });
    })
    return items;
}

/**
 * Editor Plugin Empty Render
 */
function editorEmptyRender() {
    $( ".preview" ).html( `<div class="empty"><span class="icon"></span><span>当前未选择任何适配站点</span></div>` );
}

/**
 * Site info Empty Render
 */
function siteinfoEmptyRender() {
    $( ".siteinfo" ).addClass( 'hide' );
}

/**
 * Site info Render
 */
function siteinfoRender() {
    if ( site_info == undefined || $.isEmptyObject( site_info ) ) {
        $( ".siteinfo" ).addClass( 'hide' ).empty();
    } else {
        $( ".siteinfo" ).removeClass( 'hide' ).empty();
        ReactDOM.render( <SiteInfo />, $( ".siteinfo" )[0] );
    }
}

/**
 * Sites Render
 */
function sitesRender() {
    console.log( "current user all sites ", user_sites )
    $( ".property .sites" ).empty();
    if ( $.isEmptyObject( user_sites ) ) {
        $( ".property .sites" ).parent().hide();
    } else {
        $( ".property .sites" ).parent().removeAttr("style");
        ReactDOM.render( <Sites sites={ getSites( user_sites ) } />, $( ".property .sites" )[0] );
    }
}

class Sites extends React.Component {

    onChange( value, name ) {
        if ( !$.isEmptyObject( user_sites[value] )) {
            const temp = user_sites[value];
            site_info  = JSON.parse(JSON.stringify(temp));

            delete site_info.site;
            siteinfoRender();

            // hack code
            const evt  = document.createEvent("Event");
            evt.data   = {
                site: temp.site,
                info: site_info,
            }
            evt.initEvent( "sitechanged", true, false );
            window.dispatchEvent( evt );
        } else new Notify().Render( 2, "获取站点信息时发生了错误，请重新绑定获取。" );
    }

    render() {
        const items = this.props.sites;
        return (
            items.length > 0 ? <div>
                <Dropdown name={ `共计 ${items.length} 条数据，下拉查看详细信息` } items={ items } width="100%" onChange={ (v,n)=>this.onChange(v,n) } />
            </div> : <div></div>
        )
    }
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
                        multi={ false } floatingtext="当前站点名称" disable={false}
                        onChange={ event=>this.onChange( "title", event )}
                    />
                </div>
                <div className="row box-large">
                    <TextField value={ site_info.create }
                        multi={ false } floatingtext="建立时间" disable={true}
                        onChange={ event=>this.onChange( "create", event )}
                    />
                    <span className="space"></span>
                    <TextField value={ site_info.update == "" ? "没有任何更新时间" : site_info.update }
                        multi={ false } floatingtext="更新时间" disable={true}
                        onChange={ event=>this.onChange( "update", event )}
                    />
                </div>
                <div className="row box-large">
                    <TextField value={ site_info.color }
                        multi={ false } floatingtext="前景色" disable={false}
                        onChange={ event=>this.onChange( "color", event )}
                    />
                    <span className="space"></span>
                    <TextField value={ site_info.bgColor }
                        multi={ false } floatingtext="背景色" disable={false}
                        onChange={ event=>this.onChange( "bgColor", event )}
                    />
                </div>
                <div className="row box-large">
                    <TextField value={ site_info.global == true || site_info.global == "true" ? "当前站点已经审核通过" : "当前站点未经审核" }
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
                cur_user = result.data;
                ori_user = $.extend( true, {}, cur_user );
                console.log( "current user is ", cur_user )
                this.getSites( this.props.uid, "all" );
                this.setState({ login: true });
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
            if ( result.code == 200 ) {
                result.data.forEach( item => {
                    user_sites[item.id] = item;
                });
                sitesRender();
            } else if ( result.code == 404 ) {
                loadingState( "faile", "当前用户没有任何站点，可以先新建 或 上传一个站点。" );
            } else loadingState( "faile", "获取当前用户的站点获取失败，请稍后再试！" );
        }).fail( fail );
    }

    insert( method, site ) {
        loadingState( "init" );
        if ( site.id.substr(0,8) != cur_user.uid.substr(0,8) ) {
            new Notify().Render( 2, "注意：当前站并不是（管理员）的站。" );
            delete site.uid;
        }
        $.ajax({
            url     : getService( "/sites/service/" + method ),
            type    : "POST",
            data    : site,
        }).done( ( result, textStatus, jqXHR ) => {
            loadingState( "success", "已提交" );
            if ( result.code == 201 ) {

                storage.remote.info.id     = result.data.id;
                storage.remote.info.create = result.data.create;
                storage.remote.info.update = result.data.update;
                delete storage.remote.info.global;
                delete storage.remote.info.release;
                siteinfoRender();

                user_sites[result.data.id] = result.data;
                sitesRender();

                this.props.onUpdate && this.props.onUpdate( "update" );
            } else loadingState( "faile", "提交失败，请稍后再试！" );
        }).fail( fail );
    }

    delete( id ) {
        loadingState( "init" );
        $.ajax({
            url     : getService( "/sites/service/delete/" + id ),
            type    : "POST",
            data    : { uid: cur_user.uid },
        }).done( ( result, textStatus, jqXHR ) => {
            if ( result.code == 204 ) {
                loadingState( "success", "已删除" );
                delete user_sites[site_info.id];
                sitesRender();
                editorEmptyRender();
                siteinfoEmptyRender();
                //this.props.onUpdate && this.props.onUpdate( "safe" );
                new Notify().Render({ mode: "snackbar", content: "是否也删除本地站？", action: "确认", cancel: "取消", callback: type => {
                    type != "cancel"  && this.props.onUpdate && this.props.onUpdate( "delete" );
                }});
            } else loadingState( "faile", "删除失败，请稍后再试！" );
        }).fail( fail );
    }

    update() {
        const insert = () => {
            const temp   = JSON.parse(JSON.stringify(storage.remote)),
                  update = temp.info,
                  method = update.id.startsWith( "new::" ) ? "add" : "update";
            delete temp.info;
            update.uid   = cur_user.uid;
            update.id    = update.id.replace( /^new::/, "" );
            update.site  = temp;
            delete update.site.target;
            this.insert( method, update );
        }
        if ( $.isEmptyObject( cur_user ) ) {
            new Notify().Render({ mode: "snackbar", content: "需要先登录到服务器后才能提交！", action: "登录", cancel: "取消", callback: type => {
                type == "action" && this.login();
                return;
            }});
            return;
        }
        if ( !storage.remote ) {
            new Notify().Render( "当前没有选择站点，请通过 新建 或选择一个本地站点。" );
            return;
        }
        if ( storage.remote.name == "tempread::" ) {
            new Notify().Render( 2, "新建的站需要保存刷新后才能提交！" );
            return;
        }
        if ( !storage.remote.info ) {
            new Notify().Render( "上传站点时需要录入一些必要信息。" );
            site_info         = { domain: run.ID( "site" ), title: "", category: "其它", create: "<无需填写，自动生成>", update: "", global: false, release: false, color: "#fff", bgColor: "#00bcd4" };
            site_info.id      = "new::" + storage.user.uid.substr( 0, 8 ) + "-" + site_info.domain;
            storage.remote.info = site_info;
            siteinfoRender();
        } else if ( site_info.title == "" ) {
            new Notify().Render( 2, "请最好填入当作站点的名称。" )
        } else {
            if ( !storage.remote.info.id.startsWith( "new::" ) && storage.remote.info.id.substr(0,8) != cur_user.uid.substr(0,8) ) {
                new Notify().Render({ mode: "snackbar", content: "当前站点并不是由你建立，确定修改？", action: "确定", cancel: "取消", callback: type => {
                    if ( type == "cancel" ) return;
                    site_info.id        = "new::" + storage.user.uid.substr( 0, 8 ) + "-" + site_info.domain;
                    site_info.release   = false;
                    site_info.global    = false
                    storage.remote.info = site_info;
                    insert();
                }});
            } else insert();
        }
        console.log( "current site is ", storage.remote.info, site_info )
    }

    remove() {
        if ( !storage.remote || $.isEmptyObject( site_info )) {
            new Notify().Render( "当前没有选择站点，请通过 新建 或选择一个本地站点。" );
            return;
        }
        if ( site_info.release == true && cur_user.rule != 0 ) {
            new Notify().Render( "当前站点已审核通过，无法删除，请联络管理员。" );
            return;
        }
        new Notify().Render({ mode: "snackbar", content: "确定（从服务器上）删除（包括以审核的表）？", action: "确认", cancel: "取消", callback: type => {
            if ( type == "cancel" ) return;
            this.delete( site_info.id );
        }});
    }

    permit() {
        if ( !storage.remote || $.isEmptyObject( site_info )) {
            new Notify().Render( "当前没有选择站点，请通过 新建 或选择一个本地站点。" );
            return;
        }
        if ( site_info.global == true || site_info.global == "true" ) {
            new Notify().Render( "当前站点已经审核通过，请勿重复提交" );
            return;
        }
        new Notify().Render( "snackbar", "是否确认审核通过？", "确认", () => {
            loadingState( "init" );
            $.ajax({
                url     : getService( "/sites/service/permit/" + site_info.id ),
                type    : "GET",
            }).done( ( result, textStatus, jqXHR ) => {
                if ( result.code == 201 ) {
                    loadingState( "success", "当前站点已审核" );
                    console.log( result.data )

                    user_sites[result.data.id] = result.data;
                    sitesRender();

                    site_info           = result.data;
                    storage.remote.info = site_info;
                    siteinfoRender();
                } else loadingState( "faile", "删除失败，请稍后再试！" );
            }).fail( fail );
        });
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
                        style={{ "margin": "0" }} width="100%"
                        color="#fff" backgroundColor="#1976d2"
                        waves="md-waves-effect md-waves-button"
                        onClick={ ()=>this.logout() } /> :
                    <Button type="raised" text="登录到服务器"
                        style={{ "margin": "0" }} width="100%"
                        color="#fff" backgroundColor="#FF5252"
                        waves="md-waves-effect md-waves-button"
                        onClick={ ()=>this.login() } /> }
                <Button type="raised" text="提交到服务器"
                    style={{ "margin": "25px 0 0 0" }} width="100%"
                    color="#fff" backgroundColor="#4CAF50"
                    waves="md-waves-effect md-waves-button"
                    onClick={ ()=>this.update() } />
                { this.state.login && cur_user.rule == 0 && 
                <Button type="raised" text="审核当前站点"
                    style={{ "margin": "25px 0 0 0" }} width="100%"
                    color="#fff" backgroundColor="#3F51B5"
                    waves="md-waves-effect md-waves-button"
                    onClick={ ()=>this.permit() } />}
                { this.state.login && 
                <Button type="raised" text="删除当前站点"
                    style={{ "margin": "25px 0 0 0" }} width="100%"
                    color="#fff" backgroundColor="#1976d2"
                    waves="md-waves-effect md-waves-button"
                    onClick={ ()=>this.remove() } />}
            </div>
        )
    }
}
