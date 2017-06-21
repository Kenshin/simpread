/*!
 * React Material Design: Tabs
 * 
 * @version : 0.0.1
 * @update  : 2017/04/07
 * @homepage: https://github.com/kenshin/react-md-ui
 * @license : MIT https://github.com/kenshin/react-md/blob/master/LICENSE
 * @author  : Kenshin Wang <kenshin@ksria.com>
 * 
 * @copyright 2017
 */

console.log( "==== simpread component: Tabs ====" )

let styles = new Map();

const color           = 'rgba(255, 255, 255, .7)',
      secondary_color = "rgba(204, 204, 204, 1)",
      active_color    = 'rgba(255, 255, 255, 1)',
      header_corlor   = 'transparent';

const cssinjs = () => {
    const styles = {

        root: {
            display: 'block',
            width: '100%',
        },

        header: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-end',

            position: 'relative',

            width: '100%',

            backgroundColor: header_corlor,
        },

        label: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            position: 'relative',

            padding: '0 24px',

            width: '100%',
            height: '48px',

            color,
            backgroundColor: 'transparent',

            fontSize: '1.4rem',
            textTransform: 'uppercase',

        },

        label_active: {
            color: active_color,
            fontWeight: 500,
        },

        link: {
            color: 'inherit',
            backgroundColor: 'transparent',

            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            textDecoration: 'none',
        },

        link_disable: {
            color: secondary_color,
            cursor: 'not-allowed',
        },

        link_icon: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },

        icon: {
            display: 'block',

            width: '24px',
            height: '24px',

            border: 'none',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        },

        border: {
            display: 'block',
            position: 'absolute',

            left: 0,
            bottom: 0,

            width: '100%',
            height: '4px',

            backgroundColor: '#EEFF41',

            transform: 'scaleX(0)',
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        },

        border_active: {
            transform: 'scaleX(1)',
        },

        shadow: {
            display: 'block',
            position: 'absolute',

            left: 0,
            bottom: 0,

            width: '100%',
            height: '4px',

            boxShadow: '0 1px 2px rgba(0, 0, 0, .12), 0 2px 2px rgba(0, 0, 0, .26)',
        },

        groups: {
            display: 'block',
            width: '100%',
        },

        group: {
            display: 'none',
        },

        group_active: {
            display: 'block',
            opacity: 1,
        }

    };
    
    return styles;
}

/**
 * TabLabel react stateless component
 * 
 * @param {object} props, include:
 *   - idx             : [PropTypes.number] index
 *   - name            : [PropTypes.string] name
 *   - value           : [PropTypes.string] value
 *   - icon            : [PropTypes.string] icon path
 *   - active          : [PropTypes.bool]   active
 *   - route           : [PropTypes.string] <a> href value
 *   - disable         : [PropTypes.string] disable
 *   - style           : [PropTypes.object] tab-label style, include: label, border, link, label_active, border_active
 *   - waves           : [PropTypes.string] material waves effect
 *   - tooltip         : [PropTypes.string] tooltip
 *   - onClick         : [PropTypes.func]   onClick event
 */
const TabLabel = ( props ) => {
    const route     = !props.route || props.route == "" ? "#" : props.route,
          disable   = props.disable ? true : false,
          tooltip   = props.tooltip.text ? props.tooltip.text : props[ props.tooltip.target ],
          style     = props.style,
          target    = !route.startsWith( "#" ) ? "_blank" : undefined;
    props.active  && ( style.label  = { ...style.label, ...style.label_active } );
    props.active  && ( style.border = { ...style.border, ...style.border_active } );
    props.disable && ( style.link   = { ...style.link, ...style.link_disable } );
    if ( props.icon && props.icon != "" ) {
        style.icon.display = "block";
        style.icon.backgroundImage = `url(${props.icon})`;
        style.link = { ...style.link, ...style.link_icon };
    } else {
        style.icon.display = "none";
    }
    return (
        <tab-label style={ style.label } class={ props.waves } active={ props.active } onClick={ !disable && ( ()=>props.onClick() )}>
            <a style={ style.link }
               id={ props.idx } href={ route } target={ target }
               data-tooltip={ tooltip } data-tooltip-position={ props.tooltip.position } data-tooltip-delay={ props.tooltip.delay }
               value={ props.value }
               disabled={ disable }>
               <tab-icon style={ style.icon }></tab-icon>
               { props.name }
               </a>
            <tab-border style={ style.border }></tab-border>
        </tab-label>
    );
}

/**
 * Custom <a> tag component: Tabs, component e.g.
 * 
    <tabs>
        <tab-header>
            <tab-label class="tabactive">
                <a href="#">共通</a>
                <tab-border class="borderactive"></tab-border>
            </tab-label>
            <tab-label>
                <a href="#">聚焦模式</a>
                <tab-border></tab-border>
            </tab-label>
            <tab-shadow></tab-shadow>
        </tab-header>
        <tab-groups>
            <tab-group class="groupactive">
                aaa
            </tab-group>
            <tab-group>
                bbb
            </tab-group>
        </tab-groups>
    </tabs>
 * 
 * Reference:
 * - https://material.io/guidelines/components/tabs.html
 * - http://www.material-ui.com/#/components/tabs
 * 
 * @class
 */
export default class Tabs extends React.Component {

    static defaultProps = {
        items    : [],
        color    : "",
        activeColor: "",
        bgColor    : "",
        headerStyle: undefined,
        groupsStyle: undefined,
        borderStyle: undefined,
        waves    : "",
        tooltip  : "",
    };

    static propTypes = {
        items    : React.PropTypes.array,
        color    : React.PropTypes.string,
        activeColor : React.PropTypes.string,
        bgColor     : React.PropTypes.string,
        headerStyle : React.PropTypes.object,
        groupsStyle : React.PropTypes.object,
        borderStyle : React.PropTypes.object,
        waves    : React.PropTypes.string,
        tooltip  : React.PropTypes.string,
        onChange : React.PropTypes.func,
    };

    state = {
        id : Math.round(+new Date()),
    }

    componentWillUnmount() {
        $( "tabs" ).remove();
    }

    tabLabelOnClick() {
        let $target = $( event.target );

        if($target.is("tab-label")) {
            const $a = $target.find( "a" );
            $a[0] && $a[0].click();
            return;
        }

        if(!$target.is('a')) { $target = $target.parent(); }

        const href = $target.attr('href');
        if(!href.startsWith( "#" )) { return; }

        const style   = styles.get( this.state.id ),
            idx     = $target.attr( "id" ),
            value   = $target.attr( "value" ),
            name    = $target.text(),
            $prev   = $( "tab-label[active=true]" );

        $( "tab-label[active=true]" )
            .attr( "active", false ).css({ ...style.label })
            .find( "tab-border" ).css({ ...style.border });

        $target.parent().attr( "active", true )
            .css({ ...style.label, ...style.label_active })
            .find( "tab-border" ).css({ ...style.border, ...style.border_active });

        $( "tab-group[active=true]" )
            .attr( "active", false )
            .velocity({ opacity: 0 }, { complete: target => {
                $(target).css({ ...style.group });
                $($( "tab-group" )[idx]).attr( "active", true ).css({ ...style.group, ...style.group_active })
            }});

        this.props.onChange && this.props.onChange( $prev, $target, event );
    }

    render() {
        const style = { ...cssinjs() };
        styles.set( this.state.id, style );

        const { items, color, activeColor, bgColor, headerStyle, groupsStyle, borderStyle, children, ...others } = this.props;

        color       && ( style.label.color = color );
        bgColor     && ( style.header.backgroundColor = bgColor );
        activeColor && ( style.label_active.color = activeColor );

        headerStyle && ( style.header = { ...style.header, ...headerStyle } );
        groupsStyle && ( style.groups = { ...style.groups, ...groupsStyle } );
        borderStyle && ( style.border = { ...style.border, ...borderStyle } );

        const tabLabel  = items && items.map( ( item, idx ) => {
                  const label_style = {
                    label        : style.label,
                    border       : style.border,
                    link         : style.link,
                    link_icon    : style.link_icon,
                    icon         : style.icon,
                    link_disable : style.link_disable,
                    label_active : style.label_active,
                    border_active: style.border_active,
                  };
                  return <TabLabel idx={ idx }
                                   { ...item } { ...others }
                                   style={ label_style }
                                   onClick={ ()=> this.tabLabelOnClick() } />;
              }),
              tabHeader = tabLabel && <tab-header style={ style.header }>{ tabLabel }<tab-shadow style={ style.shadow }></tab-shadow></tab-header>;

        const activeIdx = items.findIndex( item=>item.active),
              tabGroup  = children && children.map( ( item, idx ) => {
                  const group_style = activeIdx == idx ? { ...style.group, ...style.group_active } : { ...style.group };
                  return <tab-group style={ group_style } active={ activeIdx == idx }>{ item }</tab-group>
              }),
              tabGroups = tabGroup && <tab-groups style={ style.groups }>{ tabGroup }</tab-groups>;

        return (
            <tabs style={ style.root }>
                { tabHeader }
                { tabGroups }
            </tabs>
        )
    }
}