console.log( "==== simpread component: Floating Action Button ====" )

let $target, type,
    style, styles = new Map();

const path =  "chrome-extension://ljmlbfffbjjoeknbipaiilcijbbdchne/";
const cssinjs = () => {
    const first_color = 'rgb(244, 67, 54)',
          second_color= 'rgb(33, 150, 243)',
          focus_color = 'rgb(198, 40, 40)',
          styles      = {

              root : {
                position: 'fixed',

                bottom: '45px',
                right: '24px',

                width: 'auto',
                height: 'auto',
              },

              first: {},
              second: {},

              first_item : {
                backgroundColor: first_color,
                transform: 'rotate(0deg)',
              },

              second_item: {
                backgroundColor: second_color,
              },

              normal : {
                display: 'block',
                position: 'relative',

                color: '#fff',

                margin: 0,
                padding: 0,

                borderRadius: '50%',

                cursor: 'pointer',
                boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)',
              },

              large : {
                width: '56px',
                height: '56px',
                lineHeight: '56px',
              },

              small : {
                width: '40px',
                height: '40px',
                lineHeight: '40px',
              },

              first_focus : {
                  backgroundColor: focus_color,
                  transition: 'all 450ms 0ms',
                  transform: 'rotate(45deg)',
              },

              second_focus : {
                  backgroundColor: '#1565C0',
                  transition: 'all 450ms 0ms',
              },

              first_icon: {},
              second_icon: {},

              icon : {
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
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
        $target = $( event.target );
        type    = $target.attr( "type" );
        if ( type == "first" ) {
            $target.parent().css({ ...style.first, ...style.first_focus });
        } else {
            $target.parent().css({ ...style.second, ...style.second_focus });
        }
    }

    mouseOutHandler() {
        style = styles.get( this.state.id );
        $target = $( event.target );
        type    = $target.attr( "type" );
        if ( type == "first" ) {
            $target.parent().css({ ...style.normal, ...style.large, ...style.first_item });
        } else {
            $target.parent().css({ ...style.normal, ...style.small, ...style.second_item });
        }
    }

    render() {
        styles.set( this.state.id, cssinjs() );
        style = styles.get( this.state.id );

        style.first = { ...style.first_item, ...style.normal, ...style.large };
        style.first_icon = { ...style.icon };
        style.first_icon.backgroundImage = `url(${path}assets/images/exit_icon.png)`;

        style.second = { ...style.second_item, ...style.normal, ...style.small };
        style.second_icon = { ...style.icon };
        style.second_icon.backgroundImage = `url(${path}assets/images/more_icon.png)`;

        return (
            <fab style={ style.root }>
                <a style={ style.second }>
                    <i 
                        type="second"
                        style={ style.second_icon } 
                        name={"more"}
                        onClick={ ()=>this.clickHandler() } 
                        onMouseOver={ ()=> this.mouseOverHandler() }
                        onMouseOut={ ()=> this.mouseOutHandler() }
                    ></i>
                </a>
                <a style={ style.first }>
                    <i 
                        type="first"
                        style={ style.first_icon } 
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