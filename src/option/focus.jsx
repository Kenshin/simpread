console.log( "===== simpread option focus mode load =====" )

export default class FocusOpt extends React.Component {

    changeBgColor () {
        console.log( $(event.target).css("background-color") )
        if ( event.target.tagName.toLowerCase() != "li"  ) return;
        $( ".ks-simpread-bg" ).css( "background-color", $(event.target).css( "background-color" ));
    }

    changeOpacity() {
        this.setState({ opacity : event.target.value });
    }

    constructor( props ) {
        super( props );
        this.state = {
            opacity   : 90,
            shortcuts : "A S",
        };
    }

    render() {
        return (
            <div className="ks-simpread-option-focus">
                <div className="ks-simpread-option-focus-container">
                    <span>主题色：</span>
                    <ul className="ks-simpread-option-focus-theme" onClick={ ()=> this.changeBgColor() }>
                        <li className="ks-simpread-option-focus-theme-item ks-simpread-option-focus-theme-item-active"></li>
                        <li className="ks-simpread-option-focus-theme-item"></li>
                        <li className="ks-simpread-option-focus-theme-item"></li>
                        <li className="ks-simpread-option-focus-theme-item"></li>
                        <li className="ks-simpread-option-focus-theme-item"></li>
                        <li className="ks-simpread-option-focus-theme-item"></li>
                        <li className="ks-simpread-option-focus-theme-item"></li>
                        <li className="ks-simpread-option-focus-theme-item"></li>
                    </ul>
                </div>
                <div className="ks-simpread-option-focus-container">
                    <span>透明度：</span>
                    <div className="ks-simpread-option-focus-opacity">
                        <input 
                            type="range" 
                            min="0" max="100" step="10" 
                            value={ this.state.opacity }
                            onChange={ ()=> this.changeOpacity() }
                        />
                    </div>
                </div>
                <div className="ks-simpread-option-focus-container">
                    <span>快捷键：</span>
                    <div className="ks-simpread-option-focus-shortcuts">
                        <input type="text" value={ this.state.shortcuts } />
                    </div>
                </div>
                <div className="ks-simpread-option-focus-container">
                    <span>隐藏列表：</span>
                    <div className="ks-simpread-option-focus-exclude">
                        <textarea placeholder="每行一个，例如：<div class='xxxx'></div>"></textarea>
                    </div>
                </div>
            </div>
        )
    }
}