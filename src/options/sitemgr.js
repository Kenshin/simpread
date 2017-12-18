console.log( "==== simpread options page: sitemanager load ====" )

import '../assets/css/simpread.css';
import '../assets/css/options_page.css';
import '../assets/css/options_sitemgr.css';
import '../vender/notify/notify.css';

import Velocity   from 'velocity';
import Notify     from 'notify';

import TextField  from 'textfield';
import Button     from 'button';
import Dropdown   from 'dropdown';

import * as waves from 'waves';
import * as tt    from 'tooltip';

import {storage}  from 'storage';
import * as ss    from 'stylesheet';

/**
 * Entry:
 * - storage get data form chrome storage
 * - waves.Render()
 * - tooltip.Render()
 */
storage.Read( () => {
    console.log( "simpread storage get success!", storage.sites );
    navRender();
    controlbarRender();
    siteeditorRender();
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
        location.href = location.origin + "/options/options.html#labs";
    };
    const button = <Button waves="md-waves-effect md-waves-circle" hoverColor="transparent" icon={ ss.IconPath( "gohome_icon" ) } onClick={ ()=>navClick() } />;
    ReactDOM.render( button, $( ".header .nav" )[0] );
}

function controlbarRender() {
    const doms = <div>
                    Controlbar Render
                 </div>;
    ReactDOM.render( doms, $( ".custom .property" )[0] );
}

function siteeditorRender() {
    const doms = <div>
                    SiteEditor Render
                 </div>;
    ReactDOM.render( doms, $( ".custom .preview" )[0] );
}