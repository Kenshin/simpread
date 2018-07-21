console.log( "==== simpread options page: sitemanager load ====" )

import '../assets/css/simpread.css';
import '../assets/css/option.css';
import '../assets/css/options_page.css';
import '../assets/css/options_custom.css';
import '../assets/css/options_sitemgr.css';
import 'notify_css';

import Velocity   from 'velocity';
import Notify     from 'notify';

import TextField  from 'textfield';
import Button     from 'button';
import AC         from 'ac';

import * as waves from 'waves';
import * as tt    from 'tooltip';

import Editor     from 'editor';
import Import     from 'enhancesite';

import {storage}  from 'storage';
import * as ss    from 'stylesheet';
import * as watch from 'watch';

import PureRead   from 'puread';

let cur_site, org_site, pr,
    state = { name: 0, url: 0, title: 0, desc: 0, include: 0, exclude: 0, avatar:{ name: 0, url: 0 }, paging: { prev:0, next: 0} }; // 0: success -1: faield -2: not empty0

/**
 * Entry:
 * - storage get data form chrome storage
 * - waves.Render()
 * - tooltip.Render()
 */
storage.Read( () => {
    console.log( "simpread storage get success!", storage.sites );
    pr = new PureRead( storage.sites );
    navRender();
    controlbarRender();
    tt.Render( "body" );
    waves.Render({ root: "body" });
    $( "body" ).velocity({ opacity: 1 }, { duration: 1000, complete: ()=> {
        $( "body" ).removeAttr( "style" );
    }});
    console.log( "current puread object is   ", pr )
});

// hack code
window.addEventListener( "sitechanged", event => {
    const [ url, site, type, info ] = [ event.data.site.url, event.data.site, event.data.site.target, event.data.info ];
    org_site = [ url, site ];
    siteeditorRender( url, site, type, info );
});

// hack code
function changeSiteinfo( info ) {
    const evt  = document.createEvent("Event");
    evt.data   = { info };
    evt.initEvent( "siteinfochanged", true, false );
    window.dispatchEvent( evt );
}

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

/**
 * controlbar Render
 */
function controlbarRender() {
    const getCursite = ( type, value ) => {
            const site = pr.Getsite( type, value );
            org_site   = [ site[0], site[1] ];
            site.length > 0 && siteeditorRender( site[0], site[1], type );
            site.length > 0 && changeSiteinfo( site[1].info );
        },
        add   = () => {
            const msg = cur_site ? "是否覆盖当前站点并新建立一个？" : "是否建立一个新站？";
            new Notify().Render( "snackbar", msg, "新建", () => {
                org_site = [ "", "" ];
                siteeditorRender( "", { name: "", title: "<title>", desc: "", include: "", exclude: [] }, "local" );
            });
        },
        remove = () => {
            new Notify().Render( "snackbar", "是否删除当前站点？", "删除", () => save( "delete" ));
        },
        remote = ( type ) => {
            save( type, "remote" );
        },
        save = ( type, state ) => {
            if ( !cur_site ) {
                new Notify().Render( 2, "请选择一个站点源。" );
                return;
            }
            if ( type != "delete" && !verify() ) return;

            const key = cur_site.target,
                  url = cur_site.url,
                  site= pr.Cleansite({ ...cur_site });
            let flag  = -1;

            if ( site.info && state != "remote" && ( type == "update" || type == "delete" )) {
                if ( site.info.id.substr(0,8) == storage.user.uid.substr(0,8) ) {
                    setTimeout( ()=>new Notify().Render( 2, "当前站有远程数据，请保持同步更新。" ), 500 );
                } else {
                    // other user site
                    // TO-DO
                }
            }

            if ( type == "update" ) {
                pr.Updatesite( key, org_site[0], [ url, pr.Cleansite(site) ] );
                org_site = [ url, site ];
                flag = 0;
            } else if ( type == "safe" ) {
                delete site.info;
                pr.Updatesite( key, org_site[0], [ url, pr.Cleansite(site) ] );
                org_site = [ url, site ];
                flag = 0;
            } else {
               pr.Deletesite( key, org_site[0], result => {
                   result != -1 ? flag = 1 : new Notify().Render( "当前站点已删除，请勿重复提交。" );
               });
            }
            flag != -1 && storage.Writesite( pr.sites, ()=> {
                console.log( "current site is ", cur_site, org_site )
                watch.SendMessage( "site", true );
                new Notify().Render( `当前站点${ flag == 0 ? "更新" : "删除" }成功，请刷新本页。` );
            });
        };
    const doms = <div>
                    <group className="lab">
                        <group><AC placeholder={ `官方适配源（${storage.sites.global.length} 条）`} items={ formatsites( storage.sites.global  )} onChange={ v=>getCursite( "global",  v) } /></group>
                        <group><AC placeholder={ `第三方适配源（${storage.sites.custom.length} 条）` } items={ formatsites( storage.sites.custom  )} onChange={ v=>getCursite( "custom",  v) } /></group>
                        <group><AC placeholder={ `自定义适配源（${storage.sites.local.length} 条）` } items={ formatsites( storage.sites.local  )} onChange={ v=>getCursite( "local",  v) } /></group>
                    </group>
                    <group className="lab">
                        <group>
                            <Button type="raised" text="新建一个站"
                                    style={{ "margin": "0" }} width="100%"
                                    color="#fff" backgroundColor="#4CAF50"
                                    waves="md-waves-effect md-waves-button"
                                    onClick={ ()=>add() } />
                        </group>
                        <group>
                            <Button type="raised" text="保存当前站"
                                    style={{ "margin": "0" }} width="100%"
                                    color="#fff" backgroundColor="#3F51B5"
                                    waves="md-waves-effect md-waves-button"
                                    onClick={ ()=>save( "update" ) } />
                        </group>
                        <group>
                            <Button type="raised" text="删除当前站"
                                    style={{ "margin": "0" }} width="100%"
                                    color="#fff" backgroundColor="#FF5252"
                                    waves="md-waves-effect md-waves-button"
                                    onClick={ ()=>remove() } />
                        </group>
                    </group>
                    <group className="lab" style={{display:"none"}}>
                        <div className="sites"></div>
                    </group>
                    <group className="lab">
                        <Import uid={ storage.user.uid } onUpdate={ t=>remote(t)} />
                    </group>
                 </div>;
    ReactDOM.render( doms, $( ".custom .property" )[0] );
}

/**
 * siteeditor Render
 */
function siteeditorRender( url, site, type, info ) {
    $( "sr-opt-read" ).length > 0 &&
        $( ".custom .preview" ).empty();
    cur_site     = pr.Safesite( site, type, url );
    storage.site = cur_site;
    info && ( storage.site.info = info );
    const doms   = <Editor site={ cur_site } state={ state } />;
    ReactDOM.render( doms, $( ".custom .preview" )[0] );
    console.log( "current site is ", cur_site )
}

/**
 * Format storage sites
 * 
 * @param {array} sites
 */
function formatsites( sites ) {
    return sites.map( item => {
        return { value: item[0], name: item[0] }
    });
}

/**
 * Verify site editor site
 * 
 * @return {boolean}
 */
function verify() {
    let flag = false;
    if ( [ "url", "name", "title", "include" ].findIndex( key => cur_site[key] == "" ) != -1 ) {
        new Notify().Render( 3, "【标识、域名、标题、高亮】不能为空。" );
    }
    else if ( Object.values( state ).findIndex( key => typeof key == "number" && key != 0 ) != -1 ||
           ( state.avatar.name != 0 || state.avatar.url  != 0 ) ||
           ( state.paging.prev != 0 || state.paging.next != 0 )
    ) {
        new Notify().Render( 3, "请正确填写【标识、域名、标题、高亮】后再提交。" );
    } else if (( cur_site.avatar[0].name != "" && cur_site.avatar[1].url == "" ) || ( cur_site.avatar[0].name == "" && cur_site.avatar[1].url != "" )) {
        new Notify().Render( 3, "【头像的名称与地址】必须同时设定。" );
    } else if (( cur_site.paging[0].prev != "" && cur_site.paging[1].next == "" ) || ( cur_site.paging[0].prev == "" && cur_site.paging[1].next != "" )) {
        new Notify().Render( 3, "【前一页与后一页】必须同时设定。" );
    } else if ( cur_site.name.startsWith( "tempread::" ) ) {
        new Notify().Render( 2, "标识不能包含 tempread:: 请删除。" );
    } else if ( cur_site.include.trim() == "" ) {
        new Notify().Render( 2, "高亮区域不能为空。" );
    } else {
        flag = true;
    }
    return flag;
}