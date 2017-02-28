console.log( "==== simpread component: Button ====" )

let style, styles = new Map();

const cssinjs = () => {
    const styles = {
        root : {

            minWidth: '88px',
            height: '36px',

            margin: '6px',
            padding: 0,

            color: '#fff',
            backgroundColor: 'rgba(0, 137, 123, 1)',

            border: 'none',
            borderRadius: '2px',

            cursor: 'pointer',

            boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)',
            transition: 'all .5s ease-in-out .1s',
        },

        mask: {
            display: '-webkit-flex',
            justifyContent: 'center',
            alignItems: 'center',

            width: '100%',
            height: '100%',

            margin: 0,
            padding: '0 16px',

            border: 'none',

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
        type    : "flat",
        text    : "",
        disable : false,
        icon    : "",
        mode    : "primary",
        color   : "rgba(0, 137, 123, 1)",
    }

    static propTypes = {
        type    : React.PropTypes.string,
        text    : React.PropTypes.string,
        disable : React.PropTypes.bool,
        icon    : React.PropTypes.string,
        mode    : React.PropTypes.string,
        color   : React.PropTypes.string,
    }

    state = {
        id : Math.round(+new Date()),
    }

    render() {
        styles.set( this.state.id, cssinjs() );
        style = styles.get( this.state.id );

        return (
            <a style={ style.root }>
                <div style={ style.mask }>
                    <span style={ style.span } >
                        <i></i>
                        { this.props.text }
                    </span>
                </div>
            </a>
        )
    }
}