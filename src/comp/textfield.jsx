console.log( "==== simpread component: TextField ====" )

let $target, $float, $state, $border, $error,
    element, styles;

const [ MIN_ROWS, steps ] = [ 3, 24 ],
      cssinjs = ()=>{

    const color     = 'rgba(51, 51, 51, .87)',
          err_color = 'rgb(244, 67, 54)',
          margin    = '8px 0 0 0',
          display   = 'block',
          medium    = '14px',
          large     = '16px',
          lineHeight= 1.5,
          fontWeight= 'bold',
          width     = '100%',
          styles    = {
            hidden : 'none',
            root: {
                font: '300 16px/1.8 PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans',

                display,
                position: 'relative',
                margin,

                width,
                height: '72px',
            },

            input: {
                color,
                backgroundColor: 'transparent',

                width,
                height: '20px',

                margin,
                padding: 0,

                float_focus: medium,

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

                float_focus: medium,
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

                borderTop: 'none rgb(224, 224, 224)',
                borderLeft: 'none rgb(224, 224, 224)',
                borderRight: 'none rgb(224, 224, 224)',
                borderBottom: '1px solid rgb(224, 224, 224)',
                boxSizing: 'content-box',
            },

            float : {},

            float_normal : {
                display,
                position: 'absolute',

                margin,

                float_focus: large,
                fontWeight: 400,
                color: 'rgba(0, 0, 0, 0.298039)',

                userSelect: 'none',
                pointerEvents: 'none',

                transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                transform: 'scale(1) translate( 0px, 0px )',
                transformOrigin: 'left top 0px',
            },

            float_focus : {
                color: '#00897B',

                margin: `-${margin}`,

                float_focus: medium,
                fontWeight,

                transform: 'scale(0.75) translate( 0px, -8px )',
            },

            float_error : {
                color: err_color,
            },

            state : {},

            state_normal : {
                display,
                position: 'absolute',

                width,
                margin: '-1px 0 0 0',

                borderTop: 'none rgba(0, 137, 123, .8)',
                borderLeft: 'none rgba(0, 137, 123, .8)',
                borderRight: 'none rgba(0, 137, 123, .8)',
                borderBottom: '2px solid rgba(0, 137, 123, .8)',
                boxSizing: 'content-box',

                transform: 'scaleX(0)',
                transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            },

            state_focus : {
                transform: 'scaleX(1)',
            },

            state_error : {
                transform: 'scaleX(1)',
                borderTop: `none ${err_color}`,
                borderLeft: `none ${err_color}`,
                borderRight: `none ${err_color}`,
                borderBottom: `2px solid ${err_color}`,
            },

            error : {
                display,

                margin,

                fontSize: medium,
                fontWeight,
                lineHeight,

                userSelect: 'none',

                color: err_color,
                transform: 'scale(0.75) translate( -80px, 0 )',
            },

        };

    return styles;
}

export default class TextField extends React.Component {

    static defaultProps = {
        multi       : false,
        rows        : MIN_ROWS,
        placeholder : "",
        floatingtext: "",
        errortext   : "",
    };

    static propTypes = {
        multi       : React.PropTypes.bool,
        rows        : React.PropTypes.number,
        placeholder : React.PropTypes.string,
        errortext   : React.PropTypes.string,
        floatingtext: React.PropTypes.string,
    }

    changeFocus() {
        setjQueryObj( this.refs );
        if ( this.props.errortext != "" ) {
            $state.css({ ...styles.state_normal, ...styles.state_error });
            $float.css({ ...styles.float_normal, ...styles.float_focus, ...styles.float_error });
        } else {
            $state.css({ ...styles.state_normal, ...styles.state_focus });
            $float.css({ ...styles.float_normal, ...styles.float_focus });
        }
        //$target.css( "font-size", "13px" );
    }

    changeBlur() {
        setjQueryObj( this.refs );
        const val = $target.val();
        if ( val == "" && $target.attr( "placeholder" ) == "" ) {
            styles.float = styles.float_normal;
        } else {
            styles.float = { ...styles.float_normal, ...styles.float_focus };
        }
        $float.css({ ...styles.float });
        if ( this.props.errortext == "" ) $state.css({ ...styles.state_normal });
        //if ( val == "" ) $target.css( "font-size", "16px" );
    }

    componentWillMount() {
        styles = cssinjs();
        if ( this.props.floatingtext == "" ) styles.float.display = styles.hidden;
        if ( this.props.multi && ( this.props.rows > MIN_ROWS )) {
            const rows      = this.props.rows - MIN_ROWS,
                  height    = Number.parseInt(styles.textarea.height),
                  parheight = Number.parseInt(styles.root.height);
             styles.textarea.height = `${height + rows * steps}px`;
             styles.root.height     = `${parheight + rows * steps}px`;
        }
        styles.float = this.props.placeholder == "" ? styles.float_normal : { ...styles.float_normal, ...styles.float_focus }
        styles.state = this.props.errortext   == "" ? styles.state_normal : { ...styles.state_normal, ...styles.state_error };
    }

    render() {

        element = this.props.multi ? (
            <textarea ref="target" 
                       style={ styles.textarea }
                       placeholder={ this.props.placeholder }
                       onFocus  ={ ()=>this.changeFocus() }
                       onBlur   ={ ()=>this.changeBlur() }
            />
        ) : (
            <input ref="target" 
                       style={ styles.input }
                       type="text" 
                       placeholder={ this.props.placeholder }
                       onFocus={ ()=>this.changeFocus() }
                       onBlur ={ ()=>this.changeBlur() }
             />
        );

        return (
            <text-field style={ styles.root }>
                <text-field-float ref="float" style={ styles.float }>{this.props.floatingtext}</text-field-float>
                { element }
                <div>
                    <text-field-border ref="border" style={ styles.border }/>
                    <text-field-state ref="state" style={ styles.state }/>
                </div>
                <text-field-error ref="error" style={ styles.error } dangerouslySetInnerHTML={{__html: this.props.errortext }}></text-field-error>
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