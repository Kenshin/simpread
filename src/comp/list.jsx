console.log( "==== simpread component: List ====" )

let styles = new Map();

const color           = 'rgba(255, 255, 255, .7)',
      secondary_color = "rgba(204, 204, 204, 1)",
      active_color    = 'rgba(255, 255, 255, 1)',
      header_corlor   = 'transparent';

const cssinjs = () => {
    const styles = {

        root: {
            display: 'flex',
            flexDirection: 'column',
        },

        header: {
            display: 'block',

            paddingLeft: '72px',

            textAlign: 'left',
            fontSize: '1.5rem',
            fontWeight: 700,
        },

        list_item: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            height: '56px',
        },

        pri_item: {

        },

        pri_item_text: {
            display: 'block',

            minWidth: '40px',
            minHeight: '40px',

            margin: '0 16px',
            padding: 0,

            lineHeight: '40px',
            fontWeight: 600,

            borderRadius: '50%',

            backgroundColor: '#E57373',
        },

        pri_item_avatar: {},
        pri_item_icon: {},
        pri_item_action: {},

        content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
        },

        link: {
            display: '-webkit-box',

            WebkitLineClamp: 1,
            '-webkit-box-orient': 'vertical',

            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',

            fontSize: '1.6rem',
            color: 'inherit',
        },

        subtitle: {
            display: '-webkit-box',

            WebkitLineClamp: 1,
            '-webkit-box-orient': 'vertical',

            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',

            color: 'rgba(0, 0, 0, 0.541176)',
        },

        sec_item: {},

        sec_item_text: {
            display: '-webkit-box',

            WebkitLineClamp: 1,
            '-webkit-box-orient': 'vertical',

            margin: '0 16px',

            minWidth: '50px',

            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        sec_item_icon: {},
        sec_item_action: {},

        action: {
            display: 'block',
            position: 'relative',

            margin: '0 16px 0 0',
            padding: 0,
        },

        action_icon: {
            display: 'block',

            width: '21px',
            height: '21px',

            lineHeight: '21px',

            borderRadius: '50%',

            cursor: 'pointer',

            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfhBAwKJDqU6cY9AAAAgElEQVQ4y+3PsQnCYBRF4U+xcQYRHEcdwLhASOE8avEjSsApBIOWOoFYSRZxgBh8WueU73Lu49Lxnd7ncxrKvPKqmfRbip72zmkZF0ZgGhd2YN0MBi3CykWd33/ZUKpSFhfGYBYXDmAT31A4qfNb/MPD0TUt4sIEzONCCbY6/uIN+soX7VMadxMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDQtMTJUMTA6MzY6NTgrMDg6MDBBhh2RAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA0LTEyVDEwOjM2OjU4KzA4OjAwMNulLQAAAABJRU5ErkJggg==)',
        },

        action_items: {
            display: 'block',
            position: 'absolute',

            top: 0,
            right: 0,

            margin: 0,
            padding: '8px 0',

            minWidth: '150px',

            backgroundColor: '#fff',

            borderRadius: '2px',
            boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',

            opacity: 0,
            transformOrigin: 'left top 0px',
            transform: 'scaleY(0)',
            transition : 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms',

            zIndex: 0,
        },

        action_items_active: {
            opacity: 1,
            transform: 'scaleY(1)',

            zIndex: 100,
        },

        action_items_over: {
            backgroundColor: 'rgb(238, 238, 238)',
            transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        },

        action_bg: {
            display: 'none',
            position: 'fixed',

            top: 0,
            left: 0,

            width: '100%',
            height: '100%',
        },

        action_group: {},

        action_item: {
            display: '-webkit-box',

            WebkitLineClamp: 1,
            '-webkit-box-orient': 'vertical',

            margin: 0,
            padding: '0 24px',

            height: '32px',

            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',

            lineHeight: '32px',
            fontSize: '1.6rem',

            cursor: 'pointer',

            transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        },

        hr: {
            margin: '8px 0',
            height: '1px',
            border: 'none',
            backgroundColor: 'rgb(224, 224, 224)',
        },

        disable: {
            color: secondary_color,
            cursor: 'not-allowed',
        },

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
 * 
 *   - style           : [PropTypes.object] style
 * 
 *   - priType         : [PropTypes.string] primary   type, include: text, icon, action, avatar
 *   - secType         : [PropTypes.string] Secondary type, include: text, icon, action
 *   - priValue        : [PropTypes.any]    primary   value, value tyupe include: string, any
 *   - secValue        : [PropTypes.any]    Secondary value, value tyupe include: string, any
 * 
 *   - action          : [PropTypes.array]  include: id, title, icon, disable, hr
 *   - ac_evt          : [PropTypes.object] action events, include:
 *     - iconOnClick   : [PropTypes.func]   action icon onClick event
 *     - bgOnClick     : [PropTypes.func]   action bg   onClick event
 *     - itemOnClick   : [PropTypes.func]   action item onClick event
 *     - itemMouseOver : [PropTypes.func]   action item mouse over event
 */
const ListItem = props => {
    const { idx, url, title, desc, style,
            priType, priValue, secType, secValue,
            action, ac_evt, create } = props,
          pri_style   = { ...style[ `pri_item_${ priType }` ] },
          sec_style   = { ...style[ `sec_item_${ secType }` ] },
          actionItems = action ? action.map( item => {
            const { id, title, disable, hr } = item;
            const root = disable ? { ...style.action_item, ...style.disable } : { ...style.action_item };
            return <action-group>
                        <action-item style={ root } id={ id }
                                        onClick={ !disable && ( (e,d)=>ac_evt.itemOnClick( event, props )) }
                                        onMouseOver={ ()=>ac_evt.itemMouseOver() }>
                                        { title }
                        </action-item>
                        { hr && <hr style={ style.hr }/> }
                   </action-group>
          }) : undefined;
    return (
        <list-item idx={ idx } style={ style.list_item }>
            <pri-item style={ pri_style }>{ priValue }</pri-item>
            <content style={ style.content }>
                <a style={ style.link } href={ url } target="_blank">{ title }</a>
                <subtitle style={ style.subtitle }>{ desc }</subtitle>
            </content>
            <sec-item style={ sec_style }>{ secValue }</sec-item>
            <action style={ style.action }>
                <action-icon style={ style.action_icon } onClick={ ()=>ac_evt.iconOnClick() }></action-icon>
                <action-items style={ style.action_items }>
                    { actionItems }
                </action-items>
                <action-bg style={ style.action_bg } onClick={ ()=>ac_evt.bgOnClick() }></action-bg>
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
            <pri-item>换</pri-item>
            <content>
                <a href="http://www.cnbeta.com/articles/tech/601485.htm" target="_blank">换壳为本？Nokia 6 银白色版 1499 元起正式开卖</a>
                <subtitle>4 月 4 日的时候，诺基亚官方宣传，将于在 4 月 11 日正式发售全新配色的 Nokia 6 智能手机，即银白色版本，并且从那时起已经正式提供预约服务4 月 4 日的时候，诺基亚官方宣传，将于在 4 月 11 日正式发售全新配色的 Nokia 6 智能手机，即银白色版本，并且从那时起已经正式提供预约服务</subtitle>
            </content>
            <sec-item>2 days</sec-item>
            <action>
                <action-icon></action-icon>
                <action-items>
                    <action-group>
                        <action-item>发送到 Pocket</action-item>
                        <hr>
                    </action-group>
                    <action-group>
                        <action-item>删除</action-item>
                    </action-group>
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
        const style = styles.get( this.state.id );
        $( event.target ).next().css({ ...style.action_items, ...style.action_items_active });
        $( event.target ).parent().find( "action-bg" ).css( "display", "block" );
    }

    acBgOnClick() {
        const style = styles.get( this.state.id );
        $( event.target )
            .css( "display", "none" )
            .prev().css({ ...style.action_items });
    }

    acItemOnClick( event, data ) {
        const $target = $( event.target ),
              id      = $target.attr( "id" ),
              title   = $target.text(),
              style   = styles.get( this.state.id );
        $target.parent().parent()
            .css({ ...style.action_items })
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
        const style = { ...cssinjs() };
        styles.set( this.state.id, style );

        const { items, title, actionItems } = this.props;
        const list = items.map( item => {
            const events = {
                iconOnClick  : () => this.acIconOnClick(),
                bgOnClick    : () => this.acBgOnClick(),
                itemOnClick  : ( e, d ) => this.acItemOnClick( e, d ),
                itemMouseOver: () => this.acItemMouseOver(),
            };
            return <ListItem { ...item } action={ actionItems } ac_evt={ events } style={{ ...style }} />
        });
        return (
            <list style={ style.root }>
                <list-header style={ style.header }>{ title }</list-header>
                { list }
            </list>
        )
    }
}