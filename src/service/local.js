
const id    = "simpread",
      NAMES = {
        COUNT : "count",
        FIRST : "firstload",
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

const local = new Local();
export default local;