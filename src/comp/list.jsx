console.log( "==== simpread component: List ====" )

let styles = new Map();

const color           = 'rgba(255, 255, 255, .7)',
      secondary_color = "rgba(204, 204, 204, 1)",
      active_color    = 'rgba(255, 255, 255, 1)',
      header_corlor   = 'transparent';

const cssinjs = () => {
    const styles = {

    };
    return styles;
}

/**
 * ListItem react stateless component
 * 
 * @param {object} props, include:
 *   - idx             : [PropTypes.number] index
 *   - url             : [PropTypes.string] url
 *   - title           : [PropTypes.string] title
 *   - desc            : [PropTypes.string] subtitle
 *   - action          : [PropTypes.array]  include: id, title, icon, disable, hr
 *   - ac_evt          : [PropTypes.object] action events, include:
 *     - iconOnClick   : [PropTypes.func]   action icon onClick event
 *     - bgOnClick     : [PropTypes.func]   action bg   onClick event
 *     - itemOnClick   : [PropTypes.func]   action item onClick event
 *     - itemMouseOver : [PropTypes.func]   action item mouse over event
 */
const ListItem = props => {
    const { idx, url, title, desc, action, ac_evt } = props;
    const avatar      = title.substr( 0, 1 ),
          actionItems = action ? action.map( item => {
            const { id, title, disable, hr } = item;
            let cls = hr ?  "hr" : "";
            disable && ( cls = cls + " disable" );
            return <action-group>
                        <action-item id={ id } class={ cls }
                                        onClick={ !disable && ( (e,d)=>ac_evt.itemOnClick( event, props )) }
                                        onMouseOver={ ()=>ac_evt.itemMouseOver() }>
                                        { title }
                        </action-item>
                        { hr && <hr/> }
                   </action-group>
          }) : undefined;
    return (
        <list-item idx={ idx }>
            <avatar>{ avatar }</avatar>
            <content>
                <a href={ url } target="_blank">{ title }</a>
                <subtitle>{ desc }</subtitle>
            </content>
            <icon>2 days</icon>
            <action>
                <action-icon onClick={ ()=>ac_evt.iconOnClick() }></action-icon>
                <action-items>
                    { actionItems }
                </action-items>
                <action-bg onClick={ ()=>ac_evt.bgOnClick() }></action-bg>
            </action>
        </list-item>
    );
}

/**
 * Custom <a> tag component: List, component e.g.
 * 
    <list>
        <list-header>未读列表：100 条</list-header>
        <list-item>
            <avatar>换</avatar>
            <content>
                <a href="http://www.cnbeta.com/articles/tech/601485.htm" target="_blank">换壳为本？Nokia 6 银白色版 1499 元起正式开卖</a>
                <subtitle>4 月 4 日的时候，诺基亚官方宣传，将于在 4 月 11 日正式发售全新配色的 Nokia 6 智能手机，即银白色版本，并且从那时起已经正式提供预约服务4 月 4 日的时候，诺基亚官方宣传，将于在 4 月 11 日正式发售全新配色的 Nokia 6 智能手机，即银白色版本，并且从那时起已经正式提供预约服务</subtitle>
            </content>
            <icon>2 days</icon>
            <action>
                <action-icon></action-icon>
                <action-items>
                    <action-item>发送到 Pocket</action-item>
                    <action-item>删除</action-item>
                </action-items>
                <action-bg></action-bg>
            </action>
        </list-item>
    </list>
 * 
 * Reference:
 * - https://material.io/guidelines/components/lists.html
 * - http://www.material-ui.com/#/components/list
 * - chrome://history
 * 
 * @class
 */
export default class List extends React.Component {

    state = {
        id : Math.round(+new Date()),
    }

    acIconOnClick() {
        $( event.target ).next().addClass( "action_items_active" );
        $( event.target ).parent().find( "action-bg" ).css( "display", "block" );
    }

    acBgOnClick() {
        $( event.target )
            .css( "display", "none" )
            .prev().removeClass( "action_items_active" );
    }

    acItemOnClick( event, data ) {
        const $target = $( event.target ),
              id      = $target.attr( "id" ),
              title   = $target.text();
        $target.parent().parent()
            .removeClass( "action_items_active" )
            .next().css( "display", "none" );
        this.props.onAction && this.props.onAction( event, id, title, data )
    }

    acItemMouseOver() {
        const $target = $( event.target );
        if ( $target.is( "action-item" ) ) {
            $( "action-item[active=true]" ).css( "background-color", "transparent" ).attr( "active", false );
            $target
                .attr( "active", true )
                .css( "background-color", "rgb(238, 238, 238)" );
        }
    }

    render() {
        const { items, title, actionItems } = this.props;
        const list = items.map( item => {
            const events = {
                iconOnClick  : () => this.acIconOnClick(),
                bgOnClick    : () => this.acBgOnClick(),
                itemOnClick  : ( e, d ) => this.acItemOnClick( e, d ),
                itemMouseOver: () => this.acItemMouseOver(),
            };
            return <ListItem { ...item } action={ actionItems } ac_evt={ events } />
        });
        return (
            <list>
                <list-header>{ title }</list-header>
                { list }
            </list>
        )
    }
}