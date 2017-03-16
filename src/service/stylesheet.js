console.log( "=== simpread stylesheet load ===" )

import {browser} from 'browser';

const [ bgcolorstyl, bgcls ] = [ "background-color", ".simpread-focus-root" ];

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
 * Get chrome extension icon path
 * @param {string} icon name
 */
function iconPath( name ) {
    return browser.extension.getURL( `assets/images/${name}.png` )
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

/**
 * Set read mode font family
 * 
 * @param {string} font family name e.g. PingFang SC; Microsoft Yahei
 */
function fontFamily( family ) {
    $( "sr-read" ).attr( "style", `font-family: ${family}!important` );
}

/**
 * Set read mode font size
 * 
 * @param {string} font size, e.g. 70% 62.5%
 */
function fontSize( value ) {
    $( "html" ).attr( "style", `font-size: ${value}!important` );
}

/**
 * Set read mode layout width
 * 
 * @param {string} layout width
 */
function layout( width ) {
    $( "sr-read" ).attr( "style", `margin: 20px ${width}` );
}

export {
    iconPath as IconPath,
    getColor as GetColor,
    BackgroundColor,
    Opacity,
    fontFamily as FontFamily,
    fontSize   as FontSize,
    layout     as Layout,
}