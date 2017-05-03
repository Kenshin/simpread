console.log( "=== simpread version load ===" )

import {browser} from 'browser';

/**
 * Manifest.json version
 */
const version = browser.runtime.getManifest().version;

/**
 * Verify version
 * 
 * @param {string} local version
 * @param {object} simpread data structure
 */
function Verify( curver, data ) {

    /*
    if ( curver == "1.0.0" ) {
        data.option.pocket = { "consumer": "", "access": "" };
        curver = "1.0.1";
    }

    if ( curver == "1.0.1" ) {
        data.read.custom = "";
        curver = "2.0.0";
    }
    */

    data.version = version;
    return data;
}

export {
    version,
    Verify
}