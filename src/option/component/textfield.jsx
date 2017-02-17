console.log( "==== simpread option component: TextField ====" )

let root  = "text-field",
    $root, $input;

export default class TextField extends React.Component {

    changeFocus() {
        $( "text-field-float" ).addClass( "text-field-floated" );
        $( "hr" ).addClass( "text-field-hr-focus" );
    }

    changeBlur() {
        if ( $input.val() == "" ) {
            $( "text-field-float" ).removeAttr( "class" );
        }
        $( "hr" ).removeAttr( "class" );
    }

    componentDidMount() {
        $root  = $(root);
        $input = $root.find( "input" );
    }

    render() {
        return (
            <text-field>
                <text-field-float ref="float">高亮内容</text-field-float>
                <input ref="include" 
                       type="text" 
                       placeholder="" 
                       onFocus={ ()=>this.changeFocus() }
                       onBlur= { ()=>this.changeBlur() }
                />
                <div>
                    <text-field-hr/>
                    <hr/>
                </div>
                <text-field-error></text-field-error>
            </text-field>
        )
    }

}