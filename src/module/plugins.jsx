console.log( "===== simpread option labs load =====" )

import {storage} from 'storage';
import * as run  from 'runtime';
import * as ss   from 'stylesheet';

import Button    from 'button';

export default class PluginsOpt extends React.Component {

    install() {
        if ( decodeURIComponent( location.href ).includes( "#plugins?install=http://simpread.ksria.cn/plugins" ) ) {
            const url = decodeURIComponent( location.hash ).replace( "#plugins?install=", "" );
            run.Install( undefined, url, result => {
                if ( result ) {
                    const install = () => {
                        storage.plugins[result.id] = result;
                        storage.Plugins( result => {
                            new Notify().Render( "当前插件已安装成功，2 秒后自动刷新当前页面。" );
                            setTimeout( ()=> {
                                location.href = location.origin + location.pathname + "#plugins";
                                location.reload();
                            }, 2000 );
                        }, storage.plugins );
                    };
                    result = JSON.parse( result );
                    if ( !storage.option.plugins.includes( result.id ) ) {
                        install();
                        storage.option.plugins.push( result.id );
                        storage.Write();
                } else if ( storage.plugins[result.id].version != result.version ) {
                        new Notify().Render({ content: "本地版本与安装版本不一致，是否重新安装？", action: "安装", cancel: "取消", callback: type => {
                            type == "action" && install();
                        }});
                    } else {
                        new Notify().Render({ content: "本地版本与安装版本一致，是否重新安装？", action: "安装", cancel: "取消", callback: type => {
                            type == "action" && install();
                        }});
                    }
                }
            });
        }
    }

    clear() {
        new Notify().Render({ mode: "snackbar", content: "是否清除本地全部插件？", action: "是的", cancel: "取消", callback: type => {
            if ( type == "action" ) {
                storage.option.plugins = [];
                storage.Write();
                storage.Plugins( () => {
                    new Notify().Render( "snackbar", "清除成功，此页面需刷新后才能生效！", "刷新 ", ()=>{
                        location.href = location.origin + location.pathname + "#plugins";
                        location.reload();
                    });
                }, {} );
            }
        }});
    }

    componentWillMount() {
        storage.Plugins( () => {
            storage.option.plugins = Object.keys( storage.plugins );
            this.install();
        })
    }

    render() {
        return (
            <div id="labs" style={{ width: '100%' }}>
                <div className="label">全局</div>
                <div className="lab">
                    <Button type="raised" text="查看并获取更多的插件"
                        color="#fff" backgroundColor="#00BCD4"
                        waves="md-waves-effect md-waves-button"
                        />
                    <div style={{ display: 'inline-flex', width: '100%' }}>
                        <Button type="raised" text="更新本地全部插件" width="100%"
                                icon={ ss.IconPath( "update_icon" ) }
                                color="#fff" backgroundColor="#FF5252"
                                waves="md-waves-effect md-waves-button"
                                />
                        <Button type="raised" text="清除本地全部插件" width="100%"
                                icon={ ss.IconPath( "clear_icon" ) }
                                color="#fff" backgroundColor="#757575"
                                waves="md-waves-effect md-waves-button"
                                onClick={ ()=>this.clear() } />
                    </div>
                </div>

                <div className="label">管理</div>
                <div style={{ 'padding-top': '10px' }} className="lab">
                    
                </div>

            </div>
        )
    }
}
