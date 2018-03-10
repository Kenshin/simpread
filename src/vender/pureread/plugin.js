console.log( "=== PureRead: Plugin load ===" )

import pangu     from './plugin/pangu.min';
import minimatch from './plugin/minimatch';

const plugin = {
    pangu    : pangu,
    minimatch: minimatch
};

export function Plugin( type ) {
    let result;
    if ( type == undefined ) {
        result = plugin;
    } else {
        result = plugin[type];
    }
    return result;
}