
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

function exec( str ) {

}

export {
    install as Install,
    exec    as Exec,
    generateID as ID,
}