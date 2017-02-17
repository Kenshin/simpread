console.log( "==== simpread option component: TextField ====" )

let root  = "text-field", placeholder,
    $root, $input,
    element;

export default class TextField extends React.Component {

    changeFocus() {
        $( "text-field-float" ).addClass( "text-field-floated" );
        $( "hr" ).addClass( "text-field-hr-focus" );
    }

    changeBlur() {
        if ( $input.val() == "" && placeholder == "" ) {
            $( "text-field-float" ).removeAttr( "class" );
        }
        $( "hr" ).removeAttr( "class" );
    }

    componentDidMount() {
        $root       = $(root);
        $input      = $root.find( "input" );
        placeholder = $input.attr( "placeholder" );

        if ( placeholder != "" ) {
            $( "text-field-float" ).addClass( "text-field-floated" );
        }
    }

     constructor( props ) {
        super( props );
    }

    render() {

        element = this.props.multi ? (
            <textarea ref="textfield" 
                       placeholder="默认为空，自动选择高亮区域。" 
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