console.log( "===== simpread option focus mode load =====" )

export default class FocusOpt extends React.Component {

    changeBgColor () {
        console.log( $(event.target).css("background-color") )
        if ( event.target.tagName.toLowerCase() != "li"  ) return;
        $( ".ks-simpread-bg" ).css( "background-color", $(event.target).css( "background-color" ));
    }

    render() {
        return (
            <div className="ks-simpread-option-focus">
                <div className="ks-simpread-option-focus ks-simpread-option-focus-theme">
                    <span>主题色：</span>
                    <ul className="ks-simpread-option-focus-theme-group"  onClick={ ()=> this.changeBgColor() }>
                        <li className="ks-simpread-option-focus-theme-group-item"></li>
                        <li className="ks-simpread-option-focus-theme-group-item"></li>
                        <li className="ks-simpread-option-focus-theme-group-item"></li>
                        <li className="ks-simpread-option-focus-theme-group-item"></li>
                        <li className="ks-simpread-option-focus-theme-group-item"></li>
                        <li className="ks-simpread-option-focus-theme-group-item"></li>
                        <li className="ks-simpread-option-focus-theme-group-item"></li>
                        <li className="ks-simpread-option-focus-theme-group-item"></li>
                    </ul>
                </div>
            </div>
        )
    }
}