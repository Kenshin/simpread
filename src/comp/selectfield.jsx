console.log( "==== simpread component: SelectField ====" )

let style, styles = new Map();

const cssinjs = () => {

    const color       = 'rgba(51, 51, 51, .87)',
          error_color = 'rgba(244, 67, 54, 1)',
          focus_color = 'rgba(0, 137, 123, .8)',
          border_color= 'rgba(224, 224, 224, 1)',
          label_color = 'rgba(0, 0, 0, 0.3)',
          placehoder_color = 'rgba(176, 176, 176, 1)',
          display     = 'block',
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
    };

    state = {
        id    : Math.round(+new Date()),
        value : this.props.value,
    };

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

    render() {

        return (
            <select-field style={ style.root }>
                <select-float style={ style.float }>{ this.props.floatingtext }</select-float>
                <div style={ style.text }>
                    <span style={ style.value }>{ this.state.value }</span>
                    <icon style={ style.icon }></icon>
                </div>
                <div>
                    <select-border style={ style.border }></select-border>
                    <select-state style={ style.state }></select-state>
                </div>
                <select-field-error style={ style.error }>{ this.props.errortext }</select-field-error>
            </select-field>
        )

    }
}