console.log( "==== simpread read component: ProcessBar ====" )

export default class ProcessBar extends React.Component {

    static defaultProps = {
        show  : true,
        offset: document.documentElement.scrollTop / ( document.documentElement.scrollHeight - document.documentElement.clientHeight ) || 0
    }

    state = {
        progress: this.props.offset
    }

    componentDidMount() {
        setTimeout( ()=>{
            $( document ).on( "scroll", ()=>this.scrollEventHandle() );
        }, 1000 );
    }

    componentWillUnmount() {
        $( document ).off( "scroll", this.scrollEventHandle() );
    }

    scrollEventHandle() {
        const offset = document.documentElement.scrollTop / ( document.documentElement.scrollHeight - document.documentElement.clientHeight );
        this.setState({ progress: offset });
    }

    render() {
        const progress = this.state.progress * 100;
        return (
            this.props.show && <read-process style={{ "width": `${progress}%` }}></read-process>
        )
    }

}
