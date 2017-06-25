console.log( "=== simpread version load ===" )

import {browser} from 'browser';

/**
 * Manifest.json version
 */
const version  = browser.runtime.getManifest().version,
      versions = new Map([
          [ "1.0.0", "Sun Jun 11 2017 12:30:00 GMT+0800 (CST)" ],
          [ "1.0.1", "Thu Jun 29 2017 15:48:15 GMT+0800 (CST)" ],
    ]);

/**
 * Verify version
 * 
 * @param {string} local version
 * @param {object} simpread data structure
 */
function Verify( curver, data ) {

    if ( curver == "1.0.0" ) {
        data.option.esc      = true;
        data.option.menu     = { focus: true, read: true, link: true };
        data.focus.controlbar= true;
        data.focus.mask      = true;
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

/**
 * Compare current version and target version
 * 
 * @param  {string} target version
 * @return {number} -2: not exist; -1: old version; 1: new version; 0: current version
 */
function Compare( target ) {
    let result = -2;
    if ( versions.has( target ) ) {
        result = Date.parse( versions.get( version )) - Date.parse( versions.get( target ));
        if ( result > 0 ) {
            result = 1;
        } else if ( result < 0 ) {
            result = -1;
        }
    }
    return result;
}

export {
    version,
    Verify,
    Notify,
    Compare,
}