console.log( "==== simpread options page: sitemanager load ====" )

import '../assets/css/simpread.css';
import '../assets/css/option.css';
import '../assets/css/options_page.css';
import '../assets/css/options_custom.css';
import '../assets/css/options_sitemgr.css';
import '../vender/notify/notify.css';

import Velocity   from 'velocity';
import Notify     from 'notify';

import TextField  from 'textfield';
import Button     from 'button';
import Dropdown   from 'dropdown';

import * as waves from 'waves';
import * as tt    from 'tooltip';

import Editor     from 'editor';

import {storage}  from 'storage';
import * as ss    from 'stylesheet';

let cur_site;

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

function formatsites( sites ) {
    return sites.map( item => {
        return { value: item[0], name: item[0] }
    });
}

function controlbarRender() {
    const getCursite = ( type, value ) => {
            const site = storage.Getsite( type, value )
            site.length > 0 && siteeditorRender( site[0], site[1], type );
        },
        click = ( type ) => {
            console.log( "current site is ", type, cur_site, storage.sites ) 
    };
    const doms = <div>
                    <group className="lab">
                        <Dropdown name={ `官方主适配源（${storage.sites.global.length} 条）` } width="100%" waves="md-waves-effect" items={ formatsites( storage.sites.global ) } onChange={ v=>getCursite( "global", v) } />
                        <Dropdown name={ `第三方适配源（${storage.sites.custom.length} 条）` } width="100%" waves="md-waves-effect" items={ formatsites( storage.sites.custom ) } onChange={ v=>getCursite( "custom", v) } />
                        <Dropdown name={ `自定义适配源（${storage.sites.local.length} 条）`  } width="100%" waves="md-waves-effect" items={ formatsites( storage.sites.local  ) } onChange={ v=>getCursite( "local",  v) } />
                    </group>
                    <group className="lab">
                        <group>
                            <Button type="raised" text="新建一个站"
                                    style={{ "margin": "0" }} width="100%"
                                    color="#fff" backgroundColor="#4CAF50"
                                    waves="md-waves-effect md-waves-button"
                                    onClick={ ()=>click( "add" ) } />
                        </group>
                        <group>
                            <Button type="raised" text="修改当前站"
                                    style={{ "margin": "0" }} width="100%"
                                    color="#fff" backgroundColor="#3F51B5"
                                    waves="md-waves-effect md-waves-button"
                                    onClick={ ()=>click( "add" ) } />
                        </group>
                        <group>
                            <Button type="raised" text="删除当前站"
                                    style={{ "margin": "0" }} width="100%"
                                    color="#fff" backgroundColor="#FF5252"
                                    waves="md-waves-effect md-waves-button"
                                    onClick={ ()=>click( "delete" ) } />
                        </group>
                    </group>
                 </div>;
    ReactDOM.render( doms, $( ".custom .property" )[0] );
}

function siteeditorRender( url, site, type ) {

    $( "sr-opt-read" ).length > 0 &&
        $( ".custom .preview" ).empty();

    site.url   = url;
    site.target= type;
    site.name  == "" && ( site.name = "tempread::" + location.host );
    ( !site.avatar || site.avatar.length == 0 ) && ( site.avatar = [{ name: "" }, { url: ""  }]);
    ( !site.paging || site.paging.length == 0 ) && ( site.paging = [{ prev: "" }, { next: "" }]);
    cur_site   = site;

    let state  = { name: 0, url: 0, title: 0, desc: 0, include: 0, exclude: 0, avatar:{ name: 0, url: 0 }, paging: { prev:0, next: 0} }; // 0: success -1: faield -2: not empty
    const doms = <Editor site={ cur_site } state={ state } />;
    ReactDOM.render( doms, $( ".custom .preview" )[0] );
}