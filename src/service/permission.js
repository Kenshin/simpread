
import {browser} from 'browser';

function Get( permissions, callback ) {
    browser.permissions.contains({ permissions: permissions.permissions }, result => {
        result == false ? chrome.permissions.request( permissions, granted => {
            callback( granted );
        }): callback( result );
    });
}

function Remove( permissions, callback ) {
    browser.permissions.remove( { permissions: permissions.permissions }, result => {
        callback( result )
    })
}

export {
    Get,
    Remove
}