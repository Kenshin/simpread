
import {browser} from 'browser';

function getPermissions( permissions, callback ) {
    browser.permissions.contains({ permissions: permissions.permissions }, result => {
        result == false ? chrome.permissions.request( permissions, granted => {
            callback( granted );
        }): callback( result );
    });
}

function removePermissions( permissions, callback ) {
    browser.permissions.remove( { permissions: permissions.permissions }, result => {
        callback( result )
    })
}

export {
    getPermissions,
    removePermissions
}