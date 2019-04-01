console.log( "=== PureRead: Plugin load ===" )

import pangu     from './plugin/pangu.min';
import minimatch from './plugin/minimatch';
import * as be   from './plugin/beautify';
import * as ss   from './plugin/stylesheet';
import * as rda  from './plugin/readability';

const plugins = {
    pangu    : pangu,
    minimatch: minimatch,
    beautify : be,
    style    : ss,
    reability: rda,
};

/**
 * Get PureRead Plugin
 * 
 * @param  {string} plugin name, when undefined, return all plugin
 * @return {object} all plugins
 *         {string} plgin
 */
export function Plugin( type ) {
    let result;
    if ( type == undefined ) {
        result = plugins;
    } else {
        result = plugins[type];
    }
    return result;
}