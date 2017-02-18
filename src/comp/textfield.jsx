console.log( "==== simpread component: TextField ====" )

let root  = "text-field", placeholder,
    $root, $target, $input, $float, $hr, $border,
    element;

export default class TextField extends React.Component {

    changeFocus() {
        $target  = $( event.target );
        $float   = $target.prev();
        $hr      = $target.next().find( "hr" );
        $float.addClass( "text-field-floated" );
        $hr.addClass( "text-field-hr-focus" );
    }

    changeBlur() {
        $target     = $( event.target );
        $float      = $target.prev();
        $hr         = $target.next().find( "hr" );
        placeholder = $target.attr( "placeholder" );
        if ( $target.val() == "" && placeholder == "" ) {
            $float.removeAttr( "class" );
        }
        $hr.removeAttr( "class" );
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
        placeholder = $input.attr( "placeholder" );

        if ( placeholder != "" ) {
            $float.addClass( "text-field-floated" );
        }
    }

     constructor( props ) {
        super( props );
    }

    render() {

        element = this.props.multi ? (
            <textarea ref="textarea" 
                       placeholder="" 
                       onFocus  ={ ()=>this.changeFocus() }
                       onBlur   ={ ()=>this.changeBlur() }
                       onChange ={ ()=>this.changeHeight() }
            />
        ) : (
            <input ref="input" 
                       type="text" 
                       placeholder="默认为空，自动选择高亮区域。" 
                       onFocus={ ()=>this.changeFocus() }
                       onBlur ={ ()=>this.changeBlur() }
             />
        );

        return (
            <text-field>
                <text-field-float ref="float">高亮内容</text-field-float>
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