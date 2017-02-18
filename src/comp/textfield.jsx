console.log( "==== simpread component: TextField ====" )

let root  = "text-field", hint,
    $target, $float, $state, $error, $border,
    element;

export default class TextField extends React.Component {

    static defaultProps = {
        multi       : false,
        placeholder : "",
        floatingtext: "",
        errortext   : "",
    };

    static propTypes = {
        multi       : React.PropTypes.bool,
        placeholder : React.PropTypes.string,
        errortext   : React.PropTypes.string,
        floatingtext: React.PropTypes.string,
    }

    changeFocus() {
        $target = $( this.refs.target );
        $state  = $( this.refs.state );
        $float.addClass( "text-field-floated" );
        $state.addClass( "text-field-hr-focus" );
        $target.css( "font-size", "13px" );
    }

    changeBlur() {
        $target     = $( this.refs.target );
        hint        = $target.attr( "placeholder" );
        const val   = $target.val();
        if ( val == "" && hint == "" ) {
            $float.removeAttr( "class" );
        }
        $state.removeAttr( "class" );
        if ( val == "" ) $target.css( "font-size", "16px" );
    }

    changeHeight() {
        const [ oriheight, steps ] = [ 28, 24 ];
        let  height= oriheight,
             rows  = this.refs.target.value.split( "\n" ).length - 1;
        if ( rows > 2 ) rows = 2;
        if ( rows == 0 ) height = oriheight;
        else             height = oriheight - rows * steps;
        $state.css("bottom", height );
        $border.css("bottom", height );
    }

    componentDidMount() {
        $target     = $( this.refs.target );
        $float      = $( this.refs.float );
        $state      = $( this.refs.state );
        $border     = $( this.refs.border );
        $error      = $( this.refs.error );
        hint        = $target.attr( "placeholder" );

        if ( this.props.floatingtext == "" ) $float.hide();
        if ( hint != "" ) $float.addClass( "text-field-floated" );
    }

     constructor( props ) {
        super( props );
    }

    render() {

        element = this.props.multi ? (
            <textarea ref="target" 
                       placeholder={ this.props.placeholder }
                       onFocus  ={ ()=>this.changeFocus() }
                       onBlur   ={ ()=>this.changeBlur() }
                       onChange ={ ()=>this.changeHeight() }
            />
        ) : (
            <input ref="target" 
                       type="text" 
                       placeholder={ this.props.placeholder }
                       onFocus={ ()=>this.changeFocus() }
                       onBlur ={ ()=>this.changeBlur() }
             />
        );

        return (
            <text-field>
                <text-field-float ref="float">{this.props.floatingtext}</text-field-float>
                { element }
                <div>
                    <text-field-border ref="border"/>
                    <hr ref="state"/>
                </div>
                <text-field-error ref="error">{ this.props.errortext }</text-field-error>
            </text-field>
        )
    }

}