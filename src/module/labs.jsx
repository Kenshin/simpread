console.log( "===== simpread option labs load =====" )

import {browser} from 'browser';
import * as menu from 'menu';
import {storage} from 'storage';

import Switch    from 'switch';
import TextField from 'textfield';
import Button    from 'button';

import Auth      from 'authorize';

export default class LabsOpt extends React.Component {

    static defaultProps = {
        option : {},
        read   : {},
        focus  : {},
    }

    static propTypes = {
        option : React.PropTypes.object,
        read   : React.PropTypes.object,
        focus  : React.PropTypes.object,
        onChange : React.PropTypes.func,
    }

    onChange( value, model, state, child ) {
        !child && ( this.props[model][state]=value );
        child  && ( this.props[model][state][child]=value );
        child  && menu.Refresh( this.props[model][state] );
        this.props.onChange && this.props.onChange( true );
        model == "read" && state == "auto" && this.exclusionState( value );
        model == "read" && state == "toc"  && this.tocState( value );
    }

    changeExclusion() {
        this.props.read.exclusion = event.target.value.split("\n");
        this.props.onChange && this.props.onChange( false );
    }

    changeWhitelist() {
        this.props.read.whitelist = event.target.value.split("\n");
        this.props.onChange && this.props.onChange( false );
    }

    tocState( value ) {
        $( this.refs.toc ).velocity( value ? "slideDown" : "slideUp" );
    }

    exclusionState( value ) {
        $( this.refs.exclusion  ).velocity( value ? "slideDown" : "slideUp" );
        $( this.refs.whitelist ).velocity( !value ? "slideDown" : "slideUp" );
    }

    componentDidMount() {
        this.exclusionState( this.props.read.auto );
        this.tocState( this.props.read.toc );
    }

    onClick( state ) {
        state == "custom"  && ( location.href = location.origin + "/options/custom.html" );
        state == "sitemgr" && ( location.href = location.origin + "/options/sitemgr.html" );
    }

    changeOrigins() {
        this.props.option.origins = event.target.value.split("\n");
        storage.pr.origins        = this.props.option.origins;
        this.props.onChange && this.props.onChange( false );
    }

    origins( type ) {
        if ( type == "origins" ) {
            //storage.GetOrigins( ( result, error ) => {
            storage.GetRemote( "origins", ( result, error ) => {
                if ( error ) new Notify().Render( 2, "获取失败，请稍后重新加载。" );
                else {
                    /*
                    const urls = new Set( this.props.option.origins.concat( result ) );
                    urls.forEach( item => {
                        if ( item.trim() == "" || !item.trim().startsWith( "http" ) || !item.trim().endsWith( ".json" ) ) urls.delete( item );
                    });
                    this.props.option.origins = [ ...urls ];
                    */
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
                    //storage.LoadOrigin( item, ( result, error ) => {
                    storage.GetRemote( item, ( result, error ) => {
                        idx++;
                        if ( result && result.sites.length > 0 ) {
                            count++;
                            arr = arr.concat( storage.pr.Formatsite( result ) );
                        } else new Notify().Render( `导入失败 ${ item }` );
                        /*
                        !error && count++;
                        !error && ( arr = arr.concat( result.sites ));
                        error  && new Notify().Render( `导入失败 ${ result.url }` );
                        /*/
                        if ( idx == max ) {
                            //arr.length > 0 && storage.AddOrigins( arr );
                            arr.length > 0 && ( storage.websites.custom = storage.pr.AddOrigins( arr ) );
                            console.log( "current storage websites.custom is ", arr );
                            new Notify().Render( `已完成导入，本次共计：${ count } 个站点， ${ arr.length } 条数据。` );
                            this.props.onChange && this.props.onChange( false );
                        }
                    });
                });
            });
        } else if ( type == "clear" ) {
            new Notify().Render( "snackbar", "只能清除第三方源的适配站点，请问是否清除？", "确认", () => {
                //new Notify().Render( `已完成清除，共计：${ storage.ClearOrigins() } 条数据。` );
                new Notify().Render( `已完成清除，共计：${ storage.pr.ClearOrigins() } 条数据。` );
                storage.websites.custom = storage.pr.sites.custom;
                this.props.onChange && this.props.onChange( false );
            });
        }
    }

    render() {
        return (
            <div id="labs" style={{ width: '100%' }}>
                <div className="label">全局</div>
                <div className="lab">
                    <Switch width="100%" checked={ this.props.option.esc }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否启用 「ESC」 退出方式？"
                            desc="包括：聚焦模式与阅读模式"
                            onChange={ (s)=>this.onChange(s, "option", "esc") } />
                    <Switch width="100%" checked={ this.props.option.br_exit }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="动作栏图标是否改为 「进入/退出 」模式？"
                            desc="包括：聚焦模式和阅读模式，默认（关闭）为「弹出设定对话框」"
                            onChange={ (s)=>this.onChange(s, "option", "br_exit") } />
                    <Switch width="100%" checked={ this.props.option.secret }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="同步时是否包含授权服务中的授权码？"
                            desc="包括：导出配置文件到本地，默认（关闭）为不同步；启用后，请妥善保管你的授权码"
                            onChange={ (s)=>this.onChange(s, "option", "secret") } />
                </div>

                <div className="label">右键菜单</div>
                <div style={{ 'padding-top': '10px' }} className="lab">
                    <Switch width="100%" checked={ this.props.option.menu.focus }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示「聚焦模式」？"
                            onChange={ (s)=>this.onChange(s, "option", "menu", "focus" ) } />
                    <Switch width="100%" checked={ this.props.option.menu.read }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示「阅读模式」？"
                            onChange={ (s)=>this.onChange(s, "option", "menu", "read" ) } />
                    <Switch width="100%" checked={ this.props.option.menu.link }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示「使用阅读模式打开此链接」？"
                            onChange={ (s)=>this.onChange(s, "option", "menu", "link" ) } />
                    <Switch width="100%" checked={ this.props.option.menu.list }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示「打开稍后读」？"
                            onChange={ (s)=>this.onChange(s, "option", "menu", "list" ) } />
                </div>

                <div className="label">聚焦模式</div>
                <div style={{ 'padding-top': '10px' }} className="lab">
                    <Switch width="100%" checked={ this.props.focus.mask }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否启用点击空白（遮罩）退出功能？"
                            onChange={ (s)=>this.onChange(s, "focus", "mask") } />
                    <Switch width="100%" checked={ this.props.focus.controlbar }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否一直显示右下角的控制栏？"
                            desc="关闭意味着「鼠标移上时才显示」"
                            onChange={ (s)=>this.onChange(s, "focus", "controlbar") } />
                    <Switch width="100%" checked={ this.props.focus.highlight }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否启用手动聚焦模式？"
                            desc="关闭意味着使用「自动聚焦模式」"
                            onChange={ (s)=>this.onChange(s, "focus", "highlight") } />
                </div>

                <div className="label">阅读模式</div>
                <div style={{ 'padding-top': '10px' }} className="lab">
                    <Switch width="100%" checked={ this.props.read.progress }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示阅读进度？"
                            onChange={ (s)=>this.onChange(s, "read", "progress") } />
                    <Switch width="100%" checked={ this.props.read.controlbar }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否一直显示右下角的控制栏？"
                            desc="关闭意味着「鼠标移上时才显示」"
                            onChange={ (s)=>this.onChange(s, "read", "controlbar") } />
                    <Switch width="100%" checked={ this.props.read.highlight }
                            thumbedColor="#3F51B5" trackedColor="#7986CB"
                            label="是否启动临时阅读模式？"
                            desc="当页面未适配阅读模式时，才能使用此功能"
                            onChange={ (s)=>this.onChange(s, "read", "highlight") } />
                    <Switch width="100%" checked={ this.props.read.toc }
                            thumbedColor="#3F51B5" trackedColor="#7986CB"
                            label="是否自动生成大纲（目录）？"
                            desc="只整理 h1, h2, h3, h4 的内容为大纲"
                            onChange={ (s)=>this.onChange(s, "read", "toc") } />
                    <div ref="toc">
                        <Switch width="100%" checked={ this.props.read.toc_hide }
                                thumbedColor="#3F51B5" trackedColor="#7986CB"
                                label="大纲（目录）是否开启「鼠标移动到右上角」自动显示？"
                                desc="关闭意味着「一直显示」"
                                onChange={ (s)=>this.onChange(s, "read", "toc_hide") } />
                    </div>
                    <Switch width="100%" checked={ this.props.read.auto }
                            thumbedColor="#3F51B5" trackedColor="#7986CB"
                            desc="白名单与黑名单功能互斥，当启用「自动进入阅读模式」，白名单即失效。"
                            label="如果当前页面适配阅读模式，是否自动进入阅读模式？"
                            onChange={ (s)=>this.onChange(s, "read", "auto") } />

                    <div ref="exclusion" style={{ 'padding-top': '10px', 'margin-bottom': '8px;' }}>
                        <div className="label">排除列表（黑名单）</div>
                        <TextField 
                            multi={ true } rows={8}
                            placeholder="每行一个，支持： URL, minimatch 等。" 
                            value={ ( this.props.read.exclusion||[] ).join( "\n" ) }
                            onChange={ ()=>this.changeExclusion() }
                        />
                    </div>

                    <div ref="whitelist" style={{ 'padding-top': '10px', 'margin-bottom': '8px;' }}>
                        <div className="label">白名单</div>
                        <TextField 
                            multi={ true } rows={8}
                            placeholder="每行一个，支持： URL, minimatch 等。" 
                            value={ ( this.props.read.whitelist||[] ).join( "\n" ) }
                            onChange={ ()=>this.changeWhitelist() }
                        />
                    </div>
                </div>

                <div className="label">授权管理</div>
                <div style={{ 'padding-top': '10px' }} className="lab">
                    <Auth/>
                </div>

                <div className="label">自定义样式</div>
                <div style={{ 'padding-top': '10px', 'position': 'relative' }} className="lab" onClick={ ()=>this.onClick('custom') }>
                    <div className="more">
                        <div>增强「中文阅读体验」设置</div>
                        <span className="desc">包括：标题、描述、正文的字间距、行间距、首行缩进等及自定义 CSS。</span>
                        <span className="arrow"></span>
                    </div>
                </div>

                <div className="label">站点适配器</div>
                <div ref="origins" style={{ 'padding-top': '10px', 'margin-bottom': '8px;' }} className="lab">
                    <div className="label">站点适配源</div>
                    <TextField 
                        multi={ true } rows={8}
                        placeholder="仅支持 URL 地址，每行一个。" 
                        value={ ( this.props.option.origins||[] ).join( "\n" ) }
                        onChange={ ()=>this.changeOrigins() }
                    />
                    <div style={{ "display": "flex" }}>
                        <Button type="raised" text="加载官方适配列表"
                            width="100%" style={{ "margin": "0" }}
                            color="#fff" backgroundColor="#4CAF50"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.origins( "origins" ) } />
                        <Button type="raised" text="导入到适配列表"
                            width="100%" style={{ "margin": "0 10px" }}
                            color="#fff" backgroundColor="#3F51B5"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.origins( "import" ) } />
                        <Button type="raised" text="清除适配列表" 
                            width="100%" style={{ "margin": "0" }}
                            color="#fff" backgroundColor="#FF5252"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.origins( "clear" ) } />
                    </div>
                    <div style={{ 'padding-top': '10px', 'position': 'relative' }} onClick={ ()=>this.onClick('sitemgr') }>
                        <div className="more">
                            <div>适配站点编辑器</div>
                            <span className="desc">可以编辑全部的自定义适配站点。</span>
                            <span className="arrow" style={{ 'bottom': '13px' }}></span>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}