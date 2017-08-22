console.log( "===== simpread option common load =====" )

import Button      from 'button';
import Notify      from 'notify';

import * as ss     from 'stylesheet';
import { storage, Now } from 'storage';
import * as ver    from 'version';
import * as menu   from 'menu';
import * as watch  from 'watch';
import * as exp    from 'export';

export default class CommonOpt extends React.Component {

    static propTypes = {
        sync : React.PropTypes.func,
    }

    state = {
        update: ( update => !update ? "从未同步过，建议同步一次！" : `上次同步时间： ${ update }` ) ( storage.option.update )
    };

    sync() {
        const dbx = exp.dropbox,
        read      = () => {
            new Notify().Render( "数据同步中，请稍等..." );
            dbx.Exist( dbx.config_name, ( result, error ) => {
                if ( result == -1 ) {
                    storage.Write( () => {
                        dbx.Write( dbx.config_name, storage.Export(), callback );
                    });
                } else {
                    dbx.Read( dbx.config_name, callback );
                }
            });
        },
        callback = ( type, result, error ) => {
            switch ( type ) {
                case "write":
                    !error ? ( location.href = location.origin + location.pathname + "?simpread_mode=sync" ) :
                        new Notify().Render( "远程数据同步失败，请稍后再试！" );
                    break;
                case "read":
                    const json   = JSON.parse( result ),
                          local  = storage.option.update ? new Date( storage.option.update.replace( /年|月/ig, "-" ).replace( "日", "" )) : new Date( "1999-01-01 12:12:12" ),
                          remote = new Date( json.option.update.replace( /年|月/ig, "-" ).replace( "日", "" ));
                    if ( ver.Compare( json.version ) == 1 ) {
                        new Notify().Render( "本地版本与远程版本不一致，且本地版本较新，是否覆盖远程版本？", "覆盖", () => {
                            dbx.Write( dbx.config_name, storage.Export(), callback );
                        });
                    }
                    else if ( local < remote ) {
                        new Notify().Render( "远程备份配置文件较新，是否覆盖本地文件？", "覆盖", () => {
                            storage.Write( () => {
                                watch.SendMessage( "import", true );
                                location.href = location.origin + location.pathname + "?simpread_mode=reload";
                            }, json );
                        });
                    } else if ( local > remote ) {
                        new Notify().Render( "本地配置文件较新，是否覆盖远程备份文件？", "覆盖", () => {
                            dbx.Write( dbx.config_name, storage.Export(), callback );
                        });
                    } else {
                        new Notify().Render( "本地与远程数据相同，无需重复同步。" );
                    }
                    break;
            }
        };

        storage.Safe( ()=> {
            const sec_dbx = storage.secret.dropbox;
            !sec_dbx.access_token ?
                new Notify().Render( "未对 Dropbox 授权，请先进行授权操作。", "授权", () => {
                    dbx.Auth().done( () => {
                        sec_dbx.access_token = dbx.access_token;
                        storage.Safe( () => {
                            location.href = location.origin + location.pathname + "?simpread_mode=auth";
                        }, storage.secret );
                    }).fail( error => {
                        console.error( error )
                        new Notify().Render( 2, error == "access_failed" ? "获取 Dropbox SDK 失败，请检查网络，稍后再试！" : "获取 Dropbox 授权失败，请重新获取。" );
                    });
                }) : ( () => {
                dbx.access_token = sec_dbx.access_token;
                read();
            })();

            /*
            const sec_dbx = storage.secret.dropbox;
            !sec_dbx.access_token ? dbx.Auth().done( () => {
                sec_dbx.access_token = dbx.access_token;
                storage.Safe( () => read(), storage.secret );
            }).fail( error => {
                console.error( error )
                new Notify().Render( 2, error == "access_failed" ? "获取 Dropbox SDK 失败，请检查网络，稍后再试！" : "获取 Dropbox 授权失败，请重新获取。" );
            }) : ( () => {
                dbx.access_token = sec_dbx.access_token;
                read();
            })();
            */
        });
    }

    import() {
        const input  = document.createElement( "input" ),
            $input = $(input),
            onload = event => {
                if ( event && event.target && event.target.result ) {
                    try {
                        let json     = JSON.parse( event.target.result );
                        const result = ver.Compare( json.version );
                        if ( result < 0 ) {
                            result == -1 && new Notify().Render( 2, "上传失败，当前版本太低，请升级简悦。" );
                            result == -2 && new Notify().Render( 2, "上传失败，配置文件版本不存在。" );
                        } else {
                            if ( result == 0 ) {
                                const obj = storage.Verify( json );
                                if ( obj.option.code != 0 || obj.focus.code != 0 || obj.read.code != 0 ) {
                                    new Notify().Render( 2, "上传失败，配置项不匹配，请重新上传。" );
                                    return;
                                }
                            } else if ( result == 1 ) {
                                storage.version != json.version &&
                                    ( json.read.sites = storage.Fix( json.read.sites, json.version, storage.version ));
                                json = ver.Verify( json.version, json );
                                new Notify().Render( "上传版本太低，已自动转换为最新版本。" );
                            }
                            menu.Refresh( json.option.menu );
                            storage.Write( ()=> {
                                watch.SendMessage( "import", true );
                                new Notify().Render( "snackbar", "上传成功，请刷新当前页面，以便新配置文件生效。", "刷新", () => {
                                    location.href = location.origin + location.pathname + "?simpread_mode=reload";
                                });
                            }, json );
                        }
                    } catch ( error ) {
                        new Notify().Render( 2, "上传失败，配置文件解析失败，请重新确认。" );
                    }
                }
            };
        $input.attr({ type : "file", multiple : "false" })
            .one( "change", event => {
                    const reader  = new FileReader();
                    reader.onload = onload;
                    reader.readAsText( event.target.files[0] );
        });
        $input.trigger( "click" );
    }

    export() {
        const data = "data:text/json;charset=utf-8," + encodeURIComponent( storage.Export() );
        exp.Download( data, `simpread-config-${Now()}.json` );
    }

    newsites() {
        storage.GetNewsites( "remote", ( { count }, error ) => {
            if ( !error ) {
                watch.SendMessage( "site", true );
                count == 0 ? new Notify().Render( "适配列表已同步至最新版本。" ) : new Notify().Render( 0, `适配列表已同步成功，本次新增 ${ count } 个站点。` );
            } else {
                new Notify().Render( 3, `同步时发生了一些问题，并不会影响本地配置文件，请稍后再试！` );
            }
        });
    }

    clear() {
        new Notify().Render( "snackbar", "是否清除掉本地配置文件？", "同意 ", () => {
            storage.Clear( "local", () => {
                new Notify().Render( "snackbar", "清除成功，此页面需刷新后才能生效！", "刷新 ", ()=>{
                    location.href = location.origin + location.pathname + "?simpread_mode=clear";
                });
            });
        });
    }

    render() {
        return(
            <div style={{ width: '100%' }}>
                <Button type="raised" text="同步到你的 Dropbox 账户"
                        icon={ ss.IconPath( "sync_icon" ) }
                        color="#fff" backgroundColor="#1976D2"
                        waves="md-waves-effect md-waves-button"
                        //tooltip={{ text: this.state.update }}
                        onClick={ ()=>this.sync() } />
                <div style={{ display: 'inline-flex', width: '100%' }}>
                    <Button type="raised" text="从本地导入配置文件" width="100%"
                            icon={ ss.IconPath( "import_icon" ) }
                            color="#fff" backgroundColor="#FF5252"
                            waves="md-waves-effect md-waves-button"
                            tooltip={{ text: "上传后的配置将覆盖掉当前，请注意确认！" }}
                            onClick={ ()=>this.import() } />
                    <Button type="raised" text="导出配置文件到本地" width="100%"
                            icon={ ss.IconPath( "export_icon" ) }
                            color="#fff" backgroundColor="#2196F3"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.export() } />
                </div>
                <div style={{ display: 'inline-flex', width: '100%' }}>
                    <Button type="raised" text="手动同步适配列表" width="100%"
                            icon={ ss.IconPath( "website_icon" ) }
                            color="#fff" backgroundColor="#2196F3"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.newsites() } />
                    <Button type="raised" text="清除数据" width="100%"
                            icon={ ss.IconPath( "clear_icon" ) }
                            tooltip={{ text: "清除掉本地配置文件，需谨慎！" }}
                            color="#fff" backgroundColor="#757575"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.clear() } />
                </div>
            </div>
        )

    }

}