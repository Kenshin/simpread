console.log( "=== simpread version load ===" )

import {browser} from 'browser';

const version = browser.runtime.getManifest().version;

export {
    version
}