console.log( "==== simpread component: ToolTip ====" )

let style, styles = new Map();
const cssinjs = () => {
    const styles = {

        root: {
            position: 'relative',

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
            opacity: 0,

            userSelect: 'none',

            transition: 'top 0ms cubic-bezier(0.23, 1, 0.32, 1) 450ms, transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            borderRadius: '2px',
            boxSizing: 'border-box',
        },

        root_focus: {
            top: '36PX',
            left: '-28.5px',
            opacity: 0.9,
            transform: 'translate( 0px, 0px )',
            transition: 'top 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
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
        text   : "",
        target : "",
    }

    static propTypes = {
        text  : React.PropTypes.string,
        target: React.PropTypes.string,
    }
    
    state = {
        id : Math.round(+new Date()),
    }

    render() {
        styles.set( this.state.id, cssinjs() );
        style = styles.get( this.state.id );

        return (
            <sr-tooltip>
                <div ref="root" style={{ ...style.root, ...style.root_focus }}>
                    <div ref="text" style={{ ...style.text, ...style.text_focus }}></div>
                    <span style={ style.span }>{ this.props.text }</span>
                </div>
            </sr-tooltip>
        )
    }

}

/**
 * Render
 */
function Render() {
    $( "html" ).on( "mouseenter", "[tooltip]", ()=>{
        const $target = $( event.target );        
        if ( $target.find( "sr-tooltip" ).length == 0 ) {
            ReactDOM.render( <ToolTip text={ $target.attr( "tooltip" ) } />, event.target );
            $target.one( "mouseleave", () => {
                $( event.currentTarget ).find( "sr-tooltip" ).remove();
            });
        }
    });
}

/**
 * Exit
 */
function Exit() {
    $( "html" ).off( "mouseenter", "[tooltip]" );
}

export { Render, Exit };