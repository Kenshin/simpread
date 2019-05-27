console.log( "==== simpread options page: notice load ====" )

import '../assets/css/simpread.css';
import '../assets/css/options_page.css';
import '../assets/css/options_notice.css';

import Velocity   from 'velocity';

import {storage}  from 'storage';

/**
 * Entry
 */
storage.Read( () => {
    console.log( "simpread storage get success!", storage );
    $( "body" ).velocity({ opacity: 1 }, { duration: 1000, complete: ()=> {
        $( "body" ).removeAttr( "style" );
    }});
});