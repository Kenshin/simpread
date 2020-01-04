/*!
 * React Material Design: Sidebar
 * 
 * @version : 0.0.4.0104
 * @update  : 2019/12/30
 * @homepage: https://github.com/kenshin/mduikit
 * @license : MIT https://github.com/kenshin/mduikit/blob/master/LICENSE
 * @author  : Kenshin Wang <kenshin@ksria.com>
 * 
 * @copyright 2017
 */

console.log( "==== simpread component: Sidebar ====" )

const color           = "rgb(90, 90, 90)",
      secondary_color = "rgba(204, 204, 204, 1)",
      background_color= "#fff";

const cssinjs = () => {
    const paddingLeft = '24px',
          height      = '65px',
          width       = 256,
          itemHeight  = '40px',
          borderStyle = '1px solid rgba(0, 0, 0, 0.06)',
          styles      = {

        root: {
            display: 'flex',
            flexDirection: 'column',

            position: 'fixed',

            top: 0,
            left: 0 - width,

            width: `${width}px`,
            height: '100%',

            fontSize: '1.4rem',
            fontWeight: 500,

            color,
            backgroundColor: background_color,

            opacity: 0,

            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',

            zIndex: 2001,
        },

        header: {
            display: 'flex',
            alignItems: 'center',

            paddingLeft,
            paddingRight: paddingLeft,

            width: '100%',
            height,

            fontSize: '1.6rem',
            textTransform: 'uppercase',

            borderBottom: borderStyle,
        },

        content: {
            display: 'block',
            position: 'relative',

            width: '100%',
            height: '100%',

            fontSize: '1.3rem',
            overflowY: 'auto',
        },

        footer: {
            display: 'flex',
            alignItems: 'center',

            marginTop: '8px',

            width: '100%',
            height,

            borderTop: borderStyle,
        },

        ul: {
            margin: 0,
            padding: 0,

            width: '100%',

            listStyleType: 'none',
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        },

        ul_sub: {
            marginTop: '-200px',
        },

        li: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',

            position: 'relative',

            minHeight: itemHeight,
        },

        sub_menu: {
            width: '100%',
            overflow: 'hidden',
        },

        dropdown: {
            display: 'block',
            position: 'absolute',

            width: '20px',
            height: '20px',

            top: '10px',
            right: 0,

            border: 'none',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: 'url( data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAeklEQVQ4T2NkoAAwUqCXYThojoyMDGBkZNTHFQ7///+/uHz58g0weRQ/R0ZGTmBkZMzHE4iNy5Yta8CqGSQYGRm5gJGRMR7dgP///y9cvnx5ArI41tBGNwCbRpAhOKMKZgAujXg1gyQjIiIcVqxYcQBXGAyHREJqJgEA2HcpEMZShNsAAAAASUVORK5CYII=)',
        },

        dropup: {
            backgroundImage: 'url( data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAwklEQVQ4T82SPQrCQBCF523ASjxB+nTpFSwFwXqLZQ+hR9gj6CGWLbYWBEsh9unS5wRiJWRHLALmjxRpMu28782bYUATChNYmikspVx6799Dqw3GVkqlAK7MfHDO5X0GvbDWOmbmJxHFRFQCWFtry7ZBB9Zar0IIDwBpLWbmXAixtda+/g0asDFGFEVxA7BrT2Hme5Ike2NMqHsNWCl1BnAcOhAzX5xzpw4spVxEUbQZe5qqqjLv/eenm+mTjK0wKfYXTFs9EN0Ulr4AAAAASUVORK5CYII=)'
        },

        link: {
            display: 'flex',
            alignItems: 'center',

            margin: 0,
            padding: '12px 48px 12px 24px',

            width: '100%',
            minHeight: itemHeight,

            color,
            fontSize: '1.4rem',
        },

        large_link: {
            paddingLeft: 0,
            fontSize: '2.2rem',
        },

        icon: {
            display: 'block',

            marginLeft: '2px',
            marginRight: paddingLeft,

            width: '21px',
            height: '21px',

            border: 'none',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        },

        text: {
            display: 'block',
        },

        mask: {
            display: 'none',
            position: 'fixed',

            top: 0,
            left: 0,

            width: '100%',
            height: '100%',

            opacity: 0,
            filter: 'alpha(Opacity=50)',
            backgroundColor: 'rgba(0, 0, 0, .5)',

            zIndex: 2000,
        },

        font_icon: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            marginRight: '12px',

            fontSize: '18px',
            color: '#9E9E9E',

            order: -1,
            display: 'block',

            width: '24px',
            height: '24px',

            fontSize: '14px',
            border: 'none',
        },

        close_icon: {
            position: 'absolute',
            top: '0',
            left: '-256px',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            width: '48px',
            height: '48px',

            color: '#9E9E9E',
            backgroundColor: '#fff',

            fontSize: '2rem',
            border: 'none',
            cursor: 'pointer',
        },

    };

    return styles;
}

/**
 * React stateless component
 * 
 * @param {object} react props, include:
 *   - large        : [PropTypes.boolean]
 *   - name         : [PropTypes.string] <a> text
 *   - value        : [PropTypes.string] <a> value
 *   - route        : [PropTypes.string] <a> href
 *   - icon         : [PropTypes.string] icon
 *   - fontIcon     : [PropTypes.string] icon
 *   - style        : [PropTypes.object] include: icon link text
 *   - tooltip      : [PropTypes.string] tooltip
 *   - waves        : [PropTypes.string] waves
 *   - onClick      : [PropTypes.func]   event handler
 */
const Item = ( props ) => {
    let icon_style = {}, link_style = { ...props.style.link };
    if ( props.fontIcon ) {
        icon_style         = { ...props.style.font_icon };
        icon_style.display = "flex";
    } else if ( props.icon ) {
        icon_style         = { ...props.style.icon };
        icon_style.display = "block";
        icon_style.backgroundImage = `url(${props.icon })`;
    } else {
        icon_style.display = "none";
    }
    if ( props.large ) {
        link_style = { ...props.style.link, ...props.style.large_link };
    }
    const tooltip = props.tooltip;
    return (
        <a style={ link_style } className={  props.route && props.waves } target={ props.route && props.route.startsWith( "#" ) ? "_self" : "_blank" }
           href={ props.route } value={ props.value }
           data-tooltip={ tooltip.text ? tooltip.text : props[ tooltip.target ] } data-tooltip-position={ tooltip.position } data-tooltip-delay={ tooltip.delay }
           onClick={ props.route && props.onClick && ( evt=>props.onClick(evt)) } >
            <icon style={ icon_style } dangerouslySetInnerHTML={{__html: props.fontIcon || "" }} ></icon>
            <text style={ props.style.text }>{ props.name }</text>
        </a>
    );
};

/**
 * Custom component: Sidebar
 * 
 * Reference:
 * - chrome://md-settings/
 * - https://material.io/guidelines/
 * 
 * @class
 */
class Sidebar extends React.Component {

    static defaultProps = {
        icon       : undefined,
        header     : undefined,
        footer     : undefined,
        width      : "",
        items      : [],
        position   : "left",
        color      : undefined,
        bgColor    : undefined,
        headerStyle: undefined,
        contentStyle: undefined,
        footerStyle: undefined,
        maskStyle  : undefined,
        waves      : "",
        autoClose  : true,
        showClose  : false,
        tooltip    : {},
    };

    static propTypes = {
        icon       : React.PropTypes.string,
        header     : React.PropTypes.string,
        footer     : React.PropTypes.string,
        width      : React.PropTypes.string,
        items      : React.PropTypes.array,
        position   : React.PropTypes.oneOf([ "left", "right" ]),
        color      : React.PropTypes.string,
        bgColor    : React.PropTypes.string,
        headerStyle: React.PropTypes.object,
        contentStyle: React.PropTypes.object,
        footerStyle: React.PropTypes.object,
        maskStyle  : React.PropTypes.object,
        autoClose  : React.PropTypes.bool,
        showClose  : React.PropTypes.bool,
        waves      : React.PropTypes.string,
        tooltip    : React.PropTypes.object,
        onClick    : React.PropTypes.func,
        onExit     : React.PropTypes.func,
    };

    style = cssinjs();

    onClick( event ) {
        let $target = $( event.target );
        while ( !$target.is( "a" ) ) { $target = $target.parent(); }
        const [ name, value, href ] = [ $target.text(), $target.attr( "value" ), $target.attr( "href" ) ];
        $target.parent().parent().find( "a" ).removeClass( "active" );
        $target.addClass( "active" );
        this.props.onClick && this.props.onClick( $target, { name, value, href } );
        this.props.autoClose && this.maskOnClick();
    }

    liOnClick( event ) {
        let $target = $( event.target ), i = 0;
        if ( $target.is( "dropdown" ) ) {
            $target = $target.parent().parent();
        } else if ( $target.is( "sub-menu" ) ) {
            $target = $target.parent();
        } else {
            while ( !$target.is( "a" ) ) {
                if (  i > 10 ) return;
                $target = $target.parent();
                i++;
            }
        }

        $target     = $target.parent();
        const style = { ...this.style },
              $ul   = $target.find( "ul" ),
              state = $target.find( "dropdown" ).attr( "data-state" );

        if ( state == "down" ) {
            $target.find( "dropdown" )
                .attr( "data-state", "up" )
                .css({ ...style.dropdown, ...style.dropup });
            $ul.css({ ...style.ul });
        } else {
            $target.find( "dropdown" )
                .attr( "data-state", "down" )
                .css({ ...style.dropdown });
            style.ul_sub.marginTop = $ul.attr( "data-margin-top" );
            $ul.css({ ...style.ul, ...style.ul_sub });
        }
    }

    maskOnClick( event ) {
        $( "side" ).velocity( { left: 0 - Number.parseInt( $( "side" ).width() ) }, {
            progress: ( elements, complete ) => {
                $( "side" ).css( "opacity", 1 - complete );
                $( "mask" ).css( "opacity", 1 - complete );
            },
            complete: () => {
                $( "sidebar" ).css( "left", 0 - Number.parseInt( $( "side" ).width() ));
                $( "mask" ).css( "display", "none" );
                $( "side close" ).velocity({ left: 0 - Number.parseInt( $( "side" ).width() ) });
                this.props.onExit && this.props.onExit();
            }
        });
    }

    render() {
        let menu    = [];
        const style = { ...this.style },
              { items, width,
                header, icon, footer, showClose,
                color, bgColor,
                headerStyle, contentStyle, footerStyle, maskStyle } = this.props;

        width   && ( style.root.width = width );
        width   && ( style.root.left  = 0 - Number.parseInt( width ) );
        color   && ( style.text.color = color );
        bgColor && ( style.root.backgroundColor = bgColor );

        headerStyle  && ( style.header  = { ...style.header , ...headerStyle  });
        contentStyle && ( style.content = { ...style.content, ...contentStyle });
        footerStyle  && ( style.footer  = { ...style.footer , ...footerStyle  });
        maskStyle    && ( style.mask    = { ...style.mask,     ...maskStyle   });

        const subMenu = items => items.map( item => list( item ) ),
              list    = item  => {
                item.items && item.items.length > 0 &&
                    ( style.ul_sub.marginTop = 0 - item.items.length * Number.parseInt( style.li.minHeight ));
                return (
                    <li style={ style.li } onClick={ item.items && ( evt=>this.liOnClick(evt) ) } >
                        <Item style={ style }
                            waves={ this.props.waves } tooltip={ this.props.tooltip }
                            icon={ item.icon } fontIcon={ item.fontIcon || "" }
                            name={ item.name } value={ item.value } route={ item.route }
                            onClick={ !item.items && ( evt=>this.onClick(evt) ) } />
                        { item.items && item.items.length > 0 &&
                                <sub-menu style={ style.sub_menu }>
                                    <dropdown style={ style.dropdown } data-state="down"></dropdown>
                                    <ul data-margin-top={ style.ul_sub.marginTop }
                                        style={{ ...style.ul, ...style.ul_sub }}>{ subMenu( item.items ) }</ul>
                                </sub-menu> }
                    </li>
                )
        };

        items && ( menu = items.map( item => list( item ) ) );

        return (
            <sidebar>
                <side style={ style.root }>
                    { header &&
                    <header style={ style.header }>
                        <Item style={ style } icon={ icon } name={ header } large={ true }
                              waves={ this.props.waves } tooltip={ this.props.tooltip }
                              onClick={ evt=>this.onClick(evt) }/>
                    </header>
                    }
                    <content style={ style.content }>
                        { menu.length > 0 && <ul style={ style.ul }>{ menu }</ul> }
                    </content>
                    { footer &&
                    <footer style={ style.footer }>
                        <Item style={ style } name={ footer }
                              waves={ this.props.waves } tooltip={ this.props.tooltip }
                              onClick={ evt=>this.onClick(evt) }/>
                    </footer> }
                    {
                        showClose &&
                        <close className={ this.props.waves } style={ style.close_icon } onClick={ ()=>this.maskOnClick() }>
                            <div className="hamburger hamburger--arrow js-hamburger is-active">
                                <div className="hamburger-box">
                                    <div className="hamburger-inner"></div>
                                </div>
                            </div>
                        </close>
                    }
                </side>
                <mask style={ style.mask } onClick={ evt=>this.maskOnClick(evt) }></mask>
            </sidebar>
        )
    }

}

/**
 * Open sidebar
 */
function Open() {
    $( "side" ).velocity( { left: 0 }, {
        progress: ( elements, complete ) => {
            $( "side" ).css( "opacity", complete );
            $( "mask" ).css( "opacity", complete ).css( "display", "block" );
        }
    });
    $( "side close" ).velocity( { left: 256 });
    tocRender();
    activeRender();
}

/**
 * TocRender
 */
function tocRender() {
    if ( $( "sidebar content toc" ).length > 0 ) return;
    const ids = [], tocs = new Map();
    $( "tabs" ).find( "tab-label a" ).map( ( idx, item ) => ids.push( $(item).attr("value") ));
    ids.forEach( ( id, idx ) => {
        const levels = [];
        $($( "tabs tab-group" )[idx]).find( "[data-head-level]" ).map( ( idx, item ) => {
            const $item = $( item ),
                  id    = "sr-toc-" + idx,
                  level = $item.attr( "data-head-level" ),
                  text  = $item.attr( "data-head-title" ) || $item.text();
            levels.push({ id, level, text });
            $item.attr( "id", id );
        });
        tocs.set( id, levels );
    });
    $( "sidebar content" ).find( "a" ).map( ( idx, item ) => {
        let html     = "";
        const $item  = $( item ),
              id     = $item.attr( "value" ),
              levels = tocs.get( id );
        ids[idx] && levels.forEach( value => {
            html += `<outline class="md-waves-effect" data-trigger="${ids[idx]}" data-id="${value.id}" class="toc-level-${ value.level }">${value.text}</outline>`;
        });
        html.length > 0 && $item.after( `<toc><i></i>${html}</to>` );
    });
    $( "sidebar content toc outline" ).on( "click", event => {
        const id      = $( event.currentTarget ).attr( "data-id" ),
              trigger = $( event.currentTarget ).attr( "data-trigger" );
        if ( !location.hash.endsWith( trigger ) ) {
            $( "tabs" ).find( `tab-label a[value=${trigger}]` )[0].click();
        }
        // hack code
        $( "tabs" ).find( "tab-group[active=true]" ).find( "#" + id )[0].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    });
}

/**
 * Active Render
 */
function activeRender() {
    $( "sidebar content" ).find( "a" ).map( ( idx, item ) => {
        const $item  = $( item ),
              id     = $item.attr( "value" );
        if ( location.hash.endsWith( id ) ) {
            $item.addClass( "active" );
        } else {
            $item.removeClass( "active" );
        }
    });
}

export {
    Sidebar,
    Open
}