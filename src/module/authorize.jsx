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

    clear( id ) {
        Object.keys( storage.secret[id] ).forEach( item => storage.secret[id][item] = "" );
        storage.Safe( ()=> {
            new Notify().Render( `已取消对 ${id.replace( /\S/i, $0=>$0.toUpperCase() )} 的授权。` );
            this.setState({ secret: storage.secret });
        }, storage.secret );
    }

    onChange( state, value, flag ) {
        const dbx = exp.dropbox;
        switch ( state ) {
            case "dropbox":
                if ( value ) {
                    dbx.Auth().done( () => {
                        storage.secret.dropbox.access_token = dbx.access_token;
                        storage.Safe( () => {
                            new Notify().Render( "已成功授权 Dropbox 。" );
                            this.setState({ secret: storage.secret });
                        }, storage.secret );
                    }).fail( error => {
                        console.error( error )
                        new Notify().Render( 2, error == "access_failed" ? "获取 Dropbox SDK 失败，请检查网络，稍后再试！" : "获取 Dropbox 授权失败，请重新获取。" );
                    });
                } else {
                    this.clear( "dropbox" );
                }
                break;
            case "pocket":
                if ( value ) {
                    new Notify().Render( "开始对 Pocket 进行授权，请稍等..." );
                    exp.pocket.Request( ( result, error ) => {
                        exp.pocket.Redirect( result.code ).done( () => {
                            exp.pocket.Auth( ( result, error ) => {
                                storage.secret.pocket.access_token = result.access_token;
                                storage.Safe( ()=> {
                                    new Notify().Render( "已成功授权 Pocket 。" );
                                    this.setState({ secret: storage.secret });
                                }, storage.secret );
                            });
                        }).fail( error => {
                            console.error( error )
                            new Notify().Render( 2, "获取 Pocket 授权失败，请重新获取。" );
                        });
                    });
                }
                else {
                    this.clear( "pocket" );
                }
                $( this.refs.pocket_tags ).velocity( value ? "slideDown" : "slideUp" );
                break;
            case "linnk":
                if ( !flag && !storage.secret.linnk.access_token ) {
                    this.setState({ linnk: !this.state.linnk });
                    return;
                }
                if ( value ) {
                    exp.linnk.Login( this.props.linnk.username, this.props.linnk.password, ( result, error ) => {
                        if ( error ) {
                            new Notify().Render( 2, "获取 Linnk 授权失败，请重新获取。" );
                        } else {
                            if ( result.code == 200 ) {
                                exp.linnk.access_token            = result.token;
                                storage.secret.linnk.access_token = result.token;
                                exp.linnk.Groups( result => {
                                    if ( result.code == 200 ) {
                                        const obj = exp.linnk.GetGroup( "", result.data );
                                        storage.secret.linnk.group_name = obj.groupName;
                                        storage.Safe( ()=> {
                                            new Notify().Render( "已成功授权 Linnk 。" );
                                            this.setState({ secret: storage.secret, linnk: false });
                                        }, storage.secret );
                                    } else {
                                        const msg = exp.linnk.error_code[result.code];
                                        new Notify().Render( 2, msg ? msg : "获取 Linnk 授权失败，请重新获取。" );
                                    }
                                });
                            } else {
                                const msg = exp.linnk.error_code[result.code];
                                new Notify().Render( 2, msg ? msg : "获取 Linnk 授权失败，请重新获取。" );
                            }
                        }
                    })
                } else {
                    this.props.linnk.username = "";
                    this.props.linnk.password = "";
                    this.clear( "linnk" );
                }
                break;
            case "yinxiang":
            case "evernote":
                if ( value ) {
                    exp.evernote.env = state;
                    const name       = exp.evernote.name;
                    new Notify().Render( `开始对 ${name} 进行授权，请稍等...` );
                    exp.evernote.RequestToken( ( result, error ) => {
                        if ( error ) {
                            console.error( error )
                            new Notify().Render( 2, `获取 ${name} 授权失败，请重新获取。` );
                        } else {
                            exp.evernote.Auth().done( result => {
                                storage.secret[state].access_token = exp.evernote.access_token;
                                storage.Safe( ()=> {
                                    new Notify().Render( `已成功授权 ${name} 。` );
                                    this.setState({ secret: storage.secret, linnk: false });
                                }, storage.secret );
                            }).fail( error => {
                                console.error( error )
                                new Notify().Render( 2, `获取 ${name} 授权失败，请重新获取。` );
                            });
                        }
                    });
                }
                else {
                    this.clear( state );
                }
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
                            label={ this.state.secret.pocket.access_token ? "已授权 印象笔记，是否取消授权？" : "是否连接并授权 印象笔记 ？" }
                            onChange={ (s)=>this.onChange( "yinxiang", s ) } />

                        <Switch width="100%" checked={ this.state.secret.evernote.access_token != "" ? true : false }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label={ this.state.secret.pocket.access_token ? "已授权 Evernote，是否取消授权？" : "是否连接并授权 Evernote ？" }
                            onChange={ (s)=>this.onChange( "evernote", s ) } />

                    </div>;
        }

        return (
            <div>{ auth }</div>
        )
    }

}