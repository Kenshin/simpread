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
        if ( model == "option" && state == "save_at" ) {
            this.props[model][state] = value ? "dropbox" : "jianguo";
        }
        this.props.onChange && this.props.onChange( true );
        model == "read" && state == "auto" && this.exclusionState( value );
        model == "read" && state == "toc"  && this.tocState( value );
        model == "read" && state == "cleanup" && this.cleanupState( value );
        model == "option" && state == "preload" && this.lazyloadState( value );
    }

    changeExclusion( event ) {
        this.props.read.exclusion = event.target.value.split("\n");
        this.props.onChange && this.props.onChange( false );
    }

    changeWhitelist( event ) {
        this.props.read.whitelist = event.target.value.split("\n");
        this.props.onChange && this.props.onChange( false );
    }

    changeLazyload( event ) {
        this.props.option.lazyload = event.target.value.split("\n");
        this.props.onChange && this.props.onChange( false );
    }

    tocState( value ) {
        $( this.refs.toc ).velocity( value ? "slideDown" : "slideUp" );
    }

    cleanupState( value ) {
        $( this.refs.cleanup ).velocity( value ? "slideDown" : "slideUp" );
    }

    lazyloadState( value ) {
        $( this.refs.lazyload ).velocity( value ? "slideDown" : "slideUp" );
    }

    exclusionState( value ) {
        $( this.refs.exclusion  ).velocity( value ? "slideDown" : "slideUp" );
        $( this.refs.whitelist ).velocity( !value ? "slideDown" : "slideUp" );
    }

    blacklist( event ) {
        this.props.option.blacklist = event.target.value.split("\n");
        this.props.onChange && this.props.onChange( false );
    }

    componentDidMount() {
        this.exclusionState( this.props.read.auto );
        this.tocState( this.props.read.toc );
        this.cleanupState( this.props.read.cleanup == undefined ? true : this.props.read.cleanup );
        this.lazyloadState( this.props.option.preload );
    }

    onClick( state ) {
        state == "custom"  && ( location.href = location.origin + "/options/custom.html" );
        state == "notice"  && ( location.href = location.origin + "/options/notice.html?is_update=" + sessionStorage.getItem( "is_update" ));
    }

    render() {
        return (
            <div id="labs" style={{ width: '100%' }}>
                <div className="label">全局</div>
                <div className="lab">
                    <div className="version-tips" data-hits="esc">
                    <Switch width="100%" checked={ this.props.option.esc }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否启用 「ESC」 退出方式？"
                            desc="包括：聚焦模式与阅读模式"
                            onChange={ (s)=>this.onChange(s, "option", "esc") } />
                    </div>
                    <div className="version-tips" data-hits="br_exit">
                    <Switch width="100%" checked={ this.props.option.br_exit }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="动作栏图标是否改为 「进入/退出 」模式？"
                            desc="包括：聚焦模式和阅读模式，默认（关闭）为「弹出设定对话框」"
                            onChange={ (s)=>this.onChange(s, "option", "br_exit") } />
                    </div>
                    <div className="version-tips" data-hits="blacklist">
                    <div style={{ 'padding-top': '10px', 'margin-bottom': '8px;' }}>
                        <div className="label" style={{'margin-bottom':' -15px'}}>黑名单</div>
                        <div className="sublabel">加入其中后，不再启动简悦，有别于白名单和排除列表，黑名单则彻底不加载。</div>
                        <TextField 
                            multi={ true } rows={8}
                            placeholder="每行一个，支持： URL， hostname 等。" 
                            value={ ( this.props.option.blacklist||[] ).join( "\n" ) }
                            onChange={ (e)=>this.blacklist(e) }
                        />
                    </div>
                    </div>
                    <div className="version-tips" data-hits="secret">
                    <Switch width="100%" checked={ this.props.option.secret }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="同步时是否包含授权服务中的授权码？"
                            desc="包括：导出配置文件到本地，默认（关闭）为不同步；启用后，请妥善保管你的授权码"
                            onChange={ (s)=>this.onChange(s, "option", "secret") } />
                    </div>
                    <div className="version-tips" data-version="1.1.3" data-hits="save_at">
                    <Switch width="100%" checked={ this.props.option.save_at == "dropbox" ? true : false }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="保存配置到 Dropbox ？"
                            desc="注意：默认（已勾选状态）保存到 Dropbox ；选否后（非勾选状态）保存到 【坚果云】。"
                            onChange={ (s)=>this.onChange(s, "option", "save_at") } />
                    </div>
                    <Switch width="100%" checked={ this.props.option.uninstall ? true : false }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="删除后是否给我反馈？"
                            desc="建议开启此选项，简悦不会知道你是谁，但你可以帮助简悦变得更好。"
                            onChange={ (s)=>this.onChange(s, "option", "uninstall") } />
                </div>

                <div className="version-tips" data-hits="menu">
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
                    <Switch width="100%" checked={ this.props.option.menu.whitelist }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示「加入白名单」？"
                            onChange={ (s)=>this.onChange(s, "option", "menu", "whitelist" ) } />
                    <Switch width="100%" checked={ this.props.option.menu.exclusion }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示「加入到排除列表」？"
                            onChange={ (s)=>this.onChange(s, "option", "menu", "exclusion" ) } />
                    <Switch width="100%" checked={ this.props.option.menu.blacklist }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示「加入到黑名单」？"
                            onChange={ (s)=>this.onChange(s, "option", "menu", "blacklist" ) } />
                    <Switch width="100%" checked={ this.props.option.menu.unrdist }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示「加入到稍后读」？"
                            onChange={ (s)=>this.onChange(s, "option", "menu", "unrdist" ) } />
                </div>
                </div>

                <div className="version-tips" data-hits="focusconfig">
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
                </div>

                <div className="version-tips" data-hits="readconfig">
                <div className="label">阅读模式</div>
                <div style={{ 'padding-top': '10px' }} className="lab">
                    <div className="version-tips" data-hits="progress">
                    <Switch width="100%" checked={ this.props.read.progress }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示阅读进度？"
                            onChange={ (s)=>this.onChange(s, "read", "progress") } />
                    </div>
                    <div className="version-tips" data-hits="readcontrolbar">
                    <Switch width="100%" checked={ this.props.read.controlbar }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否一直显示右下角的控制栏？"
                            desc="关闭意味着「鼠标移上时才显示」"
                            onChange={ (s)=>this.onChange(s, "read", "controlbar") } />
                    </div>
                    <div className="version-tips" data-hits="fap">
                    <Switch width="100%" checked={ this.props.read.fap }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否启用高级控制栏面板？"
                            desc="关闭意味着「使用浮动控制栏」"
                            onChange={ (s)=>this.onChange(s, "read", "fap") } />
                    </div>
                    <div className="version-tips" data-hits="highlight">
                    <Switch width="100%" checked={ this.props.read.highlight }
                            thumbedColor="#3F51B5" trackedColor="#7986CB"
                            label="手动框选时是否启动二次确认模式？"
                            desc="二次确认模式能精准的定位需要阅读模式的内容。"
                            onChange={ (s)=>this.onChange(s, "read", "highlight") } />
                    </div>
                    <div className="version-tips" data-hits="toc">
                    <Switch width="100%" checked={ this.props.read.toc }
                            thumbedColor="#3F51B5" trackedColor="#7986CB"
                            label="是否自动生成大纲（目录）？"
                            desc="只整理 h1, h2, h3, h4 的内容为大纲"
                            onChange={ (s)=>this.onChange(s, "read", "toc") } />
                    <div ref="toc">
                        <Switch width="100%" checked={ this.props.read.toc_hide }
                                thumbedColor="#3F51B5" trackedColor="#7986CB"
                                label="大纲（目录）是否开启「鼠标移动到左上角」自动显示？"
                                desc="关闭意味着「一直显示」"
                                onChange={ (s)=>this.onChange(s, "read", "toc_hide") } />
                    </div>
                    </div>
                    <div className="version-tips" data-hits="readauto">
                    <Switch width="100%" checked={ this.props.read.auto }
                            thumbedColor="#3F51B5" trackedColor="#7986CB"
                            desc="注意：此功能只包含已适配的站点，智能识别出正文的站点无法使用此功能，但仍可通过手动方式进入阅读模式。"
                            label="如果当前页面为适配站点，是否自动进入阅读模式？"
                            onChange={ (s)=>this.onChange(s, "read", "auto") } />

                    </div>
                    <div className="version-tips" data-hits="exclusion">
                    <div ref="exclusion" style={{ 'padding-top': '10px', 'margin-bottom': '8px;' }}>
                        <div className="label" style={{'margin-bottom':' -15px'}}>排除列表</div>
                        <div className="sublabel">加入其中后将不会自动进入阅读模式，仅当启用「自动进入阅读模式」有效。</div>
                        <TextField 
                            multi={ true } rows={8}
                            placeholder="每行一个，支持： URL, minimatch 等。" 
                            value={ ( this.props.read.exclusion||[] ).join( "\n" ) }
                            onChange={ (e)=>this.changeExclusion(e) }
                        />
                    </div>

                    <div ref="whitelist" style={{ 'padding-top': '10px', 'margin-bottom': '8px;' }}>
                        <div className="label" style={{'margin-bottom':' -15px'}}>白名单</div>
                        <div className="sublabel">加入其中后将自动进入阅读模式，仅当禁用「自动进入阅读模式」有效。</div>
                        <TextField 
                            multi={ true } rows={8}
                            placeholder="每行一个，支持： URL, minimatch 等。" 
                            value={ ( this.props.read.whitelist||[] ).join( "\n" ) }
                            onChange={ (e)=>this.changeWhitelist(e) }
                        />
                    </div>
                    </div>
                </div>
                </div>

                <div className="version-tips" data-hits="pured">
                <div className="label">词法分析引擎 <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎" style={{ color:' #FF5252', borderBottom: '2px dotted', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>测试版</a></div>
                <div style={{ 'padding-top': '10px', 'position': 'relative' }} className="lab">
                    <Switch width="100%" checked={ this.props.read.cleanup == undefined ? true : this.props.read.cleanup }
                                thumbedColor="#3F51B5" trackedColor="#7986CB"
                                label="是否启用增强解析模式？"
                                desc="增强解析模式会对版面重新设计，包括：去除多余空格、优化版面结构等，此功能为测试版，遇到解析失败时，请关闭此功能。"
                                onChange={ (s)=>this.onChange(s, "read", "cleanup") } />
                    <div className="version-tips" data-hits="puredpure">
                    <div ref="cleanup" style={{ 'padding-top': '10px', 'margin-bottom': '8px;' }}>
                        <Switch width="100%" checked={ this.props.read.pure }
                                thumbedColor="#3F51B5" trackedColor="#7986CB"
                                label="纯粹模式"
                                desc="比【增强解析模式】还要彻底优化版本，包括：字形、颜色、字号、代码段等，专治页面及不规范，如：微信订阅号，CSDN 等。"
                                onChange={ (s)=>this.onChange(s, "read", "pure") } />
                        <div className="sublabel">如果经常阅读代码的话，请安装 <a target="_blank" href="https://simpread.ksria.cn/plugins/details/klGUASLasg">代码段增强</a> 包括：高亮，去重，支持 CSDN 等特殊情况的代码段</div>
                    </div>
                    </div>
                    <div className="version-tips" data-version="1.1.3" data-hits="preload">
                    <Switch width="100%" checked={ this.props.option.preload }
                            thumbedColor="#3F51B5" trackedColor="#7986CB"
                            label="是否启用预加载机制？"
                            desc="1. 简悦的词法分析引擎采用了预加载机制，如果你觉得影响性能的话，请关闭此功能。"
                            onChange={ (s)=>this.onChange(s, "option", "preload") } />
                    <div className="sublabel">2. 关闭此功能后，只有进入阅读模式时才会对页面进行解析，所以经常使用简悦的用户请勿关闭它。</div>
                    <div className="sublabel">3. 此功能的优先级比「自动进入阅读模式」高；当关闭此功能时，自动进入阅读模式将不会工作。</div>
                    </div>
                    <div className="version-tips" data-version="1.1.3" data-hits="lazyload">
                    <div ref="lazyload" style={{ 'padding-top': '10px', 'margin-bottom': '8px;' }}>
                        <div className="label" style={{'margin-bottom':' -15px'}}>延迟加载列表</div>
                        <div className="sublabel">加入其中后的网址将不会启用预加载功能。</div>
                        <div className="sublabel">此功能适合「经常使用简悦但又性能不够」的用户、需要动态加载及支持 Mathjax 解析的页面等。</div>
                        <TextField 
                            multi={ true } rows={8}
                            placeholder="每行一个，支持： URL, minimatch 等。" 
                            value={ ( this.props.option.lazyload||[] ).join( "\n" ) }
                            onChange={ (e)=>this.changeLazyload(e) }
                        />
                    </div>
                    </div>
                </div>
                </div>

                <div className="version-tips" data-hits="auth">
                <div className="label">授权管理</div>
                <div style={{ 'padding-top': '10px' }} className="lab">
                    <Auth/>
                </div>
                </div>

                <div className="version-tips" data-hits="custom">
                <div className="label">自定义样式</div>
                <div style={{ 'padding-top': '10px', 'position': 'relative' }} className="lab" onClick={ ()=>this.onClick('custom') }>
                    <div className="more" style={{ 'cursor': 'pointer' }}>
                        <div>增强「中文阅读体验」设置</div>
                        <span className="desc">包括：标题、描述、正文的字间距、行间距、首行缩进等及自定义 CSS。</span>
                        <span className="arrow"></span>
                    </div>
                </div>
                </div>

                <div className="version-tips" data-version="1.1.3" data-hits="notice">
                <div className="label">消息中心</div>
                <div style={{ 'padding-top': '10px', 'position': 'relative' }} className="lab">
                    <Switch width="100%" checked={ this.props.option.notice }
                        thumbedColor="#3F51B5" trackedColor="#7986CB"
                        label="当没有未读信息时，是否显示右下角提示框？"
                        desc="关闭后，当没有新的未读信息时，隐藏未读提示；当有新的消息时，仍会在右下角显示未读提示。"
                        onChange={ (s)=>this.onChange(s, "option", "notice") } />
                </div>
                <div style={{ 'padding-top': '10px', 'position': 'relative' }} className="lab" onClick={ ()=>this.onClick('notice') }>
                    <div className="more" style={{ 'cursor': 'pointer' }}>
                        <div>查看全部消息</div>
                        <span className="desc">简悦会不定期发送一些消息，包括：新的插件上线、新的适配站点上线、修复 Bug 等</span>
                        <span className="arrow"></span>
                    </div>
                </div>
                </div>

            </div>
        )
    }
}