console.log( "===== simpread option unread list load =====" )

import List from 'list';

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
];

export default class Unrdist extends React.Component {

    state = {
        item: this.props.list,
    }

    onAction( event, ...rests ) {
        const [ id, title, data ] = rests;
        console.log( id, title, data )
        if ( id == "remove" ) {
            storage.UnRead( id, data.idx, success => {
                success && new Notify().Render( 0, "删除成功" );
                success && this.setState({
                    item: storage.unrdist
                });
            });
        }
    }

    render() {
        return (
            <List items={ this.state.item } title={ "未读列表：100 条" } actionItems={ actionItems } onAction={ (e,i,t,d)=>this.onAction(e,i,t,d) } />
        )
    }
}