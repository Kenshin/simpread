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

    if ( curver == "1.0.0" ) {
        data.focus.controlbar= true;
        data.read.progress   = true;
        data.read.auto       = false;
        data.read.controlbar = true;
        curver = "1.0.1";
    }

    /*
    if ( curver == "1.0.1" ) {
        data.option.pocket = { "consumer": "", "access": "" };
        data.read.custom = "";
        curver = "2.0.0";
    }
    */

    data.version = version;
    return data;
}

/**
 * Notify with type and version
 * 
 * @param {string} type, include: firstload, update
 * @param {string} ver, e.g. 1.0.0, 1.0.1 
 */
function Notify( type, ver ) {
    let str = type == "firstload" ? "安装" : "更新";
    return `${str} 到最新版本 ${ver} ，详细请看 <a href="http://ksria.com/simpread/changelog.html" target="_blank">更新日志</a>`;
}

export {
    version,
    Verify,
    Notify,
}