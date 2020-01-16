console.log( "===== simpread option unread list load =====" )

import List      from 'list';
import Button    from 'button';

import {storage} from 'storage';
import * as conf from 'config';
import * as exp  from 'export';

import timeago   from 'timeago';

const style = {
        root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontSize: '1.6rem',
            color: '#9b9b9b',
        },
        icon : {
            width: '80px',
            height: '80px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: 'url( data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfhBA0LLBOn/NkLAAABtklEQVRYw+2YPyxDURTGf5WOGCwiETH7s4kaDJo2FokYMBglZ66lOtGEqWIQm9zdoJouGERIEwNlE4NE4i0iBoO0CxIMvW1f26evvJY86Tfdc3LP99137vvuTa6HqlAwzxI9X064ISrxagweE5mfOXp18CHjoCDJFHbYlBCAOiywGWzLSYmAauUIn6koI+2g/Bzb0gMMyDWoZ9pNuTQByUKLbkSyhD6PyZroYcwiN0xSoQUYJGhZ+FKjwKtlNsggeAEIFJIbnJqm7BKpSeAIgHkdjbKgRwGucgIdOrEuYXOdXKo1Fm3pF+QOQBI6Tqg3wnleb8nUVHmtRNQBQueX5AZbclmRTVFYqBcbSKpS9jtocVLcFGgK/I6AhQ/UEPHCsf09GMyU287KaBc/Xm4vF+YbBv5oDzYd8FXUWrRIQoQa+wV1hfsFmj6whTt9IPvFRv3L39Q51AR7AKzKctMHtnCnD2wE6oAbpgF4bJCA3HKbH7vcaCsSdf9ZVCrQVyfW/uIwtwdZHcXUEzuSccKt2pglpoOsfkpQPs4a0p8ROc+1KI3RAHqDdPExpIv78nPQId7plgf4BCjPbVayklPeAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTEzVDExOjQ0OjE5KzA4OjAwPYuVdQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0xM1QxMTo0NDoxOSswODowMEzWLckAAAAASUVORK5CYII= )',
        }
},
    ago = timeago();

export default class Unrdist extends React.Component {

    static defaultProps = {
        list: [],
        step: 5,
    };

    static propsType = {
        list: React.PropTypes.array,
        step: React.PropTypes.number,
        onLoadMoreClick: React.PropTypes.func,
    };

    state = {
        title: `未读列表：${ this.props.list.length } 条`,
        items: this.props.list.map( item => {
            item.priType  = "text";
            item.secType  = "text";
            item.priValue = item.title.substr( 0, 1 );
            item.secValue = ago.format( item.create.replace( /(年|月)/g, "-" ).replace( "日", "" ), "zh_CN" )
            item.url      = item.url + ( window.location.search ? "&" : "?" ) + "simpread_mode=read";
            return item;
        }),

        total: Math.ceil( this.props.list.length / this.props.step ),
        page : 1,
    };

    onAction( event, ...rests ) {
        const { pocket, linnk, instapaper } = exp,
              [ id, _, data ]   = rests;

        [ "pocket", "instapaper", "linnk" ].includes( id ) &&
            exp.VerifySvcWrapper( storage, exp[id], id, exp.Name( id ), new Notify(), false )
                .done( type => {
                    if ( type == "pocket" ) {
                        pocket.Add( data.url, data.title.trim(), ( result, error ) => exp.svcCbWrapper( result, error, pocket.name, type, new Notify() ));
                    } else if ( type == "linnk" ) {
                        linnk.GetSafeGroup( linnk.group_name, ( result, error ) => {
                            if ( !error ) {
                                linnk.group_id = result.data.groupId;
                                linnk.Add( data.url, data.title.trim(), ( result, error ) => exp.svcCbWrapper( result, error, linnk.name, type, new Notify() ));
                            } else new Notify().Render( 2, `${ linnk.name } 保存失败，请稍后重新再试。` );
                        });
                    } else {
                        instapaper.Add( data.url, data.title.trim(), "", ( result, error ) => exp.svcCbWrapper( result, error, instapaper.name, type, new Notify() ));
                    }
                });

        id == "remove" &&
            storage.UnRead( id, data.idx, success => {
                success && this.state.items.splice( this.state.items.findIndex( item => item.idx == data.idx ), 1 );
                success && this.setState({
                    title: `未读列表：${ this.state.items.length } 条`,
                    total: Math.ceil( this.state.items.length / this.props.step ),
                });
                success && new Notify().Render( 0, "删除成功" );
            });
    }

    onClick() {
        this.setState({ page: this.state.page + 1 });
        this.props.onLoadMoreClick && this.props.onLoadMoreClick();
    }

    render() {
        const content_style = {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            width: '100%',
        };
        const disable = this.state.page >= this.state.total ? true : false,
              items   = this.state.items.slice( 0, this.state.page * this.props.step ),
              content = this.state.items && this.state.items.length > 0 ?
            <div>
                <div className="version-tips" data-hits="laterlist">
                <List acIconWaves="md-waves-effect md-waves-circle"
                      acItemWaves="md-waves-effect"
                      title={ this.state.title } contentStyle={ content_style }
                      items={ items } actionItems={ conf.actionItems }
                      priBgColor ="#E1BEE7"
                      onAction={ (e,i,t,d)=>this.onAction(e,i,t,d) } />
                </div>
                <div className="version-tips" data-hits="latermore">
                <Button type="raised" width="100%"
                        text={ disable ? "加载完毕" : "加载更多" } disable={ disable }
                        color="#fff" backgroundColor="rgb(156, 39, 176)"
                        waves="md-waves-effect md-waves-button"
                        onClick={ ()=>this.onClick() } />
                </div>
            </div>
            : <div style={ style.root }>
                <span style={ style.icon }></span>
                <span style={ style.text }>没有任何未读列表!</span>
              </div>;
        return (
            <div>{ content }</div>
        )
    }
}