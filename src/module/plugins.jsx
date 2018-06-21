console.log( "===== simpread option labs load =====" )

import {storage} from 'storage';
import * as run  from 'runtime';
import * as ss   from 'stylesheet';
import {browser} from 'browser';
import * as msg  from 'message';

import Button    from 'button';

class Card extends React.Component {

    static defaultProps = {
        plugin         : {},
    };

    static propTypes = {
        plugin         : React.PropTypes.object,
    };

    render() {
        return (
            <card>
                <card-header style={{ backgroundColor: this.props.plugin.icon.bgColor }}>
                    <icon>
                        <svg aria-hidden="true" data-prefix="fas" data-icon="cogs" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-cogs fa-w-20 fa-3x"><path fill="currentColor" d="M512.1 191l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0L552 6.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zm-10.5-58.8c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.7-82.4 14.3-52.8 52.8zM386.3 286.1l33.7 16.8c10.1 5.8 14.5 18.1 10.5 29.1-8.9 24.2-26.4 46.4-42.6 65.8-7.4 8.9-20.2 11.1-30.3 5.3l-29.1-16.8c-16 13.7-34.6 24.6-54.9 31.7v33.6c0 11.6-8.3 21.6-19.7 23.6-24.6 4.2-50.4 4.4-75.9 0-11.5-2-20-11.9-20-23.6V418c-20.3-7.2-38.9-18-54.9-31.7L74 403c-10 5.8-22.9 3.6-30.3-5.3-16.2-19.4-33.3-41.6-42.2-65.7-4-10.9.4-23.2 10.5-29.1l33.3-16.8c-3.9-20.9-3.9-42.4 0-63.4L12 205.8c-10.1-5.8-14.6-18.1-10.5-29 8.9-24.2 26-46.4 42.2-65.8 7.4-8.9 20.2-11.1 30.3-5.3l29.1 16.8c16-13.7 34.6-24.6 54.9-31.7V57.1c0-11.5 8.2-21.5 19.6-23.5 24.6-4.2 50.5-4.4 76-.1 11.5 2 20 11.9 20 23.6v33.6c20.3 7.2 38.9 18 54.9 31.7l29.1-16.8c10-5.8 22.9-3.6 30.3 5.3 16.2 19.4 33.2 41.6 42.1 65.8 4 10.9.1 23.2-10 29.1l-33.7 16.8c3.9 21 3.9 42.5 0 63.5zm-117.6 21.1c59.2-77-28.7-164.9-105.7-105.7-59.2 77 28.7 164.9 105.7 105.7zm243.4 182.7l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0l8.2-14.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zM501.6 431c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.6-82.4 14.3-52.8 52.8z" class=""></path></svg>
                    </icon>
                </card-header>
                <card-content>
                    <desc>by { this.props.plugin.user.name }</desc>
                    <note>{ this.props.plugin.name }</note>
                </card-content>
                <card-footer>
                </card-footer>
            </card>
        )
    }
}

class Cards extends React.Component {

    static defaultProps = {
        plugins         : [],
    };

    static propTypes = {
        plugins         : React.PropTypes.array,
    };

    render() {
        const card = this.props.plugins.length > 0 ? this.props.plugins.map( ( item, idx ) => {
            return (
                <Card plugin={ item } />
            )
        }) : <card-empty><a href="http://simpread.ksria.cn/plugins" target="_blank">没有任何扩展，点击打开扩展中心添加。</a></card-empty>;
        return (
            <cards>{ card }</cards>
        )
    }
}

export default class PluginsOpt extends React.Component {

    state = {
        plugins: []
    };

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

    addmore() {
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url: "http://simpread.ksria.cn/plugins" }));
    }

    update() {
        let is_update = false, count = 0;
        storage.option.plugins.forEach( id => {
            run.Install( id, undefined, result => {
                count++;
                if ( storage.plugins[id].version != result.version ) {
                    storage.plugins[result.id] = result;
                    storage.Plugins( result => {
                        is_update = true;
                        count == storage.option.plugins.length && complete();
                    }, storage.plugins );
                }
            });
        });
        const complete = () => {
            if ( is_update ) {
                new Notify().Render( "本地插件已全部更新完毕。" );
            } else {
                new Notify().Render( "无任何可用更新。" );
            }
        }
    }

    import() {
        let count = 0;
        storage.option.plugins.forEach( id => {
            run.Install( id, undefined, result => {
                count++;
                storage.plugins[result.id] = result;
                storage.Plugins( result => {
                    count == storage.option.plugins.length && new Notify().Render( "本地插件已全部导入完毕。" );
                }, storage.plugins );
            });
        });
    }

    componentWillMount() {
        storage.Plugins( () => {
            this.install();
            this.setState({ plugins: Object.values( storage.plugins ) });
        })
    }

    render() {
        return (
            <div id="labs" style={{ width: '100%' }}>
                <div className="label">全局</div>
                <div className="lab">
                    <div style={{ display: 'inline-flex', width: '100%' }}>
                        <Button type="raised" text="从配置文件导入插件" width="100%"
                            icon={ ss.IconPath( "import_icon" ) }
                            color="#fff" backgroundColor="#00BCD4"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.import() } />
                        <Button type="raised" text="查看并获取更多的插件" width="100%"
                            icon={ ss.IconPath( "export_icon" ) }
                            color="#fff" backgroundColor="#00BCD4"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.addmore() } />
                    </div>
                    <div style={{ display: 'inline-flex', width: '100%' }}>
                        <Button type="raised" text="更新本地全部插件" width="100%"
                                icon={ ss.IconPath( "update_icon" ) }
                                color="#fff" backgroundColor="#FF5252"
                                waves="md-waves-effect md-waves-button"
                                onClick={ ()=>this.update() } />
                        <Button type="raised" text="清除本地全部插件" width="100%"
                                icon={ ss.IconPath( "clear_icon" ) }
                                color="#fff" backgroundColor="#757575"
                                waves="md-waves-effect md-waves-button"
                                onClick={ ()=>this.clear() } />
                    </div>
                </div>

                <div className="label">管理</div>
                <div style={{ 'padding-top': '10px' }} className="lab">
                    <Cards plugins={ this.state.plugins } />
                </div>

            </div>
        )
    }
}
