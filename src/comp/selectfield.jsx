console.log( "==== simpread component: SelectField ====" )

let style, styles = new Map();

const color       = 'rgba(51, 51, 51, .87)',
      error_color = 'rgba(244, 67, 54, 1)',
      focus_color = 'rgba(0, 137, 123, .8)',
      border_color= 'rgba(224, 224, 224, 1)',
      label_color = 'rgba(0, 0, 0, 0.3)',
      placehoder_color = 'rgba(176, 176, 176, 1)',
      selected_color = 'rgb(255, 64, 129)',
      hover_color = 'rgba(238, 238, 238, 1)';

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
            root: {
                font: `300 ${large}/1.8 PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans`,

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
                color: label_color,
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

                fontSize: large,
                fontWeight: 400,
                color: label_color,

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

            state: {},

            state_normal: {
                display,
                position: 'absolute',

                width,
                margin: '-1px 0 0 0',

                borderTop: `none ${focus_color}`,
                borderLeft: `none ${focus_color}`,
                borderRight: `none ${focus_color}`,
                borderBottom: `2px solid ${focus_color}`,
                boxSizing: 'content-box',

                transform: 'scaleX(0)',
                transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            },

            state_focust: {
                transform: 'scaleX(1)',
            },

            state_error : {
                transform: 'scaleX(1)',
                borderTop: `none ${error_color}`,
                borderLeft: `none ${error_color}`,
                borderRight: `none ${error_color}`,
                borderBottom: `2px solid ${error_color}`,
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

                height: '20px',

                margin: 0,
                padding: 0,
            },

            value: {
                display,

                margin,
                padding: '0 20px 0 0',

                textAlign: 'left',
                fontSize: medium,
                lineHeight,
            },

            placeholder: {
                color: placehoder_color,
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

        };

    return styles;
}

const cssinjs_list = () => {

    const styles = {
        hidden : 'none',
        root : {
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
            backgroundColor: 'rgb(255, 255, 255)',

            boxSizing: 'border-box',
            boxShadow: '0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)',
            borderRadius: '2px',

            zIndex: 2100,

            opacity: 1,

            transform: 'scaleY(1)',
            transformOrigin: 'left top 0px',
            transition: 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',

            overflowY: 'auto',
        },

        list_filed: {
            display: 'flex',
            alignItems: 'center',

            padding: '0 16px',

            height: '56px',
            width: '100%',
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
        items           : [],
        icon            : "",
        value           : "",
        info            : "",
        color           : "",
        selectedColor   : "",
        hoverColor      : "",
        backgroundColor : "",
    }

    static propTypes = {
        item            : React.PropTypes.array,
        icon            : React.PropTypes.string,
        value           : React.PropTypes.string,
        info            : React.PropTypes.string,
        color           : React.PropTypes.string,
        selectedColor   : React.PropTypes.string,
        hoverColor      : React.PropTypes.string,
        backgroundColor : React.PropTypes.string,
        onChange        : React.PropTypes.func,
    };

    state = {
        id : Math.round(+new Date()),
    };

    onMouseOver() {
        const $target = $( event.target );
        if ( $target.is( "list-field" ) ) {
            $( "list-field[active=true]" ).css( "background-color", "transparent" ).attr( "active", false );
            $target.attr( "active", true ).css( "background-color", hover_color );
        }
    }

    onClick() {
        this.props.onChange && this.props.onChange( this.refs.value.innerText );
    }

    render() {
        styles.set( this.state.id, cssinjs_list() );
        style = styles.get( this.state.id );

        this.props.items.length == 0 && ( style.root.display = style.hidden );

        const list = this.props.items.map( ( item, idx ) => {
            const [ value_style, icon_style, info_style ] =[ { ...style.list_filed_value }, { ...style.list_filed_icon }, { ...style.list_filed_info } ];
            item.info == "" && ( info_style.display = style.hidden );
            if ( item.icon != "" ) {
                icon_style.backgroundImage = `url(${ item.icon })`;
            } else {
                icon_style.display = style.hidden;
            }
            item.active && ( value_style.color = selected_color );
            return (
                <list-field style={ style.list_filed } onMouseOver={ ()=>this.onMouseOver() } onClick={ ()=>this.onClick() }>
                    <i style={ icon_style }></i>
                    <list-field-value ref="value" style={ value_style }>{ item.value }</list-field-value>
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

export default class SelectField extends React.Component {

    static defaultProps = {
        value        : "",
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
        value        : React.PropTypes.string,
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
        value : this.props.value,
    };

    onClick() {
        this.props.items.length > 0 && this.setState({ items: this.props.items });
    }

    onChange( value ) {
        this.props.onChange && this.props.onChange( value );
    }

    componentWillMount() {
        styles.set( this.state.id, cssinjs() );
        style = styles.get( this.state.id );

        this.props.width && ( style.root.width = this.props.width );

        this.props.floatingtext == "" && ( style.float.display = style.hidden );
        if ( this.state.value   == "" ) {
            this.setState({ value: this.props.placeholder })
            style.value = { ...style.value, ...style.placeholder };
        }

        if ( this.props.disable ) {
            style.root   = { ...style.root, ...style.disable };
            style.border = { ...style.border, ...style.border_disable };
        }

        style.float = this.props.placeholder == "" && this.props.value == "" ? style.float_normal : { ...style.float_normal, ...style.float_focus }
        style.state = this.props.errortext   == "" ? style.state_normal : { ...style.state_normal, ...style.state_error };
    }

    componentDidMount() {
        style = styles.get( this.state.id );
        const $error = $( this.refs.error );
        this.props.errortext != "" &&
            $error.parent().height( Number.parseInt(style.root.height) + $error.height() );
    }

    render() {
        const tooltip = this.props.tooltip;
        return (
            <select-field style={ style.root }
                data-tooltip={ tooltip.text ? tooltip.text : this.props[ tooltip.target ] } data-tooltip-position={ tooltip.position } data-tooltip-delay={ tooltip.delay }>
                <select-float style={ style.float }>{ this.props.floatingtext }</select-float>
                <div style={ style.text }>
                    <span style={ style.value } 
                          className={ this.props.waves }
                          onClick={ ()=> this.onClick() }
                    >{ this.state.value }</span>
                    <icon style={ style.icon }></icon>
                </div>
                <div>
                    <select-border style={ style.border }></select-border>
                    <select-state style={ style.state }></select-state>
                </div>
                <select-field-error ref="error" style={ style.error }>{ this.props.errortext }</select-field-error>
                <ListView items={ this.state.items } onChange={ (v)=>this.onChange(v) } />
            </select-field>
        )

    }
}