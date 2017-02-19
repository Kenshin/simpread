console.log( "==== simpread component: TextField ====" )

let $target, $float, $state, $border, $error,
    element, styles;

const [ MIN_ROWS, steps ] = [ 3, 24 ],
      cssinjs = ( props )=>{

    const color = 'rgba(51, 51, 51, .87)',
          styles = {
            root: {
                font: '300 16px/1.8 PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans',

                display: 'inline-block',
                position: 'relative',

                width: '100%',
                height: '72px',

                marginBottom: '8px',
            },

            input: {
                color,
                backgroundColor: 'transparent',

                height: '20px',
                width: '100%',

                marginTop: '8px',
                padding: 0,

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

                height: '60px',
                width: '100%',

                marginTop: '8px',
                padding: 0,

                lineHeight: 1.5,

                cursor: 'inherit',

                border: 'none',
                outline: 'none',
                resize: 'none',

                boxSizing: 'border-box',
                WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                WebkitAppearance: 'textfield',
            },

            float : {
                display: 'block',
                position: 'absolute',

                top: '12px',

                fontSize: '16px',
                fontWeight: 400,
                color: 'rgba(0, 0, 0, 0.298039)',

                userSelect: 'none',
                pointerEvents: 'none',

                transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                transform: 'scale(1) translate( 0px, 0px )',
                transformOrigin: 'left top 0px',
            },

            border : {
                display: 'block',

                margin: '8px 0 0 0',
                width: '100%',

                borderTop: 'none rgb(224, 224, 224)',
                borderLeft: 'none rgb(224, 224, 224)',
                borderRight: 'none rgb(224, 224, 224)',
                borderBottom: '1px solid rgb(224, 224, 224)',
                boxSizing: 'content-box',
            },

            state : {
                display: 'block',
                position: 'absolute',
                bottom: '34px',

                margin: 0,
                width: '100%',

                borderTop: 'none rgba(0, 137, 123, .8)',
                borderLeft: 'none rgba(0, 137, 123, .8)',
                borderRight: 'none rgba(0, 137, 123, .8)',
                borderBottom: '2px solid rgba(0, 137, 123, .8)',
                boxSizing: 'content-box',

                transform: 'scaleX(0)',
                transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            },

            error : {
                display: 'block',

                marginTop: '8px',

                fontSize: '14px',
                fontWeight: 'bold',
                lineHeight: '12px',

                userSelect: 'none',

                color: 'rgb(244, 67, 54)',
                transform: 'scale(0.75) translate( -80px, 0 )',
            }
        };

        const classes = {
            display : 'none',
            floated : {
                color: '#00897B',

                top: '-8px',

                fontSize: '14px',
                fontWeight: 'bold',

                transform: 'scale(0.75) translate( 0px, -8px )',
            },
            focus : {
                transform: 'scaleX(1)',
            }
        }

        if ( props.floatingtext == "" ) styles.float.display = classes.display;
        if ( props.placeholder != ""  ) styles.float = { ...styles.float, ...classes.floated }
        if ( props.multi && ( props.rows > MIN_ROWS )) {
            const rows      = props.rows - MIN_ROWS,
                  height    = Number.parseInt(styles.textarea.height),
                  parheight = Number.parseInt(styles.root.height);
             styles.textarea.height = `${height + rows * steps}px`;
             styles.root.height     = `${parheight + rows * steps}px`;
        }

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
        //$float.addClass( "text-field-floated" );
        //$state.addClass( "text-field-state-focus" );
        $target.css( "font-size", "13px" );
    }

    changeBlur() {
        setjQueryObj( this.refs );
        const val = $target.val();
        if ( val == "" && $target.attr( "placeholder" ) == "" ) {
            //$float.removeAttr( "class" );
        }
        //$state.removeAttr( "class" );
        if ( val == "" ) $target.css( "font-size", "16px" );
    }

    changeHeight() {
        /*
        setjQueryObj( this.refs );
        const [ oriheight, steps ] = [ 28, 24 ];
        let  height= oriheight,
             rows  = this.refs.target.value.split( "\n" ).length - 1;
        if ( rows > 2 ) rows = 2;
        if ( rows == 0 ) height = oriheight;
        else             height = oriheight - rows * steps;
        $state.css("bottom", height );
        $border.css("bottom", height );
        */
    }

    componentDidMount() {
        setjQueryObj( this.refs );

        //if ( this.props.floatingtext == "" ) $float.hide();
        //if ( $target.attr( "placeholder" ) != "" ) $float.addClass( "text-field-floated" );
        /*if ( this.props.multi && ( this.props.rows > MIN_ROWS )) {
            const rows   = this.props.rows - MIN_ROWS,
                  height = $target.height(),
                  parheight = $target.parent().height();
            $target.height( height + rows * steps );
            $target.parent().height( parheight + rows * steps );
        }*/
    }

     constructor( props ) {
        super( props );
        styles = cssinjs( this.props );
    }

    render() {

        element = this.props.multi ? (
            <textarea ref="target" 
                       style={ styles.textarea }
                       placeholder={ this.props.placeholder }
                       onFocus  ={ ()=>this.changeFocus() }
                       onBlur   ={ ()=>this.changeBlur() }
                       onChange ={ ()=>this.changeHeight() }
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