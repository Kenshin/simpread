console.log( "===== simpread option guide load =====" )

import intro              from 'intro';

import {browser}          from 'browser';
import * as msg           from 'message';
import {storage}          from 'storage';

class Guide extends React.Component {

    static defaultProps = {
        tips: [
            {
                idx: 0,
                name: '说明文档请看这里',
                icon: '<i class="fas fa-info-circle"></i>',
                url: "http://ksria.com/simpread/docs"
            },
            {
                idx: 1,
                name: '新手入门可以看这篇文章',
                icon: '<i class="fas fa-file-word"></i>',
                url: "http://kenshin.wang/blog/#/posts/13"
            },
            {
                idx: 2,
                name: '请通过 Github issues 提问',
                icon: '<i class="fas fa-bug"></i>',
                url: "https://github.com/Kenshin/simpread/issues/new"
            },
            {
                idx: 3,
                name: '查看当前版本新增功能',
                icon: '<i class="fas fa-folder-open"></i>',
                url: "#"
            },
            {
                idx: 4,
                name: '查看当前页的功能描述',
                icon: '<i class="fas fa-binoculars"></i>',
                url: "#"
            },
        ]
    };

    static propsType = {
        tips: React.PropTypes.array,
    };

    state = {
        tips: [],
    }

    onClick( event, idx, url ) {
        if ( url != "#" ) {
            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url }));
        } else {
            // TO-DO
        }
    }

    onLoadingClick() {
        $( ".guide .loading" ).html( `<svg width="20" height="20" viewBox="0 0 38 38" stroke="#26d07c"> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)" stroke-width="2"> <circle stroke-opacity=".5" cx="18" cy="18" r="18"/> <path d="M36 18c0-9.94-8.06-18-18-18"> <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/> </path> </g> </g></svg>` );
        const ajax = () => {
            $.ajax({
                url   : storage.help_service + "?=" + Math.round(+new Date()),
                method: "GET",
            }).done( ( result, textStatus, jqXHR ) => {
                if ( result && result.tips.length == 0 ) {
                    $( ".guide .loading" ).html( '<span>没有新的消息</span>' ).css({"animation": ".1s reverse fadein,235ms cubic-bezier(.4,0,.2,1) popup"});
                    setTimeout( ()=> $( ".guide .loading" ).css({"animation": "1s reverse fadein,235ms cubic-bezier(.4,0,.2,1) popclose"}), 500 );
                    setTimeout( ()=> $( ".guide .loading" ).fadeOut(), 300 );
                } else {
                    this.setState({tips: this.props.tips.concat( result.tips ) });
                    $( ".guide .loading" ).remove();
                }
            }).fail( error => {
                $( ".guide .loading" ).html( `<i class="fas fa-bug" style="color:#FF5252;"></i><span style="color:#FF5252;">发生了一些错误，请稍后再试。</span>` )
            });
        };
        setTimeout( ajax, 1000 );
    }

    componentWillMount() {
        this.setState({ tips: this.props.tips });
    }

    componentDidMount() {
        $( ".guide" ).scroll( event => {
            if ( $( event.target ).scrollTop() > 35 ) {
                $( ".guide .title" )
                    .css({"box-shadow": "2px 4px 10px rgba(0,0,0,.2)" })
                    .find( "span" ).text( "帮助中心 > 快捷答案" ).css({"font-weight": "normal", "animation": ".1s reverse fadein,235ms cubic-bezier(.4,0,.2,1) popup" });
            } else {
                $( ".guide .title" )
                    .removeAttr( "style" )
                    .find( "span" ).text( "帮助中心" ).removeAttr( "style" );
            }
        });
    }

    render() {
        const tips = this.state.tips.map( item => {
            return (
                <guid-card id={ item.idx } class="md-waves-effect" onClick={ e=>this.onClick( e, item.idx, item.url ) }>
                    <guid-card-tips>
                        <span dangerouslySetInnerHTML={{__html: item.icon }} ></span>
                        <span>{ item.name }</span>
                    </guid-card-tips>
                </guid-card>
            )
        });
        return (
            <div className="guide">
                <div className="title"><span>帮助中心</span></div>
                <div className="subtitle"><span>快捷答案</span></div>
                <div className="group">
                    { tips }
                </div>
                <div className="loading" onClick={ ()=>this.onLoadingClick() }><span className="md-waves-effect">加载更多</span></div>
            </div>
        )
    }
}

/**
 * Show current version intro
 */
function curVersion() {
    setTimeout( ()=> {
        const intros = intro();
        intros.setOptions({
            hintButtonLabel: "确认",
            nextLabel: "下一个 →",
            prevLabel: "← 上一个",
            skipLabel: "",
            doneLabel: "完成",
            hidePrev: true,
            hideNext: true,
            steps: [
                {
                    element: $("#version-113[data-hits='save_at']")[0],
                    intro: '从现在开始可以将配置文件保存到坚果云了，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/坚果云">请看这里</a>',
                },
                {
                    element: $("#version-113[data-hits='preload']")[0],
                    intro: '简悦的词法分析引擎采用了预加载机制，你可以选择手动关闭此功能来缓解某些性能低下的系统。',
                },
                {
                    element: $("#version-113[data-hits='lazyload']")[0],
                    intro: '此功能适合「经常使用简悦但又性能不够」的用户、需要动态加载及支持 Mathjax 解析的页面等，详细说明 <a target="_blank" href="http://ksria.com/simpread/docs/#/延迟加载">请看这里</a>',
                }
            ]
        });
        intros.start();
    }, 500 );
}

export {
    Guide,
    curVersion as Current
}