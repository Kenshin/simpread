console.log( "===== simpread option plugins load =====" )

import {storage} from 'storage';
import * as run  from 'runtime';
import * as ss   from 'stylesheet';
import {browser} from 'browser';
import * as msg  from 'message';
import * as watch from 'watch';

import Button    from 'button';

class Card extends React.Component {

    static defaultProps = {
        plugin         : {},
    };

    static propTypes = {
        plugin         : React.PropTypes.object,
    };

    update() {
        run.Install( this.props.plugin.id, undefined, result => {
            if ( result ) {
                if ( this.props.plugin.version != result.version ) {
                    storage.plugins[this.props.plugin.id] = result;
                    this.props.onChange( "update" );
                } else {
                    new Notify().Render( "当前插件为最新版，无需更新。" );
                }
            } else new Notify().Render( 2, "更新失败，请稍后再试。" );
        });
    }

    delete() {
        new Notify().Render({ mode:"snackbar", content: "是否删除当前插件？", action: "确认", cancel: "取消", callback: type => {
            if ( type == "cancel" ) return;
            delete storage.plugins[ this.props.plugin.id ];
            storage.option.plugins = Object.keys( storage.plugins );
            this.props.onChange( "delete" );
        }});
    }

    enable() {
        this.props.plugin.enable = this.props.plugin.enable == undefined || this.props.plugin.enable ? false : true;
        this.props.onChange( "enable" );
    }

    addmore() {
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url: "https://simpread.ksria.cn/plugins/details/" + this.props.plugin.id }));
    }

    render() {
        const enable = this.props.plugin.enable == undefined || this.props.plugin.enable ? true : false;
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
                    <Button shape="circle" type="flat"
                            color="#c3c6c7" hoverColor="rgba( 153, 153, 153, .1)"
                            tooltip={{ text: enable == true ? "禁用当前插件" : "启用当前插件" }}
                            fontIcon={`<i class="fas fa-eye${ enable ? "" : "-slash" }"></i>`}
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.enable() } />
                    <Button shape="circle" type="flat"
                            color="#c3c6c7" hoverColor="rgba( 153, 153, 153, .1)"
                            tooltip={{ text: "删除当前插件" }}
                            fontIcon='<i class="fas fa-trash-alt"></i>'
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.delete() } />
                    <Button shape="circle" type="flat"
                            color="#c3c6c7" hoverColor="rgba( 153, 153, 153, .1)"
                            tooltip={{ text: "更新当前插件到最新版本" }}
                            fontIcon='<i class="fas fa-cloud"></i>'
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.update() } />
                    <Button shape="circle" type="flat"
                            color="#c3c6c7" hoverColor="rgba( 153, 153, 153, .1)"
                            tooltip={{ text: "查看当前插件的详细信息" }}
                            fontIcon='<i class="fas fa-ellipsis-h"></i>'
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.addmore() } />
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
        onChange        : React.PropTypes.func,
    };

    render() {
        const card = this.props.plugins.length > 0 ? this.props.plugins.map( ( item, idx ) => {
            return (
                <Card plugin={ item } onChange={t=>this.props.onChange(t)} />
            )
        }) : <card-empty><a href="https://simpread.ksria.cn/plugins" target="_blank">没有任何插件，点击打开「插件中心」添加。</a></card-empty>;
        return (
            <cards>{ card }</cards>
        )
    }
}

export default class PluginsOpt extends React.Component {

    state = {
        plugins: []
    };

    writecb() {
        watch.SendMessage( "option", true );
    }

    install() {
        const id = decodeURIComponent( location.hash ).replace( "#plugins?install=", "" );
        run.Install( id, undefined, result => {
            if ( result ) {
                const add = () => {
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
                    add();
                    storage.option.plugins.push( result.id );
                    storage.Write( this.writecb );
                } else if ( storage.plugins[result.id].version != result.version ) {
                    new Notify().Render({ content: "本地版本与安装版本不一致，是否安装新版本？", action: "安装", cancel: "取消", callback: type => {
                        type == "action" && add();
                    }});
                } else {
                    new Notify().Render({ content: "本地版本与安装版本一致，是否重新安装？", action: "安装", cancel: "取消", callback: type => {
                        type == "action" && add();
                    }});
                }
            } else new Notify().Render( 2, id + " 获取失败，请稍后再试。" );
        });
    }

    clear() {
        new Notify().Render({ mode: "snackbar", content: "是否清除本地全部插件？", action: "是的", cancel: "取消", callback: type => {
            if ( type == "action" ) {
                storage.option.plugins = [];
                storage.Write( this.writecb );
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
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url: "https://simpread.ksria.cn/plugins" }));
    }

    update() {
        let is_update = false, count = 0;
        storage.option.plugins.forEach( id => {
            run.Install( id, undefined, result => {
                if ( !result ) {
                    new Notify().Render( 2, id + " 获取失败，请稍后再试。" );
                }
                count++;
                if ( storage.plugins[id].version != result.version ) {
                    storage.plugins[result.id] = result;
                    is_update = true;
                }
                count == storage.option.plugins.length && complete();
            });
        });
        const complete = () => {
            if ( is_update ) {
                storage.Plugins( result => {
                    new Notify().Render( "本地插件已全部更新完毕。" );
                    this.setState({ plugins: Object.values( storage.plugins ) });
                }, storage.plugins );
            } else {
                new Notify().Render( "无任何可用更新。" );
            }
        }
    }

    import() {
        let newPlugins = {};
        if ( storage.option.plugins.length == 0 ) {
            new Notify().Render( "当前配置文件没有任何插件。" );
            return;
        }
        new Notify().Render({ mode:"snackbar", content: "导入意味着从配置文件覆盖当前的插件！", action: "确认", cancel: "取消", callback: type => {
            if ( type == "cancel" ) return;
            let count = 0;
            storage.option.plugins.forEach( id => {
                run.Install( id, undefined, result => {
                    if ( !result ) {
                        new Notify().Render( 2, id + " 获取失败，请稍后再试。" );
                    } else newPlugins[result.id] = result;
                    count++;
                    count == storage.option.plugins.length && complete();
                });
            });
        }});
        const complete = () => {
            storage.Plugins( result => {
                storage.Write( () => {
                    new Notify().Render( "已从配置文件导入完毕。" );
                    this.setState({ plugins: Object.values( storage.plugins ) });
                });
            }, newPlugins );
        }
    }

    onChange( type ) {
        storage.Write( this.writecb );
        storage.Plugins( () => {
            type == "update" && new Notify().Render( "当前插件已更新成功。" );
            type == "delete" && new Notify().Render( "当前插件已删除成功。" );
            type == "enable" && new Notify().Render( "当前插件已更改成功。" );
            this.setState({ plugins: Object.values( storage.plugins ) });
        }, storage.plugins );
    }

    componentWillMount() {
        $( "head" ).append( '<link rel="stylesheet" class="simpread-fs-style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/solid.min.css" />' );
        $( "head" ).append( '<link rel="stylesheet" class="simpread-fs-style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/brands.min.css" />' );
        $( "head" ).append( '<link rel="stylesheet" class="simpread-fs-style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/fontawesome.min.css" />' );
        storage.Plugins( () => {
            decodeURIComponent( location.href ).includes( "#plugins?install=" ) && this.install();
            this.setState({ plugins: Object.values( storage.plugins ) });
        });
    }

    render() {
        return (
            <div id="labs" style={{ width: '100%', overflow: 'hidden' }}>
                <div className="label">管理</div>
                <div className="lab">
                    <div style={{ display: 'inline-flex', width: '100%' }}>
                        <div className="version-tips" data-hits="pluginconfig" style={{ display: 'inline-flex', width: '50%' }}>
                        <Button type="raised" text="从配置文件导入插件" width="100%"
                            tooltip={{ text: "注意：本操作并不能更新本地插件。" }}
                            icon={ ss.IconPath( "import_icon" ) }
                            color="#fff" backgroundColor="#00BCD4"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.import() } />
                        </div>
                        <div className="version-tips" data-hits="pluginsite" style={{ display: 'inline-flex', width: '50%' }}>
                        <Button type="raised" text="查看并获取更多的插件" width="100%"
                            fontIcon={`<i class="fas fa-external-link-square-alt"></i>`}
                            color="#fff" backgroundColor="#00BCD4"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.addmore() } />
                        </div>
                    </div>
                    <div style={{ display: 'inline-flex', width: '100%' }}>
                        <div className="version-tips" data-hits="pluginupdate" style={{ display: 'inline-flex', width: '50%' }}>
                        <Button type="raised" text="更新本地全部插件" width="100%"
                                icon={ ss.IconPath( "update_icon" ) }
                                color="#fff" backgroundColor="#FF5252"
                                waves="md-waves-effect md-waves-button"
                                onClick={ ()=>this.update() } />
                        </div>
                        <div className="version-tips" data-hits="pluginclear" style={{ display: 'inline-flex', width: '50%' }}>
                        <Button type="raised" text="清除本地全部插件" width="100%"
                                icon={ ss.IconPath( "clear_icon" ) }
                                color="#fff" backgroundColor="#757575"
                                waves="md-waves-effect md-waves-button"
                                onClick={ ()=>this.clear() } />
                        </div>
                    </div>
                </div>

                <div className="label">
                    <span>{ this.state.plugins.length == 0 ? "" : "已安装 " + this.state.plugins.length + " 个插件 " }</span>
                    { this.state.plugins.length > 5 && <a target="_blank" style={{ color:' #FF5252', borderBottom: '2px dotted', fontSize: '10px', fontWeight: 'bold' }}>过多的插件会使进入阅读模式变慢，建议不要超过 6 个</a> }
                </div>
                <div className="version-tips" data-hits="pluginmange">
                <div style={{ 'padding-top': '10px' }} className="lab">
                    <Cards plugins={ this.state.plugins } onChange={ t=>this.onChange(t) } />
                </div>
                </div>

            </div>
        )
    }
}