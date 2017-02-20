console.log( "==== simpread component: TextField ====" )

let $target, $float, $state, $border, $error,
    element, styles;

const [ MIN_ROWS, steps ] = [ 3, 24 ],
      cssinjs = ()=>{

    const color       = 'rgba(51, 51, 51, .87)',
          error_color = 'rgba(244, 67, 54, 1)',
          focus_color = 'rgba(0, 137, 123, .8)',
          border_color= 'rgba(224, 224, 224, 1)',
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
                margin,

                width,
                height: '72px',
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
    }

    changeBlur() {
        setjQueryObj( this.refs );
        if ( $target.val() == "" && $target.attr( "placeholder" ) == "" ) {
            $float.css( styles.float_normal );
        } else {
            $float.css({ ...styles.float_normal, ...styles.float_focus });
        }
        if ( this.props.errortext == "" ) $state.css({ ...styles.state_normal });
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