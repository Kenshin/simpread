/*!
 * React Material Design: List
 * 
 * @version : 0.0.1
 * @update  : 2017/04/17
 * @homepage: https://github.com/kenshin/react-md-ui
 * @license : MIT https://github.com/kenshin/react-md/blob/master/LICENSE
 * @author  : Kenshin Wang <kenshin@ksria.com>
 * 
 * @copyright 2017
 */

console.log( "==== simpread component: List ====" )

let styles = new Map();

const color            = "rgba( 51, 51, 51, .87 )",
      secondary_color  = "rgba( 51, 51, 51, .54 )",
      disable_color    = "rgba( 51, 51, 51, .38 )",
      hover_color      = "rgba( 238, 238, 238, 1 )",
      border_color     = "rgba( 224, 224, 224, 1 )",
      transparent_color= "transparent",
      background_color = "rgba( 255, 255, 255, 1 )";

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

            color,
            fontSize: '1.5rem',
            fontWeight: 700,
        },

        list_item: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            height: '56px',
        },

        pri_item: {},

        pri_item_text: {
            display: 'block',

            minWidth: '40px',
            minHeight: '40px',

            margin: '0 16px',
            padding: 0,

            lineHeight: '40px',
            fontWeight: 600,

            borderRadius: '50%',

            color,
            backgroundColor: transparent_color,
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

            color,
            backgroundColor: transparent_color,
        },

        state_none: {
            width: 0,
            opacity: 0,
            visibility: 'hidden',
            paddingLeft: '72px',
        },

        state_avatar: {
            display: 'block',

            minWidth: '40px',
            minHeight: '40px',

            margin: '0 16px',
            padding: 0,

            lineHeight: '40px',

            borderRadius: '50%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        },

        state_icon: {
            display: 'block',

            minWidth: '24px',
            minHeight: '24px',

            margin: '8px 24px',
            padding: 0,

            lineHeight: '24px',

            borderRadius: '50%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        },

        state_action: {},

        content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
        },

        link: {
            display: '-webkit-box',
            flexShrink: 1,

            WebkitLineClamp: 1,
            '-webkit-box-orient': 'vertical',

            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',

            fontSize: '1.6rem',
            color,
        },

        subtitle: {
            display: '-webkit-box',
            flexShrink: 2,

            WebkitLineClamp: 1,
            '-webkit-box-orient': 'vertical',

            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',

            color: secondary_color,
        },

        action: {
            display: 'block',
            position: 'relative',

            margin: '0 16px 0 0',
            padding: 0,
        },

        action_icon: {
            display: 'block',

            width: '27px',
            height: '27px',

            lineHeight: '27px',

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

            backgroundColor: background_color,

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
            backgroundColor: hover_color,
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

            color,
            fontSize: '1.6rem',

            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',
            lineHeight: '32px',

            cursor: 'pointer',

            transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        },

        hr: {
            margin: '8px 0',
            height: '1px',
            border: 'none',
            backgroundColor: border_color,
        },

        disable: {
            color: disable_color,
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
 *   - priType         : [PropTypes.string] primary   type, include: text, icon, avatar, action, none
 *   - secType         : [PropTypes.string] Secondary type, include: text, icon, avatar, action, none
 *   - priValue        : [PropTypes.any]    primary   value, value tyupe include: string, any
 *   - secValue        : [PropTypes.any]    Secondary value, value tyupe include: string, any
 * 
 *   - events          : [PropTypes.object] events, include:
 *     - priOnClick    : [PropTypes.func]   list item primary onClick event
 *     - secOnClick    : [PropTypes.func]   list item secondary onClick event
 * 
 *     - iconOnClick   : [PropTypes.func]   action icon onClick event
 *     - bgOnClick     : [PropTypes.func]   action bg   onClick event
 *     - itemOnClick   : [PropTypes.func]   action item onClick event
 *     - itemMouseOver : [PropTypes.func]   action item mouse over event
 * 
 *   - action          : [PropTypes.array]  include: id, title, icon, disable, hr
 */
const ListItem = props => {
    const { idx, url, title, desc, style,
            acIconWaves, acItemWaves,
            priType, priValue, secType, secValue,
            action, events } = props,
        content_style = props.contentStyle ? { ...props.contentStyle } : { ...style.content };

    let pri_style = priType == "text" ? { ...style[ `pri_item_${ priType }` ] } : { ...style[ `state_${ priType }` ] },
        sec_style = secType == "text" ? { ...style[ `sec_item_${ secType }` ] } : { ...style[ `state_${ secType }` ] },
        pri_value = [ "avatar", "icon" ].includes( priType ) ? "" : priValue,
        sec_value = [ "avatar", "icon" ].includes( secType ) ? "" : secValue;

    props.priStyle && ( pri_style = { ...props.priStyle } );
    props.secStyle && ( sec_style = { ...props.secStyle } );

    [ "avatar", "icon" ].includes( priType ) && ( pri_style.backgroundImage = `url(${priValue})` );
    [ "avatar", "icon" ].includes( secType ) && ( sec_style.backgroundImage = `url(${secValue})` );
    priType == "none" && ( pri_style = { ...pri_style, ...style.state_none } );
    secType == "none" && ( sec_style = { ...sec_style, ...style.state_none } );

    props.priBgColor && ( pri_style.backgroundColor = props.priBgColor );
    props.secBgColor && ( sec_style.backgroundColor = props.secBgColor );

    const actionItems = action ? action.map( item => {
        const { id, title, disable, hr } = item,
                root = disable ? { ...style.action_item, ...style.disable } : { ...style.action_item };
        return <action-group>
                    <action-item style={ root } id={ id } class={ acItemWaves }
                                 onClick={ !disable && ( (e,d)=>events.itemOnClick( event, props )) }
                                 onMouseOver={ ()=>events.itemMouseOver() }>
                                 { title }
                    </action-item>
                    { hr && <hr style={ style.hr }/> }
                </action-group>
        }) : undefined;
    return (
        <list-item idx={ idx } style={ style.list_item }>
            <pri-item style={ pri_style } onClick={ (e,d)=>events.priOnClick( event, props ) }>{ pri_value }</pri-item>
            <content style={ content_style }>
                <a style={ style.link } href={ url } target="_blank">{ title }</a>
                <subtitle style={ style.subtitle }>{ desc }</subtitle>
            </content>
            <sec-item style={ sec_style } onClick={ (e,d)=>events.secOnClick( event, props ) }>{ sec_value }</sec-item>
            <action style={ style.action }>
                <action-icon style={ style.action_icon } class={ acIconWaves } onClick={ ()=>events.iconOnClick() }></action-icon>
                <action-items style={ style.action_items }>
                    { actionItems }
                </action-items>
                <action-bg style={ style.action_bg } onClick={ ()=>events.bgOnClick() }></action-bg>
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

    static defaultProps = {
        title       : "",

        items       : [],
        actionItems : [],

        acIconWaves : "",
        acItemWaves : "",

        priStyle    : undefined,
        secStyle    : undefined,
        contentStyle: undefined,

        priBgColor  : "",
        secBgColor  : "",

    };

    static PropTypes = {
       title       : React.PropTypes.string,

       items       : React.PropTypes.array,
       actionItems : React.PropTypes.array,

       onAction    : React.PropTypes.func,

       acIconWaves : React.PropTypes.string,
       acItemWaves : React.PropTypes.string,

       priStyle    : React.PropTypes.object,
       secStyle    : React.PropTypes.object,
       contentStyle: React.PropTypes.object,

       priBgColor  : React.PropTypes.string,
       secBgColor  : React.PropTypes.string,
    };

    state = {
        id : Math.round(+new Date()),
    };

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

    priOnClick( event, data ) {
        console.log( "priOnClick", event, data )
        this.props.priOnClick && this.props.priOnClick( event, data );
    }

    secOnClick( event, data ) {
        console.log( "secOnClick", event, data )
        this.props.secOnClick && this.props.secOnClick( event, data );
    }

    render() {
        const style = { ...cssinjs() };
        styles.set( this.state.id, style );

        const { items, title, actionItems, ...others } = this.props,
              list = items.map( item => {
            const events = {
                iconOnClick  : () => this.acIconOnClick(),
                bgOnClick    : () => this.acBgOnClick(),
                itemOnClick  : ( e, d ) => this.acItemOnClick( e, d ),
                itemMouseOver: () => this.acItemMouseOver(),
                priOnClick   : ( e, d ) => this.priOnClick( e, d ),
                secOnClick   : ( e, d ) => this.secOnClick( e, d ),
            };
            return <ListItem { ...item } { ...others } action={ actionItems } events={ events } style={{ ...style }} />
        });
        return (
            <list style={ style.root }>
                <list-header style={ style.header }>{ title }</list-header>
                { list }
            </list>
        )
    }
}