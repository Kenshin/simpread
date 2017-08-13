console.log( "===== simpread option labs:Authorize load =====" )

import {storage} from 'storage';
import * as exp  from 'export';

import Notify    from 'notify';
import Switch    from 'switch';

export default class Auth extends React.Component {

    state = {
        secret : undefined
    }

    onChange( state, value ) {
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
                    storage.secret.dropbox.access_token = "";
                    storage.Safe( ()=> {
                        new Notify().Render( "已取消对 Dropbox 的授权。" );
                        this.setState({ secret: storage.secret });
                    }, storage.secret );
                }
                break;
            case "pocket":
                if ( value ) {
                    exp.pocket.Request( ( result, error ) => {
                        exp.pocket.Redirect( result.code ).done( () => {
                            exp.pocket.Auth( ( result, error ) => {
                                storage.secret.pocket.access_token = result.access_token;
                                storage.secret.pocket.username     = result.username;
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
                    storage.secret.pocket.access_token = "";
                    storage.Safe( ()=> {
                        new Notify().Render( "已取消对 Dropbox 的授权。" );
                        this.setState({ secret: storage.secret });
                    }, storage.secret );
                }
                break;
        }
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

                    </div>;
        } 

        return (
            <div>{ auth }</div>
        )
    }

}