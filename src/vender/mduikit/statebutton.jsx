/*!
 * React Material Design: StateButton
 * 
 * @version : 0.0.2
 * @update  : 2018/06/27
 * @homepage: https://github.com/kenshin/mduikit-ui
 * @license : MIT https://github.com/kenshin/mduikit/blob/master/LICENSE
 * @author  : Kenshin Wang <kenshin@ksria.com>
 * 
 * @copyright 2017
 */

console.log( "==== simpread component: StateButton ====" )

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
    },
    cssinjs = () => {
        const styles = {

            root: {},
            normal_root : {
                display: 'block',

                minWidth: '88px',
                height: '36px',

                margin: 0,
                padding: 0,

                fontFamily: 'sans-serif',
                textDecoration: 'none',

                cursor: 'pointer',

                border: 'none',
                borderRadius: '2px',

                transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
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

            font_icon: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                fontSize: '18px',
                color: '#fff',

                order: -1,
                display: 'block',

                width: '24px',
                height: '24px',

                border: 'none',
            },

        }

        return styles;
    },
    statue_button_style = `
        state-button svg.special {
            position: fixed;
            top: -30px;
            transform: scale(.5);
        }

        state-button .success path {
            animation: 500ms draw-success ease-out;
        }

        @keyframes draw-success {
            0% {
                stroke-dasharray: 49,80;
                stroke-dashoffset: 48;
                opacity: 0;
            }

            50% {
                stroke-dasharray: 49,80;
                stroke-dashoffset: 48;
                opacity: 1;
            }

            100% {
                stroke-dasharray: 130,80;
                stroke-dashoffset: 48;
            }
        }

        state-button .first-line {
            animation: 500ms draw-first-line ease-out;
        }
        
        state-button .second-line {
            animation: 500ms draw-second-line ease-out;
        }
        
        @keyframes draw-first-line {
            0% {
                stroke-dasharray: 0,56;
                stroke-dashoffset: 0;
            }
        
            50% {
                stroke-dasharray: 0,56;
                stroke-dashoffset: 0;
            }
        
            100% {
                stroke-dasharray: 56,330;
                stroke-dashoffset: 0;
            }
        }
        
        @keyframes draw-second-line {
            0% {
                stroke-dasharray: 0,55;
                stroke-dashoffset: 1;
            }
        
            50% {
                stroke-dasharray: 0,55;
                stroke-dashoffset: 1;
            }
        
            100% {
                stroke-dasharray: 55,0;
                stroke-dashoffset: 70;
            }
        }

        state-button svg.warning {
            top: -15px;
            width: 15px;
            height: 70px;
            animation: 0.5s alert-sign-bounce cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        @keyframes alert-sign-bounce {
            0% {
                transform: scale(0);
                opacity: 0;
            }
        
            50% {
                transform: scale(0);
                opacity: 1;
            }
        
            100% {
                transform: scale(1);
            }
        }
`;

class SVG extends React.Component {
    static defaultProps = {
        state       : undefined,
        loadingColor: undefined,
        successColor: undefined,
        failedColor : undefined,
        warningColor: undefined,
    }

    static propTypes = {
        state        : React.PropTypes.string,
        loadingColor : React.PropTypes.string,
        successColor : React.PropTypes.string,
        failedColor  : React.PropTypes.string,
        warningColor : React.PropTypes.string,
    }

    componentWillMount() {
        $( "#mduikit-state-button" ).length > 0 && $( "#mduikit-state-button" ).remove();
        $( "head" ).append(`<style type="text/css" id="mduikit-state-button">${statue_button_style}</style>`);
    }

    render() {

        const loading = `<svg class="loading" width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling">
                            <circle stroke="${this.props.loadingColor}" stroke-width="10" cx="50" cy="50" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" ng-attr-r="{{config.radius}}" ng-attr-stroke-dasharray="{{config.dasharray}}" r="30" stroke-dasharray="141.37166941154067 49.12388980384689" transform="rotate(102 50 50)">
                                <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
                            </circle>
                        </svg>`,
              success = `<svg class="special success" stroke="${this.props.successColor}" stroke-width="10" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg">
                            <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)">
                                <path fill="none" d="M616.306,283.025L634.087,300.805L673.361,261.53"></path>
                            </g>
                        </svg>`,
              failed = `<svg class="special failed" stroke="${this.props.failedColor}" stroke-width="10" stroke-linecap="round">
                            <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-502.652,-204.518)">
                                <path class="first-line" d="M634.087,300.805L673.361,261.53" fill="none"/>
                            </g>
                            <g transform="matrix(-1.28587e-16,-0.79961,0.79961,-1.28587e-16,-204.752,543.031)">
                                <path class="second-line" d="M634.087,300.805L673.361,261.53"/>
                            </g>
                        </svg>`,
              warning = `<svg class="special warning" stroke="${this.props.warningColor}" stroke-width="10" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg">
                            <g transform="matrix(1,0,0,1,-615.516,-257.346)">
                                <g transform="matrix(0.56541,-0.56541,0.56541,0.56541,93.7153,495.69)">
                                    <path class="line" d="M634.087,300.805L673.361,261.53" fill="none"/>
                                </g>
                                <g transform="matrix(2.27612,-2.46519e-32,0,2.27612,-792.339,-404.147)" stroke="none" fill="#fff">
                                    <circle class="dot" cx="621.52" cy="316.126" r="1.318" />
                                </g>
                            </g>
                        </svg>`;
        const states = { loading, success, failed, warning };

        return (
            this.props.state != "init" && <svg-state dangerouslySetInnerHTML={{__html: states[this.props.state] }} ></svg-state>
        )
    }
}

/**
 * Custom <state-button> tag component: StateButton
 * 
 * Reference:
 * - https://material.io/guidelines/components/progress-activity.html
 * - https://github.com/Kamonlojn/svg-icons-animate
 * 
 * @class
 */
export default class StateButton extends React.Component {

    static defaultProps = {
        text    : "",
        disable : false,
        icon    : "",
        fontIcon: "",
        order   : "before",
        type    : "flat",
        mode    : "primary",
        style   : undefined,
        width   : undefined,

        color           : "",
        backgroundColor : "",
        hoverColor      : "",

        loadingColor    : "rgba(255, 255, 255, 1)",
        successColor    : "rgba(255, 255, 255, 1)",
        failedColor     : "rgba(255, 255, 255, 1)",
        warningColor    : "rgba(255, 255, 255, 1)",

        successBgColor  : "rgba(139, 195, 74, 1)",
        failedBgColor   : "rgba(244, 67, 54, 1)",
        warningBgColor  : "rgba(255, 193, 7, 1)",

        tooltip : {},
        waves   : undefined,
    }

    static propTypes = {
        text    : React.PropTypes.string,
        disable : React.PropTypes.bool,
        icon    : React.PropTypes.string,
        fontIcon: React.PropTypes.string,
        order   : React.PropTypes.oneOf([ "before", "after" ]),
        type    : React.PropTypes.oneOf([ "flat", "raised" ]),
        mode    : React.PropTypes.oneOf([ "primary", "secondary" ]),
        style   : React.PropTypes.object,
        width   : React.PropTypes.string,

        color           : React.PropTypes.string,
        hoverColor      : React.PropTypes.string,
        backgroundColor : React.PropTypes.string,

        loadingColor    : React.PropTypes.string,
        successColor    : React.PropTypes.string,
        failedColor     : React.PropTypes.string,
        warningColor    : React.PropTypes.string,

        successBgColor  : React.PropTypes.string,
        failedBgColor   : React.PropTypes.string,
        warningBgColor  : React.PropTypes.string,

        tooltip : React.PropTypes.object,
        waves   : React.PropTypes.string,
        onState : React.PropTypes.func,
    }

    state = {
        state          : "init", // include: init, loading, success, failed, warning

        color          : ((bool)=>bool ? flatstyle.color : raisedstyle.color)( this.props.type != "raised" ),
        backgroundColor: ((bool)=>bool ? flatstyle.backgroundColor : raisedstyle.backgroundColor)( this.props.type != "raised" ),
        hoverColor     : ((bool)=>bool ? flatstyle.hoverColor : raisedstyle.hoverColor)( this.props.type != "raised" ),
    }

    global = {}
    style  = cssinjs()

    changeStateStyle() {
        const $root    = $( this.refs.button ),
              width    = $root.width(),
              svgWidth = $root.find(".special").width() * 0.5,
              padding  = 16,
              left     = ( width - svgWidth ) / 2 - padding;
        $root.find( ".special" ).css({ left });
        this.global.state == "init" && $root.find( "button-span" ).css({ ...this.style.span });
        $root.css({ "background-color": this.global.bgColor[this.global.state] })
             .find( "button-span" ).animate({ opacity: this.global.state == "init" ? 1 : 0 });
    }

    /**
     * Change state
     * 
     * @param {string} @see this.state.state
     */
    changeState( state ) {
        this.global.state = state;
        this.setState({ state });
        this.changeStateStyle();
    }

    onMouseOver() {
        if ( this.global.state == "loading" ) return;
        else if ( [ "success", "failed", "warning" ].includes( this.global.state)) {
            this.changeState( "init" );
        }
        const [ style, $mask ] = [ { ...this.style }, $( this.refs.mask ) ];
        $mask.css( "background-color", this.state.hoverColor );
    }

    onMouseOut() {
        const [ style, $mask ] = [ { ...this.style }, $( this.refs.mask ) ];
        $mask.css({ ...style.mask });
    }

    onClick( event ) {
        if ( this.global.state == "loading" ) return;
        this.props.onState && this.props.onState( this );
    }

    componentWillMount() {
        this.props.color != ""           && this.setState({ color: this.props.color });
        this.props.backgroundColor != "" && this.setState({ backgroundColor: this.props.backgroundColor });
        this.props.hoverColor != ""      && this.setState({ hoverColor: this.props.hoverColor });
    }

    render() {
        const style   = $.extend( true, {}, this.style ),
              current = this.props.type == "raised" ? { ...style.raised } : { ...style.flat };
        current.color = this.state.color;
        current.backgroundColor = this.state.backgroundColor;

        if ( this.props.text == "" && this.props.icon != "" ) {
            delete style.normal_root.minWidth;
            delete style.normal_root.borderRadius;
            style.normal_root.width = style.normal_root.height;
        }

        this.props.mode == "secondary" &&
            Object.keys( secondary[ this.props.type ] ).forEach( key => style.mask[ key ] = secondary[ this.props.type ][ key ] );

        this.props.disable &&
            Object.keys( disable[ this.props.type ] ).forEach( key => current[ key ] = disable[ this.props.type ][ key ] );

        style.root = { ...style.normal_root, ...current };

        this.props.style            && ( style.root = { ...style.root, ...this.props.style } );

        if ( this.props.fontIcon != "" ) {
            style.icon         = { ...style.font_icon };
            style.icon.display = "flex";
            style.icon.color   = style.color;
        } else this.props.icon  != "" ? ( style.icon.backgroundImage = `url(${this.props.icon})` ) : ( style.icon.display = "none" );
        //     this.props.icon  != "" ? ( style.icon.backgroundImage = `url(${this.props.icon})` ) : ( style.icon.display = "none" );
        this.props.text  == ""      && ( style.text.display = "none" );
        this.props.order == "after" && ( style.icon.order = 1 );
        this.props.width            && ( style.root.width = this.props.width );
        this.state.state != "init"  && ( style.span.display = "none" );

        const events = this.props.disable ? {} : {
            onMouseOver : (e)=>this.onMouseOver(e),
            onMouseOut  : (e)=>this.onMouseOut(e),
            onClick     : (e)=>this.onClick(e),
        },
        tooltip      = this.props.tooltip;

        this.global = {
            state       : this.state.state,
            bgColor     : {
                init    : style.root.backgroundColor,
                success : this.props.successBgColor,
                failed  : this.props.failedBgColor,
                warning : this.props.warningBgColor,
            }
        };

        return (
            <state-button ref="button" style={ style.root } class={ this.props.waves }
                type={ this.props.type } mode={ this.props.mode } 
                data-tooltip={ tooltip.text ? tooltip.text : this.props[ tooltip.target ] } data-tooltip-position={ tooltip.position } data-tooltip-delay={ tooltip.delay }
                { ...events }>
                <button-mask ref="mask" style={ style.mask }>
                    <button-svg>
                        <SVG state={ this.state.state } { ...this.props }/>
                    </button-svg>
                    <button-span style={ style.span }>
                        <button-icon style={ style.icon }  dangerouslySetInnerHTML={{__html: this.props.fontIcon }} ></button-icon>
                        <button-text style={ style.text }>{ this.props.text }</button-text>
                    </button-span>
                </button-mask>
            </state-button>
        )
    }
}