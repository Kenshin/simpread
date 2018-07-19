/*!
 * React Material Design: Dropdown
 * 
 * @version : 0.0.3
 * @update  : 2018/06/27
 * @homepage: https://github.com/kenshin/mduikit
 * @license : MIT https://github.com/kenshin/mduikit/blob/master/LICENSE
 * @author  : Kenshin Wang <kenshin@ksria.com>
 * 
 * @copyright 2018
 */

console.log( "==== simpread component: Dropdown ====" )

const color            = 'rgba(51, 51, 51, .87)',
      secondary_color  = 'rgba(204, 204, 204, 1)',

      focus_color      = 'rgba(0, 137, 123, .8)',
      border_color     = 'rgba(224, 224, 224, 1)',
      error_color      = 'rgba(244, 67, 54, 1)',

      selected_color   = 'rgba(255, 64, 129, 1)',
      hover_color      = 'rgba(238, 238, 238, 1)',
      background_color = 'rgba(255, 255, 255, 1)';

const cssinjs = () => {

    const display     = 'block',
          width       = '100px',
          margin      = '8px 0 0 0',
          medium      = '14px',
          large       = '16px',
          lineHeight  = 1.5,
          fontWeight  = 'bold',
          styles      = {
            hidden : 'none',
            root: {},
            root_normal: {
                position: 'relative',

                display: 'flex',
                alignItems: 'center',

                margin: 0,
                padding: 0,

                height: '36px',
                width,
                lineHeight: 1,

                cursor: 'pointer',
                userSelect: 'none',
            },

            disable: {
                color: secondary_color,
                cursor: 'not-allowed',
            },

            text: {
                display,

                margin: 0,
                padding: "8px 24px 8px 0",

                width: '100%',
                textAlign: 'left',
            },

            icon: {
                display: 'block',
                position: 'absolute',

                width: '24px',
                height: '24px',

                top: '6px',
                right: 0,

                border: 'none',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundImage: 'url( data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAABqSURBVEiJ7dQxCsAgDIXhZ8ktgmetVw31GIF06lI0yeIWJyH4f4hgMzOcXNfRegEFFAAAoGA+ROR2A0STmftu7t5ARAYRTS+uqtt4CACAqvYVkomngBWSjQPxG/yR59tnz7X6rgso4DzwAnJQKlbAmFdgAAAAAElFTkSuQmCC)',
            },

            bg: {
                display: 'none',
                position: 'fixed',

                top: 0,
                left: 0,

                width: '100%',
                height: '100%',
            },

        };

    return styles;
}

const cssinjs_list = () => {

    const styles = {
        hidden : 'none',
        root : {},
        root_normal : {
            display: 'block',
            position: 'absolute',

            top: 0,
            left: 0,

            margin: 0,
            padding: 0,

            width: '100%',
            maxHeight: '400px',

            color,
            backgroundColor: background_color,

            boxSizing: 'border-box',
            boxShadow: '0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)',
            borderRadius: '2px',

            zIndex: 2100,

            overflowY: 'auto',

            opacity: 0,
            transform: 'scaleY(0)',
            transformOrigin: 'left top 0px',
            transition : 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        },

        open: {
            opacity: 1,
            transform: 'scaleY(1)',
        },

        list_filed: {
            display: 'flex',
            alignItems: 'center',

            padding: '8px 24px 8px 16px',

            height: '36px',
            width: '100%',

            textAlign: 'left',

            boxSizing: 'border-box',
            transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        },

        list_filed_icon: {
            display: 'block',

            width: '18px',
            height: '18px',

            margin: '0 10px 0 0',
            padding: '10px',

            border: 'none',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        },

        list_filed_value: {
            display: 'inline',
            width: '100%',
            fontSize: 'inherit',
        },

        list_filed_info: {
            display: 'inline',
            padding: '0 0 0 16px',

            fontSize: '13px',
            textAlign: 'right',

            minWidth: '100px',
        },

    }

    return styles;
}

class ListView extends React.Component {

    static defaultProps = {
        waves           : "",
        items           : [],
        active          : "",
    };

    static propTypes = {
        waves           : React.PropTypes.string,
        items           : React.PropTypes.array,
        active          : React.PropTypes.string,
        onChange        : React.PropTypes.func,
    };

    style = cssinjs_list();

    onMouseOver( event ) {
        const $target = $( event.target );
        if ( $target.is( "list-field" ) ) {
            $( "list-field[active=true]" ).css( "background-color", "transparent" ).attr( "active", false );
            $target.attr( "active", true ).css( "background-color", hover_color );
        }
    }

    onClick( event ) {
        let $target = $( event.target );
        while ( !$target.is( "list-field" )) { $target = $target.parent(); }
        setTimeout( ()=>this.props.onChange && this.props.onChange( $target.find( "list-field-name" ).attr( "value" ), $target.find( "list-field-name" ).text() ), 130 );
    }

    render() {
        const style = { ...this.style };
        style.root  = this.props.items.length > 0 ? { ...style.root_normal, ...style.open } : { ...style.root_normal };

        const list = this.props.items.map( ( item, idx ) => {
            let [ name_style, icon_style ] =[ { ...style.list_filed_value }, { ...style.list_filed_icon }];
            if ( item.icon && item.icon != "" ) {
                icon_style.backgroundImage = `url(${ item.icon })`;
            } else {
                icon_style.display = style.hidden;
            }
            item.name == this.props.active && ( name_style.color = selected_color );
            item.style && item.style.root  && ( style.list_filed = { ...style.list_filed, ...item.style.root });
            item.style && item.style.icon  && ( icon_style       = { ...icon_style, ...item.style.icon });
            item.style && item.style.text  && ( name_style       = { ...name_style, ...item.style.text });
            return (
                <list-field class={ this.props.waves } style={ style.list_filed } onMouseOver={ (e)=>this.onMouseOver(e) } onClick={ (e)=>this.onClick(e) }>
                    <i style={ icon_style }></i>
                    <list-field-name style={ name_style } value={ item.value }>{ item.name }</list-field-name>
                </list-field>
            )
        });

        return (
            <list-view style={ style.root }>
                { list }
            </list-view>
        )
    }
}

/**
 * Custom component: Dropdown
 * 
 * Reference: 
 * - https://aboutme.google.com/u/0/?referer=gplus
 * - https://plus.google.com/settings
 * 
 * @class
 */
export default class Dropdown extends React.Component {

    static defaultProps = {
        name        : "",
        disable      : false,
        width        : undefined,
        items        : [],
        waves        : "",
    };

    static propTypes = {
        name         : React.PropTypes.string,
        disable      : React.PropTypes.bool,
        width        : React.PropTypes.string,
        items        : React.PropTypes.array,
        waves        : React.PropTypes.string,
        onChange     : React.PropTypes.func,
    };

    state = {
        name : this.props.name,
    };

    style = cssinjs();

    onClick() {
        !this.props.disable && this.props.items.length > 0 && this.setState({ items: this.props.items });
        !this.props.disable && this.props.items.length > 0 && $( this.refs.bg ).css( "display", "block" );
    }

    bgOnClick() {
        $( this.refs.bg ).css( "display", "none" );
        this.setState({ items : [] });
    }

    onChange( value, name ) {
        this.props.onChange && this.props.onChange( value, name );
        this.setState({
            items : [],
            name,
        });
        $( this.refs.bg ).css( "display", "none" );
    }

    render() {
        const maxwidth = items => {
            items.sort( ( a, b ) => b.name.length - a.name.length );
            return items[0].name.length * 12;
        },
        style = { ...this.style };

        style.root = this.props.disable ? { ...style.root_normal, ...style.disable } : { ...style.root_normal };
        this.props.disable && ( style.border = { ...style.border, ...style.border_disable });

        if ( !this.props.width ) {
            const max = maxwidth( this.props.items ) + 40;
            max >= 100 && ( style.root.width = `${max}px` );
        } else style.root.width = this.props.width;

        return (
            <dropdown style={ style.root }>
                <span style={ style.text } onClick={ ()=> this.onClick() }>
                    { this.state.name == "" ? this.props.name : this.state.name }
                </span>
                <icon style={ style.icon }></icon>
                <ListView waves={ this.props.waves } active={ this.state.name } items={ this.state.items } onChange={ (v,n)=>this.onChange(v,n) } />
                <list-bg ref="bg" style={ style.bg } onClick={ ()=>this.bgOnClick() }></list-bg>
            </dropdown>
        )

    }
}