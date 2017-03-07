console.log( "==== simpread component: Waves ====" )

import '../vender/waves/waves.min.css';
import Waves from '../vender/waves/waves.js';

const wavesopts = {
    root     : undefined,
    name     : undefined,
    duration : 500,
    delay    : 200,
    classes  : [ "waves-button" ],
};

/**
 * Waves 
 * 
 * @param {...rest} multi option
 */
export function Render( ...options ) {
    for ( let option of options ) {
        if ( !option.root ) return;
        const ops = { ...wavesopts, ...option };
        Waves.init( ops );
        Waves.attach( `.${ ops.name }` , ops.classes );
    }
}
