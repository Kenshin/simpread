console.log( "=== simpread notice load ===" )

import {storage}     from 'storage';
import th            from 'theme';
import * as ss       from 'stylesheet';
import * as puplugin from 'puplugin';
import * as watch    from 'watch';
import Button        from 'button';

/**
 * Write storage
 * 
 * @param {func} callback 
 */
const write = ( callback ) => {
    storage.Write( () => {
        console.log( "current notice is ", storage.notice )
        watch.SendMessage( "option", true );
        callback && callback();
    });
}

export default class Notice extends React.Component {

    static defaultProps = {
        is_update: false,
        step: 20,
    };

    static propsType = {
        step: React.PropTypes.number,
        is_update: React.PropTypes.bool,
    };

    state = {
        items: [],
        detail: "",
        failed: false,

        total: 0,
        page : 1,
    }

    onClick( event, id ) {
        const markdown  = puplugin.Plugin( "markdown" ),
              converter = new markdown.default.Converter(),
              obj       = this.state.items.filter( item => item.id == id ),
              item      = obj[0],
              html      = converter.makeHtml( item.content ),
              tmpl      =  `<div class="preview">
                                <div class="title">${item.title}</div>
                                <div class="desc">
                                    <span style="background-color: ${item.category.color}" class="category">${item.category.name}</span>
                                    <span class="date">发布于 ${item.date}</span>
                                </div>
                                <sr-rd-content>${html}</sr-rd-content>
                            </div>`;
        $( "notice .detail" ).addClass( "simpread-theme-root" ).html( tmpl );
    }

    onReadallClick() {
        new Notify().Render( "snackbar", "是否将全部消息标记为已读？", "确认", () => {
            storage.notice.read = [];
            this.state.items.forEach( ( item, idx ) => { storage.notice.read.push( idx + 1 ) });
            write( ()=> {
                new Notify().Render( "已全部设置为已读，3 秒后自动刷新本页..." );
                setTimeout( ()=>location.reload(), 3000 )
            });
        });
    }

    onLoadmoreClick() {
        this.setState({ page: this.state.page + 1 });
    }

    componentWillMount() {
        if ( this.props.is_update ) {
            $.ajax( storage.notice_service.message )
            .done( result => {
                storage.Notice( undefined, result.notice );
                storage.notice.latest = result.notice.length;
                write();
                this.setState({ items: result.notice, total: Math.ceil( result.notice.length / this.props.step ) });
            })
            .fail( ( jqXHR, textStatus, errorThrown ) => {
                this.setState({ failed: true });
            });
        } else {
            storage.Notice( result => {
                this.setState({ items: result.notice, total: Math.ceil( result.notice.length / this.props.step ) });
            });
        }
    }

    componentDidMount() {
        th.Change( "pixyii" );
    }

    render() {
        let   dom;
        const items = this.state.items.slice( 0, this.state.page * this.props.step );
        if ( this.state.failed ) {
            dom =
                <notice>
                    <div className="failed">
                        <div dangerouslySetInnerHTML={{__html: `<svg viewBox="0 0 1024 1024" version="1.1" p-id="2377" width="120" height="120"><defs><style type="text/css"></style></defs><path d="M512.041444 243.968477c-148.07343 0-268.049942 120.022561-268.049942 268.051989 0 147.988496 119.976512 268.053012 268.049942 268.053012 147.987472 0 268.051989-120.064516 268.051989-268.053012C780.093433 363.991038 660.028916 243.968477 512.041444 243.968477zM556.716946 690.765453 467.367989 690.765453l0-89.351004 89.348957 0L556.716946 690.765453zM556.716946 556.652989 467.367989 556.652989l0-223.37751 89.348957 0L556.716946 556.652989zM780.093433 65.22349 243.991502 65.22349c-98.774631 0-178.700985 80.101339-178.700985 178.744987l0 536.105001c0 98.730629 79.925331 178.700985 178.700985 178.700985l536.102954 0c98.600669 0 178.615027-79.969333 178.615027-178.700985L958.709483 243.968477C958.70846 145.32483 878.695125 65.22349 780.093433 65.22349zM869.44546 735.397976c0 73.994248-60.033281 134.069485-134.027529 134.069485L288.667004 869.467461c-73.994248 0-134.115534-60.075237-134.115534-134.069485L154.55147 288.599977c0-73.994248 60.121286-133.939525 134.115534-133.939525l446.750927 0c73.994248 0 134.027529 59.945277 134.027529 133.939525L869.44546 735.397976z" p-id="2378" fill="#16666f"></path></svg>` }}></div>
                        <span>消息中心暂时无法访问，请稍后再试！</span>
                    </div>
                </notice>;
        } else if ( this.state.items.length == 0 ) {
            dom =
                <notice>
                    <div className="loading" dangerouslySetInnerHTML={{__html: `<svg width="105" height="105" viewBox="0 0 105 105" fill="#16666f"> <circle cx="12.5" cy="12.5" r="12.5"> <animate attributeName="fill-opacity" begin="0s" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="12.5" cy="52.5" r="12.5" fill-opacity=".5"> <animate attributeName="fill-opacity" begin="100ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="52.5" cy="12.5" r="12.5"> <animate attributeName="fill-opacity" begin="300ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="52.5" cy="52.5" r="12.5"> <animate attributeName="fill-opacity" begin="600ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="92.5" cy="12.5" r="12.5"> <animate attributeName="fill-opacity" begin="800ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="92.5" cy="52.5" r="12.5"> <animate attributeName="fill-opacity" begin="400ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="12.5" cy="92.5" r="12.5"> <animate attributeName="fill-opacity" begin="700ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="52.5" cy="92.5" r="12.5"> <animate attributeName="fill-opacity" begin="500ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> <circle cx="92.5" cy="92.5" r="12.5"> <animate attributeName="fill-opacity" begin="200ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite"/> </circle> </svg>` }}></div>
                </notice>;
        } else if ( this.state.items.length > 0 ) {
            dom =
                <notice>
                    <div>
                        <div className="list controlbar">
                            <Button type="raised" text="全部标记为已读"
                                style={{ "margin": "0" }} width="100%"
                                color="#fff" backgroundColor="#FF5252"
                                waves="md-waves-effect md-waves-button"
                                onClick={ ()=>this.onReadallClick() } />
                        </div>
                        <List list={ items } onClick={ ( e, id )=> this.onClick( e, id ) } />
                        { this.state.page < this.state.total &&
                            <div className="list controlbar">
                                <Button type="raised" text="加载更多"
                                    style={{ "margin": "0" }} width="100%"
                                    color="#fff" backgroundColor="#16666f"
                                    waves="md-waves-effect md-waves-button"
                                    onClick={ ()=>this.onLoadmoreClick() } />
                            </div>
                        }
                    </div>
                    <div className="detail">
                        <div className="empty">
                            <span className="icon"></span>
                            <span>当前未查看任何内容</span>
                        </div>
                    </div>
                </notice>;
        }
        return (
            <div>{ dom }</div>
        )
    }
}

class List extends React.Component {

    static defaultProps = {
        list: [],
        onClick: undefined,
    };

    static propTypes = {
        list   : React.PropTypes.array,
        onClick: React.PropTypes.func,
    }

    onClick( event, id ) {
        $( "list" ).removeClass( "selected" );
        $( `list[id="${id}"]` ).addClass( "selected" );
        this.props.onClick( event, id );
    }

    onActive( event, id ) {
        $( `list[id="${id}"]` ).addClass( "active" );
        storage.notice.read.push( id );
        write( () => new Notify().Render( "已设置为已读。" ) );
    }

    render() {
        const list = this.props.list.map( item => {
            const active = storage.notice.read.findIndex( value=>value==item.id ) != -1 ? " active" : "";
            return (
                <list id={ item.id } className={ "md-waves-effect" + active } onClick={ e => this.onClick( e, item.id ) }>
                    <div className="title">{ item.title }</div>
                    <span>
                        <span style={{ backgroundColor: item.category.color }} className="category">{ item.category.name }</span>
                        <span className="date">{ item.date }</span>
                    </span>
                    { active == "" &&
                    <div className="meta">
                        <Button type="raised" text="" shape="circle"
                            icon={ ss.IconPath( "read_icon" ) }
                            tooltip={{ text: "已读" }}
                            color="#fff" backgroundColor="transparent"
                            waves="md-waves-effect md-waves-circle" hoverColor="transparent"
                            onClick={ e => this.onActive( e, item.id ) }
                        />
                    </div>
                    }
                </list>
            )
        });
        return (
            <div className="list">
                { list }
            </div>
        )
    }
}