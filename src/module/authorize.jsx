console.log( "===== simpread option labs:Authorize load =====" )

import {storage} from 'storage';
import * as exp  from 'export';
import * as msg  from 'message';
import {browser} from 'browser';
import * as permission
                 from 'permission';

import Notify    from 'notify';
import Switch    from 'switch';
import TextField from 'textfield';
import Button    from 'button';
import Dropdown  from 'dropdown';

export default class Auth extends React.Component {

    static defaultProps = {
        linnk: {
            username: "",
            password: "",
        },
        instapaper: {
            username: "",
            password: "",
        },
        jianguo: {
            username: "",
            password: "",
        },
        weizhi: {
            username: "",
            password: "",
        }
    }

    state = {
        secret : undefined,
        linnk  : undefined,
        instapaper : undefined,
        jianguo: undefined,
        weizhi : undefined,
        notion : undefined,
        youdao : undefined,
    }

    onChange( state, value, flag ) {
        let notify;
        const { dropbox, pocket, instapaper, linnk, evernote, onenote, gdrive, jianguo, yuque, notion, youdao, weizhi } = exp,
            clear = ( id, name ) => {
                Object.keys( storage.secret[id] ).forEach( item => storage.secret[id][item] = "" );
                storage.Safe( ()=> {
                    new Notify().Render( `已取消对 ${name} 的授权，也请解除简悦的访问权限， <a target="_blank" href="${exp.Unlink(id)}">点击这里</a>` );
                    this.setState({ secret: storage.secret });
                }, storage.secret );
            },
            success = ( id, name, data ) => {
                notify && notify.complete();
                Object.keys( data ).forEach( item => storage.secret[id][item] = data[item] );
                id == "jianguo" && ( storage.secret[id]["access_token"] = { username: data.username, password: data.password });
                storage.Safe( () => {
                    new Notify().Render( `已成功授权 ${name} 。` );
                    id == "linnk"      && this.setState({ secret: storage.secret, linnk: false });
                    id == "instapaper" && this.setState({ secret: storage.secret, instapaper: false });
                    id == "jianguo"    && this.setState({ secret: storage.secret, jianguo: false });
                    id == "weizhi"     && this.setState({ secret: storage.secret, weizhi: false });
                    id == "notion"     && this.setState({ secret: storage.secret, notion: notion.blocks });
                    id == "youdao"     && this.setState({ secret: storage.secret, youdao: youdao.folders });
                    if ( location.hash.startsWith( "#labs?auth=" ) ) {
                        new Notify().Render( "3 秒钟将会关闭此页面..." );
                        setTimeout( () => {
                            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.auth_success, { url: location.href, type: "auth", name: id } ));
                        }, 3000 )
                    }
                }, storage.secret );
            },
            failed = ( error, id, name ) => {
                notify && notify.complete();
                console.error( `${name} auth faild, error: ${error}` )
                id == "youdao" || id == "notion" ? new Notify().Render( 2, `获取 ${name} 授权失败，${error}` ) :
                new Notify().Render( 2, `获取 ${name} 授权失败，请重新获取。` );
                storage.secret[state].access_token = "";
                this.setState({ secret: storage.secret });
            };

        if ( state == "linnk" && !flag && !storage.secret.linnk.access_token ) {
            this.setState({ linnk: !this.state.linnk });
            return;
        }

        if ( state == "instapaper" && !flag && !storage.secret.instapaper.access_token ) {
            this.setState({ instapaper: !this.state.instapaper });
            return;
        }

        if ( state == "jianguo" && !flag && !storage.secret.jianguo.username ) {
            this.setState({ jianguo: !this.state.jianguo });
            return;
        }

        if ( state == "weizhi" && !flag && !storage.secret.weizhi.username ) {
            this.setState({ weizhi: !this.state.weizhi });
            return;
        }

        if ( !value ) {
            state == "pocket" && $( this.refs.pocket_tags ).velocity( value ? "slideDown" : "slideUp" );
            if ( state == "linnk" ) {
                this.props.linnk.username = "";
                this.props.linnk.password = "";
            }
            if ( state == "instapaper" ) {
                this.props.instapaper.username = "";
                this.props.instapaper.password = "";
            }
            if ( state == "jianguo" ) {
                this.props.jianguo.username = "";
                this.props.jianguo.password = "";
            }
            if ( state == "weizhi" ) {
                this.props.weizhi.username = "";
                this.props.weizhi.password = "";
                this.props.weizhi.access_token = "";
            }
            if ( state == "youdao" ) {
                permission.Remove( youdao.permissions, result => new Notify().Render( `已取消 cookies 权限。` ));
            }
            clear( state, exp.Name( state ));
            return;
        }

        new Notify().Render({ content: "授权中，请勿关闭此页面，授权成功后会有提示。", delay: 10000 } );

        switch ( state ) {
            case "dropbox":
                dropbox.New().Auth();
                dropbox.dtd
                    .done( ()    => success( dropbox.id, dropbox.name, { access_token: dropbox.access_token } ))
                    .fail( error => failed( error, dropbox.id, dropbox.name ));
                break;
            case "pocket":
                notify = new Notify().Render({ content: `开始对 ${ pocket.name } 进行授权，请稍等...`, state: "loading" });
                pocket.Request( ( result, error ) => {
                    if ( error ) failed( error, pocket.id, pocket.name );
                    else {
                        pocket.New().Login( result.code );
                        pocket.dtd.done( ()=> {
                            pocket.Auth( ( result, error ) => {
                                if ( error ) failed( error, pocket.id, pocket.name );
                                else success( pocket.id, pocket.name, { access_token: pocket.access_token });
                            });
                        }).fail( error => failed( error, pocket.id, pocket.name ));
                    }
                });
                break;
            case "instapaper":
                instapaper.Login( this.props.instapaper.username, this.props.instapaper.password, ( result, error ) => {
                    if ( error ) failed( error, instapaper.id, instapaper.name );
                    else success( instapaper.id, instapaper.name, { access_token: instapaper.access_token, token_secret: instapaper.token_secret });
                });
                break;
            case "linnk":
                linnk.Login( this.props.linnk.username, this.props.linnk.password, ( result, error ) => {
                    if ( error ) failed( error, linnk.id, linnk.name );
                    else if ( result.code == 200 ) {
                        linnk.Groups( result => {
                            if ( result.code == 200 ) {
                                linnk.GetGroup( "", result.data );
                                success( linnk.id, linnk.name, { access_token: linnk.access_token, group_name: linnk.group_name });
                            } else {
                                const msg = linnk.error_code[result.code];
                                new Notify().Render( 2, msg ? msg : `获取 ${ linnk.name } 授权失败，请重新获取。` );
                            }
                        });
                    } else {
                        const msg = linnk.error_code[result.code];
                        new Notify().Render( 2, msg ? msg : `获取 ${ linnk.name } 授权失败，请重新获取。` );
                    }
                });
                break;
            case "yinxiang":
            case "evernote":
                evernote.env     = state;
                evernote.sandbox = false;
                notify = new Notify().Render({ content: `开始对 ${ evernote.name } 进行授权，请稍等...`, state: "loading" });
                evernote.New().RequestToken( ( result, error ) => {
                    if ( error ) failed( error, evernote.id, evernote.name );
                    else {
                        evernote.dtd.done( () => {
                            evernote.Auth( ( result, error ) => {
                                if ( error ) failed( error, evernote.id, evernote.name );
                                else success( evernote.id, evernote.name, { access_token: evernote.access_token });
                            });
                        }).fail( error => failed( error, evernote.id, evernote.name ));
                    }
                });
                break;
            case "onenote":
                onenote.New().Login();
                onenote.dtd.done( ()=> {
                    onenote.Auth( ( result, error ) => {
                        if ( error ) failed( error, onenote.id, onenote.name );
                        else success( onenote.id, onenote.name, { access_token: onenote.access_token });
                    });
                }).fail( error => failed( error, onenote.id, onenote.name ));
                break;
            case "gdrive":
                gdrive.New().Login();
                gdrive.dtd.done( ()=> {
                    gdrive.Auth( ( result, error ) => {
                        if ( error ) failed( error, gdrive.id, gdrive.name );
                        else success( gdrive.id, gdrive.name, { access_token: gdrive.access_token, folder_id: gdrive.folder_id });
                    });
                }).fail( error => failed( error, gdrive.id, gdrive.name ));
                break;
            case "yuque":
                yuque.New().Login();
                yuque.dtd.done( ()=> {
                    yuque.Auth( ( result, error ) => {
                        if ( error ) failed( error, yuque.id, yuque.name );
                        else {
                            yuque.GetUser( ( result, error ) => {
                                if ( error ) failed( error, yuque.id, yuque.name );
                                else {
                                    yuque.GetRepos( ( result, error ) => {
                                        if ( error ) failed( error, yuque.id, yuque.name );
                                        else if ( yuque.repos_id != "" ) {
                                            success( yuque.id, yuque.name, { access_token: yuque.access_token, repos_id: yuque.repos_id });
                                        } else {
                                            yuque.CreateRepo( ( result, error ) => {
                                                if ( error ) failed( error, yuque.id, yuque.name );
                                                else success( yuque.id, yuque.name, { access_token: yuque.access_token, repos_id: yuque.repos_id });
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }).fail( error => failed( error, yuque.id, yuque.name ));
                break;
            case "notion":
                notion.Auth( ( result, error ) => {
                    if ( error ) failed( error, notion.id, notion.name );
                    else success( notion.id, notion.name, { access_token: notion.access_token, folder_id: notion.folder_id });
                });
                break;
            case "youdao":
                permission.Get( youdao.permissions, result => {
                    if ( !result ) {
                        new Notify().Render( 2, `此功能需要申请 cookies 权限后才能使用，授权成功后会自动取消。` );
                        this.setState({ secret: storage.secret });
                        return;
                    }
                    setTimeout( () => {
                        youdao.Auth( ( result, error ) => {
                            if ( error ) failed( error, youdao.id, youdao.name );
                            else success( youdao.id, youdao.name, { access_token: youdao.access_token, folder_id: youdao.folder_id });
                        });
                    }, 500 );
                });
                break;
            case "jianguo":
                jianguo.Auth( this.props.jianguo.username, this.props.jianguo.password, result => {
                    if ( result && result.status == 401 ) {
                        failed( "授权错误，请重新授权。", jianguo.id, jianguo.name );
                    } else success( "jianguo", "坚果云", { username: this.props.jianguo.username, password: this.props.jianguo.password } );
                });
                break;
            case "weizhi":
                if ( location.hash.startsWith( "#labs?auth=" ) ) {
                    this.props.weizhi.username = storage.secret.weizhi.username;
                    this.props.weizhi.password = storage.secret.weizhi.password;
                }
                weizhi.Auth( this.props.weizhi.username, this.props.weizhi.password, result => {
                    if ( result && result.status == 401 ) {
                        failed( "授权错误，请重新授权。", weizhi.id, weizhi.name );
                    } else success( "weizhi", "为知笔记", { username: this.props.weizhi.username, password: this.props.weizhi.password, access_token: weizhi.access_token } );
                });
                break;
        }
    }

    save( state, value ) {
        state == "pocket" && ( storage.secret.pocket.tags      = value.trim() );
        state == "linnk"  && ( storage.secret.linnk.group_name = value.trim() );
        state == "notion" && ( storage.secret.notion.folder_id = value.trim() );
        state == "youdao" && ( storage.secret.youdao.folder_id = value.trim() );
        storage.Safe( () => this.setState({ secret: storage.secret }), storage.secret );
    }

    linnkOnChange( state, value ) {
        this.props.linnk[state] = value;
    }

    instapaperOnChange( state, value ) {
        this.props.instapaper[state] = value;
    }

    jianguoOnChange( state, value ) {
        this.props.jianguo[state] = value;
    }

    weizhiOnChange( state, value ) {
        this.props.weizhi[state] = value;
    }

    webdavOnChange() {
        this.state.secret.webdav = event.target.value.split("\n");
        storage.Safe( () => this.setState({ secret: storage.secret }), storage.secret );
    }

    notionChange() {
        exp.notion.Auth( ( result, error ) => {
            this.setState({ secret: storage.secret, notion: exp.notion.blocks });
        });
    }

    youdaoChange() {
        permission.Get( exp.youdao.permissions, result => {
            if ( !result ) {
                new Notify().Render( 2, `此功能需要申请 cookies 权限后才能使用，授权成功后会自动取消。` );
                this.setState({ secret: storage.secret });
                return;
            }
            setTimeout( () => {
                exp.youdao.Auth( ( result, error ) => {
                    if ( result ) this.setState({ secret: storage.secret, youdao: exp.youdao.folders });
                    else new Notify().Render( 2, `重新获取失败，${error}` );
                });
            }, 500 );
        });
   }

    webdavAuth() {
        this.state.secret.webdav.forEach( ( item, idx ) => {
            try {
                item = JSON.parse( item );
                if ( Object.keys( item ).join( "" ).replace( /url|name|password|user/ig, "" ) != "" ) {
                    throw "error";
                }
                exp.webdav.Auth( item.url, item.user, item.password, result => {
                    if ( result && ( result.status == 201 || result.status == 405 )) {
                        new Notify().Render( `${item.name} 验证成功。` );
                    } else {
                        new Notify().Render( 2, `${item.name} 授权失败，请确认用户名和密码。` );
                    }
                });
            } catch( error ) {
                new Notify().Render( 2, `第 ${idx+1} 条数据格式错误，请重新输入。` );
            }
        });
    }

    componentWillReceiveProps( nextProps ) {
        this.setState({ secret: storage.secret })
    }

    componentDidMount() {
        storage.Safe( () => {
            this.setState({ secret: storage.secret })
            if ( location.hash.startsWith( "#labs?auth=" ) ) {
                this.onChange( location.hash.replace( "#labs?auth=", "" ), true );
            }
        });
    }

    render() {

        let auth;

        if ( this.state.secret ) {

            auth = <div>
                        <Switch width="100%" checked={ this.state.secret.dropbox.access_token != "" ? true : false }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label={ this.state.secret.dropbox.access_token ? "已授权 Dropbox，是否取消授权？" : "是否连接并授权 Dropbox ？" }
                            onChange={ (s)=>this.onChange( "dropbox", s ) } />

                        <Switch width="100%" checked={ this.state.secret.pocket.access_token != "" ? true : false }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label={ this.state.secret.pocket.access_token ? "已授权 Pocket，是否取消授权？" : "是否连接并授权 Pocket ？" }
                            onChange={ (s)=>this.onChange( "pocket", s ) } />

                        { this.state.secret.pocket.access_token && 
                        <div ref="pocket_tags" style={{ "width": "60%" }}>
                            <TextField
                                placeholder="请填入 Pocket 标签，默认为 simpread 每个标签用小写, 分割。" 
                                value={ this.state.secret.pocket.tags }
                                onChange={ (evt)=>this.save( "pocket", evt.target.value ) }
                            />
                        </div> }

                        <Switch width="100%" checked={ this.state.secret.instapaper.access_token != "" ? true : false }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label={ this.state.secret.instapaper.access_token ? "已授权 Instapaper，是否取消授权？" : "是否连接并授权 Instapaper ？" }
                            onChange={ (s)=>this.onChange( "instapaper", s ) } />

                        { this.state.instapaper && 
                        <div ref="instapaper">
                            <div style={{ "display": "flex", "flex-direction": "row" }}>
                                <TextField
                                    placeholder="请填入 Instapaper 用户名，简悦不会记录你的用户名。" 
                                    onChange={ (evt)=>this.instapaperOnChange( "username", evt.target.value ) }
                                />
                                <TextField
                                    password={true}
                                    placeholder="请填入 Instapaper 密码，简悦不会记录你的密码。" 
                                    onChange={ (evt)=>this.instapaperOnChange( "password", evt.target.value ) }
                                />
                            </div>

                            <Button type="raised" width="100%" style={{ "margin": "0" }}
                                text="登录 Instapaper 并授权"
                                color="#fff" backgroundColor="#3F51B5"
                                waves="md-waves-effect md-waves-button"
                                onClick={ (s)=>this.onChange( "instapaper", s, "login" ) } />
                        </div> }

                        <Switch width="100%" checked={ this.state.secret.linnk.access_token != "" ? true : false }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label={ this.state.secret.linnk.access_token ? "已授权 Linnk，是否取消授权？" : "是否连接并授权 Linnk ？" }
                            onChange={ (s)=>this.onChange( "linnk", s ) } />

                        { this.state.secret.linnk.access_token && 
                            <div style={{ "width": "60%" }}>
                                <TextField
                                    value={ this.state.secret.linnk.group_name }
                                    placeholder="请填入 Linnk 收藏夹名称，默认保存到 收件箱。" 
                                    onChange={ (evt)=>this.save( "linnk", evt.target.value ) }
                                />
                            </div> }

                        { this.state.linnk && 
                        <div ref="linnk">
                            <div style={{ "display": "flex", "flex-direction": "row" }}>
                                <TextField
                                    placeholder="请填入 Linnk 用户名，简悦不会记录你的用户名。" 
                                    onChange={ (evt)=>this.linnkOnChange( "username", evt.target.value ) }
                                />
                                <TextField
                                    password={true}
                                    placeholder="请填入 Linnk 密码，简悦不会记录你的密码。" 
                                    onChange={ (evt)=>this.linnkOnChange( "password", evt.target.value ) }
                                />
                            </div>

                            <Button type="raised" width="100%" style={{ "margin": "0" }}
                                text="登录 Linnk 并授权"
                                color="#fff" backgroundColor="#3F51B5"
                                waves="md-waves-effect md-waves-button"
                                onClick={ (s)=>this.onChange( "linnk", s, "login" ) } />
                        </div> }

                        <Switch width="100%" checked={ this.state.secret.yinxiang.access_token != "" ? true : false }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label={ this.state.secret.yinxiang.access_token ? "已授权 印象笔记，是否取消授权？" : "是否连接并授权 印象笔记 ？" }
                            onChange={ (s)=>this.onChange( "yinxiang", s ) } />

                        <Switch width="100%" checked={ this.state.secret.evernote.access_token != "" ? true : false }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label={ this.state.secret.evernote.access_token ? "已授权 Evernote，是否取消授权？" : "是否连接并授权 Evernote ？" }
                            onChange={ (s)=>this.onChange( "evernote", s ) } />

                        <Switch width="100%" checked={ this.state.secret.onenote.access_token != "" ? true : false }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label={ this.state.secret.onenote.access_token ? "已授权 Onenote，是否取消授权？" : "是否连接并授权 Onenote ？" }
                            onChange={ (s)=>this.onChange( "onenote", s ) } />

                        <Switch width="100%" checked={ this.state.secret.gdrive.access_token != "" ? true : false }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label={ this.state.secret.gdrive.access_token ? "已授权 Google 云端硬盘，是否取消授权？" : "是否连接并授权 Google 云端硬盘 ？" }
                            onChange={ (s)=>this.onChange( "gdrive", s ) } />

                        <div className="version-tips" data-version="1.1.3" data-hits="jianguo">
                        <Switch width="100%" checked={ this.state.secret.jianguo && this.state.secret.jianguo.username != "" && this.state.secret.jianguo.password ? true : false }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label={ this.state.secret.jianguo && this.state.secret.jianguo.username != "" ? "已授权 坚果云，是否取消授权？" : "是否连接并授权 坚果云 ？" }
                            onChange={ (s)=>this.onChange( "jianguo", s ) } />
                        </div>
                        { this.state.jianguo && 
                        <div ref="jianguo">
                            <div style={{ "display": "flex", "flex-direction": "row" }}>
                                <TextField
                                    placeholder="请填入 坚果云的 WebDAV 用户名，简悦不会记录你的用户名。" 
                                    onChange={ (evt)=>this.jianguoOnChange( "username", evt.target.value ) }
                                />
                                <TextField
                                    password={true}
                                    placeholder="请填入 坚果云的 WebDAV 密码，简悦不会记录你的密码。" 
                                    onChange={ (evt)=>this.jianguoOnChange( "password", evt.target.value ) }
                                />
                            </div>

                            <Button type="raised" width="100%" style={{ "margin": "0" }}
                                text="绑定 坚果云 的信息"
                                color="#fff" backgroundColor="#3F51B5"
                                waves="md-waves-effect md-waves-button"
                                onClick={ (s)=>this.onChange( "jianguo", s, "login" ) } />

                        </div> }

                        <div className="version-tips" data-version="1.1.3" data-hits="yuque">
                        <Switch width="100%" checked={ this.state.secret.yuque.access_token != "" ? true : false }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label={ this.state.secret.yuque.access_token ? "已授权 语雀，是否取消授权？" : "是否连接并授权 语雀 ？" }
                            onChange={ (s)=>this.onChange( "yuque", s ) } />
                        </div>

                        <Switch width="100%" checked={ this.state.secret.notion.access_token != "" ? true : false }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label={ this.state.secret.notion.access_token ? "已授权 Notion，是否取消授权？" : "是否连接并授权 Notion ？" }
                            onChange={ (s)=>this.onChange( "notion", s ) } />

                        { this.state.secret.notion.access_token && 
                            <div style={{ display: "flex","flex-direction": "row", "justify-content": "center" }}>
                            { this.state.notion ? <Dropdown name={ "请选择保存的位置，默认为第一个" } items={ this.state.notion } width="100%" onChange={ (v,n)=>this.save( "notion", v ) } />
                            : <Button type="flat" width="100%" style={{ "margin": "0" }}
                                    text="重新获取 Notion Page"
                                    color="#fff" backgroundColor="#3F51B5"
                                    waves="md-waves-effect md-waves-button"
                                    onClick={ (s)=>this.notionChange() } /> }
                            </div> }

                        <Switch width="100%" checked={ this.state.secret.youdao.access_token != "" ? true : false }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label={ this.state.secret.youdao.access_token ? "已授权 有道云笔记" : "是否连接并授权 有道云笔记 ？" }
                            onChange={ (s)=>this.onChange( "youdao", s ) } />

                        { this.state.secret.youdao.access_token && 
                            <div style={{ display: "flex","flex-direction": "row", "justify-content": "center" }}>
                            { this.state.youdao ? <Dropdown name={ "请选择保存的位置，默认为第一个" } items={ this.state.youdao } width="100%" onChange={ (v,n)=>this.save( "youdao", v ) } />
                            : <Button type="flat" width="100%" style={{ "margin": "0" }}
                                    text="重新获取 有道云笔记的文件夹"
                                    color="#fff" backgroundColor="#3F51B5"
                                    waves="md-waves-effect md-waves-button"
                                    onClick={ (s)=>this.youdaoChange() } /> }
                            </div> }

                            <div className="version-tips" data-version="1.1.3" data-hits="weizhi">
                            <Switch width="100%" checked={ this.state.secret.weizhi && this.state.secret.weizhi.username != "" && this.state.secret.weizhi.access_token ? true : false }
                                thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                                label={ this.state.secret.weizhi && this.state.secret.weizhi.username != "" ? "已授权 为知笔记，是否取消授权？" : "是否连接并授权 为知笔记 ？" }
                                onChange={ (s)=>this.onChange( "weizhi", s ) } />
                            </div>
                            { this.state.weizhi && 
                            <div ref="weizhi">
                                <div style={{ "display": "flex", "flex-direction": "row" }}>
                                    <TextField
                                        placeholder="请填入 为知笔记 的用户名，简悦不会记录你的用户名。" 
                                        onChange={ (evt)=>this.weizhiOnChange( "username", evt.target.value ) }
                                    />
                                    <TextField
                                        password={true}
                                        placeholder="请填入 为知笔记 的密码，简悦不会记录你的密码。" 
                                        onChange={ (evt)=>this.weizhiOnChange( "password", evt.target.value ) }
                                    />
                                </div>
    
                                <Button type="raised" width="100%" style={{ "margin": "0" }}
                                    text="绑定 为知笔记 的信息"
                                    color="#fff" backgroundColor="#3F51B5"
                                    waves="md-waves-effect md-waves-button"
                                    onClick={ (s)=>this.onChange( "weizhi", s, "login" ) } />
    
                            </div> }
    
                        <div className="version-tips" data-version="1.1.3" data-hits="webdav">
                        <div className="label" style={{'margin-bottom':' -15px'}}>WebDAV</div>
                        <div className="sublabel">简悦支持任意 WebDAV 的服务，包括：Box · TeraCLOUD 等</div>
                        <TextField 
                            multi={ true } rows={8}
                            placeholder={ `每行一组，格式为：{ "name": "网盘的名称", "user": "用户名", "password": "密码", "url": "webdav 地址" }` } 
                            value={ ( this.state.secret.webdav||[] ).join( "\n" ) }
                            onChange={ (e)=>this.webdavOnChange(e) }
                        />
                        <Button type="raised" width="100%" style={{ "margin": "0" }}
                            text="验证上述 WebDAV 服务"
                            color="#fff" backgroundColor="#3F51B5"
                            waves="md-waves-effect md-waves-button"
                            onClick={ (s)=>this.webdavAuth() } />
                        </div>

                    </div>;
        }

        return (
            <div>{ auth }</div>
        )
    }

}