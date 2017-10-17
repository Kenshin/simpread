/*!
 * React Material Design: Waves
 * 
 * @version : 0.0.1
 * @update  : 2017/04/19
 * @homepage: https://github.com/kenshin/react-md-ui
 * @license : MIT https://github.com/kenshin/react-md/blob/master/LICENSE
 * @author  : Kenshin Wang <kenshin@ksria.com>
 * @modules : http://fian.my.id/Waves
 * 
 * @copyright 2017
 */

console.log( "==== simpread component: Waves ====" )

import '../waves/waves.min.css';
import Waves from '../waves/waves.js';

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
        ops.root  = $( ops.root )[0];
        Waves.init( ops );
    } else {
        console.error( "options param error" );
    }
}
