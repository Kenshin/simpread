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

let cur_site, org_site,
    state = { name: 0, url: 0, title: 0, desc: 0, include: 0, exclude: 0, avatar:{ name: 0, url: 0 }, paging: { prev:0, next: 0} }; // 0: success -1: faield -2: not empty

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
            const site = storage.Getsite( type, value );
            org_site   = [ site[0], site[1] ];
            site.length > 0 && siteeditorRender( site[0], site[1], type );
        },
        click = ( type ) => {
            if ( !cur_site ) {
                new Notify().Render( 2, "请选择一个站点源。" );
                return;
            }
            if ( type != "delete" && !verify() ) return;
            
            const key = cur_site.target,
                  url = cur_site.url,
                  site= clearsite({ ...cur_site });
            let idx   = storage.sites[key].findIndex( item => item[0] == org_site[0] ),
                flag  = -1;

            if ( type == "add" ) {

            } else if ( type == "update" ) {
                storage.sites[key].splice( idx, 1, [ url, site ] );
                org_site = [ url, site ];
                flag = 0;
            } else {
                if ( idx != -1 ) {
                    storage.sites[key].splice( idx, 1 );                    
                    flag = 1;
                } else new Notify().Render( "当前站点已删除，请勿重复提交。" );
            }
            flag != -1 && storage.Write( ()=> {
                console.log( "current site is ", cur_site, org_site )
                new Notify().Render( `当前站点${ flag == 0 ? "更新" : "删除" }成功。` )
            });
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
                                    onClick={ ()=>click( "update" ) } />
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

    safesite( site, { url, type });
    cur_site   = site;

    const doms = <Editor site={ cur_site } state={ state } />;
    ReactDOM.render( doms, $( ".custom .preview" )[0] );
}

function safesite( site, opts ) {
    site.url   = opts.url;
    site.target= opts.type;
    site.name  == "" && ( site.name = "tempread::" );
    ( !site.avatar || site.avatar.length == 0 ) && ( site.avatar = [{ name: "" }, { url: ""  }]);
    ( !site.paging || site.paging.length == 0 ) && ( site.paging = [{ prev: "" }, { next: "" }]);
}

function clearsite( site ) {
    site.avatar && site.avatar.length > 0 && site.avatar[0].name == "" && delete site.avatar;
    site.paging && site.paging.length > 0 && site.paging[0].prev == "" && delete site.paging;
    site.url                  && delete site.url;
    site.html                 && delete site.html;
    site.target               && delete site.target;
    site.matching             && delete site.matching;
    return site;
}

function verify() {
    let flag = false;
    if ( Object.values( state ).findIndex( key => typeof key == "string" && key != 0 ) != -1 ||
           ( state.avatar.name != 0 || state.avatar.url  != 0 ) ||
           ( state.paging.prev != 0 || state.paging.next != 0 )
        ) {
            new Notify().Render( 3, "验证内容中有错误，请确认后再提交。" );
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