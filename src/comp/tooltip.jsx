console.log( "==== simpread component: ToolTip ====" )

import '../vender/velocity.min.js';
import '../vender/tooltip.js';

let style, styles = new Map();
const cssinjs = () => {
    const styles = {

        /*root: {
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
        },*/

        root : {
            font: '300 14px/1.8 PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans',

            position: 'absolute',

            top: 0,
            left: 0,
            padding: '10px 8px',

            maxWidth: 'calc(100% - 4px)',
            minHeight: '36px',

            //fontSize: '14px',
            //lineHeight: 1,
            textAlign: 'center',

            zIndex: 2000,

            color: '#fff',
            backgroundColor: 'transparent',

            borderRadius: '2px',

            pointerEvents: 'none',

            opacity: 0,
            overflow: 'hidden',
            visibility: 'hidden',
        },

        background: {
            position: 'absolute',

            width: '14px',
            height: '7px',

            backgroundColor: '#323232',

            borderRadius: '0 0 50% 50%',

            zIndex: -1,

            transformOrigin: '50% 0%',

            opacity: 0,
            visibility: 'hidden',
        },
    }

    return styles;
}

class ToolTip extends React.Component {

    static defaultProps = {
        text     : "",
        position : "bottom",
        delay    : 350,
    }

    static propTypes = {
        text     : React.PropTypes.string,
        position : React.PropTypes.oneOf([ "bottom", "top", "left", "right" ]),
        delay    : React.PropTypes.number,
    }

    state = {
        id : Math.round(+new Date()),
    }

    componentWillUnmount() {
        console.log("==== tooltip exit ====")
    }

    render() {
        styles.set( this.state.id, cssinjs() );
        style = styles.get( this.state.id );

        return (
            <sr-tooltip>
                <span>{ this.props.text }</span>
                <div style={ style.background }></div>
            </sr-tooltip>
        )
    }

}

/**
 * Render
 * 
 * @param {string} class name, e.g. ks-simpread-read
 */
function Render( root ) {
    const $root = $( `.${root}` );
    $root.find("[data-tooltip]").map( ( idx, item )=>{
        const $item = $(item),
              position = $item.attr( "data-tooltip-position" ),
              delay    = $item.attr( "data-tooltip-delay" ),
              text     = $item.attr( "data-tooltip" );
        //ReactDOM.render( <ToolTip text={ text } position={ position} delay={ delay }/>, $root[0] );
        $item.tooltip({ position, delay, text, root });
    });
    /*
    $( "html" ).on( "mouseenter", "[tooltip]", ()=>{
        const $target = $( event.target );        
        if ( $target.find( "sr-tooltip" ).length == 0 ) {
            ReactDOM.render( <ToolTip text={ $target.attr( "tooltip" ) } />, event.target );
            $target.one( "mouseleave", () => {
                $( event.currentTarget ).find( "sr-tooltip" ).remove();
            });
        }
    });
    */
}

/**
 * Exit
 */
function Exit() {
    $( "html" ).off( "mouseenter", "[tooltip]" );
}

export { Render, Exit };