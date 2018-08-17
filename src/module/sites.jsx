console.log( "===== simpread option sites load =====" )

import {storage} from 'storage';
import {browser} from 'browser';
import * as msg  from 'message';
import * as watch from 'watch';

import TextField from 'textfield';
import Button    from 'button';

class Card extends React.Component {

    static defaultProps = {
        info         : {},
    };

    static propTypes = {
        info         : React.PropTypes.object,
    };

    update() {
        
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
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url: "http://simpread.ksria.cn/sites/details/" + this.props.info.domain }));
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
        const card = this.state.sites.length > 0 ? this.state.sites.map( item => {
            return (
                <Card url={ item[0] } info={ item[1].info } onChange={t=>this.onChange(t)} />
            )
        }) : <card-empty><a href="http://simpread.ksria.cn/sites" target="_blank">没有任何站点，点击打开「站点集市」添加。</a></card-empty>;
        return (
            <cards>{ card }</cards>
        )
    }
}

export default class SitesOpts extends React.Component {

    onClick( state ) {
        state == "sitemgr" && ( location.href = location.origin + "/options/sitemgr.html" );
    }

    changeOrigins() {
        this.props.option.origins = event.target.value.split("\n");
        storage.pr.origins        = this.props.option.origins;
        this.props.onChange && this.props.onChange( false );
    }

    origins( type ) {
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
        } else if ( type == "import" ) {
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

    render() {
        return (
            <div id="labs" style={{ width: '100%' }}>
                <div className="label">第三方适配源</div>
                <div ref="origins" style={{ 'padding-top': '10px', 'margin-bottom': '8px;' }} className="lab">
                    <TextField 
                        multi={ true } rows={8}
                        placeholder="仅支持 URL 地址，每行一个。" 
                        value={ ( this.props.option.origins||[] ).join( "\n" ) }
                        onChange={ ()=>this.changeOrigins() }
                    />
                    <div style={{ "display": "flex" }}>
                        <Button type="raised" text="加载第三方适配列表"
                            width="100%" style={{ "margin": "0" }}
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
                    <div style={{ 'padding-top': '10px', 'position': 'relative' }} onClick={ ()=>this.onClick('sitemgr') }>
                        <div className="more">
                            <div>站点管理器</div>
                            <span className="desc">可以编辑全部的适配站点，包括：官方适配源、站点集市适配源、第三方适配源、本地适配源。</span>
                            <span className="arrow" style={{ 'bottom': '13px' }}></span>
                        </div>
                    </div>
                </div>

                <div className="label">站点集市</div>
                <div style={{ 'padding-top': '10px' }} className="lab">
                    <Cards onChange={ t=>this.onChange(t) } />
                </div>
            </div>
        )
    }
}