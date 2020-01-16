/*!
 * React Material Design: FAB( Floating Action Button )
 * 
 * @version : 0.0.3.0109
 * @update  : 2020/01/09
 * @homepage: https://github.com/kenshin/mduikit
 * @license : MIT https://github.com/kenshin/mduikit/blob/master/LICENSE
 * @author  : Kenshin Wang <kenshin@ksria.com>
 * 
 * @copyright 2017
 */

console.log( "==== simpread component: Floating Action Button ====" )

const cssinjs = () => {
    const spec_color = 'rgba(244, 67, 54, 1)',
          normal_color= 'rgba(245, 82, 70, .8)',
          focus_color = 'rgba(243, 52, 38, .9)',
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

              bg: {
                position: 'fixed',

                bottom: '45px',
                right: 0,

                width: '100px',
                height: '100%',
                zIndex: 2147483647,
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
                backgroundColor: normal_color,

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
                  boxShadow: '0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15)',
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
                position: 'initial',
                flexFlow: 'column nowrap',

                listStyle: 'none',

                padding: 0,
                margin: 0,

                opacity: 0,
                visibility: 'hidden',
                transition: 'opacity 1s ease',
              },

              li : {
                  margin: 0,
              },

              ul_hori: {
                display: '-webkit-flex',
                position: 'absolute',

                flexFlow: 'row nowrap',
                listStyle: 'none',

                right: '48px',
              },

              li_hori : {
                  margin: '0 15px 0 0',
              },

          };
    return styles;
};

/**
 * Button react stateless component
 * 
 * @param {object} react props, include:
 *   - id          : [PropTypes.string] identify
 *   - type        : [PropTypes.string] type, include: sepc, anchor, normal
 *   - style       : [PropTypes.object] <a> style
 *   - name        : [PropTypes.string] name
 *   - color       : [PropTypes.string] background color
 *   - icon        : [PropTypes.object] { style, path }
 *   - tooltip     : [PropTypes.object] tooltip 
 *   - waves       : [PropTypes.string] waves 
 *   - onClick     : [PropTypes.func]   click event handler
 *   - onMouseOver : [PropTypes.func]   mouse over event handler
 *   - onMouseOut  : [PropTypes.func]   mouse out event handler
 */
const Button = ( props ) => {
    props.icon.style.backgroundImage = `url(${props.icon.path})`;
    if ( props.color ) {
        props.style.backgroundColor = props.color;
    } else {
        props.color = props.style.backgroundColor;
    }
    const tooltip =  props.type == "anchor" ? "" : ( props.tooltip.text ? props.tooltip.text : props[ props.tooltip.target ] );
    return (
        <a style={ props.style } className={  props.waves }
           data-tooltip={ tooltip } data-tooltip-position={ props.tooltip.position } data-tooltip-delay={ props.tooltip.delay } >
            <i 
                id={ props.id }
                type={ props.type }
                name={ props.name }
                color={ props.color }
                style={ props.icon.style }
                onClick={ evt=>props.onClick(evt) }
                onMouseOver={ evt=> props.onMouseOver(evt) }
                onMouseOut={ evt=> props.onMouseOut(evt) }
            ></i>
        </a>
    )
};

/**
 * ListView react stateless component
 * 
 * @param {object} react props, include:
 *   - id           : [PropTypes.string] identify
 *   - style        : [PropTypes.object]  <li> style 
 *   - child        : [PropTypes.element] <ul> child
 *   - onMouseLeave : [PropTypes.func]    <li> mouse leave event handler
 *   - btn_props    : [PropTypes.object]  <Button> component props
 */
const ListView = ( props ) => {
    return (
        <li id={ props.id } style={ props.child ? props.style.li : props.style.li_hori } onMouseLeave={ evt=> props.onMouseLeave(evt) }>
            <Button { ...props.btn_props } />
            { props.child && props.child.length > 0 && <ul type="hori" style={{ ...props.style.ul, ...props.style.ul_hori }}>{ props.child }</ul> }
        </li>
    )
};

/**
 * Custom component: Floating action button, component e.g.
 * 
    <Button id={ "exit" } name={"退出"} icon={ {style.spec_icon, `${path}assets/images/exit_icon.png`} } type={ "spec" }   style={ style.spec } />
    <Button id={ "more" } name={"更多"} icon={ {style.icon, `${path}assets/images/more_icon.png` } }     type={ "anchor" } style={ style.origin } />
    <ul style={ style.ul }>
        <li style={ style.li } onMouseLeave={ evt=> this.liMouseLeaveHandler(evt) } >
            <Button id={ "fontsize" } name={"字体大小"} icon={ {style.icon, `${path}assets/images/fontsize_icon.png` } } color="#9E9E9E" type={ "normal" } style={ style.origin } />
            <ul style={{ ...style.ul, ...style.ul_hori }}>
                <li style={ style.li_hori } ><Button id={ "fontsizedown"  } name={"减小"} icon={ {style.icon, `${path}assets/images/fontsize_small_icon.png`  } } color="#9E9E9E" type={ "normal" } style={ style.origin } /></li>
            </ul>
        </li>
        <li style={ style.li } onMouseLeave={ evt=> this.liMouseLeaveHandler(evt) } >
            <Button id={ "weight" } name={"版面布局"} icon={ {style.icon, `${path}assets/images/weight_icon.png` } } color="#FFEB3B" type={ "normal" } style={ style.origin } />
        </li>
    </ul>
 * 
 * Reference:
 * - https://material.io/guidelines/components/buttons-floating-action-button.html
 * - http://materializecss.com/buttons.html
 * 
 * @class
 */
export default class Fab extends React.Component {

    static defaultProps = {
        items   : {},
        tooltip : {},
        waves   : undefined,
    }

    static propTypes = {
        items    : React.PropTypes.object,
        tooltip  : React.PropTypes.object,
        waves    : React.PropTypes.string,
        onAction : React.PropTypes.func,
    }

    state = {
        keys : [],
        items: {},
    }

    style = cssinjs();

    maxWidth = -1;

    btnClickHandler( event ) {
        const type = $( event.target ).attr( "id" );
        if ( this.props.onAction ) this.props.onAction( event, type );
    }

    btnMouseOverHandler( event ) {
        const $target = $( event.target ),
              type    = $target.attr( "type" ),
              style   = { ...this.style };
        if ( type == "spec" ) {
            $target.parent().css({ ...style.spec, ...style.spec_focus });
        } else {
            $target.parent().css({ ...style.normal, ...style.normal_focus });
            if ( $target.parent().next() && $target.parent().next().is( "ul" ) ) {
                $( this.refs.root ).find( "ul[type=hori]" ).css( "opacity", 0 ).css( "visibility", "hidden" );
                $target.parent().next().css( "opacity", 1 ).css( "visibility", "visible" );
            }
        }
        $( this.refs.root ).width( this.maxWidth + 100 );
    }

    btnMouseOutHandler( event ) {
        const $target = $( event.target ),
              type    = $target.attr( "type" ),
              style   = { ...this.style };
        const color = $target.attr( "color" );
        if ( type == "spec" ) {
            $target.parent().css({ ...style.origin, ...style.large, ...style.spec_item });
        } else {
            if ( color ) style.origin.backgroundColor = color;
            $target.parent().css({ ...style.origin });
        }
    }

    fabMouseOutHandler( event ) {
        const style = { ...this.style };
        $( event.target ).find("fab").find( "ul" ).css( "opacity", 0 ).css( "visibility", "hidden" );
        $( this.refs.root ).css({ ...style.bg });
    }

    liMouseLeaveHandler( event ) {
        return;
        const $target = $( event.target );
        if ( $target.is( "i" ) ) {
            $target.parent().next().css( "opacity", 0 ).css( "visibility", "hidden" );
        } else if ( $target.is( "li" ) ) {
            $target.find("ul").css( "opacity", 0 ).css( "visibility", "hidden" );
        }
    }

    componentWillMount() {
        const keys  = Object.keys( this.props.items ),
              items = { ...this.props.items };
        if ( keys.length > 1 ) {
            keys.splice( 1, 0, "anchor" );
            items[ "anchor" ] = {
                "name" : "更多",
                "icon" : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAANElEQVQ4T+3GMQ0AIAwAMAwSEvwLACai3HtmAHq1te8xpnCM6okAu3rigFU9MWxLr/695AI0E1VgH26hCQAAAABJRU5ErkJggg==',
            }
        }
        this.setState({ keys, items });
    }

    componentDidMount() {
        const $root  = $( "fab" ),
              $ul    = $($root.children()[2]);
        if ( $ul.is("ul") ) {
            $ul.children().map( ( idx, item )=> {
                const $ul = $(item).find( "ul" );
                if ( $ul ) {
                    $ul.width() > this.maxWidth && ( this.maxWidth = $ul.width() );
                    $ul.css( "top", `${idx * $ul.height()}px` );
                }
            });
        }
    }

    componentWillUnmount() {
        this.setState({
            keys : [],
            items: {}
        });
    }

    render() {
        const style = { ...this.style };
        let spec, anchor, others = [];

        const keys = this.state.keys,
              btn_props = ( id, type, style, { name, color, icon }, icon_style, tooltip, waves )=> {
                return {
                    id,
                    type,
                    style,
                    name,
                    color,
                    tooltip,
                    waves,
                    icon       : { style: icon_style, path: icon },
                    onClick    : evt=>this.btnClickHandler(evt),
                    onMouseOver: evt=>this.btnMouseOverHandler(evt),
                    onMouseOut : evt=>this.btnMouseOutHandler(evt),
                };
            },
            list = ( items, key, style, child, tooltip, waves ) => {
                const props = btn_props( key, "normal", style.origin, items, style.icon, tooltip, waves );
                return <ListView id={ key } child={ child } style={ style } btn_props={ props } onMouseLeave={ evt=> this.liMouseLeaveHandler(evt) } />
        };

        if ( keys.length > 0 ) {
            style.spec = { ...style.origin, ...style.large, ...style.spec_item };
            spec = <Button { ...btn_props( keys[0], "spec", style.spec, this.state.items[keys[0]], style.icon, this.props.tooltip, this.props.waves ) } />;
        }

        keys.length > 1 && ( anchor = <Button { ...btn_props( keys[1], "anchor", style.origin, this.state.items[keys[1]], style.icon, this.props.tooltip, this.props.waves ) } /> );

        for( let idx = keys.length - 1; idx >= 2; idx-- ) {
            const child   = [],
                  items   = this.state.items[ keys[idx] ].items;
            if ( items ) {
                const subkeys = Object.keys( items );
                for ( let j = 0; j < subkeys.length; j++ ) {
                    child.push( list( items[subkeys[j]], subkeys[j], style, undefined, this.props.tooltip, this.props.waves ) )
                }
            }
            others.push( list( this.state.items[keys[idx]], keys[idx], style, child, this.props.tooltip, this.props.waves ));
        }
        others.length > 0 && ( others = ( <ul style={ style.ul }>{ others }</ul> ) );

        return (
            <fab-bg ref="root" style={ style.bg } onMouseLeave={ evt=>this.fabMouseOutHandler(evt) }>
                <fab style={ style.root }>
                    { spec   }
                    { anchor }
                    { others }
                </fab>
            </fab-bg>
        )
    }

}