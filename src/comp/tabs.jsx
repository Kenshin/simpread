console.log( "==== simpread component: Tabs ====" )

let styles = new Map();

const color         = 'rgba(255, 255, 255, .7)',
      active_color  = 'rgba(255, 255, 255, 1)',
      header_corlor = 'transparent';

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

            textDecoration: 'none',
        },

        border: {
            display: 'block',
            position: 'absolute',

            bottom: 0,

            width: '100%',
            height: '4px',

            borderBottom: '4px solid #EEFF41',

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
          style     = props.style;
    props.active && ( style.label  = { ...style.label, ...style.label_active } );
    props.active && ( style.border = { ...style.border, ...style.border_active } );
    return (
        <tab-label style={ style.label }>
            <a style={ style.link } className={ props.waves }
               id={ props.idx } href={ route }
               data-tooltip={ tooltip } data-tooltip-position={ props.tooltip.position } data-tooltip-delay={ props.tooltip.delay }
               value={ props.value }
               disabled={ disable }
               onClick={ ()=>props.onClick() }>{ props.name }</a>
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
        bgColor  : "",
        waves    : "",
        tooltip  : "",
    };

    static propTypes = {
        items    : React.PropTypes.array,
        color    : React.PropTypes.string,
        activeColor : React.PropTypes.string,
        bgColor  : React.PropTypes.string,
        waves    : React.PropTypes.string,
        tooltip  : React.PropTypes.string,
        onChange : React.PropTypes.func,
    };

    state = {
        id : Math.round(+new Date()),
    }

    tabLabelOnClick() {
        const $target = $( event.target ),
              idx     = $target.attr( "id" ),
              value   = $target.attr( "value" ),
              name    = $target.text(),
              $prev   = $( "tab-header" ).find( ".tabactive" );
        $( "tab-label" ).removeClass(  "tabactive"    );
        $( "tab-border" ).removeClass( "borderactive" );
        $( "tab-group" ).removeClass(  "groupactive"  );
        $target.parent().addClass( "tabactive" ).find( "tab-border" ).addClass( "borderactive" );
        $($( "tab-group" )[idx]).addClass( "groupactive" );
        this.props.onChange && this.props.onChange( $prev, event );
    }

    render() {
        const style = { ...cssinjs() };
        styles.set( this.state.id, style );

        const { items, color, activeColor, bgColor, children, ...others } = this.props;

        color       && ( style.label.color = color );
        bgColor     && ( style.header.backgroundColor = bgColor );
        activeColor && ( style.label_active.color = activeColor );

        const tabLabel  = items && items.map( ( item, idx ) => {
                  const label_style = {
                    label        : style.label,
                    border       : style.border,
                    link         : style.link,
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
                  return <tab-group style={ style.group } class={ activeIdx == idx ? "groupactive" : "" }>{ item }</tab-group>
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