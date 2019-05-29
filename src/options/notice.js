console.log( "==== simpread options page: notice load ====" )

import '../assets/css/simpread.css';
import '../assets/css/options_page.css';
import '../assets/css/options_notice.css';
import 'notify_css';

import Velocity   from 'velocity';
import Button     from 'button';
import * as waves from 'waves';
import * as tt    from 'tooltip';

import Notice     from 'notice';

import {storage}  from 'storage';
import * as ss    from 'stylesheet';

/**
 * Entry
 */
storage.Read( () => {
    console.log( "simpread storage get success!", storage );
    navRender();
    noticeRender();
    tt.Render( "body" );
    waves.Render({ root: "body" });
    $( "body" ).velocity({ opacity: 1 }, { duration: 1000, complete: ()=> {
        $( "body" ).removeAttr( "style" );
    }});
});

/**
 * navigation Render
 */
function navRender() {
    const navClick = () => {
        location.href = location.origin + "/options/options.html";
    };
    const button = <Button waves="md-waves-effect md-waves-circle" hoverColor="transparent" icon={ ss.IconPath( "gohome_icon" ) } onClick={ ()=>navClick() } />;
    ReactDOM.render( button, $( ".header .nav" )[0] );
}

/**
 * notice Render
 */
function noticeRender() {
    let is_update = location.search == "?is_update=true" ? true : false;
    ReactDOM.render( <Notice is_update={ is_update } />, $( ".notice" )[0] );
    history.pushState( "", "", "/options/notice.html" );
}