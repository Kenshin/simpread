console.log( "=== simpread notice load ===" )

import {storage}     from 'storage';
import th            from 'theme';
import * as ss       from 'stylesheet';
import * as puplugin from 'puplugin';
import * as watch    from 'watch';
import Button        from 'button';

export default class Notice extends React.Component {

    state = {
        items: [],
        detail: "",
        failed: false,
    }

    onClick( event, id ) {
        const markdown  = puplugin.Plugin( "markdown" ),
              converter = new markdown.default.Converter(),
              item      = this.state.items.filter( item => item.id == id ),
              html      = converter.makeHtml( item[0].content );
        $( "notice .detail" ).addClass( "simpread-theme-root" ).html( `<sr-rd-content>${html}</sr-rd-content>` );
    }

    componentWillMount() {
        $.ajax( "http://localhost:3000/notice" )
            .done( result => {
                this.setState({ items: result.notice });
            })
            .fail( ( jqXHR, textStatus, errorThrown ) => {
                this.setState({ failed: true });
            });
    }

    componentDidMount() {
        th.Change( "pixyii" );
    }

    render() {
        let dom;
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
                        <List list={ this.state.items } onClick={ ( e, id )=> this.onClick( e, id ) } />
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

    onActive( event, id ) {
        $( `list[id="${id}"]` ).addClass( "active" );
        storage.notice.read.push( id );
        storage.Write( () => {
            console.log( "current notice is ", storage.notice )
            watch.SendMessage( "option", true );
        }, storage.simpread );
    }

    render() {
        const list = this.props.list.map( item => {
            const active = storage.notice.read.findIndex( value=>value==item.id ) != -1 ? " active" : "";
            return (
                <list id={ item.id } className={ "md-waves-effect" + active } onClick={ e => this.props.onClick( e, item.id ) }>
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