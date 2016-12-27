console.log( "===== simpread option focus mode load =====" )

const [ bgcolorstyl, bgcls ] = [ "background-color", ".ks-simpread-bg" ];

export default class FocusOpt extends React.Component {

    changeBgColor () {
        if ( event.target.tagName.toLowerCase() == "li" ) {

            const target     = event.target,
                  $target    = $(target),
                  activestyl = "ks-simpread-option-focus-theme-item-active",
                  $active    = $( ".ks-simpread-option-focus-theme" ).find( `.${activestyl}` ),
                  bgcolor    = $target.css( bgcolorstyl ),
                  color      = getColor( bgcolor ),
                  opacity    = getOpacity( $( bgcls ).css( bgcolorstyl ) ),
                  newval     = `rgba(${color}, ${opacity})`;

            // set new background color
            $( bgcls ).css( bgcolorstyl, newval );

            // update active
            if ( $active.length > 0 ) {
                $active.removeClass( activestyl );
                $target.addClass(    activestyl );
            }
        }
    }

    changeOpacity() {
        const bgcolor = $( bgcls ).css( bgcolorstyl ),
              opacity = event.target.value,
              color   = getColor( bgcolor ),
              newval  = `rgba(${color}, ${opacity / 100})`;

        if ( color ) {
            $( bgcls ).css( bgcolorstyl, newval );
        }

        this.setState({ opacity : opacity });
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
                            min="50" max="95" step="5" 
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
                <div className="ks-simpread-option-focus-container">
                    <span>高亮区域：</span>
                    <div className="ks-simpread-option-focus-include">
                        <input type="text" placeholder="默认为空，自动选择高亮区域。" />
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * Get background opacity value
 * 
 * @param  {string} background-color, e.g. rgba(235, 235, 235, 0.901961)
 * @return {string} e.g. 0.901961
 */
function getOpacity( value ) {
    const arr = value.match( /[0-9.]+(\))$/ig );
    if ( arr.length > 0 ) {
        return arr.join( "" ).replace( ")", "" );
    } else {
        return null;
    }
}

/**
 * Get background color value
 * 
 * @param  {string} background-color, e.g. rgba(235, 235, 235, 0.901961)
 * @return {string} e.g. 235, 235, 235
 */
function getColor( value ) {
    const arr = value.match( /[0-9]+, /ig );
    if ( arr.length > 0 ) {
        return arr.join( "" ).replace( /, $/, "" );
    } else {
        return null;
    }
}