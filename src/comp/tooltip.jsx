console.log( "==== simpread component: ToolTip ====" )

let style, styles = new Map();
const cssinjs = () => {
    const styles = {

        root: {
            position: 'absolute',

            padding: '0px 16px',

            width: '105px',
            height: '32px',

            top: '-10000px',
            left: '-28px',

            zIndex: 3000,

            fontSize: '14px',
            lineHeight: '32px',
            textAlign: 'center',

            color: 'rgb(255, 255, 255)',

            overflow: 'hidden',
            opacity: 1,

            userSelect: 'none',

            transition: 'top 0ms cubic-bezier(0.23, 1, 0.32, 1) 450ms, transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            borderRadius: '2px',
            boxSizing: 'border-box',
        },

        root_focus: {
            top: '36PX',
            left: '-28.5px',
            opacity: 0.9,
            transfrom: 'translate( 0px, 24px )',
        },

        text: {
            position: 'absolute',

            width: 0,
            height: 0,

            left: '50%',
            top: 0,

            backgroundColor: 'transparent',

            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'width 0ms cubic-bezier(0.23, 1, 0.32, 1) 450ms, height 0ms cubic-bezier(0.23, 1, 0.32, 1) 450ms, backgroundColor 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        },

        text_focus: {

            width: '123px',
            height: '123px',

            backgroundColor: 'rgb(97, 97, 97)',

            transition: 'width 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, height 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, backgroundColor 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        },

        span: {
            position: 'relative',
            whiteSpace: 'nowrap',
        },
    }

    return styles;
}

class ToolTip extends React.Component {

    static defaultProps = {
        target : "",
    }

    static propTypes = {
        target: React.PropTypes.string,
    }
    
    state = {
        id  : Math.round(+new Date()),
        text: "",
    }

    onMouseOver() {
        $( this.refs.root ).css({ ...style.root, ...style.root_focus });
        $( this.refs.text ).css({ ...style.text, ...style.text_focus });
        this.setState({ text: $( event.target ).attr( "tooltip" ) });
    }

    componentDidMount() {
        $( "html" ).on( "mouseover", "[tooltip]", this.onMouseOver.bind( this ) );
    }

    render() {

        styles.set( this.state.id, cssinjs() );
        style = styles.get( this.state.id );

        return (
            <div ref="root" style={ style.root }>
                <div ref="text" style={ style.text }></div>
                <span style={ style.span }>{ this.state.text }</span>
            </div>
        )
    }

}

function Render( target ) {
    const $target = $(target);
    $target.append( "<sr-tooltip></sr-tooltip>" );
    const $root = $target.find( "sr-tooltip" );
    ReactDOM.render( <ToolTip />, $root[0] );
}

export { Render };