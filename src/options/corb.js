
import axios      from 'axios';

import {browser}  from 'browser';
import * as msg   from 'message';

/**
 * Listen runtime message, include: `axios`
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if ( request.type == msg.MESSAGE_ACTION.AXIOS ) {
        if ( request.value.type == "post" ) {
            if ( request.value.form ) {
                request.value.data = new FormData();
                Object.keys( request.value.form ).forEach( key => request.value.data.append( key, request.value.form[key] ) );
            }
            axios.post( request.value.url, request.value.data )
                .then( response => sendResponse({ done: response }))
                .catch( error   => sendResponse({ fail: error    }));
        } else if ( request.value.type == 'put' ) {
            axios.put( request.value.url, request.value.content, request.value.data )
                .then( response => sendResponse({ done: response }))
                .catch( error   => sendResponse({ fail: error    }));
        }
    }
    return true;
});
