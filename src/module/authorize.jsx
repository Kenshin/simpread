console.log( "===== simpread option labs:Authorize load =====" )

import {storage} from 'storage';
import * as exp  from 'export';

import Notify    from 'notify';
import Switch    from 'switch';
import TextField from 'textfield';
import Button    from 'button';

export default class Auth extends React.Component {

    static defaultProps = {
        linnk: {
            username: "",
            password: "",
        }
    }

    state = {
        secret : undefined,
        linnk  : undefined,
    }

    onChange( state, value, flag ) {
        const { dropbox, pocket, linnk, evernote, onenote, gdrive } = exp,
            clear = ( id, name ) => {
                Object.keys( storage.secret[id] ).forEach( item => storage.secret[id][item] = "" );
                storage.Safe( ()=> {
                    new Notify().Render( `已取消对 ${name} 的授权，也请解除简悦的访问权限， <a target="_blank" href="${exp.Unlink(id)}">点击这里</a>` );
                    this.setState({ secret: storage.secret });
                }, storage.secret );
            },
            success = ( id, name, data ) => {
                Object.keys( data ).forEach( item => storage.secret[id][item] = data[item] );
                storage.Safe( () => {
                    new Notify().Render( `已成功授权 ${name} 。` );
                    this.setState({ secret: storage.secret, linnk: false });
                }, storage.secret );
            },
            failed = ( error, id, name ) => {
                console.error( `${name} auth faild, error: ${error}` )
                new Notify().Render( 2, `获取 ${name} 授权失败，请重新获取。` );
                storage.secret[state].access_token = "";
                this.setState({ secret: storage.secret });
            };

        if ( state == "linnk" && !flag && !storage.secret.linnk.access_token ) {
            this.setState({ linnk: !this.state.linnk });
            return;
        }

        if ( !value ) {
            state == "pocket" && $( this.refs.pocket_tags ).velocity( value ? "slideDown" : "slideUp" );
            if ( state == "linnk" ) {
                this.props.linnk.username = "";
                this.props.linnk.password = "";
            }
            clear( state, exp.Name( state ));
            return;
        }

        switch ( state ) {
            case "dropbox":
                dropbox.New().Auth();
                dropbox.dtd
                    .done( ()    => success( state, "Dropbox", { access_token: dropbox.access_token } ))
                    .fail( error => failed( error, state, "Dropbox" ));
                break;
            case "pocket":
                new Notify().Render( "开始对 Pocket 进行授权，请稍等..." );
                pocket.Request( ( result, error ) => {
                    if ( error ) failed( error, state, "Pocket" );
                    else {
                        pocket.New().Login( result.code );
                        pocket.dtd.done( ()=> {
                            pocket.Auth( ( result, error ) => {
                                if ( error ) failed( error, state, "Pocket" );
                                else success( state, "Pocket", { access_token: pocket.access_token });
                            });
                        }).fail( error => failed( error, state, "Pocket" ));
                    }
                });
                break;
            case "linnk":
                linnk.Login( this.props.linnk.username, this.props.linnk.password, ( result, error ) => {
                    if ( error ) failed( error, state, "Linnk" );
                    else if ( result.code == 200 ) {
                        linnk.Groups( result => {
                            if ( result.code == 200 ) {
                                linnk.GetGroup( "", result.data );
                                success( state, "Linnk", { access_token: linnk.access_token, group_name: linnk.group_name });
                            } else {
                                const msg = linnk.error_code[result.code];
                                new Notify().Render( 2, msg ? msg : "获取 Linnk 授权失败，请重新获取。" );
                            }
                        });
                    } else {
                        const msg = linnk.error_code[result.code];
                        new Notify().Render( 2, msg ? msg : "获取 Linnk 授权失败，请重新获取。" );
                    }
                });
                break;
            case "yinxiang":
            case "evernote":
                evernote.env = state;
                const name   = evernote.name;
                new Notify().Render( `开始对 ${name} 进行授权，请稍等...` );
                evernote.New().RequestToken( ( result, error ) => {
                    if ( error ) failed( error, state, name );
                    else {
                        evernote.dtd.done( () => {
                            evernote.Auth( ( result, error ) => {
                                if ( error ) failed( error, state, name );
                                else success( state, name, { access_token: evernote.access_token });
                            });
                        }).fail( error => failed( error, state, name ));
                    }
                });
                break;
            case "onenote":
                onenote.New().Login();
                onenote.dtd.done( ()=> {
                    onenote.Auth( ( result, error ) => {
                        if ( error ) failed( error, state, "Onenote" );
                        else success( state, "Onenote", { access_token: onenote.access_token });
                    });
                }).fail( error => failed( error, state, "Onenote" ));
                break;
            case "gdrive":
                gdrive.New().Login();
                gdrive.dtd.done( ()=> {
                    gdrive.Auth( ( result, error ) => {
                        if ( error ) failed( error, state, "Google 云端硬盘" );
                        else success( state, "Google 云端硬盘", { access_token: gdrive.access_token, folder_id: gdrive.folder_id });
                    });
                }).fail( error => failed( error, state, "Google 云端硬盘" ));
                break;
        }
    }

    save( state, value ) {
        state == "pocket" && ( storage.secret.pocket.tags      = value.trim() );
        state == "linnk"  && ( storage.secret.linnk.group_name = value.trim() );
        storage.Safe( () => this.setState({ secret: storage.secret }), storage.secret );
    }

    linnkOnChange( state, value ) {
        this.props.linnk[state] = value;
    }

    componentDidMount() {
        storage.Safe( () => this.setState({ secret: storage.secret }) );
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

                    </div>;
        }

        return (
            <div>{ auth }</div>
        )
    }

}