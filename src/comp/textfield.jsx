console.log( "==== simpread component: TextField ====" )

let $target, $float, $state, $border, $error,
    element, style, err_height,
    styles = new Map();

const [ MIN_ROWS, steps ] = [ 3, 24 ],
      cssinjs = ()=>{

    const color       = 'rgba(51, 51, 51, .87)',
          error_color = 'rgba(244, 67, 54, 1)',
          focus_color = 'rgba(0, 137, 123, .8)',
          border_color= 'rgba(224, 224, 224, 1)',
          label_color = 'rgba(0, 0, 0, 0.3)',
          margin      = '8px 0 0 0',
          display     = 'block',
          medium      = '14px',
          large       = '16px',
          lineHeight  = 1.5,
          fontWeight  = 'bold',
          width       = '100%',
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
            },

            input: {
                color,
                backgroundColor: 'transparent',

                width,
                height: '20px',

                margin,
                padding: 0,

                fontSize: medium,

                border: 'none',
                outline: 'none',

                boxShadow: 'none',
                boxSizing: 'content-box',
                transition: 'all 0.3s',
            },

            textarea : {
                position: 'relative',

                color,
                backgroundColor: 'transparent',

                width,
                height: '60px',

                margin,
                padding: 0,

                fontSize: medium,
                lineHeight,

                cursor: 'inherit',

                border: 'none',
                outline: 'none',
                resize: 'none',

                boxSizing: 'border-box',
                WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                WebkitAppearance: 'textfield',
            },

            border : {
                display,

                width,
                margin,

                borderTop: `none ${border_color}`,
                borderLeft: `none ${border_color}`,
                borderRight: `none ${border_color}`,
                borderBottom: `1px solid ${border_color}`,
                boxSizing: 'content-box',
            },

            float : {},

            float_normal : {
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

            float_focus : {
                color: focus_color,

                margin: `-${margin}`,

                fontSize: medium,
                fontWeight,

                transform: 'scale(0.75) translate( 0px, -8px )',
            },

            float_error : {
                color: error_color,
            },

            state : {},

            state_normal : {
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

            state_focus : {
                transform: 'scaleX(1)',
            },

            state_error : {
                transform: 'scaleX(1)',
                borderTop: `none ${error_color}`,
                borderLeft: `none ${error_color}`,
                borderRight: `none ${error_color}`,
                borderBottom: `2px solid ${error_color}`,
            },

            error : {
                display,
                position: 'absolute',

                margin,
                width,

                fontSize: medium,
                fontWeight,
                lineHeight,

                userSelect: 'none',

                color: error_color,
                transform: 'scale(0.75) translate( -77px, 0 )',
            },

        };

    return styles;
}

export default class TextField extends React.Component {

    static defaultProps = {
        multi       : false,
        rows        : MIN_ROWS + 1,
        password    : false,
        value       : "",
        placeholder : "",
        floatingtext: "",
        errortext   : "",
    };

    static propTypes = {
        multi       : React.PropTypes.bool,
        rows        : React.PropTypes.number,
        password    : React.PropTypes.bool,
        value       : React.PropTypes.string,
        placeholder : React.PropTypes.string,
        floatingtext: React.PropTypes.string,
        errortext   : React.PropTypes.string,
        onChange    : React.PropTypes.func,
        onKeyDown   : React.PropTypes.func,
    }

    state = {
        type  : this.props.password ? "password" : "text",
    }

    changeFocus() {
        setjQueryObj( this.refs );
        changeState( styles.get(this), this.props.errortext );
    }

    changeBlur() {
        setjQueryObj( this.refs );
        style = styles.get(this);
        if ( $target.val() == "" && $target.attr( "placeholder" ) == "" ) {
            $float.css( style.float_normal );
        } else {
            $float.css({ ...style.float_normal, ...style.float_focus });
        }
        if ( this.props.errortext == "" ) $state.css({ ...style.state_normal });
    }

    change() {
        if ( this.props.onChange ) this.props.onChange( event );
    }

    changeKeyDown() {
        if ( this.props.onKeyDown ) this.props.onKeyDown( event );
    }

    componentWillUpdate( nextProps ) {
        changeState( styles.get(this), nextProps.errortext );
    }

    componentDidUpdate( prevProps, prevState ) {
        setjQueryObj( this.refs );
        style = styles.get(this);
        if ( this.props.errortext != "" && ( !err_height || $error.height() != err_height )) {
            $error.parent().height( Number.parseInt(style.root.height) + $error.height() );
            err_height = $error.height();
        } else if ( this.props.errortext == "" ) {
            $error.parent().height( style.root.height );
            err_height = undefined;
        }
    }

    componentWillMount() {
        styles.set( this, cssinjs() );
        style = styles.get(this);
        if ( this.props.floatingtext == "" ) style.float.display = style.hidden;
        if ( this.props.multi && ( this.props.rows > MIN_ROWS )) {
            const rows        = this.props.rows - MIN_ROWS,
                  txheight    = Number.parseInt(style.textarea.height),
                  inheight    = Number.parseInt(style.input.height),
                  parheight   = Number.parseInt(style.root.height);
             style.textarea.height = `${txheight + rows * steps}px`;
             style.root.height     = `${parheight - inheight + txheight + rows * steps}px`;
        }
        style.float = this.props.placeholder == "" && this.props.value == "" ? style.float_normal : { ...style.float_normal, ...style.float_focus }
        style.state = this.props.errortext   == "" ? style.state_normal : { ...style.state_normal, ...style.state_error };
    }

    componentDidMount() {
        this.refs.target.value = this.props.value;
    }

    render() {
        const props = {
            placeholder :this.props.placeholder,
            onFocus  : ()=>this.changeFocus(),
            onBlur   : ()=>this.changeBlur(),
            onChange : ()=>this.change(),
            onKeyDown: ()=>this.changeKeyDown(),
        };

        element = this.props.multi ? (
            <textarea ref="target" 
                       style={ style.textarea }
                       { ...props }
            />
        ) : (
            <input ref="target" 
                       style={ style.input }
                       type={ this.state.type } 
                       { ...props }
             />
        );

        return (
            <text-field style={ style.root }>
                <text-field-float ref="float" style={ style.float }>{this.props.floatingtext}</text-field-float>
                { element }
                <div>
                    <text-field-border ref="border" style={ style.border }/>
                    <text-field-state ref="state" style={ style.state }/>
                </div>
                <text-field-error ref="error" style={ style.error }>{ this.props.errortext }</text-field-error>
            </text-field>
        )
    }

}

/**
 * Set jQuery object from this.refs
 * 
 * @param {object} this.refs
 */
function setjQueryObj( obj ) {
    $target     = $( obj.target );
    $float      = $( obj.float );
    $state      = $( obj.state );
    $border     = $( obj.border );
    $error      = $( obj.error );
}

/**
 * Change state style
 * 
 * @param {string} error text
 */
function changeState( style, errortext ) {
    if ( errortext != "" ) {
        $state.css({ ...style.state_normal, ...style.state_error });
        $float.css({ ...style.float_normal, ...style.float_focus, ...style.float_error });
    } else {
        $state.css({ ...style.state_normal, ...style.state_focus });
        $float.css({ ...style.float_normal, ...style.float_focus });
    }
}