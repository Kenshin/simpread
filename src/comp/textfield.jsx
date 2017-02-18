console.log( "==== simpread component: TextField ====" )

let root  = "text-field", placeholder,
    $root, $target, $input, $float, $hr,
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
        $target  = $( event.target );
        $float   = $target.prev();
        $hr      = $target.next().find( "hr" );
        if ( $input.val() == "" && placeholder == "" ) {
            $float.removeAttr( "class" );
        }
        $hr.removeAttr( "class" );
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
            <textarea ref="textfield" 
                       placeholder="" 
                       onFocus={ ()=>this.changeFocus() }
                       onBlur= { ()=>this.changeBlur() }
            />
        ) : (
            <input ref="textfield" 
                       type="text" 
                       placeholder="默认为空，自动选择高亮区域。" 
                       onFocus={ ()=>this.changeFocus() }
                       onBlur= { ()=>this.changeBlur() }
             />
        );

        return (
            <text-field>
                <text-field-float ref="float">高亮内容</text-field-float>
                { element }
                <div>
                    <text-field-hr/>
                    <hr/>
                </div>
                <text-field-error></text-field-error>
            </text-field>
        )
    }

}