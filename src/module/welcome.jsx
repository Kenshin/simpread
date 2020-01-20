console.log( "===== simpread option welcome page load =====" )

import 'carous_css';
import 'carousel';

import Button   from 'button';

import * as ss  from 'stylesheet';
import {br}     from 'browser';
import * as msg from 'message';

const welcbgcls   = "welcome",
      welcbgclsjq = `.${welcbgcls}`,
      welcbg      = `<div class="${ welcbgcls }"></div>`;
let   curidx, max = [ 0, 0 ];

const style = {

    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        position: 'relative',

        minWidth: '400px',
        minHeight: '400px',

        width: '650px',
        height: '600px',

        backgroundColor: '#fff',

        borderRadius: '3px',
        boxShadow: 'rgba(0, 0, 0, .247059) 0px 14px 45px',

        userSelect: 'none',
    },

    section: {
        textAlign: 'center',
    },

    h2: {
        marginBottom: 0,

        color: 'inherit',

        fontSize: '24px',
        fontWeight: 'bold',

        lineHeight: '32px',
        textAlign: 'center',
    },

    desc: {
        padding: '5px',

        color: 'rgba(51, 51, 51, 0.7)',

        fontSize: '15px',
        fontWeight: 400,

        lineHeight: '32px',
        textAlign: 'center',
    },

    img: {
        width: '100%',
        marginTop: '-82px',
    },

    gif : {
        paddingTop: '58px',
        width: '550px',
    },

    strong: {
        fontWeight: 'normal',
        color: '#3f51b5',
    },

    footer: {
        display: 'flex',
        flexDirection: 'row',

        marginBottom: '24px',
    },

    close: {
        position: 'absolute',

        top: 0,
        right: 0,
    },

}

class Welcome extends React.Component {

    state = {
        style: { display: "none" },
        state: "next_icon",
    }

    prevClick() {
        $( '.carousel.carousel-slider' ).carousel( "prev" );
    }

    nextClick() {
        if ( curidx != max ) {
            $( '.carousel.carousel-slider' ).carousel( "next" );
        } else this.closeClick();
    }

    closeClick() {
        window.dispatchEvent( new CustomEvent( msg.MESSAGE_ACTION.welcome_close, { detail: { first: this.props.first, version: this.props.version }}));
        exit();
    }

    carousel() {
        $( ".carousel-item" ).map( ( _, item ) => {
            const $item = $(item),
                  version = $item.attr( "id" );
            version != "end" && version != "start" && version != this.props.version && $item.remove();
        });
    }

    componentDidMount() {
        !this.props.first && this.carousel();
        max = $( ".carousel-item" ).length - 1;
        $( '.carousel.carousel-slider' ).carousel({
            fullWidth: true,
            onCycleTo: idx => {
                curidx = idx;
                if ( curidx == max ) {
                    this.setState({
                        style: { display: "block" },
                        state: "right_icon",
                    });
                } else if ( curidx == 0 ) {
                    this.setState({
                        style: { display: "none" },
                        state: "next_icon",
                    });
                } else {
                    this.state.style.display != "block" && this.setState({ style: { display: "block" } });
                    this.state.state != "next_icon"     && this.setState({ state: "next_icon" });
                }
            }
        });
    }

    componentWillUnmount() {
        $( welcbgclsjq ).remove();
    }

    render() {
        const { first, version } = this.props;
        return (
            <welcome style={ style.root }>
                <div className="carousel carousel-slider" data-indicators="true">

                    <div className="carousel-item chrome" id="start">
                        <section style={ style.section }>
                        <img src={ ss.IconPath( "welcome" )} style={ style.img }/>
                            <h2 style={{ ...style.h2, ...{ 'margin-bottom': 0 } }}>{ this.props.first ? "欢迎使用 简悦": "简悦 已升至最新版" }</h2>
                            <div style={ style.desc }>
                                { br.isFirefox() ? "Chrome 好评率超过 99% 的阅读模式现已来到 Firefox" : "让你瞬间进入沉浸式阅读的 Chrome 扩展，类似 Safari 的阅读模式" }<br/>
                                去掉干扰元素，提升阅读体验，<strong style={ style.strong }>「简」</strong>单阅读，愉<strong style={ style.strong }>「悦」</strong>心情<br/>
                                为了达到 <strong style={ style.strong }>「完美」</strong> 的阅读模式，简悦适配了 <strong style={ style.strong }><a target="_blank" href="https://simpread.ksria.cn/sites/">数百种类型</a></strong> 的网站
                            </div>
                        </section>
                    </div>

                    { first &&
                        <div className="carousel-item">
                            <section style={ style.section }>
                                <img src={ ss.IconPath( "welcome-mode" )} style={ style.img }/>
                                <h2 style={ style.h2 }>阅读模式 与 聚焦模式</h2>
                                <div style={ style.desc }>
                                    阅读模式 → <strong>独有功能</strong>，自动提取适配页面的标题、描述、正文、媒体等资源<br/>
                                    支持 <a target="_blank" href="http://ksria.com/simpread/docs/#/手动框选">手动框选</a> · <a target="_blank" href="http://ksria.com/simpread/docs/#/主动适配阅读模式">主动适配模式</a> · <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎">智能适配模式</a>
                                    · <a target="_blank" href="http://ksria.com/simpread/docs/#/论坛类页面及分页">论坛类页面 / 分页</a><br/>
                                    <a target="_blank" href="http://ksria.com/simpread/docs/#/聚焦模式">聚焦模式</a> → 高亮鼠标所在的文章段落，不改变当前页面的结构<br/>
                                </div>
                            </section>
                        </div> }

                    { (( !first && version == "1.1.1" ) || version == "all" ) && 
                        <div className="carousel-item" id="1.1.1">
                            <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-adapter.png" style={ style.img }/>
                                <h2 style={ style.h2 }>更智能的正文提取功能</h2>
                                <div style={ style.desc }>
                                    全新的 <b>词法分析引擎</b><sup>2.0</sup>，简悦可以识别出 <a target="_blank" href="http://ksria.com/simpread/docs/#/TXT-阅读器">TXT</a> · <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎?id=markdown-识别">Markdown</a> · <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎?id=latex-识别">LaTeX</a> · <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎?id=代码段的高亮">代码段</a><br/>
                                    Wordpress · Hexo · Ghost · Discuz 等博客 / 论坛的页面了！<br/>
                                    甚至，只要是结构良好的页面，（无需适配）自动生成阅读模式，详细 <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎">请看这里</a>
                                </div>
                            </section>
                        </div> }

                    { first &&
                        <div className="carousel-item" id="1.0.3">
                            <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-service-v2.png?201806111215" style={ style.img }/>
                                <h2 style={ style.h2 }>连接你的生产力工具</h2>
                                <div style={ style.desc }>
                                    支持下载 HTML · PDF · Markdown · PNG · <a target="_blank" href="http://ksria.com/simpread/docs/#/发送到-Epub">Epub</a> 到本地 以及 发送到 <a target="_blank" href="http://ksria.com/simpread/docs/#/发送到-Kindle">Kindle</a><br/>
                                    支持输出到 坚果云 · 有道云笔记 · 为知笔记 · 语雀 · 印象笔记 · Dropbox · Onenote · Notion 等<br/>
                                    发送页面链接到 <a target="_blank" href="http://ksria.com/simpread/docs/#/稍后读">稍后读</a> · Pocket · Instapaper · Linnk，详细 <a target="_blank" href="http://ksria.com/simpread/docs/#/导出到生产力工具">请看这里</a>
                                </div>
                            </section>
                        </div> }

                    { first &&
                        <div className="carousel-item" id="1.1.0">
                            <section style={ style.section }>
                                <img src={ ss.IconPath( "welcome-custom" )} style={ style.img }/>
                                <h2 style={ style.h2 }>站点编辑器 · 站点适配源 · 站点管理器</h2>
                                <div style={ style.desc }>
                                    页面上任意元素均可隐藏，更支持编程，详细请看 <a href="http://ksria.com/simpread/docs/#/站点编辑器" target="_blank">站点编辑器</a><br/>
                                    更灵活、社区化的多种 <a href="http://ksria.com/simpread/docs/#/站点适配源" target="_blank">站点适配源</a><br/>
                                    内置了 <a href="http://ksria.com/simpread/docs/#/站点管理器" target="_blank">站点管理器</a>，方便管理全部的适配站点
                                </div>
                            </section>
                        </div> }

                    { !first && version == "1.1.1" && 
                        <div className="carousel-item" id="1.1.1">
                            <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-fap.png" style={ style.img }/>
                                <h2 style={ style.h2 }>全新的控制栏面板</h2>
                                <div style={ style.desc }>
                                    「告别」传统、单一的控制栏，全部功能「一览无余」<br/>
                                    主题、字体样式、大小、版面布局更改一键完成<br/>
                                </div>
                            </section>
                        </div> }

                    { (( !first && version == "1.1.2" ) || version == "all" ) && 
                        <div className="carousel-item" id="1.1.2">
                            <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-plugins.png" style={ style.img }/>
                                <h2 style={ style.h2 }>插件系统</h2>
                                <div style={ style.desc }>
                                    <a target="_blank" href="https://simpread.ksria.cn/plugins/details/kw36BtjGu0">字数统计</a> · <a target="_blank" href="https://simpread.ksria.cn/plugins/details/klGUASLasg">代码段增强</a> · <a target="_blank" href="https://simpread.ksria.cn/plugins/details/VQOZdNET2d">点击查看大图（Lightbox）</a> · <a target="_blank" href="https://simpread.ksria.cn/plugins/details/ohnTKVHz4a">划词翻译</a> 一个不能少 <br/>
                                    使用 JavaScript 编写基于简悦的插件，详细说明请看 <a target="_blank" href="http://ksria.com/simpread/docs/#/插件系统">说明文档</a><br/>
                                    现在就安装适合你的插件吧 → <a target="_blank" href="https://simpread.ksria.cn/plugins/">插件中心</a>
                                </div>
                            </section>
                        </div> }

                    { (( !first && version == "1.1.2" ) || version == "all" ) && 
                        <div className="carousel-item" id="1.1.2">
                            <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-sites.png" style={ style.img }/>
                                <h2 style={ style.h2 }>站点集市</h2>
                                <div style={ style.desc }>
                                    方便提交，让你的站点为数以万计的简悦用户使用<br/>
                                    官方主适配源、第三方适配源、站点集市适配源、自定义适配源一站式浏览<br/>
                                    现在就访问 <a target="_blank" href="https://simpread.ksria.cn/sites/">站点集市</a> 吧，看看有什么增加的新适配站点
                                </div>
                            </section>
                        </div> }

                    { !first &&
                            <div className="carousel-item" id="5005">
                                <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-puread-ii.png" style={ style.img }/>
                                    <h2 style={ style.h2 }>词法分析引擎 2.0</h2>
                                    <div style={ style.desc }>
                                        更加智能，更加专业，Markdown / LaTeX / 代码段 均不在话下<br/>
                                        重新整理并根据更适合中文阅读的方式排版，让你爱上在 PC 阅读文章<br/>
                                        详细说明请看 <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎">词法分析引擎</a>
                                    </div>
                                </section>
                            </div> }

                    { !first && version == "1.1.3" &&
                        <div className="carousel-item" id="1.1.3">
                            <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-newservice.png?201906301335" style={ style.img }/>
                                <h2 style={ style.h2 }>导出服务又添新成员，更支持 WebDAV</h2>
                                <div style={ style.desc }>
                                    期待已久的 <a target="_blank" href="http://ksria.com/simpread/docs/#/导出到生产力工具">语雀</a> 和 <a target="_blank" href="http://ksria.com/simpread/docs/#/坚果云">坚果云</a> 现已加入 <a target="_blank" href="http://ksria.com/simpread/docs/#/导出到生产力工具">导出服务</a> 豪华大礼包<br/>
                                    配置文件的同步也可使用 <a target="_blank" href="http://ksria.com/simpread/docs/#/同步">坚果云</a> 了<br/>
                                    不仅如此，只要是支持 <a target="_blank" href="http://ksria.com/simpread/docs/#/WebDAV">WebDAV</a> 的服务均可使用简悦的导出功能
                                </div>
                            </section>
                        </div> }

                    { !first && version == "1.1.4" &&
                        <div className="carousel-item" id="1.1.4">
                            <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-newservice-ii.png?202001181335" style={ style.img }/>
                                <h2 style={ style.h2 }>更强大，更易用的导出服务</h2>
                                <div style={ style.desc }>
                                    期待已久的 <a target="_blank" href="http://ksria.com/simpread/docs/#/Notion">Notion</a> · <a target="_blank" href="http://ksria.com/simpread/docs/#/有道云笔记">有道云笔记</a> · <a target="_blank" href="http://ksria.com/simpread/docs/#/为知笔记">为知笔记</a> · <a target="_blank" href="http://ksria.com/simpread/docs/#/URLSCHEME">Bear</a> · <a target="_blank" href="http://ksria.com/simpread/docs/#/URLSCHEME">Ulysses</a> 来啦~<br/>
                                    原生的 <a target="_blank" href="http://ksria.com/simpread/docs/#/离线HTML">离线 HTML / Markdown</a> 下载功能，还有截取任意位置的 <a target="_blank" href="http://ksria.com/simpread/docs/#/截图">截图</a> 功能<br/>
                                    <a target="_blank" href="http://ksria.com/simpread/docs/#/WebDAV?id=定制">WebDAV</a> 现已定制导出格式，包括： <span>Markdown</span> · <span>HTML</span>
                                </div>
                            </section>
                        </div> }

                    { (( !first && version == "1.1.3" ) || version == "all" ) && 
                        <div className="carousel-item" id="1.1.3">
                            <section style={ style.section }>
                                <img src="http://sr.ksria.cn/welcome-notice.png?20190630" style={ style.img }/>
                                <h2 style={ style.h2 }>消息中心 · 帮助中心 · 新手入门</h2>
                                <div style={ style.desc }>
                                    <a target="_blank" href="http://ksria.com/simpread/docs/#/消息中心">消息中心</a> 让沟通更加便利<br/>
                                    内置常用的文档说明、常见问题、及选项页全部功能说明的 <a target="_blank" href="http://ksria.com/simpread/docs/#/帮助中心">帮助中心</a><br/>
                                    功能太多，无从下手？<a target="_blank" href="http://ksria.com/simpread/guide">新手入门</a> 不再让新手望而却步
                                </div>
                            </section>
                        </div> }

                    <div className="carousel-item" id="end">
                        <section style={ style.section }>
                        <img src={ ss.IconPath( "welcome-others" )} style={ style.img }/>
                            <h2 style={ style.h2 }>更多功能 等你发现！</h2>
                            { !first && version == "5005" && <div style={ style.desc }>
                                分享卡，右键菜单添加 「白名单 / 排除列表 / 黑名单」等<br/>
                                详细说明请看 <a target="_blank" href="http://ksria.com/simpread/welcome/version_1.1.2.5005.html">更新日志</a>
                            </div> }
                            { !first && version == "1.1.3" && <div style={ style.desc }>
                                <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎?id=预加载机制">预加载</a> <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎?id=延迟加载">延迟加载</a> <a target="_blank" href="http://ksria.com/simpread/docs/#/词法分析引擎?id=智能感知">智能感知</a> 与 <a target="_blank" href="http://ksria.com/simpread/docs/#/手动框选?id=二次确认">更便捷的手动框选</a> 等诸多新功能<br/>
                                详细说明请看 <a target="_blank" href="http://ksria.com/simpread/welcome/version_1.1.3.html">更新日志</a>
                            </div> }
                        </section>
                    </div>
                </div>
                <footer style={ style.footer }>
                    <Button style={ this.state.style }
                        shape="circle" width="40px"
                        color="#fff" backgroundColor="#C8E6C9"
                        icon={ ss.IconPath( "prev_icon" ) }
                        waves="md-waves-effect md-waves-button"
                        onClick={ ()=>this.prevClick() } />
                    <Button
                        shape="circle" width="40px"
                        color="#fff" backgroundColor="#4CAF50"
                        icon={ ss.IconPath( this.state.state ) }
                        waves="md-waves-effect md-waves-button"
                        onClick={ ()=>this.nextClick() } />
                </footer>
                <div style={ style.close }>
                    <Button
                        shape="circle" width="36px"
                        color="#fff" backgroundColor="transparent" hoverColor="transparent"
                        icon={ ss.IconPath( "close_icon" ) }
                        onClick={ ()=>this.closeClick() } />
                </div>
            </welcome>
        )
    }
}

/**
 * Exit
 */
function exit() {
    $( welcbgclsjq ).velocity({ opacity: 0 }, { complete: () => {
        ReactDOM.unmountComponentAtNode( $(welcbgclsjq)[0] );
    }});
}

/**
 * Welcome Render
 * 
 * @param {string} root name
 * @param {boolean} true: first load
 * @param {string} version
 */
export function Render( root, first, version ) {
    const $root = $( root );
    if ( $root.find( "." + welcbgcls ).length == 0 ) {
        $root.append( welcbg );
    }
    ReactDOM.render( <Welcome first={ first } version={ version } />, $( welcbgclsjq )[0] );
}