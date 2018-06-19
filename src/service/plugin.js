
import nanoid from 'nanoid';

/**
 * Generate ID
 * 
 * @param {string} generate id, include: user id( uuid v4 ), plugin id( like t.co/cKPFh3Qsh4 )
 */
function generateID( type ) {
    if ( type == "user" ) {
        const random = "0123456789abcdefghijklmnopqrstuvwxyz",
              first  = nanoid( random, 8 ),
              second = nanoid( random, 4 ),
              third  = nanoid( random, 4 ),
              fourth = nanoid( random, 4 ),
              fifth  = nanoid( random, 12 );
        return `${first}-${second}-${third}-${fourth}-${fifth}`;
    } else if ( type == "plugin" ) {
        return nanoid( "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 10 );
    }
}

function install( id ) {

}

/**
 * Execute
 * 
 * @param {object} plugin object
 */
function exec( plugin ) {
    new Function( func( plugin.script ) )();
    plugin.style != "" && addStyle( plugin.style );
}

/**
 * Contact (function(){})() string
 * 
 * @param {string} source 
 */
function func( source ) {
    return `( function ( $$version, $title, $desc, $content, $footer, $process, $toc ) {
        ${ source }
    })( "0.0.1", $( "sr-rd-title" ), $( "sr-rd-desc" ), $( "sr-rd-content" ), $( "sr-rd-footer" ), $( "read-process" ), $( "toc" ) );`
}

/**
 * Add style
 * 
 * @param {string} add css to head
 */
function addStyle( str ) {
    $( "head" ).append(`<style type="text/css">${str}</style>`);
}

export {
    install as Install,
    exec    as Exec,
    generateID as ID,
}