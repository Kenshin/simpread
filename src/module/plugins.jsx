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

    update() {

    }

    delete() {

    }

    enable() {

    }

    addmore() {
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url: "http://simpread.ksria.cn/plugins" }));
    }

    render() {
        return (
            <card>
                <card-header style={{ backgroundColor: this.props.plugin.icon.bgColor }}>
                    <icon style={{ color: this.props.plugin.icon.color }} dangerouslySetInnerHTML={{__html: this.props.plugin.icon.type }} ></icon>
                </card-header>
                <card-content>
                    <desc>by { this.props.plugin.user.name }</desc>
                    <note>{ this.props.plugin.name }</note>
                </card-content>
                <card-footer>
                    <div style={{height: '48px', display: 'flex', 'flex-direction': 'row' }}>
                        <Button type="flat" text="禁用"
                                style={{minWidth: '48px'}}
                                color="#6200ee"
                                waves="md-waves-effect md-waves-button"
                                onClick={ ()=>this.enable() } />
                        <Button type="flat" text="删除"
                                style={{minWidth: '48px'}}
                                color="#6200ee"
                                waves="md-waves-effect md-waves-button"
                                onClick={ ()=>this.delete() } />
                    </div>
                    <div style={{width: '100%', display: 'flex', 'justify-content': 'flex-end'}}>
                        <Button shape="circle" type="flat"
                                color="#c3c6c7" hoverColor="rgba( 153, 153, 153, .1)"
                                tooltip={{ text: "更新当前插件到最新版本" }}
                                fontIcon='<i class="fas fa-cloud"></i>'
                                waves="md-waves-effect md-waves-button"
                                onClick={ ()=>this.update() } />
                        <Button shape="circle" type="flat"
                                color="#c3c6c7" hoverColor="rgba( 153, 153, 153, .1)"
                                tooltip={{ text: "打开插件中心" }}
                                fontIcon='<i class="fas fa-ellipsis-h"></i>'
                                waves="md-waves-effect md-waves-button"
                                onClick={ ()=>this.addmore() } />
                    </div>
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
        });
        $( "head" ).append( '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">' );
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
