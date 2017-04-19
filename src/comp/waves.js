console.log( "==== simpread component: Waves ====" )

import '../vender/waves/waves.min.css';
import Waves from '../vender/waves/waves.js';

const wavesopts = {
    root     : undefined,
    duration : 500,
    delay    : 200,
};

/**
 * Waves
 * 
 * External library:
 * - http://fian.my.id/Waves/
 * 
 * @param {object} option object
 */
export function Render( options ) {
    if ( options && options.root ) {
        const ops = { ...wavesopts, ...options };
        Waves.init( ops );
    } else {
        console.error( "options param error" );
    }
}
