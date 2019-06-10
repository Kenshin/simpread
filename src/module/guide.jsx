console.log( "===== simpread option guide load =====" )

import {browser}          from 'browser';
import * as msg           from 'message';

export default class Guide extends React.Component {

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

    onClick( event, idx, url ) {
        if ( url != "#" ) {
            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url }));
        } else {
            // TO-DO
        }
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
        const tips = this.props.tips.map( item => {
            return (
                <guid-card id={ item.idx } onClick={ e=>this.onClick( e, item.idx, item.url ) }>
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
            </div>
        )
    }
}