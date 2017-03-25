console.log( "==== simpread component: Tabs ====" )

let style, styles = new Map();

const cssinjs = () => {
    const styles = {

    };
    
    return styles;
}

/**
 * TabLabel react stateless component
 * 
 * @param {object} props, include:
 *   - color           : [PropTypes.string] text color
 *   - bgColor         : [PropTypes.string] <tab-label> background color
 *   - name            : [PropTypes.string] name
 *   - value           : [PropTypes.string]  value
 *   - icon            : [PropTypes.string] icon path
 *   - active          : [PropTypes.bool] active
 *   - disable         : [PropTypes.string] disable
 */
const TabLabel = ( props ) => {
    const route     = !props.route || props.route == "" ? "#" : props.route,
          tabactive = props.active  ? "tabactive"    : "",
          bdactive  = props.active  ? "borderactive" : "",
          disable   = props.disable ? true : false;
    return (
        <tab-label class={ tabactive }>
            <a href={ route }
               value={ props.value }
               disabled={ disable }
               onClick={ ()=>props.onClick() }>{ props.name }</a>
            <tab-border class={ bdactive }></tab-border>
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
        bgColor  : "",
        waves    : "",
        tooltips : "",
    };

    static propTypes = {
        items    : React.PropTypes.array,
        color    : React.PropTypes.string,
        bgColor  : React.PropTypes.string,
        waves    : React.PropTypes.string,
        tooltips : React.PropTypes.string,
        onChange : React.PropTypes.func,
    };

    state = {
        id : Math.round(+new Date()),
    }

    tabLabelOnClick() {
        console.log("asdfasdfasdfasdf", $( event.target ).text() , $( event.target ).attr("value") )
    }

    render() {

        const { items, bgColor, children, ...others } = this.props;

        const tabLabel  = items && items.map( item => {
                  return <TabLabel { ...item } { ...others } onClick={ ()=> this.tabLabelOnClick() } />;
              }),
              tabHeader = tabLabel && <tab-header>{ tabLabel }<tab-shadow></tab-shadow></tab-header>;

        const activeIdx = items.findIndex( item=>item.active),
              tabGroup  = children && children.map( ( item, idx ) => {
                  return <tab-group class={ activeIdx == idx ? "groupactive" : "" }>{ item }</tab-group>
              }),
              tabGroups = tabGroup && <tab-groups>{ tabGroup }</tab-groups>;

        return (
            <tabs>
                { tabHeader }
                { tabGroups }
            </tabs>
        )
    }
}