console.log( "===== simpread option common: ThemeSel =====" )

const [ bgcolorstyl, bgcls     ] = [ "background-color", ".ks-simpread-bg" ];

export default class ThemeSel extends React.Component {

    changeBgColor () {
        if ( event.target.tagName.toLowerCase() == "sr-opt-theme" ) {
            const target     = event.target,
                  $target    = $(target),
                  $parent    = $target.parent(),
                  activestyl = "active",
                  newval     = $target.attr( "name" ),
                  $active    = $parent.find( 'sr-opt-theme[sr-type="active"]' );
                  /*
                  $active    = $parent.find( 'sr-opt-theme[sr-type="active"]' ),
                  bgcolor    = $target.css( bgcolorstyl ),
                  color      = getColor( bgcolor ),
                  opacity    = getOpacity( $( bgcls ).css( bgcolorstyl ) ),
                  newval     = `rgba(${color}, ${opacity})`;
                  */
            if ( $active ) {
                $active.removeAttr( "sr-type" );
                $target.attr( "sr-type", activestyl );
            }
            //this.props.option.bgcolor = newval;
            console.log( "this.props.option.bgcolor = ", newval )
            this.props.changeBgColor( newval );
        }
    }

    componentDidMount() {
        setBgThemeStyle( this.props.theme );
    }

    render() {
        return (
            <sr-opt-themes onClick={ ()=> this.changeBgColor() }>
                { this.props.themes.map( (theme,idx) => <sr-opt-theme style={{backgroundColor: `rgba( ${theme} )`}} name={ this.props.names[idx] }></sr-opt-theme> )}
            </sr-opt-themes>
        )
    }

}

/**
 * Set background style
 * 
 * @param {string} theme name
 */
function setBgThemeStyle( theme ) {
    const $themes    = $( "sr-opt-themes" ).children();
    for ( let i = 0; i < $themes.length; i++ ) {
         const $target = $($themes[i]),
               name    = $target.attr( "name" );
         if ( theme === name ) {
             $target.attr( "sr-type", "active" );
         }
    }
}
