console.log( "==== simpread component: List ====" )

let styles = new Map();

const color           = 'rgba(255, 255, 255, .7)',
      secondary_color = "rgba(204, 204, 204, 1)",
      active_color    = 'rgba(255, 255, 255, 1)',
      header_corlor   = 'transparent';

const cssinjs = () => {
    const styles = {

    };
    return styles;
}

export default class List extends React.Component {

    state = {
        id : Math.round(+new Date()),
    }

    render() {
        return (
            <list>
                List
            </list>
        )
    }
}