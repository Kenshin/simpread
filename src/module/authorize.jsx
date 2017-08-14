console.log( "===== simpread option labs:Authorize load =====" )

import {storage} from 'storage';
import * as exp  from 'export';

import Notify    from 'notify';
import Switch    from 'switch';
import TextField from 'textfield';

export default class Auth extends React.Component {

    state = {
        secret : undefined
    }

    clear( id ) {
        Object.keys( storage.secret[id] ).forEach( item => storage.secret[id][item] = "" );
        storage.Safe( ()=> {
            new Notify().Render( `已取消对 ${id.replace( /\S/i, $0=>$0.toUpperCase() )} 的授权。` );
            this.setState({ secret: storage.secret });
        }, storage.secret );
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
        }
    }

    save( state, value ) {
        state == "pocket" && ( storage.secret.pocket.tags = value );
        storage.Safe( () => this.setState({ secret: storage.secret }), storage.secret );
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

                    </div>;
        } 

        return (
            <div>{ auth }</div>
        )
    }

}