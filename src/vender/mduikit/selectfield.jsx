/*!
 * React Material Design: SelectField
 * 
 * @version :  0.0.2
 * @update  : 2017/10/14
 * @homepage: https://github.com/kenshin/react-md-ui
 * @license : MIT https://github.com/kenshin/react-md/blob/master/LICENSE
 * @author  : Kenshin Wang <kenshin@ksria.com>
 * 
 * @copyright 2017
 */

console.log( "==== simpread component: SelectField ====" )

let style, styles = new Map();

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
          width       = '100%',
          margin      = '8px 0 0 0',
          medium      = '14px',
          large       = '16px',
          lineHeight  = 1.5,
          fontWeight  = 'bold',
          styles      = {
            hidden : 'none',
            root: {},
            root_normal: {
                display,
                position: 'relative',
                margin: 0,
                padding: 0,

                width,
                height: '45px',
                lineHeight: 1,

                cursor: 'pointer',
                userSelect: 'none',
            },

            disable: {
                color: secondary_color,
                cursor: 'not-allowed',
            },

            border: {
                display,

                width,
                margin,

                borderTop: `none ${border_color}`,
                borderLeft: `none ${border_color}`,
                borderRight: `none ${border_color}`,
                borderBottom: `1px solid ${border_color}`,
                boxSizing: 'content-box',
            },

            border_disable: {
                borderBottom: `1px dashed ${border_color}`,
            },

            float: {},

            float_normal: {
                display,
                position: 'absolute',

                margin,

                fontSize: medium,
                color: secondary_color,

                userSelect: 'none',
                pointerEvents: 'none',

                transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                transform: 'scale(1) translate( 0px, 0px )',
                transformOrigin: 'left top 0px',
            },

            float_focus: {
                color: focus_color,

                margin: `-${margin}`,

                fontSize: medium,
                fontWeight,

                transform: 'scale(0.75) translate( 0px, -8px )',
            },

            error: {
                display,
                position: 'absolute',

                margin,
                width: '110%',

                fontSize: medium,
                fontWeight,
                lineHeight,

                userSelect: 'none',

                color: error_color,
                transform: 'scale(0.75) translate( -80px, 0 )',
            },

            text: {
                display,

                /*height: '20px',*/

                margin: 0,
                padding: 0,
            },

            name: {},
            name_normal: {
                display,

                margin,
                padding: '0 20px 0 0',

                fontFamily: 'sans-serif',
                fontSize: medium,
                textAlign: 'left',
                lineHeight,
            },

            placeholder: {
                color: secondary_color,
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
            minHeight: '100px',
            maxHeight: '718px',

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

            padding: '0 16px',

            height: '56px',
            width: '100%',

            textAlign: 'left',

            boxSizing: 'border-box',
            transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        },

        list_filed_icon: {
            display: 'block',

            width: '24px',
            height: '24px',

            margin: '0 16px 0 0',
            padding: '16px',

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

    state = {
        id : Math.round(+new Date()),
    };

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
        styles.set( this.state.id, cssinjs_list() );
        style = styles.get( this.state.id );

        style.root = this.props.items.length > 1 ? { ...style.root_normal, ...style.open } : { ...style.root_normal };

        const list = this.props.items.map( ( item, idx ) => {
            let [ name_style, icon_style, info_style ] =[ { ...style.list_filed_value }, { ...style.list_filed_icon }, { ...style.list_filed_info } ];
            ( !item.info || item.info == "" ) && ( info_style.display = style.hidden );
            if ( item.icon && item.icon != "" ) {
                icon_style.backgroundImage = `url(${ item.icon })`;
            } else {
                icon_style.display = style.hidden;
            }
            item.name == this.props.active && ( name_style.color = selected_color );
            item.style && item.style.root  && ( style.list_filed = { ...style.list_filed, ...item.style.root });
            item.style && item.style.icon  && ( icon_style       = { ...icon_style, ...item.style.icon });
            item.style && item.style.text  && ( name_style       = { ...name_style, ...item.style.text });
            item.style && item.style.state && ( info_style       = { ...info_style, ...item.style.state });
            return (
                <list-field class={ this.props.waves } style={ style.list_filed } onMouseOver={ (e)=>this.onMouseOver(e) } onClick={ (e)=>this.onClick(e) }>
                    <i style={ icon_style }></i>
                    <list-field-name style={ name_style } value={ item.value }>{ item.name }</list-field-name>
                    <list-field-info style={ info_style }>{ item.info }</list-field-info>
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
 * Custom component: SelectField
 * 
 * Reference: 
 * - https://material.io/guidelines/components/lists-controls.html
 * - http://www.material-ui.com/#/components/select-field
 * 
 * @class
 */
export default class SelectField extends React.Component {

    static defaultProps = {
        name        : "",
        disable      : false,
        width        : undefined,
        placeholder  : "",
        floatingtext : "",
        errortext    : "",
        items        : [],
        waves        : "",
        tooltip      : {},
    };

    static propTypes = {
        name         : React.PropTypes.string,
        disable      : React.PropTypes.bool,
        width        : React.PropTypes.string,
        placeholder  : React.PropTypes.string,
        floatingtext : React.PropTypes.string,
        errortext    : React.PropTypes.string,
        items        : React.PropTypes.array,
        waves        : React.PropTypes.string,
        tooltip      : React.PropTypes.object,
        onChange     : React.PropTypes.func,
    };

    state = {
        id    : Math.round(+new Date()),
        name  : this.props.name,
    };

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

    componentDidMount() {
        style = styles.get( this.state.id );
        const $error = $( this.refs.error );
        this.props.errortext != "" &&
            $error.parent().height( Number.parseInt(style.root.height) + $error.height() );
    }

    render() {
        styles.set( this.state.id, cssinjs() );
        style = styles.get( this.state.id );

        this.props.width              && ( style.root.width = this.props.width );
        this.props.disable            && ( style.border = { ...style.border, ...style.border_disable });
        this.props.floatingtext == "" && ( style.float.display = style.hidden  );

        style.root  = this.props.disable ? { ...style.root_normal, ...style.disable } : { ...style.root_normal };
        style.name  = this.state.name == "" ? { ...style.name_normal, ...style.placeholder } : { ...style.name_normal };
        style.float = this.props.placeholder == "" && this.state.name == "" ? style.float_normal : { ...style.float_normal, ...style.float_focus }

        const tooltip = this.props.tooltip;
        return (
            <select-field style={ style.root }
                data-tooltip={ tooltip.text ? tooltip.text : this.props[ tooltip.target ] } data-tooltip-position={ tooltip.position } data-tooltip-delay={ tooltip.delay }>
                <select-float style={ style.float }>{ this.props.floatingtext }</select-float>
                <div style={ style.text } onClick={ ()=> this.onClick() }>
                    <span style={ style.name } className={ this.props.waves }>
                        { this.state.name == "" ? this.props.placeholder : this.state.name 
                    }</span>
                    <icon style={ style.icon }></icon>
                </div>
                <select-border style={ style.border }></select-border>
                <select-field-error ref="error" style={ style.error }>{ this.props.errortext }</select-field-error>
                <ListView waves={ this.props.waves } active={ this.state.name } items={ this.state.items } onChange={ (v,n)=>this.onChange(v,n) } />
                <list-bg ref="bg" style={ style.bg } onClick={ ()=>this.bgOnClick() }></list-bg>
            </select-field>
        )

    }
}