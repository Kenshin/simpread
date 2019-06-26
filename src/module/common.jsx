console.log( "===== simpread option common load =====" )

import Button      from 'button';
import Notify      from 'notify';

import * as ss     from 'stylesheet';
import { storage, Now } from 'storage';
import * as ver    from 'version';
import * as menu   from 'menu';
import * as watch  from 'watch';
import * as exp    from 'export';
import {br}        from 'browser';
import * as msg    from 'message';

export default class CommonOpt extends React.Component {

    static propTypes = {
        sync : React.PropTypes.func,
    }

    state = {
        sync: ( sync => !sync ? "从未同步过，建议同步一次！" : `上次同步时间： ${ sync }` ) ( storage.option.sync )
    };

    sync() {
        let notify;
        const dbx     = exp.dropbox,
              jianguo = exp.jianguo,
        write         = () => {
            storage.option.sync = Now();
            storage.Write( () => {
                writeConfig();
            });
        },
        readDropbox   = () => {
            notify = new Notify().Render({ content: "数据同步中，请稍等...", state: "loading" });
            dbx.Exist( dbx.config_name, ( result, error ) => {
                if ( result == -1 ) {
                    write();
                } else {
                    dbx.Read( dbx.config_name, callback );
                }
            });
        },
        readJianguo   = ( obj ) => {
            notify = new Notify().Render({ content: "数据同步中，请稍等...", state: "loading" });
            jianguo.Read( obj.username, obj.password, jianguo.config_name, result => {
                if ( result && result.status == 404 ) {
                   write();
                } else if ( result && result.status == 200 ) {
                    callback( "read", result.done );
                }
            });
        },
        writeConfig   = () => {
            if ( storage.option.save_at == "dropbox" ) {
                dbx.Write( dbx.config_name, storage.Export(), callback );
            } else {
                jianguo.Add( storage.secret.jianguo.username, storage.secret.jianguo.password, jianguo.root + "/" + jianguo.config_name, storage.Export(), result => {
                    callback( "write", undefined, result && [ 201, 204 ].includes( result.status ) ? undefined : "error" );
                });
            }
        },
        callback = ( type, result, error ) => {
            notify.complete();
            switch ( type ) {
                case "write":
                    !error ? ( location.href = location.origin + location.pathname + "?simpread_mode=sync" ) :
                        new Notify().Render( 2, error == "error" ? "远程数据同步失败，请稍后再试！" : error );
                    break;
                case "read":
                    const json   = JSON.parse( result ),
                          local  = storage.option.update ? new Date( storage.option.update.replace( /年|月/ig, "-" ).replace( "日", "" )) : new Date( "1999-01-01 12:12:12" ),
                          remote = new Date( json.option.update.replace( /年|月/ig, "-" ).replace( "日", "" ));
                    if ( ver.Compare( json.version ) == 1 ) {
                        new Notify().Render( "本地版本与远程版本不一致，且本地版本较新，是否覆盖远程版本？", "覆盖", () => {
                            watch.SendMessage( "import", true );
                            write();
                        });
                    }
                    else if ( local < remote ) {
                        new Notify().Render( "远程备份配置文件较新，是否覆盖本地文件？", "覆盖", () => {
                            this.importsecret( json.option.secret, { ...json.secret }, () => {
                                delete json.secret;
                                storage.Write( () => {
                                    watch.SendMessage( "import", true );
                                    location.href = location.origin + location.pathname + "?simpread_mode=reload";
                                }, json );
                            });
                        });
                    } else if ( local > remote ) {
                        new Notify().Render( "本地配置文件较新，是否覆盖远程备份文件？", "覆盖", () => {
                            watch.SendMessage( "import", true );
                            write();
                        });
                    } else {
                        new Notify().Render( "本地与远程数据相同，无需重复同步。" );
                    }
                    break;
            }
        };

        storage.Safe( ()=> {
            if ( storage.option.save_at == "dropbox" ) {
                const sec_dbx = storage.secret.dropbox;
                !sec_dbx.access_token ?
                    new Notify().Render( `未对 ${ dbx.name } 授权，请先进行授权操作。`, "授权", () => {
                        dbx.New().Auth();
                        dbx.dtd
                            .done( () => {
                                sec_dbx.access_token = dbx.access_token;
                                storage.Safe( () => {
                                    new Notify().Render( "授权成功！" );
                                    readDropbox();
                                }, storage.secret );
                            })
                            .fail( error => {
                                console.error( error )
                                new Notify().Render( 2, `获取 ${ dbx.name } 授权失败，请重新获取。` );
                            });
                    }) : ( () => {
                    dbx.access_token = sec_dbx.access_token;
                    readDropbox();
                })();
            } else {
                const jianguo = storage.secret.jianguo;
                !jianguo.access_token ? new Notify().Render( 2, `坚果云未授权，请先 <a href="http://ksria.com/simpread/docs/#/坚果云">授权</a>。` ) : readJianguo( storage.secret.jianguo );
            }
        });
    }

    import() {
        const input  = document.createElement( "input" ),
            $input = $(input),
            onload = event => {
                if ( event && event.target && event.target.result ) {
                    try {
                        let json     = ver.FixSubver( ver.patch, JSON.parse( event.target.result ));
                        const result = ver.Compare( json.version );
                        if ( result < 0 ) {
                            result == -1 && new Notify().Render( 2, "上传失败，当前版本太低，请升级简悦。" );
                            result == -2 && new Notify().Render( 2, "上传失败，配置文件版本不存在。" );
                        } else {
                            if ( result == 0 ) {
                                const obj = storage.Verify( json );
                                if ( obj.option.code != 0 || obj.focus.code != 0 || obj.read.code != 0 || obj.stat.code != 0 ) {
                                    new Notify().Render( 2, "上传失败，配置项不匹配，请重新上传。" );
                                    return;
                                }
                            } else if ( result == 1 ) {
                                storage.version != json.version &&
                                    storage.Fix( json.read.sites, json.version, storage.version, json.focus.sites );
                                json = ver.Verify( json.version, json );
                                new Notify().Render( "上传版本太低，已自动转换为最新版本。" );
                            }
                            menu.Refresh( json.option.menu );
                            json.option.origins && json.option.origins.length > 0 &&
                                new Notify().Render( "导入的配置文件包含了第三方源，请通过手动导入。" );
                            json.option.plugins && json.option.plugins.length > 0 &&
                                new Notify().Render( "导入的配置文件包含了插件，请通过手动导入。" );
                            this.importsecret( json.option.secret, { ...json.secret }, () => {
                                delete json.secret;
                                storage.Write( ()=> {
                                    storage.Plugins( () => {
                                        watch.SendMessage( "import", true );
                                        new Notify().Render( "snackbar", "导入成功，请刷新当前页面，以便新配置文件生效。", "刷新", () => {
                                            location.href = location.origin + location.pathname + "?simpread_mode=reload";
                                        });
                                    }, {} );
                                }, json );
                            });
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
        if ( br.isFirefox() ) {
            exp.PrDownload( storage.Export(), `simpread-config.json` );
        } else {
            const data = "data:text/json;charset=utf-8," + encodeURIComponent( storage.Export() );
            exp.Download( data, `simpread-config-${Now()}.json` );
        }
    }

    oldnewsites() {
        new Notify().Render( "此功能转移到 <b>站点管理</b> 选项卡里面，3 秒钟后自动切换到此选项卡。" );
        setTimeout( ()=> {
            location.href = location.origin + "/options/options.html#labs";
            window.dispatchEvent( new CustomEvent( msg.MESSAGE_ACTION.turn_tab, { detail: { page: 3 }}));
        }, 3000 );
    }

    newsites() {
        const notify = new Notify().Render({ content: "数据同步中，请稍等...", state: "loading" });
        storage.GetRemote( "remote", ( result, error ) => {
            notify.complete();
            if ( !error ) {
                const count = storage.pr.Addsites( result );
                storage.Writesite( storage.pr.sites, () => {
                    watch.SendMessage( "site", true );
                    count == 0 ? new Notify().Render( "适配列表已同步至最新版本。" ) : new Notify().Render( 0, `适配列表已同步成功，本次新增 ${ count } 个站点。` );
                });
            } else {
                new Notify().Render( 3, `同步时发生了一些问题，并不会影响本地配置文件，请稍后再试！` );
            }
        });
    }

    clear() {
        new Notify().Render( "snackbar", "是否清除掉（已包含账户信息）本地配置文件？", "同意 ", () => {
            storage.Clear( "local", () => {
                new Notify().Render( "snackbar", "清除成功，此页面需刷新后才能生效！", "刷新 ", ()=>{
                    location.href = location.origin + location.pathname + "?simpread_mode=clear";
                });
            });
        });
    }

    /**
     * Import to secret storage
     * 
     * @param {boole} option.secret value
     * @param {object} simpread.secret
     * @param {function} callback
     */
    importsecret( state, secret, callback ) {
        state && !$.isEmptyObject( secret ) ? storage.Safe( ()=>{
            callback();
        }, secret ): callback();
    }

    componentDidMount() {
        if ( this.props.website_sync ) {
            storage.GetRemote( "versions", ( result, error ) => {
                if ( !error && result.website == true ) {
                    new Notify().Render( "正在获取最新的适配列表，请稍等..." );
                    this.newsites();
                }
            });
        }
    }

    render() {
        return(
            <div style={{ width: '100%' }}>
                <div className="version-tips" data-hits="sync">
                <Button type="raised" text={ `同步到你的 ${storage.option.save_at == "dropbox" ? "Dropbox" : "坚果云" } 账户` }
                        icon={ ss.IconPath( storage.option.save_at + "_icon" ) }
                        color="#fff" backgroundColor="#1976D2"
                        waves="md-waves-effect md-waves-button"
                        tooltip={{ text: this.state.sync }}
                        onClick={ ()=>this.sync() } />
                </div>
                <div className="version-tips" data-hits="config">
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
                </div>
                <div className="version-tips" data-hits="oldnewsites" style={{ display: 'inline-flex', width: '50%' }}>
                    <Button type="raised" text="手动同步适配列表" width="100%"
                            icon={ ss.IconPath( "update_icon" ) }
                            color="#fff" backgroundColor="#2196F3"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.oldnewsites() } />
                </div>
                <div className="version-tips" data-hits="clear" style={{ display: 'inline-flex', width: '50%' }}>
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