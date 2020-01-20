console.log( "===== simpread option sites load =====" )

import {storage}  from 'storage';
import {browser}  from 'browser';
import * as msg   from 'message';
import * as watch from 'watch';
import * as ss    from 'stylesheet';

import TextField  from 'textfield';
import Button     from 'button';

class Card extends React.Component {

    static defaultProps = {
        info         : {},
    };

    static propTypes = {
        info         : React.PropTypes.object,
    };

    update() {
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url: "https://simpread.ksria.cn/sites/details/" + this.props.info.domain + "?type=update" }));
    }

    delete() {
        new Notify().Render({ mode:"snackbar", content: "是否删除当前站点？", action: "确认", cancel: "取消", callback: type => {
            if ( type == "cancel" ) return;
            storage.pr.Deletesite( "person", this.props.url, flag => {
                flag == -1 && new Notify().Render( "当前站点已删除，请勿重复提交。" );
                flag != -1 && storage.Writesite( storage.pr.sites, ()=> {
                    console.log( "current site is ", storage.pr.sites )
                    watch.SendMessage( "site", true );
                    new Notify().Render( "删除成功。" );
                    this.props.onChange( "delete" );
                });
            });
        }});
    }

    addmore() {
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url: "https://simpread.ksria.cn/sites/details/" + this.props.info.domain }));
    }

    render() {
        return (
            <card>
                <card-header style={{ backgroundColor: this.props.info.bgColor }}>
                    <title style={{ color: this.props.info.color }}>{ this.props.info.title }</title>
                </card-header>
                <card-footer>
                    <Button shape="circle" type="flat"
                            color="#c3c6c7" hoverColor="rgba( 153, 153, 153, .1)"
                            tooltip={{ text: "删除当前站点" }}
                            fontIcon='<i class="fas fa-trash-alt"></i>'
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.delete() } />
                    <Button shape="circle" type="flat"
                            color="#c3c6c7" hoverColor="rgba( 153, 153, 153, .1)"
                            tooltip={{ text: "更新当前站点到最新版本" }}
                            fontIcon='<i class="fas fa-cloud"></i>'
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.update() } />
                    <Button shape="circle" type="flat"
                            color="#c3c6c7" hoverColor="rgba( 153, 153, 153, .1)"
                            tooltip={{ text: "查看当前站点的详细信息" }}
                            fontIcon='<i class="fas fa-ellipsis-h"></i>'
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.addmore() } />
                </card-footer>
            </card>
        )
    }
}

class Cards extends React.Component {

    state = {
        sites    : storage.pr.sites.person
    }

    static propTypes = {
        onChange : React.PropTypes.func,
    };

    onChange( type ) {
        this.setState({
            sites: storage.pr.sites.person
        });
    }

    render() {
        const card = this.state.sites && this.state.sites.length > 0 ? this.state.sites.map( item => {
            return (
                <Card url={ item[0] } info={ item[1].info } onChange={t=>this.onChange(t)} />
            )
        }) : <card-empty><a href="https://simpread.ksria.cn/sites" target="_blank">没有任何站点，点击打开「站点集市」添加。</a></card-empty>;
        return (
            <cards>{ card }</cards>
        )
    }
}

export default class SitesOpts extends React.Component {

    newsites() {
        const notify = new Notify().Render({ content: "数据同步中，请稍等...", state: "loading" });
        storage.GetRemote( "remote", ( result, error ) => {
            notify.complete();
            if ( !error ) {
                const count = storage.pr.Addsites( result );
                storage.Writesite( storage.pr.sites, () => {
                    watch.SendMessage( "site", true );
                    count == 0 ? new Notify().Render( "适配列表已同步至最新版本。" ) : new Notify().Render( 0, `适配列表已同步成功，本次新增 ${ count } 个站点，2 秒后自动自动刷新。` );
                    count > 0 && setTimeout( ()=>location.reload(), 2000 );
                });
            } else {
                new Notify().Render( 3, `同步时发生了一些问题，并不会影响本地配置文件，请稍后再试！` );
            }
        });
    }

    onClick( state ) {
        state == "sitemgr" && ( location.href = location.origin + "/options/sitemgr.html" );
    }

    changeOrigins() {
        this.props.option.origins = event.target.value.split("\n");
        storage.pr.origins        = this.props.option.origins;
        this.props.onChange && this.props.onChange( false );
    }

    origins( type ) {
        /*
        if ( type == "origins" ) {
            storage.GetRemote( "origins", ( result, error ) => {
                if ( error ) new Notify().Render( 2, "获取失败，请稍后重新加载。" );
                else {
                    this.props.option.origins = storage.pr.Origins( result );
                    this.props.onChange && this.props.onChange( false );
                    $( this.refs.origins ).find( "textarea" ).val( this.props.option.origins.join( "\n" ) );
                    new Notify().Render( "官方源加载成功。" );
                }
            });
        } else
        */
        if ( type == "import" ) {
            new Notify().Render( "snackbar", "导入后会覆盖掉原来的第三方适配列表，请问是否覆盖？", "确认", () => {
                const urls = this.props.option.origins.filter( item => {
                    return item.trim() != "" && item.trim().startsWith( "http" ) && item.trim().endsWith( ".json" )
                });
                const max  = urls.length;
                let   idx  = 0, arr = [], count = 0;
                if ( urls.length != this.props.option.origins.length ) {
                    this.props.option.origins = [ ...urls ];
                    this.props.onChange && this.props.onChange( false );
                    $( this.refs.origins ).find( "textarea" ).val( this.props.option.origins.join( "\n" ) );
                    new Notify().Render( "已剔除掉不符合规范的第三方源。" );
                }
                this.props.option.origins.forEach( item => {
                    storage.GetRemote( item, ( result, error ) => {
                        idx++;
                        if ( result && result.sites.length > 0 ) {
                            count++;
                            arr = arr.concat( storage.pr.Formatsites( result ) );
                        } else new Notify().Render( `导入失败 ${ item }` );
                        if ( idx == max ) {
                            arr.length > 0 && ( storage.websites.custom = storage.pr.Addorigins( arr ) );
                            console.log( "current storage websites.custom is ", arr );
                            new Notify().Render( `已完成导入，本次共计：${ count } 个站点， ${ arr.length } 条数据。` );
                            this.props.onChange && this.props.onChange( false );
                        }
                    });
                });
            });
        } else if ( type == "clear" ) {
            new Notify().Render( "snackbar", "只能清除第三方源的适配站点，请问是否清除？", "确认", () => {
                new Notify().Render( `已完成清除，共计：${ storage.pr.Clearorigins() } 条数据。` );
                storage.websites.custom = storage.pr.sites.custom;
                this.props.onChange && this.props.onChange( false );
            });
        }
    }

    onChange( type ) {
        console.log( type )
    }

    clear() {
        new Notify().Render({ mode: "snackbar", content: "是否清除「站点集市」的全部站点？", action: "是的", cancel: "取消", callback: type => {
            if ( type == "action" ) {
                storage.pr.sites.person = [];
                storage.Writesite( storage.pr.sites, ()=> {
                    console.log( "current site is ", storage.pr.sites )
                    watch.SendMessage( "site", true );
                    new Notify().Render( "已清除成功，2 秒后自动刷新当前页面。" );
                    setTimeout( ()=> {
                        location.href = location.origin + location.pathname + "#sites";
                        location.reload();
                    }, 2000 );
                });
            }
        }});
    }

    addmore() {
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url: "https://simpread.ksria.cn/sites" }));
    }

    install() {
        try {
            const url  = decodeURIComponent( location.hash ).replace( "#sites?install=", "" ),
                  arr  = url.split( "?site=" ),
                  id   = arr[0],
                  news = JSON.parse( decodeURI( arr[1] )),
                  old  = storage.pr.sites.person.filter( site => {
                      return site[1].info.id == news.id;
                  }),
                  add = () => {
                      const url  = old.length > 0 ? old[0][0] : news.site.url,
                            site = { ...news.site };

                      delete news.user;
                      delete news.site;
                      delete news.view;
                      delete news.download;
                      delete news.href;
                      site.info = news;

                      storage.pr.Updatesite( "person", url, [ url, storage.pr.Cleansite(site) ] );
                      storage.Writesite( storage.pr.sites, ()=> {
                        console.log( "current site is ", storage.pr.sites )
                        watch.SendMessage( "site", true );
                        new Notify().Render( "当前站点已安装成功，2 秒后自动刷新当前页面。" );
                        setTimeout( ()=> {
                            location.href = location.origin + location.pathname + "#sites";
                            location.reload();
                        }, 2000 );
                    });
                  };
            if ( old.length == 0 ) {
                add();
            } else if ( news.create != old[0][1].info.create ) {
                new Notify().Render({ content: "本地版本与安装版本不一致，是否安装新版本？", action: "安装", cancel: "取消", callback: type => {
                    type == "action" && add();
                }});
            } else {
                new Notify().Render({ content: "是否重新当前站点安装？", action: "安装", cancel: "取消", callback: type => {
                    type == "action" && add();
                }});
            }
        } catch( error ) {
            new Notify().Render( 2, "获取失败，请稍后再试。" );
        }
    }

    update() {
        const url      = decodeURIComponent( location.hash ).replace( "#sites?update=", "" ),
              org_site = JSON.parse( url ),
              type     = org_site.target,
              site     = storage.pr.Cleansite( { ...org_site } );
        site.url       = org_site.url;
        $.ajax({
            url: storage.service + "/sites/service/query",
            method: "POST",
            data:{ type, site }
        }).done( ( result, textStatus, jqXHR ) => {
           console.log( result.site )
           if ( result.code == 200 ) {
                storage.pr.Updatesite( type, org_site.url, [ result.site.url, storage.pr.Cleansite( result.site ) ]);
                storage.Writesite( storage.pr.sites, () => {
                    new Notify().Render( 0, "更新成功，2 秒后自动关闭页面，失效的页面会自动刷新。" );
                    setTimeout( ()=>location.href = location.protocol + location.pathname + "#sites?update=success", 2000 );
                    watch.SendMessage( "site", true );
                });
            } else if ( result.code == 404 ) {
                new Notify().Render( "无任何可用更新，2 秒后页面将会关闭！" );
                setTimeout( ()=>location.href = location.protocol + location.pathname + "#sites?update=pending", 2000 );
            } else {
                new Notify().Render( 2, "暂时无法使用此功能，请稍候再试，2 秒后页面将会关闭！" );
                setTimeout( ()=>location.href = location.protocol + location.pathname + "#sites?update=failed", 2000 );
           }
        }).fail( error => {
            new Notify().Render( 2, "自动更新出现错误，请稍后再试！" );
        });
    }

    pending() {
        const url  = decodeURIComponent( location.hash ).replace( "#sites?pending=", "" ),
              data = JSON.parse( url );
        $.ajax({
            url   : storage.service + "/sites/service/pending",
            method: "POST",
            data,
        }).done( ( result, textStatus, jqXHR ) => {
            new Notify().Render( "提交成功，谢谢对简悦作出的贡献，2 秒后页面将会关闭！" );
            setTimeout( ()=>location.href = location.protocol + location.pathname + "#sites?update=complete", 2000 );
        }).fail( error => {
            new Notify().Render( 2, "自动更新出现错误，请稍后再试！" );
        });
    }

    temp() {
        const url  = decodeURIComponent( location.hash ).replace( "#sites?temp=", "" ),
              data = JSON.parse( url );
        $.ajax({
            url   : storage.service + "/sites/service/pending",
            method: "POST",
            data,
        }).done( ( result, textStatus, jqXHR ) => {
            new Notify().Render( "提交成功，谢谢对简悦作出的贡献，2 秒后页面将会关闭！" );
            setTimeout( ()=>location.href = location.protocol + location.pathname + "#sites?update=complete", 2000 );
        }).fail( error => {
            new Notify().Render( 2, "自动更新出现错误，请稍后再试！" );
        });
    }

    componentWillMount() {
        decodeURIComponent( location.href ).includes( "#sites?install=" ) && this.install();
        decodeURIComponent( location.href ).includes( "#sites?update="  ) && this.update();
        decodeURIComponent( location.href ).includes( "#sites?pending=" ) && this.pending();
        decodeURIComponent( location.href ).includes( "#sites?temp="    ) && this.temp();
    }

    render() {
        return (
            <div id="labs" style={{ width: '100%' }}>
                <div className="version-tips" data-hits="newsites">
                <div className="label" data-head-level="h1" data-head-title="官方主适配源">官方主适配源 <a target="_blank" href="https://simpread.ksria.cn/sites/" style={{ color:' #FF5252', borderBottom: '2px dotted', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>共计 { storage.simpread.sites.length } 类</a></div>
                <div className="lab">
                    <Button type="raised" text="手动同步适配列表" width="100%"
                            icon={ ss.IconPath( "update_icon" ) }
                            color="#fff" backgroundColor="rgb(103, 58, 183)"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.newsites() } />
                </div>
                </div>

                <div className="label" data-head-level="h1">第三方适配源</div>
                <div ref="origins" style={{ 'padding-top': '10px', 'margin-bottom': '8px;' }} className="lab">
                    <div className="version-tips" data-hits="customsites">
                    <TextField 
                        multi={ true } rows={4}
                        placeholder="仅支持 URL 地址，每行一个。" 
                        value={ ( this.props.option.origins||[] ).join( "\n" ) }
                        onChange={ ()=>this.changeOrigins() }
                    />
                    <div style={{ "display": "flex" }}>
                        <Button type="raised" text="加载第三方适配列表"
                            width="100%" style={{ "display": "none", "margin": "0" }}
                            color="#fff" backgroundColor="#4CAF50"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.origins( "origins" ) } />
                        <Button type="raised" text="导入到第三方适配列表"
                            width="100%" style={{ "margin": "0 10px" }}
                            color="#fff" backgroundColor="rgb(103, 58, 183)"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.origins( "import" ) } />
                        <Button type="raised" text="清除第三方适配列表" 
                            width="100%" style={{ "margin": "0" }}
                            color="#fff" backgroundColor="#FF5252"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.origins( "clear" ) } />
                    </div>
                    </div>
                </div>

                <div className="version-tips" data-hits="personsites">
                <div className="label" data-head-level="h1" data-head-title="站点集市">站点集市 <a target="_blank" href="https://simpread.ksria.cn/sites/" style={{ color:' #FF5252', borderBottom: '2px dotted', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>共计 { storage.pr.sites.person.length } 类</a></div>
                <div className="lab">
                    <div style={{ display: 'inline-flex', width: '100%' }}>
                        <Button type="raised" text="打开「站点集市」" width="100%"
                            fontIcon={`<i class="fas fa-external-link-square-alt"></i>`}
                            color="#fff" backgroundColor="rgb(103, 58, 183)"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.addmore() } />
                        <Button type="raised" text="清除「站点集市」的全部站点" width="100%"
                                icon={ ss.IconPath( "clear_icon" ) }
                                color="#fff" backgroundColor="#757575"
                                waves="md-waves-effect md-waves-button"
                                onClick={ ()=>this.clear() } />
                    </div>

                    <div style={{ 'padding-top': '10px' }}>
                        <Cards onChange={ t=>this.onChange(t) } />
                    </div>
                </div>
                </div>

                <div className="version-tips" data-hits="sitemgr">
                <div className="label" data-head-level="h1">站点管理器</div>
                <div style={{ 'padding-top': '10px', 'position': 'relative' }} className="lab" onClick={ ()=>this.onClick('sitemgr') }>
                    <div className="more" style={{ 'cursor': 'pointer' }}>
                        <div>可以管理全部的适配站点</div>
                        <span className="desc">包括：官方适配源、第三方适配源、站点集市适配源、自定义适配源。</span>
                        <span className="arrow"></span>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}