/*!
 * React Material Design: FAP( Floating Action Panel )
 * 
 * @version : 0.0.1.1231
 * @update  : 2018/04/19
 * @homepage: https://github.com/kenshin/mduikit
 * @license : MIT https://github.com/kenshin/mduikit/blob/master/LICENSE
 * @author  : Kenshin Wang <kenshin@ksria.com>
 * 
 * @copyright 2017
 */

console.log( "==== simpread component: Floating Action Panel ====" )

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
                zIndex: 2,
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

              panel_bg :{
                display: 'none',
                position: 'fixed',

                top: 0,
                left: 0,

                width: '100%',
                height: '100%',
              },

          };
    return styles;
};

const cssinjs_panel = () => {

    const styles = {
          activeColor: 'rgba(0, 137, 123, .8)',
          root : {
              display: '-webkit-flex',
              flexDirection: 'column',

              position: 'absolute',
              right: '32px',
              bottom: '185px',

              minWidth: '380px',
              minHeight: '300px',
              maxWidth: '500px',
              width: '100%',

              margin: 0,
              padding: '39px 24px 0',

              color: 'rgba(0, 0, 0, 0.870588)',
              backgroundColor: 'rgb(255, 255, 255)',

              borderRadius: '3px',

              boxSizing: 'border-box',
              boxShadow: '0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.26)',

              opacity: 0,
              visibility: 'hidden',
              transition: 'opacity 300ms ease',

              zIndex: 2147483647,
          },

          panel_tabs: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',

            fontSize: '14px',

            borderBottom: '2px solid #E0E0E0',
          },

          panel_tab: {
            position: 'relative',
            padding: '0px 24px 5px 24px',
            width: '100%',

            cursor: 'pointer',
          },

          panel_tab_label: {
            display: '-webkit-box',
            flexShrink: 1,

            WebkitLineClamp: 1,
            '-webkit-box-orient': 'vertical',

            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },

          panel_border: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,

            marginBottom: '-2px',

            fontWeight: 500,
            color: '#3273dc',

            borderBottom: '2px solid ',

            transform: 'scaleX(0)',
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
          },

          panel_border_active: {
            transform: 'scaleX(1)',
          },

          groups: {
            display: 'block',
            width: '100%',
            overflowX: 'hidden',
            overflowY: 'auto',
          },

          group: {
            display: 'none',
            padding: '39px 0px 10px',
          },

          group_active: {
            display: 'block',
            opacity: 1,
          },
    }
    return styles;
}

class Panel extends React.Component {

    static defaultProps = {
        items      : [],
        autoHeight : false,
        activeColor: undefined,
    };

    static propTypes = {
        item       : React.PropTypes.array,
        autoHeight : React.PropTypes.bool,
        activeColor: React.PropTypes.string,

        onOpen     : React.PropTypes.func,
        onClose    : React.PropTypes.func,
    };

    style = cssinjs_panel()

    onTabChange( event ) {
        const style   = { ...this.style };
        let   $target = $( event.target ),
              active  = $target.attr( "active" ),
              idx     = $target.attr( "idx" ),
              tag     = event.target.tagName.toLowerCase();
        while ( tag  != "panel-tab" ) {
            $target   = $target.parent();
            active    = $target.attr( "active" );
            idx       = $target.attr( "idx" );
            tag       = $target[0].tagName.toLowerCase();
        }
        if ( active == "false" ) {
            const $others = $( "panel-tab[active=true]" );
            $target.attr( "active", true );
            $target.find( "panel-border" ).css({ ...style.panel_border, ...style.panel_border_active });

            $others.attr( "active", false );
            $others.find( "panel-border" ).css({ ...style.panel_border });

            $( `panel-group[idx=${idx}]`  ).attr( "active", true ).css({ ...style.group, ...style.group_active });
            $( `panel-group[idx!=${idx}]` ).attr( "active", false ).css({ ...style.group });
        }
    }

    autoHeight() {
        let maxHeight = 0;
        $( "panel-groups" ).children().map( ( idx, item ) => {
            if ( maxHeight == 0 ) {
                maxHeight = $(item).height();
            } else if ( $(item).height() > maxHeight ) {
                maxHeight = $(item).height();
            }
        });
        $( "panel-groups" ).height( maxHeight );
    }

    offsetHeight() {
        const $target = $( this.refs.panel ),
              offset  = $target.position().top,
              $groups = $target.find( "panel-groups" ),
              height  = $groups.height();
        if ( offset < 0 ) {
            $groups.height( height + offset - 32 ).css({ "padding-right": "20px" });
        }
    }

    componentDidMount() {
        $( this.refs.panel ).css( "opacity", 1 ).css( "visibility", "visible" );
        this.props.autoHeight == false && this.autoHeight();
        this.offsetHeight();
        this.props.onOpen();
    }

    componentWillUnmount() {
        this.props.onClose();
    }

    render() {
        const style = { ...this.style };

        style.panel_border.borderBottom = style.panel_border.borderBottom + ( this.props.activeColor ? this.props.activeColor : style.activeColor );

        const active_border = { ...style.panel_border, ...style.panel_border_active },
              active_group  = { ...style.group, ...style.group_active },
              events        = this.props.tabAutoSel ? { onMouseEnter: evt => this.onTabChange(evt) } : { onClick: evt => this.onTabChange(evt) },
              tabs          = this.props.items.map( ( item, idx ) => {
                return <panel-tab style={ style.panel_tab } active={ idx == 0 ? "true" : "false" } idx={ idx } { ...events } >
                        <span style={ style.panel_tab_label }>{item}</span>
                        <panel-border style={ idx == 0 ? active_border : { ...style.panel_border } }></panel-border>
                    </panel-tab>;
             }),
             groups         = this.props.children.map( ( child, idx ) => {
                return <panel-group style={ idx == 0 ? active_group : { ...style.group } } active={ idx == 0 ? "true" : "false" } idx={ idx }>{child}</panel-group>;
             });

        return (
            <panel ref="panel" style={ style.root }>
                <panel-tabs style={ style.panel_tabs }>
                    { tabs }
                </panel-tabs>
                <panel-groups style={ style.groups }>
                    { groups }
                </panel-groups>
            </panel>
        )
    }
}

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
 * Custom component: Floating Action Panel, component e.g.
 * 
    <Button id={ "exit" } name={"退出"} icon={ {style.spec_icon, `${path}assets/images/exit_icon.png`} } type={ "spec" }   style={ style.spec } />
    <Button id={ "more" } name={"更多"} icon={ {style.icon, `${path}assets/images/more_icon.png` } }     type={ "anchor" } style={ style.origin } />
    <panel-bg>
        <panel>
            <panel-tabs>
                <panel-tab active="true">
                    <span>设定</span>
                    <panel-border></panel-border>
                </panel-tab>
                <panel-tab>
                    <span>动作</span>
                    <panel-border></panel-border>
                </panel-tab>
                <panel-tab>
                    <span>脚本</span>
                    <panel-border></panel-border>
                </panel-tab>
        </panel-tabs>
            <panel-groups>
                <panel-group>设定</panel-group>
                <panel-group>动作</panel-group>
                <panel-group>脚本</panel-group>
            </panel-groups>
        </panel>
    </panel-bg>
 * 
 * Reference:
 * - https://material.io/guidelines/components/tabs.html
 * - https://bulma.io/documentation/components/tabs/
 * 
 * @class
 */
export default class Fap extends React.Component {

    static defaultProps = {
        items       : [],
        autoHeight  : false,
        activeColor : undefined,
        autoHide    : true,
        tabAutoSel  : true,

        triggerItems: {
            "exit"  : {
                "name": "关闭",
                "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAdklEQVQ4y+WTuQ3AIBAEaQKK8NN/BEUArmccgGyj43MMIZo5TqtFqbUPJxYtbg2OvS44IJQKhguwdUETSiXjXr77KhGICRjihWKm8Dw3KXP4Z5VZ/Lfw7B5kyD1cy5C7uAx5iJcht6vhRTUi4OrC0Szftvi/vAFNdbZ2Dp661QAAAABJRU5ErkJggg==",
            },
            "anchor": {
                "name" : "更多",
                "icon" : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAANElEQVQ4T+3GMQ0AIAwAMAwSEvwLACai3HtmAHq1te8xpnCM6okAu3rigFU9MWxLr/695AI0E1VgH26hCQAAAABJRU5ErkJggg==',
            }
        },
        waves       : undefined,
    };

    static propTypes = {
        item        : React.PropTypes.array,   // panel props
        autoHeight  : React.PropTypes.bool,    // panel props
        activeColor : React.PropTypes.string,  // panel props
        autoHide    : React.PropTypes.bool,    // panel props
        tabAutoSel  : React.PropTypes.bool,    // panel props

        triggerItems: React.PropTypes.object,
        waves       : React.PropTypes.string,

        onOpen      : React.PropTypes.func,
        onClose     : React.PropTypes.func,
        onAction    : React.PropTypes.func,
    }

    style = cssinjs()

    btnClickHandler( event ) {
        const type = $( event.target ).attr( "id" );
        if ( this.props.onAction ) this.props.onAction( event, type );
    }

    btnMouseOverHandler( event ) {
        const style   = { ...this.style },
              $target = $( event.target ),
              type    = $target.attr( "type" ),
              active  = $target.attr( "active" );
        if ( type == "spec" ) {
            $target.parent().css({ ...style.spec, ...style.spec_focus });
        } else {
            this.panelRender( $( this.refs.bg ) );
        }
    }

    btnMouseOutHandler( event ) {
        const style   = { ...this.style },
              $target = $( event.target ),
              type    = $target.attr( "type" ),
              color   = $target.attr( "color" );
        if ( type == "spec" ) {
            $target.parent().css({ ...style.origin, ...style.large, ...style.spec_item });
        }
    }

    panelBgEventHandler( event ) {
        if ( event.target.tagName.toLowerCase() == "panel-bg" ) {
            const $panelbg = $( this.refs.bg ),
                  style    = { ...this.style };
            $panelbg.animate({ opacity: 0 },{
                complete: ()=> {
                    ReactDOM.unmountComponentAtNode( $panelbg[0] );
                    $panelbg.css({ ...style.panel_bg });
                }
            });
        }
    }

    panelRender( $panelbg ) {
        if ( $panelbg.length > 0 ) {
            const style = { ...this.style };
            $panelbg.css({ ...style.panel_bg, ...{ "display": "block" , opacity: 1 }});
            ReactDOM.render( <Panel { ...this.props } onOpen={ ()=>this.onPop( "onOpen" ) } onClose={ ()=>this.onPop( "onClose" ) }/>, $panelbg[0] );
        }
    }

    onPop( type ) {
        this.props[type] && this.props[type]();
    }

    render() {
        const style = { ...this.style };
        style.spec  = { ...style.origin, ...style.large, ...style.spec_item };

        const evt   = this.props.autoHide ? {
            onMouseOver: (e)=> this.panelBgEventHandler(e)
        } : {
            onClick    : (e)=> this.panelBgEventHandler(e)
        };

        const btn_props = ( id, type, style, { name, color, icon }, icon_style, tooltip, waves )=> {
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
        spec   = <Button { ...btn_props( "exit", "spec",     style.spec,   this.props.triggerItems.exit,   style.icon, {target: "name", delay: 50}, this.props.waves ) } />,
        anchor = <Button { ...btn_props( "anchor", "anchor", style.origin, this.props.triggerItems.anchor, style.icon, {target: "name", delay: 50}, this.props.waves ) } />,
        panel  = <panel-bg ref="bg"></panel-bg>;

        return (
            <fap style={ style.root } { ...evt } >
                { spec   }
                { anchor }
                { panel  }
            </fap>
        )
    }

}