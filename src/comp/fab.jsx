console.log( "==== simpread component: Floating Action Button ====" )

let $target, type,
    style, styles = new Map();

const path =  "chrome-extension://ljmlbfffbjjoeknbipaiilcijbbdchne/";
const cssinjs = () => {
    const spec_color = 'rgba(244, 67, 54, 1)',
          normal_color= 'rgba(33, 150, 243, 1)',
          focus_color = 'rgba(198, 40, 40, 1)',
          styles      = {

              root : {
                display: '-webkit-box',
                WebkitBoxAlign: 'center',
                WebkitBoxOrient: 'vertical',
                WebkitBoxDirection: 'reverse',
                position: 'fixed',

                bottom: '45px',
                right: '24px',

                width: 'auto',
                height: 'auto',
              },

              origin : {
                display: 'block',
                position: 'relative',

                margin: '0 0 15px',
                padding: 0,

                width: '40px',
                height: '40px',
                lineHeight: '40px',

                color: '#fff',
                //backgroundColor: normal_color,

                borderRadius: '50%',

                cursor: 'pointer',
                boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)',
              },

              large : {
                width: '56px',
                height: '56px',
                lineHeight: '56px',
              },

              spec: {},
              normal: {},

              spec_item : {
                backgroundColor: spec_color,
                transform: 'rotate(0deg)',
              },

              spec_focus : {
                  backgroundColor: focus_color,
                  transition: 'all 450ms 0ms',
                  transform: 'rotate(45deg)',
              },

              normal_focus : {
                  transition: 'all 450ms 0ms',
                  boxShadow: '0 3px 3px 0 rgba(0,0,0,0.14), 0 1px 7px 0 rgba(0,0,0,0.12), 0 3px 1px -1px rgba(0,0,0,0.2)',
              },

              spec_icon: {},
              normal_icon: {},

              icon : {
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
              },

              ul : {
                display: '-webkit-flex',
                flexFlow: 'column nowrap',

                listStyle: 'none',

                padding: 0,
                margin: 0,
              },

          };
    return styles;
};

const Button = ( props ) => {
    props.icon[0].backgroundImage = `url(${props.icon[1]})`;
    if ( props.color ) {
        props.style.backgroundColor = props.color;
    }
    return (
        <a style={ props.style }>
            <i 
                id={ props.id }
                type={ props.type }
                name={ props.name }
                color={ props.color }
                style={ props.icon[0] }
                onClick={ ()=>props.onClick() }
                onMouseOver={ ()=> props.onMouseOver() }
                onMouseOut={ ()=> props.onMouseOut() }
            ></i>
        </a>
    )
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
        const type = $( event.target ).attr( "id" );
        if ( this.props.onAction ) this.props.onAction( event, type );
    }

    mouseOverHandler() {
        style = styles.get( this.state.id );
        $target = $( event.target );
        type    = $target.attr( "type" );
        if ( type == "spec" ) {
            $target.parent().css({ ...style.spec, ...style.spec_focus });
        } else {
            $target.parent().css({ ...style.normal, ...style.normal_focus });
        }
    }

    mouseOutHandler() {
        style = styles.get( this.state.id );
        $target = $( event.target );
        type    = $target.attr( "type" );
        const color = $target.attr( "color" );
        if ( type == "spec" ) {
            $target.parent().css({ ...style.origin, ...style.large, ...style.spec_item });
        } else {
            if ( color ) style.origin.backgroundColor = color;
            $target.parent().css({ ...style.origin });
        }
    }

    render() {
        styles.set( this.state.id, cssinjs() );
        style = styles.get( this.state.id );

        style.spec = { ...style.origin, ...style.large, ...style.spec_item };
        style.spec_icon = { ...style.icon };

        const props = {
            onClick    : ()=>this.clickHandler(),
            onMouseOver: ()=>this.mouseOverHandler(),
            onMouseOut : ()=>this.mouseOutHandler(),
        };

        return (
            <fab style={ style.root }>
                <Button id={ "exit" } name={"退出"} icon={ [style.spec_icon, `${path}assets/images/exit_icon.png`] } type={ "spec" } style={ style.spec } { ...props }/>
                <Button id={ "more" } name={"更多"} icon={ [style.icon, `${path}assets/images/more_icon.png` ] } color="rgba(33, 150, 243, 1)" type={ "normal" } style={ style.origin } { ...props }/>
                <ul style={ style.ul }>
                    <li><Button id={ "fontsize" } name={"字体大小"} icon={ [style.icon, `${path}assets/images/fontsize_icon.png` ] } color="#9E9E9E" type={ "normal" } style={ style.origin } { ...props }/></li>
                    <li><Button id={ "setting"  } name={"设定"} icon={ [style.icon, `${path}assets/images/setting_icon.png`  ] } color="#FF5722" type={ "normal" } style={ style.origin } { ...props }/></li>
                </ul>
            </fab>
        )
    }

}