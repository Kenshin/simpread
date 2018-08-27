console.log( "==== simpread options page load ====" )

import '../assets/css/options_page.css';
import '../assets/css/option.css';
import 'notify_css';

import Velocity   from 'velocity';
import Notify     from 'notify';

import Tabs       from 'tabs';
import * as waves from 'waves';
import * as tt    from 'tooltip';
import Button     from 'button';
import * as side  from 'sidebar';

import { storage, STORAGE_MODE as mode } from 'storage';
import * as ss    from 'stylesheet';
import * as conf  from 'config';
import * as ver   from 'version';
import * as watch from 'watch';
import {browser,br}from 'browser';
import * as msg   from 'message';
import * as exp   from 'export';

import FocusOpt   from 'focusopt';
import ReadOpt    from 'readopt';
import CommonOpt  from 'commonopt';
import LabsOpt    from 'labsopt';
import PluginsOpt from 'pluginsopt';
import SitesOpts  from 'sitesopt';
import AccountOps from 'accountopt';
import About      from 'about';
import Unrdist    from 'unrdist';
import * as welc  from 'welcome';

import PureRead   from 'puread';

let tabsItemID   = 0,
    website_sync = false; // when first and update checked versions.json

/**
 * Add parallax scroll
 */
$( window ).scroll( (event) => {
    const $target = $( event.target ),
          scroll  = $target.scrollTop(),
          offset  = 0 - scroll;
    scroll >  200 && ( $( ".header" ).css({ opacity: 1, visibility: "visible" }) );
    scroll <= 200 && ( $( ".header" ).css({ opacity: 0, visibility: "hidden"  }) );
    $( ".top" ).css( "transform", `translate3d(0px, ${offset}px, 0px)` );
});

/**
 * Get tabsItemID from window.location.hash exist
 */
window.location.hash && ( tabsItemID = conf.tabsItem.findIndex( item => window.location.hash.startsWith(item.route)));
tabsItemID == -1 || tabsItemID == 0 ? tabsItemID = 0 : conf.tabsItem.forEach( ( item, index ) => item.active = tabsItemID == index ? true : false );

/**
 * Listen runtime message
 */
browser.runtime.onMessage.addListener( function( request, sender, sendResponse ) {
    if ( request.type == msg.MESSAGE_ACTION.redirect_uri ) {
        const { id, uri } = request.value;
        if ([ "pocket", "dropbox", "evernote", "gdrive" ].includes( id )) {
            exp[id].Accesstoken( uri );
        } else if ( id == "yinxiang" ) {
            exp.evernote.Accesstoken( uri );
        } else {
            id.startsWith( "http://ksria.com/simpread/auth.html?" ) &&
            exp.onenote.Accesstoken( uri );
        }
    }
});

/**
 * Entry:
 * - storage get data form chrome storage
 * - waves.Render()
 * - tooltip.Render()
 */
storage.Read( first => {
    console.log( "simpread storage get success!", storage.focus, storage.read, first );
    pRead();
    hashnotify();
    firstLoad( first );
    sidebarRender();
    navRender();
    vernotify( first );
    mainRender( tabsItemID );
    tt.Render( "body" );
    waves.Render({ root: "body" });
    // only firefox and only usage 1.1.0.3024
    //if ( br.isFirefox() && ver.sub_ver == "3024" && !localStorage["opt-3024"] ) {
    //    welcomeRender( true );
    //    localStorage["opt-3024"] = ver.sub_ver;
    //}
});

/**
 * Hash notify
 */
function hashnotify() {
    const search = location.search,
          prefix = "?simpread_mode=";
    if ( search.startsWith( prefix ) ) {
        switch ( search.replace( prefix, "" ) ) {
            case "reload":
                new Notify().Render( 0, "数据导入成功！" );
                break;
            case "clear":
                new Notify().Render( 0, "数据清除成功！" );
                break;
            case "sync":
                new Notify().Render( 0, "数据同步成功！" );
                break;
            default:
                // TO-DO
        }
        history.pushState( "", "", "/options/options.html" );
    }
}

/**
 * Version update notify
 * 
 * @param {boolean} is first load
 */
function vernotify( first ) {
    const hash = location.hash;
    if ( hash.startsWith( "#firstload?ver=" ) || hash.startsWith( "#update?ver=" ) ) {
        const prefix  = hash.match( /\w+/      )[0],
              version = hash.match( /[0-9\.]+/ )[0],
              msg     = ver.Notify( first, prefix, version );

        new Notify().Render( "简悦 版本提示", msg );

        if ( hash.startsWith( "#update?ver=" )) {
            watch.SendMessage( "version", true );
            welcomeRender( false, version );
        }
        website_sync = true;
        browser.runtime.sendMessage({ type: "track", value: { eventAction: hash.startsWith( "#firstload?ver=" ) ? "install" : "update" , eventCategory: "install", eventLabel: "install && update" } });
        history.pushState( "", "", "/options/options.html" );
    }
}

/**
 * First load
 *
 * @param {bool} is first load
 */
function firstLoad( first ) {
    first && storage.GetRemote( "local", ( result, error ) => {
        if ( !error ) {
            storage.pr.Addsites( result );
            storage.Writesite( storage.pr.sites, () => storage.Statistics( "create" ) );
        } else new Notify().Render( 0, "本地更新出现错误，请选择手动点击 同步配置列表" );
    });
    window.location.hash && window.location.hash.startsWith( "#firstload" ) && first && welcomeRender( true );
}

/**
 * Welcome page render()
 * 
 * exclude: 1.0.4
 * 
 * @param {boolean} true: first load
 * @param {string} version
 */
function welcomeRender( first, version ) {
    //!( !first && version == "1.0.4" ) && welc.Render( "body", first, version );
    welc.Render( "body", first, version );
}

/**
 * Set options page style and tabs.Render()
 *
 * @param {number} conf.headerColors index
 */
function mainRender( idx ) {
    $( ".top" ).css( "background-color", conf.topColors[idx] );
    $( ".header" ).css( "background-color", conf.topColors[idx] ).find( ".title" ).text( conf.tabsItem[idx].name );
    ( idx == 1 || idx == 2 || idx == 3 || idx == 4 || idx == 6 || idx == 7 ) ? $( '.main' ).addClass( "main_labs" ) : $( '.main' ).removeClass( "main_labs" );
    tabsRender( conf.headerColors[ idx ] );
}

/**
 * Tabs render
 *
 * @param {string} header background color
 */
function tabsRender( color ) {
    const tabs = <Tabs waves="md-waves-effect md-waves-light"
                    headerStyle={{ transition: 'all 1000ms cubic-bezier(0.23, 1, 0.32, 1) 0ms' }}
                    bgColor={ color }
                    items={ conf.tabsItem }
                    onChange={ ( $p, $t, evt )=>tabsOnChange( $p, $t, evt ) }>
                    <section>
                        <CommonOpt website_sync={website_sync} backgroundColor={ conf.topColors[0] } sync={ ()=> refresh() } />
                    </section>
                    <section style={{ 'padding': '0;' }}>
                        <div id="labs" style={{ width: '100%' }}>
                            <div className="label">聚焦模式</div>
                            <div className="lab" style={{ 'padding': '30px 30px 10px 10px' }}>
                                <FocusOpt option={ storage.focus } />
                                <Button type="raised" width="100%" text="保 存"
                                        color="#fff" backgroundColor={ conf.topColors[1] }
                                        icon={ ss.IconPath( "save_icon" ) }
                                        waves="md-waves-effect md-waves-button"
                                        onClick={ ()=>save( true ) } />
                            </div>
                            <div className="label">阅读模式</div>
                            <div className="lab" style={{ 'padding': '30px 30px 10px 10px' }}>
                                <ReadOpt option={ storage.read } />
                                <Button type="raised" width="100%" text="保 存"
                                        color="#fff" backgroundColor={ conf.topColors[1] }
                                        icon={ ss.IconPath( "save_icon" ) }
                                        waves="md-waves-effect md-waves-button"
                                        onClick={ ()=>save( true ) } />
                            </div>
                        </div>
                    </section>
                    <section style={{ 'padding': '0;' }}>
                        <LabsOpt option={ storage.option } read={ storage.read } focus={ storage.focus } onChange={ (s)=>save(s) } />
                    </section>
                    <section style={{ 'padding': '0;' }}>
                        <SitesOpts option={ storage.option } onChange={ (s)=>save(s) } />
                    </section>
                    <section style={{ 'padding': '0;' }}>
                        <PluginsOpt />
                    </section>
                    <section><Unrdist list={ storage.unrdist.map( item => { return { ...item }} ) } /></section>
                    <section style={{ 'padding': '0;' }}>
                        <AccountOps user={ storage.user } />
                    </section>
                    <section style={{ 'padding': '0;' }}><About option={ storage.option } site={ storage.simpread.sites.length } statistics={ storage.simpread.statistics } onClick={t=>welcomeRender(true)}/></section>
                </Tabs>,
          tabsOnChange = ( $prev, $target, event ) => {
                const idx = $target.attr( "id" );
                mainRender( idx );
                conf.tabsItem.forEach( ( item, index ) => item.active = idx == index ? true : false );
          },
          refresh = () => {
                tt.Render( "body" );
          },
          save = state => {
                storage.Write( ()=> {
                    watch.SendMessage( "option", true );
                    state && new Notify().Render( 0, "保存成功，页面刷新后生效！" );
                });
          };
    ReactDOM.render( tabs, $( ".tabscontainer" )[0] );
}

/**
 * navigation Render
 */
function navRender() {
    const navClick = () => {
        side.Open();
    };
    const button = <Button waves="md-waves-effect md-waves-circle" hoverColor="transparent" icon={ ss.IconPath( "sidebar_icon" ) } onClick={ ()=>navClick() } />;
    ReactDOM.render( button, $( ".header .nav" )[0] );
}

/**
 * sidebar Render
 */
function sidebarRender() {
    const sidebarClick = ( $target, items ) => {
        const idx = conf.tabsItem.findIndex( item => item.value == items.value );
        conf.tabsItem.forEach( ( item, index ) => item.active = idx == index ? true : false );
        mainRender( idx );
    };
    const sidebar = <side.Sidebar items={ conf.menuItem }
                             waves="md-waves-effect"
                             header="设定" footer=" 简悦 © 2017" onClick={ ($t,o)=>sidebarClick($t,o) } />;
    ReactDOM.render( sidebar, $( ".sidebar" )[0] );
}

/** 
 * Pure Read
*/
function pRead() {
    storage.puread     = new PureRead( storage.sites );
    storage.pr.origins = storage.option.origins;
    console.log( "current puread object is   ", storage.pr )
}
