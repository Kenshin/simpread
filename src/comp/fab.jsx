console.log( "==== simpread component: Floating Action Button ====" )

let style, styles = new Map();

const cssinjs = () => {
    const first_color = 'rgb(244, 67, 54)',
          focus_color = 'rgb(198, 40, 40)',
          styles      = {

              root : {
                position: 'fixed',

                bottom: '45px',
                right: '24px',

                width: 'auto',
                height: 'auto',
              },

              fab : {},

              normal : {
                display: 'block',
                position: 'relative',

                color: '#fff',
                backgroundColor: first_color,

                lineHeight: '56px',

                margin: 0,
                padding: 0,

                borderRadius: '50%',

                cursor: 'pointer',
                boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)',
              },

              large : {
                width: '56px',
                height: '56px',
                transform: 'rotate(0deg)',
              },

              small : {
                width: '40px',
                height: '40px',
              },

              focus : {
                  backgroundColor: focus_color,
                  transition: 'all 450ms 0ms',
                  transform: 'rotate(45deg)',
              },

              icon : {
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: 'url(chrome-extension://ljmlbfffbjjoeknbipaiilcijbbdchne/assets/images/exit_icon.png)',
              },

          };
    return styles;
};

export default class Fab extends React.Component {

    static defaultProps = {
        items : {},
    }

    static propTypes = {
        onAction : React.PropTypes.func,
    }

    state = {
        id : Math.round(+new Date()),
    }

    clickHandler() {
        const type = $( event.target ).attr( "name" );
        if ( this.props.onAction ) this.props.onAction( event, type );
    }

    mouseOverHandler() {
        style = styles.get( this.state.id );
        $( event.target ).parent().css({ ...style.normal, ...style.large, ...style.focus });
    }

    mouseOutHandler() {
        $( event.target ).parent().css({ ...style.normal, ...style.large });
    }

    render() {
        styles.set( this.state.id, cssinjs() );
        style = styles.get( this.state.id );
        style.fab = { ...style.normal, ...style.large };
        return (
            <fab style={ style.root }>
                <a style={ style.fab }>
                    <i 
                        style={ style.icon } 
                        name={"exit"}
                        onClick={ ()=>this.clickHandler() } 
                        onMouseOver={ ()=> this.mouseOverHandler() }
                        onMouseOut={ ()=> this.mouseOutHandler() }
                    ></i>
                </a>
            </fab>
        )
    }

}