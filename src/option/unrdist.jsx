console.log( "===== simpread option unread list load =====" )

import List from 'list';

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

    onAction( type, data ) {
        console.log( type, data )
    }

    render() {
        return (
            <List items={ this.props.list } title={ "未读列表：100 条" } actionItems={ actionItems } onAction={ (t,d)=>this.onAction(t,d) } />
        )
    }
}