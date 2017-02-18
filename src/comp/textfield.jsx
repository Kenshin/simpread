console.log( "==== simpread component: TextField ====" )

let root  = "text-field", hint,
    $root, $target, $input, $float, $hr, $border,
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
        $target  = $( event.target );
        $float   = $target.prev();
        $hr      = $target.next().find( "hr" );
        $float.addClass( "text-field-floated" );
        $hr.addClass( "text-field-hr-focus" );
        $target.css( "font-size", "13px" );
    }

    changeBlur() {
        $target     = $( event.target );
        $float      = $target.prev();
        $hr         = $target.next().find( "hr" );
        hint        = $target.attr( "placeholder" );
        const val   = $target.val();
        if ( val == "" && hint == "" ) {
            $float.removeAttr( "class" );
        }
        $hr.removeAttr( "class" );
        if ( val == "" ) $target.css( "font-size", "16px" );
    }

    changeHeight() {
        const [ oriheight, steps ] = [ 28, 24 ];
        let  height= oriheight,
             rows  = this.refs.textarea.value.split( "\n" ).length - 1;
        if ( rows > 2 ) rows = 2;
        $target    = $( event.target );
        $hr        = $target.next().find( "hr" );
        $border    = $target.next().find( "text-field-border" );
        if ( rows == 0 ) height = oriheight;
        else             height = oriheight - rows * steps;
        $hr.css("bottom", height );
        $border.css("bottom", height );
    }

    componentDidMount() {
        $root       = $(root);
        $input      = this.props.multi ? $root.find( "textarea" ) : $root.find( "input" );
        $float      = $input.prev();
        hint        = $input.attr( "placeholder" );

        if ( this.props.floatingtext == "" ) $float.hide();
        if ( hint != "" ) $float.addClass( "text-field-floated" );
    }

     constructor( props ) {
        super( props );
    }

    render() {

        element = this.props.multi ? (
            <textarea ref="textarea" 
                       placeholder={ this.props.placeholder }
                       onFocus  ={ ()=>this.changeFocus() }
                       onBlur   ={ ()=>this.changeBlur() }
                       onChange ={ ()=>this.changeHeight() }
            />
        ) : (
            <input ref="input" 
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
                    <text-field-border/>
                    <hr/>
                </div>
                <text-field-error></text-field-error>
            </text-field>
        )
    }

}