console.log( "==== simpread options page load ====" )

import '../assets/css/options_page.css';
import '../assets/css/option.css';
import '../vender/notify/notify.css';

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

import FocusOpt   from 'focusopt';
import ReadOpt    from 'readopt';
import CommonOpt  from 'commonopt';
import LabsOpt    from 'labsopt';
import About      from 'about';
import Unrdist    from 'unrdist';
import * as welc  from 'welcome';

let tabsItemID = 0;

/**
 * Add parallax scroll
 */
$( window ).scroll( (event) => {
    const $target = $( event.target ),
          scroll  = $target.scrollTop(),
          offset  = ( 0 - scroll ) / 2;
    scroll >  200 && ( $( ".header" ).css({ opacity: 1, visibility: "visible" }) );
    scroll <= 200 && ( $( ".header" ).css({ opacity: 0, visibility: "hidden"  }) );
    $( ".top" ).css( "transform", `translate3d(0px, ${offset}px, 0px)` );
});

/**
 * Get tabsItemID from window.location.hash exist
 */
window.location.hash && ( tabsItemID = conf.tabsItem.findIndex( item => item.route == window.location.hash ) );
tabsItemID == -1 || tabsItemID == 0 ? tabsItemID = 0 : conf.tabsItem.forEach( ( item, index ) => item.active = tabsItemID == index ? true : false );

/**
 * Entry:
 * - storage get data form chrome storage
 * - waves.Render()
 * - tooltip.Render()
 */
storage.Read( first => {
    console.log( "simpread storage get success!", storage.focus, storage.read, first );
    hashnotify();
    vernotify();
    firstLoad( first );
    sidebarRender();
    navRender();
    mainRender( tabsItemID );
    tt.Render( "body" );
    waves.Render({ root: "body" });
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
            default:
                // TO-DO
        }
        history.pushState( "", "", "/options/options.html" );
    }
}

/**
 * Version update notify
 */
function vernotify() {
    const hash = location.hash;
    if ( hash.startsWith( "#firstload?ver=" ) || hash.startsWith( "#update?ver=" ) ) {
        const prefix  = hash.match( /\w+/      )[0],
              version = hash.match( /[0-9\.]+/ )[0],
              msg     = ver.Notify( prefix, version );
        new Notify().Render( "简悦 版本提示", msg );
        history.pushState( "", "", "/options/options.html" );
    }
}

/**
 * First load call remote simpread data structure( usage storage.Sync() )
 *
 * @param {bool} is first load
 */
function firstLoad( first ) {
    first && storage.GetNewsites( "local", ( _, error ) => {
        error  && new Notify().Render( 0, "本地更新出现错误，请选择手动点击 同步配置列表" );
        !error && storage.Statistics( "create" );
    });
    window.location.hash && window.location.hash.startsWith( "#firstload" ) && first && welcomeRender();
    window.location.hash && window.location.hash.startsWith( "#firstload" ) && first &&
        storage.Sync( "get", success => {
            success && ReactDOM.unmountComponentAtNode( $( ".tabscontainer" )[0] );
            success && mainRender( tabsItemID );
            success && storage.Write( ()=> {
                new Notify().Render( 0, "数据恢复成功！" );
            });
    });
}

/**
 * Welcome page render()
 */
function welcomeRender() {
    welc.Render( "body" );
}

/**
 * Set options page style and tabs.Render()
 *
 * @param {number} conf.headerColors index
 */
function mainRender( idx ) {
    $( ".top" ).css( "background-color", conf.topColors[idx] );
    $( ".header" ).css( "background-color", conf.topColors[idx] ).find( ".title" ).text( conf.tabsItem[idx].name );
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
                        <CommonOpt backgroundColor={ conf.topColors[0] } sync={ ()=> refresh() } />
                    </section>
                    <section>
                        <FocusOpt option={ storage.focus } />
                        <Button type="raised" width="100%" text="保 存"
                                color="#fff" backgroundColor={ conf.topColors[1] }
                                icon={ ss.IconPath( "save_icon" ) }
                                waves="md-waves-effect md-waves-button"
                                onClick={ ()=>save( mode.focus ) } />
                    </section>
                    <section>
                        <ReadOpt option={ storage.read } />
                        <Button type="raised" width="100%" text="保 存"
                                color="#fff" backgroundColor={ conf.topColors[2] }
                                icon={ ss.IconPath( "save_icon" ) }
                                waves="md-waves-effect md-waves-button"
                                onClick={ ()=>save( mode.read ) } />
                    </section>
                    <section>
                        <LabsOpt option={ storage.option } read={ storage.read } focus={ storage.focus } onChange={ ()=>save() } />
                    </section>
                    <section><Unrdist list={ storage.unrdist.map( item => { return { ...item }} ) } /></section>
                    <section><About option={ storage.option } /></section>
                </Tabs>,
          tabsOnChange = ( $prev, $target, event ) => {
                const idx = $target.attr( "id" );
                mainRender( idx );
                conf.tabsItem.forEach( ( item, index ) => item.active = idx == index ? true : false );
          },
          refresh = () => {
                tt.Render( "body" );
          },
          save = mode => {
                storage.Write( ()=> {
                    new Notify().Render( 0, "保存成功，页面刷新后生效！" );
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
