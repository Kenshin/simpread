console.log( "=== simpread stylesheet load ===" )

const [ bgcolorstyl, bgcls ] = [ "background-color", ".simpread-focus-root" ]

/**
 * Get background opacity value
 * 
 * @param  {string} background-color, e.g. rgba(235, 235, 235, 0.901961)
 * @return {string} e.g. 0.901961
 */
const getOpacity = value => {
    const arr = value.match( /[0-9.]+(\))$/ig );
    if ( arr.length > 0 ) {
        return arr.join( "" ).replace( ")", "" );
    } else {
        return null;
    }
};

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
};

/**
 * Set focus mode background color
 * 
 * @param  {string} background color
 * @return {string} new background color
 */
function BackgroundColor( bgcolor ) {
    const color   = getColor( bgcolor ),
          opacity = getOpacity( $( bgcls ).css( bgcolorstyl ) ),
          newval  = `rgba(${color}, ${opacity})`;
    $( bgcls ).css( bgcolorstyl, newval );
    return newval;
}

/**
 * Set background opacity
 * 
 * @param  {string} opacity
 * @return {string} new background color or null
 */
function Opacity( opacity ) {
    const bgcolor = $( bgcls ).css( bgcolorstyl ),
          color   = getColor( bgcolor ),
          newval  = `rgba(${color}, ${opacity / 100})`;
    if ( color ) {
        $( bgcls ).css( bgcolorstyl, newval );
        return newval;
    } else {
        return null;
    }
}

export {
    getColor as GetColor,
    BackgroundColor,
    Opacity
}