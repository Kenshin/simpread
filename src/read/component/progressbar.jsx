console.log( "==== simpread read component: ProcessBar ====" )

import Progress from 'progress';

const options = {
    strokeWidth: 4,
    easing     : "easeInOut",
    duration   : 1000,
    trailColor : "#fff",
    trailWidth : 0,
    svgStyle   : {
        width  : "100%",
        height : "100%",
        display: "block",
        top    : "0",
    },
    from       : { color: "#64B5F6" },
    to         : { color: "#304FFE" },
    step       : ( state, bar ) => {
        bar.path.setAttribute( "stroke", state.color );
    },
};

export default class ProcessBar extends React.Component {

    static defaultProps = {
        offset : document.body.scrollTop / ( document.body.scrollHeight - document.documentElement.clientHeight )
    }

    state = {
        progress: this.props.offset
    }

    componentDidMount() {
        $( document ).on( "scroll", ()=>this.scrollEventHandle() );
    }

    componentWillUnmount() {
        $( document ).off( "scroll", ()=>this.scrollEventHandle() );
    }

    scrollEventHandle() {
        const offset  = document.body.scrollTop / ( document.body.scrollHeight - document.body.clientHeight );
        this.setState({ progress: offset });
    }

    render() {
        return (
            <Progress type="line" progress={ this.state.progress } options={ options }>
                <read-process></read-process>
            </Progress>
        )

    }

}
