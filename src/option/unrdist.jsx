console.log( "===== simpread option unread list load =====" )

import List     from 'list';
import Button   from 'button';

import {storage} from 'storage';

const actionItems = [
    {
        id: "pocket",
        title: "发送到 Pocket",
        icon: "",
        disable: false,
        hr: true,
    },
    {
        id: "remove",
        title: "删除",
        icon: "",
        disable: false,
        hr: false,
    }
],
    style = {
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
};

export default class Unrdist extends React.Component {

    static defaultProps = {
        list: [],
        step: 5,
        page: 0,
    };

    static propsType = {
        list: React.PropTypes.array,
        step: React.PropTypes.number,
        page: React.PropTypes.number,
    };

    state = {
        title: `未读列表：${ this.props.list.length } 条`,
        items: this.props.list.slice( this.props.page * this.props.step ).slice( 0, this.props.step ),

        total: Math.ceil( this.props.list.length / this.props.step ),
        page : this.props.page,

        loading_text   : "加载更多",
        loading_disable: false,
    };

    onAction( event, ...rests ) {
        const [ id, _, data ] = rests;
        id == "remove" &&
            storage.UnRead( id, data.idx, success => {
                success && new Notify().Render( 0, "删除成功" );
                success && this.setState({
                    items: storage.unrdist,
                    title: `未读列表：${ this.props.list.length } 条`
                });
            });
    }

    onClick() {
        const page  = this.state.page + 1,
              items = this.state.items.concat( this.props.list.slice( page * this.props.step ).slice( 0, this.props.step ));
        this.setState({ page, items });
        page >= this.state.total - 1 &&
            this.setState({
                loading_text   : "加载完毕",
                loading_disable: true,
            });
    }

    render() {
        const content = this.state.items && this.state.items.length > 0 ?
            <div>
                <List items={ this.state.items } title={ this.state.title } actionItems={ actionItems } onAction={ (e,i,t,d)=>this.onAction(e,i,t,d) } />
                <Button ref="load" type="raised" width="100%"
                        text={ this.state.loading_text } disable={ this.state.loading_disable }
                        color="#fff" backgroundColor="rgb(156, 39, 176)"
                        waves="sr-button waves-effect waves-button"
                        onClick={ ()=>this.onClick() } />
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