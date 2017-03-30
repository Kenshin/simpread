console.log( "==== simpread component: Sidebar ====" )

let styles = new Map();

const color           = "#333",
      secondary_color = "rgba(204, 204, 204, 1)",
      background_color= "#fff";

const cssinjs = () => {
    const paddingLeft = '24px',
          height      = '65px',
          borderStyle = '1px solid #e0e0e0',
          styles      = {

        root: {
            display: 'flex',
            flexDirection: 'column',

            position: 'fixed',

            top: 0,
            left: 0,

            width: '256px',
            height: '100%',

            fontSize: '1.4rem',
            fontWeight: 500,

            color,
            backgroundColor: background_color,

            zIndex: 2001,
        },

        header: {
            display: 'flex',
            alignItems: 'center',

            paddingLeft,

            width: '100%',
            height,

            fontSize: '1.6rem',
            textTransform: 'uppercase',

            borderBottom: borderStyle,
        },

        content: {
            display: 'block',
            marginTop: '8px',
            paddingLeft,

            width: '100%',
            height: '100%',
        },

        footer: {
            display: 'flex',
            alignItems: 'center',

            marginTop: '8px',
            paddingLeft,

            width: '100%',
            height,

            borderTop: borderStyle,
        },

        ul: {
            margin: 0,
            padding: 0,

            listStyleType: 'none',
        },

        li: {
            display: 'flex',
            alignItems: 'center',

            minHeight: '40px',
        },

        link: {
            display: 'flex',
            alignItems: 'center',

            width: '100%',

            color,
        },

        icon: {
            display: 'block',

            paddingRight: paddingLeft,

            width: '24px',
            height: '24px',

            border: 'none',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        },

        text: {
            display: 'block',
        },

        mask: {
            position: 'fixed',

            top: 0,
            left: 0,

            width: '100%',
            height: '100%',

            filter: 'alpha(Opacity=50)',
            backgroundColor: 'rgba(0, 0, 0, .5)',

            zIndex: 2000,
        },

    };

    return styles;
}

const Item = ( props ) => {
    !props.icon && ( props.style.icon.display = "none" );
    return (
        <a style={ props.style.link } href="#" name={ props.name } onClick={ ()=>props.onClick() } >
            <icon style={ props.style.icon }></icon>
            <text style={ props.style.text }>{ props.name }</text>
        </a>
    );
};

export default class Sidebar extends React.Component {

    static defaultProps = {
        icon       : undefined,
        header     : undefined,
        footer     : undefined,
        items      : [],
        position   : "left",
        color      : undefined,
        bgColor    : undefined,
        headerStyle: undefined,
        contentStyle: undefined,
        footerStyle: undefined,
        maskStyle  : undefined,
        waves      : "",
        tooltip    : "",
    };

    static propTypes = {
        icon       : React.PropTypes.string,
        header     : React.PropTypes.string,
        footer     : React.PropTypes.string,
        items      : React.PropTypes.array,
        position   : React.PropTypes.oneOf([ "left", "right" ]),
        color      : React.PropTypes.string,
        bgColor    : React.PropTypes.string,
        headerStyle: React.PropTypes.object,
        contentStyle: React.PropTypes.object,
        footerStyle: React.PropTypes.object,
        maskStyle  : React.PropTypes.object,
        waves      : React.PropTypes.string,
        tooltip    : React.PropTypes.string,
    };

    state = {
        id : Math.round(+new Date()),
    }

    onClick() {
        console.log( event.target )
    }

    render() {
        const style = { ...cssinjs() };
        styles.set( this.state.id, style );

        let menu = [];

        const { items, header, icon, footer, color, bgColor, headerStyle, contentStyle, footerStyle, maskStyle } = this.props;

        color   && ( style.text.color = color );
        bgColor && ( style.root.backgroundColor = bgColor );

        headerStyle  && ( style.header  = { ...style.header , ...headerStyle  });
        contentStyle && ( style.content = { ...style.content, ...contentStyle });
        footerStyle  && ( style.footer  = { ...style.footer , ...footerStyle  });
        maskStyle    && ( style.mask    = { ...style.mask,     ...maskStyle    });

        items && ( menu = items.map( ( item, index ) => {
            return (
                <li style={ style.li }>
                    <Item style={ style }
                          icon={ item.icon } name={ item.name } value={ item.value }
                          onClick={ ()=>this.onClick() } />
                </li>
            )
        }) );

        return (
            <sidebar>
                <side style={ style.root }>
                    { header &&
                    <header style={ style.header }>
                        <Item style={ style } icon={ icon } name={ header } onClick={ ()=>this.onClick() }/>
                    </header>
                    }
                    <content style={ style.content }>
                        { menu.length > 0 && <ul style={ style.ul }>{ menu }</ul> }
                    </content>
                    { footer &&
                    <footer style={ style.footer }>
                        <Item style={ style } name={ footer } onClick={ ()=>this.onClick() }/>
                    </footer>
                    }
                </side>
                <mask style={ style.mask }></mask>
            </sidebar>
        )
    }

}
