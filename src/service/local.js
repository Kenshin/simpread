console.log( "=== simpread local load ===" )

const id    = "simpread",
      NAMES = {
        VER   : "version",
        COUNT : "count",
        FIRST : "firstload",
        PATCH: "patch-update",
      },
      MAX_COUNT = 5;

let curcount;

/**
 * Read and Write Local Storage
 * 
 * @class
 */
class Local {

    get curcount() {
        return curcount;
    }

    /**
     * @method
     * 
     * @return {boolean} true: not MAX_COUNT; false: exceed MAX_COUNT, re-count
     */
    Count() {
        const [ cur = 0 ] = [ get(NAMES.COUNT) ];
        curcount          = cur;
        set( NAMES.COUNT, ++curcount );
        if ( curcount > MAX_COUNT ) {
            set( NAMES.COUNT, 0 );
            return false;
        } else {
            return true;
        }
    }

    /**
     * @method
     * 
     * @return {boolean} true: first load; false: not first load
     */
    Firstload() {
        let [ firstload = "true" ] = [ get(NAMES.FIRST) ];
        if ( firstload == "true" ) {
            set( NAMES.FIRST, false );
            return true;
        } else {
            return false;
        }
    }

    /**
     * Save manifest.json version to local storage
     * 
     * @param {string} version
     */
    Version( version ) {
        set( NAMES.VER, version );
    }

    /**
     * Save manifest.json version to local storage
     * 
     * @param {string} version
     */
    Patch( state, value ) {
        if ( state == "add" ) set( NAMES.PATCH, value );
        else if ( state == "get" ) return get( NAMES.PATCH );
        else if ( state == "remove" ) remove( NAMES.PATCH );
    }

}

/**
 * Get localStorage from key
 * 
 * @param {string} NAMES.{value}
 */
function get( key ) {
    return localStorage[ `${id}-${key}` ];
}

/**
 * Set localStorage
 * 
 * @param {string} NAMES.{value}
 * @param {any}  any value
 */
function set( key, value ) {
    localStorage[ `${id}-${key}` ] = value;
}

/**
 * Remove localStorage
 * 
 * @param {string} NAMES.{value}
 */
function remove( key ) {
    localStorage.removeItem( `${id}-${key}` );
}
const local = new Local();
export default local;