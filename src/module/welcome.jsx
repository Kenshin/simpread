console.log( "===== simpread option welcome page load =====" )

import '../vender/carousel/carousel.css';
import 'carousel';

import Button  from 'button';

import * as ss from 'stylesheet';

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
        height: '630px',

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
        } else {
            exit();
        }
    }

    closeClick() {
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
        return (
            <welcome style={ style.root }>
                <div className="carousel carousel-slider" data-indicators="true">
                    <div className="carousel-item" id="start">
                        <section style={ style.section }>
                            <img src={ ss.IconPath( "welcome" )}/>
                            <h2 style={{ ...style.h2, ...{ 'margin-bottom': 0 } }}>{ this.props.first ? "欢迎使用 简悦": "简悦 已升至最新版" }</h2>
                            <div style={ style.desc }>
                                让你瞬间进入沉浸式阅读的 Chrome 扩展，类似 Safari 的阅读模式。<br/>
                                去掉干扰元素，提升阅读体验，<strong style={ style.strong }>「简」</strong>单阅读，愉<strong style={ style.strong }>「悦」</strong>心情。<br/>
                                为了达到 <strong style={ style.strong }>「完美」</strong> 的阅读模式，简悦适配了 <strong style={ style.strong }>160+</strong> 个网站。
                            </div>
                        </section>
                    </div>
                    <div className="carousel-item">
                        <section style={ style.section }>
                            <img src={ ss.IconPath( "welcome-read" )}/>
                            <h2 style={ style.h2 }>阅读模式</h2>
                            <div style={ style.desc }>
                                自动提取适配页面的标题、描述、正文、媒体 （ 图片/视频 ） 等资源。<br/>
                                定制化生成更适合中文阅读的页面。
                            </div>
                        </section>
                    </div>
                    <div className="carousel-item">
                        <section style={ style.section }>
                            <img src={ ss.IconPath( "welcome-focus" )}/>
                            <h2 style={ style.h2 }>聚焦模式</h2>
                            <div style={ style.desc }>
                                自动高亮鼠标所在的文章段落，不改变当前页面的结构，适合未适配的网站。
                            </div>
                        </section>
                    </div>
                    <div className="carousel-item">
                        <section style={ style.section }>
                            <img src={ ss.IconPath( "welcome-setting" )}/>
                            <h2 style={ style.h2 }>高度定制化</h2>
                            <div style={ style.desc }>
                                字体样式/大小、版本设计、主题均可设定。<br/>
                                页面上任意元素（ 不想显示的文字 / 图片 ）均可隐藏。
                            </div>
                        </section>
                    </div>

                    <div className="carousel-item" id="1.0.3">
                        <section style={ style.section }>
                        <img src="http://ojec5ddd5.bkt.clouddn.com/welcome-service.png"/>
                            <h2 style={ style.h2 }>连接你的生产力工具</h2>
                            <div style={ style.desc }>
                                阅读模式支持下载 <strong>PDF · PNG</strong> 到本地；发送页面链接到 <strong>Pocket · Linnk。</strong><br/>
                                支持输出到 <strong>Dropbox · 印象笔记 · Evernote · Onenote · Google 云端硬盘。</strong><br/>
                                支持发送到 Kindle（使用第三方服务实现），详细 <a target="_blank" href="https://github.com/Kenshin/simpread/wiki/%E6%8E%88%E6%9D%83%E6%9C%8D%E5%8A%A1">请看这里</a> 。
                            </div>
                        </section>
                    </div>

                    <div className="carousel-item" id="1.0.3">
                        <section style={ style.section }>
                            <img style={ style.gif } src="http://ojec5ddd5.bkt.clouddn.com/Custom%20theme.gif"/>
                            <h2 style={ style.h2 }>自定义样式</h2>
                            <div style={ style.desc }>
                                <strong>选项页-高级设定 · 自定义样式</strong>，包含字间距、行间距等中文阅读设置。<br/>
                                <strong>自定义CSS</strong> 方便定制属于你的主题，详细 <a target="_blank" href="https://github.com/Kenshin/simpread/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98">请看这里</a> 。
                            </div>
                        </section>
                    </div>

                    <div className="carousel-item" id="1.0.3">
                        <section style={ style.section }>
                            <img style={ style.gif } src="http://ojec5ddd5.bkt.clouddn.com/Multi-page%20optimize.gif"/>
                            <h2 style={ style.h2 }>多页面 · 分页</h2>
                            <div style={ style.desc }>
                            支持 <strong>论坛类页面</strong>，包括：知乎 · 贴吧等具有多端内容的页面形式。<br/>
                            支持 <strong>分页功能</strong>，在阅读模式下就可翻页。
                            </div>
                        </section>
                    </div>

                    <div className="carousel-item" id="end">
                        <section style={ style.section }>
                            <img src={ ss.IconPath( "welcome-others" )}/>
                            <h2 style={ style.h2 }>更多功能 等你发现！</h2>
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
 * Exit()
 */
function exit() {
    $( welcbgclsjq ).velocity({ opacity: 0 }, { complete: ()=>{
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