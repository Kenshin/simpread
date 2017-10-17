/*!
 * React Material Design: Button
 * 
 * @version : 0.0.2
 * @update  : 2017/10/14
 * @homepage: https://github.com/kenshin/react-md-ui-ui
 * @license : MIT https://github.com/kenshin/react-md/blob/master/LICENSE
 * @author  : Kenshin Wang <kenshin@ksria.com>
 * 
 * @copyright 2017
 */

console.log( "==== simpread component: Button ====" )

let current = {}, $mask, style, styles = new Map();

const raisedstyle = {
        color           : "rgba(255, 255, 255, .7)",
        backgroundColor : "rgba(0, 137, 123, 1)",
        hoverColor      : "rgba( 255, 255, 255, .4)",
    },
    flatstyle = {
        color           : "rgba(0, 137, 123, .8)",
        backgroundColor : "transparent",
        hoverColor      : "rgba( 153, 153, 153, .4)"
    },
    secondary = {
        flat: {
            opacity: 0.6,
        },
        raised: {
            backgroundColor: "rgba( 153, 153, 153, .2)",
        }
    },
    disable = {
        flat: {
            cursor: "no-drop",
            color: "rgba(0, 0, 0, 0.298039)",
        },
        raised: {
            cursor: "no-drop",
            color: "rgba(0, 0, 0, 0.298039)",
            backgroundColor: "rgb(229, 229, 229)",
            boxShadow: "none",
        }
    }

const cssinjs = () => {
    const styles = {

        root: {},
        normal_root : {
            display: 'block',

            minWidth: '88px',
            height: '36px',

            margin: '6px',
            padding: 0,

            fontFamily: 'sans-serif',
            textDecoration: 'none',

            cursor: 'pointer',

            border: 'none',
            borderRadius: '2px',
        },

        mask: {
            display: '-webkit-flex',
            justifyContent: 'center',
            alignItems: 'center',

            width: '100%',
            height: '100%',

            margin: 0,
            padding: '0 8px',

            border: 'none',
            borderRadius: '2px',
            boxSizing: 'border-box',
            transition: 'all .5s ease-in-out',

            backgroundColor: 'transparent',
        },

        raised: {
            boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)',
        },

        flat: {
            fontWeight: 400,
        },

        span : {
            display: 'flex',
            alignItems: 'center',

            userSelect: 'none',
        },

        text: {
            padding: '0 8px 0',
 
            textDecoration: 'none',
            textAlign: 'center',
            letterSpacing: '.5px',

            fontSize: '15px',
            lineHeight: '1',
        },

        icon: {
            order: -1,
            display: 'block',

            width: '24px',
            height: '24px',

            border: 'none',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        },

        circle: {
            borderRadius: '50%',
        },

    }

    return  styles;
}

/**
 * Custom <a> tag component: Button
 * 
 * Reference:
 * - https://material.io/guidelines/components/buttons.html
 * - https://material.io/guidelines/components/buttons-floating-action-button.html
 * - http://www.material-ui.com/#/components/flat-button
 * - http://www.material-ui.com/#/components/raised-button
 * - http://www.material-ui.com/#/components/icon-button
 * 
 * @class
 */
export default class Button extends React.Component {

    static defaultProps = {
        href    : "javascript:;",
        target  : "_self",
        text    : "",
        disable : false,
        icon    : "",
        order   : "before",
        type    : "flat",
        mode    : "primary",
        shape   : "rect",
        style   : undefined,
        color   : "",
        width   : undefined,
        backgroundColor : "",
        hoverColor : "",
        tooltip : {},
        waves   : undefined,
    }

    static propTypes = {
        href    : React.PropTypes.string,
        target  : React.PropTypes.string,
        text    : React.PropTypes.string,
        disable : React.PropTypes.bool,
        icon    : React.PropTypes.string,
        order   : React.PropTypes.oneOf([ "before", "after" ]),
        type    : React.PropTypes.oneOf([ "flat", "raised" ]),
        mode    : React.PropTypes.oneOf([ "primary", "secondary" ]),
        shape   : React.PropTypes.oneOf([ "rect", "circle" ]),
        style   : React.PropTypes.object,
        width   : React.PropTypes.string,
        color   : React.PropTypes.string,
        backgroundColor : React.PropTypes.string,
        hoverColor : React.PropTypes.string,
        tooltip : React.PropTypes.object,
        waves   : React.PropTypes.string,
        onClick : React.PropTypes.func,
    }

    state = {
        id : Math.round(+new Date()),
        color: ((bool)=>bool ? flatstyle.color : raisedstyle.color)( this.props.type != "raised" ),
        backgroundColor: ((bool)=>bool ? flatstyle.backgroundColor : raisedstyle.backgroundColor)( this.props.type != "raised" ),
        hoverColor: ((bool)=>bool ? flatstyle.hoverColor : raisedstyle.hoverColor)( this.props.type != "raised" ),
    }

    onMouseOver() {
        [ style, $mask ] = [ styles.get( this.state.id ), $( this.refs.mask ) ];
        $mask.css( "background-color", this.state.hoverColor );
    }

    onMouseOut() {
        [ style, $mask ] = [ styles.get( this.state.id ), $( this.refs.mask ) ];
        $mask.css({ ...style.mask });
    }

    onClick( event ) {
        this.props.onClick && this.props.onClick( event );
    }

    componentWillMount() {
        this.props.color != "" && this.setState({ color: this.props.color });
        this.props.backgroundColor != "" && this.setState({ backgroundColor: this.props.backgroundColor });
        this.props.hoverColor != "" && this.setState({ hoverColor: this.props.hoverColor });
    }

    render() {
        styles.set( this.state.id, { ...cssinjs() } );
        style = styles.get( this.state.id );

        current = this.props.type == "raised" ? { ...style.raised } : { ...style.flat };
        current.color = this.state.color;
        current.backgroundColor = this.state.backgroundColor;

        if ( this.props.text == "" && this.props.icon != "" ) {
            delete style.normal_root.minWidth;
            delete style.normal_root.borderRadius;
            style.normal_root.width = style.normal_root.height;
        }

        this.props.shape == "circle" &&
            ( current = { ...current, ...style.circle } );

        this.props.shape == "circle" && this.props.width &&
            ( current.height = this.props.width );

        this.props.mode == "secondary" &&
            Object.keys( secondary[ this.props.type ] ).forEach( key => style.mask[ key ] = secondary[ this.props.type ][ key ] );

        this.props.disable &&
            Object.keys( disable[ this.props.type ] ).forEach( key => current[ key ] = disable[ this.props.type ][ key ] );

        style.root = { ...style.normal_root, ...current };

        this.props.style &&
            ( style.root = { ...style.root, ...this.props.style } );

        this.props.text  == "" && ( style.text.display = "none" );
        this.props.icon  != "" ? ( style.icon.backgroundImage = `url(${this.props.icon})` ) : ( style.icon.display = "none" );
        this.props.order == "after" && ( style.icon.order = 1 );
        this.props.width && ( style.root.width = this.props.width );

        const events = this.props.disable ? {} : {
                onMouseOver : ()=>this.onMouseOver(),
                onMouseOut  : ()=>this.onMouseOut(),
                onClick     : (e)=>this.onClick(e),
        },
        tooltip = this.props.tooltip;

        return (
            <a  style={ style.root }     className={ this.props.waves }
                href={ this.props.href } target={ this.props.target }
                type={ this.props.type } mode={ this.props.mode } 
                data-tooltip={ tooltip.text ? tooltip.text : this.props[ tooltip.target ] } data-tooltip-position={ tooltip.position } data-tooltip-delay={ tooltip.delay }
                { ...events }>
                <button-mask ref="mask" style={ style.mask }>
                    <button-span style={ style.span }>
                        <button-icon style={ style.icon }></button-icon>
                        <button-text style={ style.text }>{ this.props.text }</button-text>
                    </button-span>
                </button-mask>
            </a>
        )
    }
}