console.log( "==== simpread component: ToolTip ====" )

/*
 * Reference to Materialize( MIT license ) tooltip
 *
 * Author      Alvin Wang( alvin7@gmail.com ) https://github.com/Dogfalo
 * Materialize http://materializecss.com/
 * Tooltip     https://github.com/Dogfalo/materialize/blob/master/js/tooltip.js
 *
 */

import '../vender/velocity.min.js';

let started = false, timeout, $target, $back, style, styles = new Map();
const cssinjs = () => {
    const styles = {

        root : {
            font: '300 14px/1 PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans',

            display: 'flex',
            alignItems: 'center',
            position: 'absolute',

            top: 0,
            left: 0,
            padding: '0 16px',

            maxWidth: 'calc(100% - 4px)',
            height: '32px',

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

        back: {
            position: 'absolute',

            width: '14px',
            height: '7px',

            backgroundColor: 'rgba(97, 97, 98, .9)',

            borderRadius: '0 0 50% 50%',

            zIndex: -1,

            transformOrigin: '50% 0%',

            opacity: 0,
            visibility: 'hidden',
        },
    }

    return styles;
}

/**
 * Tooltip, component e.g. 
    <tooltip-gp>
        <tooltip-tips>
            <tooltip-tip id="1488523418015">
                <span>关闭</span>
                <div></div>
            </tooltip-tip>
        </tooltip-tips>
        <tooltip-tips>
            <tooltip-tip id="1488523418017">
                <span>更多</span>
                <div></div>
            </tooltip-tip>
        </tooltip-tips>
    </tooltip-gp>
 * 
 * @class
 */
class ToolTip extends React.Component {

    static defaultProps = {
        text     : "",
        position : "bottom",
        delay    : 350,
        $item    : undefined,
    }

    static propTypes = {
        text     : React.PropTypes.string,
        position : React.PropTypes.oneOf([ "bottom", "top", "left", "right" ]),
        delay    : React.PropTypes.number,
        $item    : React.PropTypes.any,
    }

    state = {
        id : Math.round(+new Date()),
    }

    onMouseEnter() {
        const showTooltip = ()=> {
            started = true;
            [ $target, $back ] = [ $( this.refs.target ), $( this.refs.back ) ];

            $target.velocity( "stop" );
            $back.velocity( "stop" );
            $target.css({ visibility: "visible", left: "0px", top: "0px" });

            const originWidth   = this.props.$item.outerWidth(),
                  originHeight  = this.props.$item.outerHeight(),
                  tooltipHeight = $target.outerHeight(),
                  tooltipWidth  = $target.outerWidth(),
                  backWidth     = $back[0].offsetWidth,
                  backHeight    = $back[0].offsetHeight;

            let tooltipVert = "0px", tooltipHori = "0px",
                scaleXFactor = 8, scaleYFactor = 8, scaleFactor = 0,
                targetTop, targetLeft, top, left;

            if ( this.props.$item.css( "position" ) == "static" ) {
                top  = this.props.$item.position().top;
                left = this.props.$item.position().left;
            } else {
                top  = this.props.$item.offset().top;
                left = this.props.$item.offset().left;
            }

            if ( this.props.position == "bottom" ) {
                tooltipVert = "+14px";
                targetTop   = top  + originHeight;
                targetLeft  = left + ( originWidth - tooltipWidth ) / 2;
            } else if ( this.props.position == "top" ) {
                tooltipVert = '-14px';
                targetTop   = top  - tooltipHeight;
                targetLeft  = left + ( originWidth - tooltipWidth ) / 2;
            } else if ( this.props.position == "left" ) {
                tooltipHori = '-14px';
                targetTop   = top  + ( originHeight - tooltipHeight ) / 2;
                targetLeft  = left - tooltipWidth;
            } else {
                tooltipHori = '+14px';
                targetTop   = top  + ( originHeight - tooltipHeight ) / 2;
                targetLeft  = left + originWidth + Number.parseInt( tooltipHori ) - Number.parseInt( $target.css( "padding-left" ));
            }

            $back.css({
                top: 0,
                left: 0,
                marginLeft: ( tooltipWidth - backWidth ) / 2
            });

            $target.css({
                top: targetTop,
                left: targetLeft
            });

            scaleXFactor = Math.SQRT2 * tooltipWidth  / parseInt( backWidth  );
            scaleYFactor = Math.SQRT2 * tooltipHeight / parseInt( backHeight );
            scaleFactor  = Math.max( scaleXFactor, scaleYFactor );

            $target.velocity({ translateY: tooltipVert, translateX: tooltipHori }, { duration: 350, queue: false })
              .velocity({ opacity: 1 }, { duration: 300, delay: 50, queue: false });
            $back.css({ visibility: "visible" })
              .velocity({ opacity: 1 }, { duration: 55, delay: 0, queue: false })
              .velocity({ scaleX: scaleFactor, scaleY: scaleFactor }, { duration: 300, delay: 0, queue: false, easing: "easeInOutQuad" });
        };
        timeout = setTimeout( showTooltip, this.props.delay );
    }

    onMouseLeave() {
        started = false;
        const delay = 225;
        clearTimeout( timeout );
        setTimeout( () => {
            [ $target, $back ] = [ $( this.refs.target ), $( this.refs.back ) ];
            $target.velocity({
                opacity: 0, translateY: 0, translateX: 0}, { duration: delay, queue: false });
            $back.velocity({opacity: 0, scaleX: 1, scaleY: 1}, {
                duration: delay,
                queue:    false,
                complete: () => {
                    $back.css({   visibility: "hidden" });
                    $target.css({ visibility: "hidden" });
                    started = false;
                }
            });
          }, delay );
    }

    componentDidMount() {
        this.props.$item.on( "mouseenter", this.onMouseEnter.bind( this ) );
        this.props.$item.on( "mouseleave", this.onMouseLeave.bind( this ) );
    }

    componentWillUnmount() {
        this.props.$item.off( "mouseenter", this.onMouseEnter );
        this.props.$item.off( "mouseleave", this.onMouseLeave );
    }

    render() {
        styles.set( this.state.id, cssinjs() );
        style = styles.get( this.state.id );

        return (
            <tooltip-tip ref="target" style={ style.root } id={ this.state.id }>
                <span dangerouslySetInnerHTML={{ __html: this.props.text }}></span>
                <div ref="back" style={ style.back }></div>
            </tooltip-tip>
        )
    }

}

/**
 * Render
 * 
 * @param {string} class name, e.g. ks-simpread-read
 */
function Render( root ) {
    const $root   = $( `.${root}` );
    $root.find("[data-tooltip]").map( ( idx, item )=>{
        const $item = $(item),
              position = $item.attr( "data-tooltip-position" ),
              delay    = $item.attr( "data-tooltip-delay" ),
              text     = $item.attr( "data-tooltip" );
        ReactDOM.render( <ToolTip text={ text } position={ position} delay={ delay } $item={ $item } />, getTooltipRoot( $root ) );
    });
}

/**
 * Exit
 * 
 * @param {string} Render param
 */
function Exit( root ) {
    $( `.${root}` ).find( "tooltip-tips" ).map( ( idx, item )=>{
        ReactDOM.unmountComponentAtNode( $(item)[0] );
    });
}

/**
 * Create Tooltip root html
 * 
 * @param  {jquery}  jquery object
 * @return {element} html element
 */
function getTooltipRoot( $root ) {
    $root.find( "tooltip-gp" ).length == 0 && $root.append( "<tooltip-gp>" );
    $root.find( "tooltip-gp" ).append( "<tooltip-tips>" );
    return $( "tooltip-tips" ).last()[0];
}

export { Render, Exit };