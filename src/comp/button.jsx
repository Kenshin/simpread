console.log( "==== simpread component: Button ====" )

let style, styles = new Map();

const raisedstyle = {
        backgroundColor : "rgba(0, 137, 123, 1)",
        hoverColor      : "rgba( 255, 255, 255, .4)",
    },
    flatstyle = {
        backgroundColor : "transparent",
        hoverColor      : "rgba( 153, 153, 153, .2)"
    };

const cssinjs = () => {
    const styles = {
        root : {
            minWidth: '88px',
            height: '36px',

            margin: '6px',
            padding: 0,

            color: '#fff',

            cursor: 'pointer',

            transition: 'all .5s ease-in-out .1s',
        },

        focus: {},

        normal_focus: {
            display: '-webkit-flex',
            justifyContent: 'center',
            alignItems: 'center',

            width: '100%',
            height: '100%',

            margin: 0,
            padding: '0 16px',

            border: 'none',
            borderRadius: '2px',

        },

        raised: {
            backgroundColor : raisedstyle.backgroundColor,
            boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)',
        },

        raised_focus: {
            backgroundColor : raisedstyle.hoverColor,
        },

        flat: {
            backgroundColor : flatstyle.backgroundColor,
        },

        flat_focus: {
            backgroundColor : flatstyle.hoverColor,
        },

        span : {

            textDecoration: 'none',
            textAlign: 'center',
            letterSpacing: '.5px',

            fontSize: '15px',
            lineHeight: '1',

            userSelect: 'none',

        }
    }

    return  styles;
}

export default class Button extends React.Component {

    static defaultProps = {
        href    : "javascript:;",
        target  : "_blank",
        text    : "",
        disable : false,
        icon    : "",
        type    : "raised",
        mode    : "primary",
        color   : "rgba(0, 137, 123, 1)",
        backgroundColor : raisedstyle.backgroundColor,
        hoverColor : raisedstyle.hoverColor,
    }

    static propTypes = {
        href    : React.PropTypes.string,
        target  : React.PropTypes.string,
        text    : React.PropTypes.string,
        disable : React.PropTypes.bool,
        icon    : React.PropTypes.string,
        type    : React.PropTypes.string,
        mode    : React.PropTypes.string,
        color   : React.PropTypes.string,
        backgroundColor : React.PropTypes.string,
        hoverColor  : React.PropTypes.string,
        onClick : React.PropTypes.func,
    }

    state = {
        id : Math.round(+new Date()),
    }

    onClick() {
        this.props.onClick && this.props.onClick( event );
    }

    render() {
        styles.set( this.state.id, cssinjs() );
        style = styles.get( this.state.id );

        if ( this.props.type == "raised" ) {
            style.focus = { ...style.normal_focus, ...style.raised };
        } else {
            style.focus = { ...style.normal_focus, ...style.flat };
        }

        return (
            <a style={ style.root } 
                href={ this.props.href } 
                target={ this.props.target }
                disabled={ this.props.disable }
                onClick={ ()=>this.onClick() }>
                <div style={ style.focus }>
                    <span style={ style.span } >
                        <i></i>
                        { this.props.text }
                    </span>
                </div>
            </a>
        )
    }
}