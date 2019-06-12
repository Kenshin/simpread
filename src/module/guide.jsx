console.log( "===== simpread option guide load =====" )

import intro              from 'intro';

import {browser}          from 'browser';
import * as msg           from 'message';
import {storage}          from 'storage';
import * as ver           from 'version';

class Guide extends React.Component {

    static defaultProps = {
        tips: []
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
        } else if ( idx == 3 ) {
            start( storage.version );
            this.props.onExit && this.props.onExit();
        } else {
            const id = location.hash == "" ? "common" : location.hash.replace( "#", "" );
            if ( id == "account" || id == "about" ) {
                new Notify().Render( "此页面没有功能描述。" );
            } else {
                start( id, false );
                this.props.onExit && this.props.onExit();
            }
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
                    $( ".guide" ).find( "hr" ).remove();
                    this.setState({tips: this.state.tips.concat( result.tips ) });
                    $( ".guide .loading" ).remove();
                }
            }).fail( error => {
                $( ".guide .loading" ).html( `<i class="fas fa-bug" style="color:#FF5252;"></i><span style="color:#FF5252;">发生了一些错误，请稍后再试。</span>` )
            });
        };
        setTimeout( ajax, 1000 );
    }

    componentWillMount() {
        storage.GetRemote( "help_tips", ( result, error ) => {
            result && result.tips && this.setState({ tips: result.tips });
        });
    }

    componentDidUpdate() {
        $( "guid-card[id='4']" ).after( "<hr>" );
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
 * 
 * @param {string} id, include: version id | hash id, e,g. 1.1.3, common, simple
 * @param {boolean} verify current url and intros.start()
 */
function start( id, verify = true ) {
    const target = ver.tips[ id ].target,
          idx    = ver.tips[ id ].idx,
          steps  = ver.tips[ id ].items.map( item => { return { element: $( ver.tips.root( item.id ) )[0], intro: item.intro }}),
          intros = intro(),
          start  = () => {
            intros.setOptions({
                hintButtonLabel: "确认",
                nextLabel: "下一条 →",
                prevLabel: "← 上一条",
                skipLabel: "",
                doneLabel: "完成",
                hidePrev: true,
                hideNext: true,
                steps
            });
            intros.start();
    };
    if ( verify && location.hash != `#${ target }` ) {
        window.dispatchEvent( new CustomEvent( msg.MESSAGE_ACTION.turn_tab, { detail: { page: idx }}));
        setTimeout( start, 500 );
    } else {
        start();
    }
}

export {
    Guide,
    start as Start
}