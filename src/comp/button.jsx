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
        opacity: 0.6
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
        target  : "_blank",
        text    : "",
        disable : false,
        icon    : "",
        order   : "before",
        type    : "flat",
        mode    : "primary",
        color   : "",
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
        current = { backgroundColor : this.state.hoverColor };
        $mask.css({ ...style.mask, ...current });
    }

    onMouseOut() {
        [ style, $mask ] = [ styles.get( this.state.id ), $( this.refs.mask ) ];
        current = this.props.type == "raised" ? { ...style.raised } : { ...style.flat };
        current.color = this.state.color;
        current.backgroundColor = this.state.backgroundColor;
        $mask.css({ ...style.mask, ...current });
    }

    onClick() {
        this.props.onClick && this.props.onClick( event );
    }

    componentWillMount() {
        this.props.color != "" && this.setState({ color: this.props.color });
        this.props.backgroundColor != "" && this.setState({ backgroundColor: this.props.backgroundColor });
        this.props.hoverColor != "" && this.setState({ hoverColor: this.props.hoverColor });
    }

    render() {
        styles.set( this.state.id, cssinjs() );
        style = styles.get( this.state.id );

        current = this.props.type == "raised" ? { ...style.raised } : { ...style.flat };
        current.color = this.state.color;
        current.backgroundColor = this.state.backgroundColor;

        this.props.mode == "secondary" && 
            Object.keys( secondary ).forEach( ( key) => {current[ key ] = secondary[ key ]});

        this.props.disable &&
            Object.keys( disable[ this.props.type ] ).forEach( ( key) => {current[ key ] = disable[ this.props.type ][ key ]});

        style.root = { ...style.normal_root, ...current };

        this.props.text  == "" && ( style.text.display = "none" );
        this.props.icon  != "" ? ( style.icon.backgroundImage = `url(${this.props.icon})` ) : ( style.icon.display = "none" );
        this.props.order == "after" && ( style.icon.order = 1 );

        const events = this.props.disable ? {} : {
                onMouseOver : ()=>this.onMouseOver(),
                onMouseOut  : ()=>this.onMouseOut(),
                onClick     : ()=>this.onClick(),
        },
        tooltip = this.props.tooltip;

        return (
            <a  style={ style.root }     className={ this.props.waves }
                href={ this.props.href } target={ this.props.target }
                type={ this.props.type } mode={ this.props.mode } 
                data-tooltip={ tooltip.text ? tooltip.text : this.props[ tooltip.target ] } data-tooltip-position={ tooltip.position } data-tooltip-delay={ tooltip.delay }
                { ...events }>
                <button-div ref="mask" style={ style.mask }>
                    <button-span style={ style.span }>
                        <button-icon style={ style.icon }></button-icon>
                        <button-text style={ style.text }>{ this.props.text }</button-text>
                    </button-span>
                </button-div>
            </a>
        )
    }
}