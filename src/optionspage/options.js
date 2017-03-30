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
import Sidebar    from 'sidebar';

import { storage, STORAGE_MODE as mode } from 'storage';
import * as ss    from 'stylesheet';

import FocusOpt   from 'focusopt';
import ReadOpt    from 'readopt';

let tabsItemID = 0;

const tabsItem = [{
        name: "共通",
        value: "common",
        active : true,
        route: "#common",
    },{
        name: "聚焦模式",
        value: "focus",
        route: "#focus",
    },{
        name: "阅读模式",
        value: "read",
        route: "#read",
    },{
        name: "稍后读",
        value: "later",
        route: "#later",
}],
    headerColors = [
        "#64B5F6",
        "#81C784",
        "#9575CD",
        "#BA68C8"
],
    topColors = [
        "#2196F3",
        "#4CAF50",
        "#673AB7",
        "#9C27B0"
];

/**
 * Add parallax scroll
 */
$( window ).scroll( (event) => {
    const $target = $( event.target ),
          scroll  = $target.scrollTop(),
          offset  = ( 0 - scroll ) / 2;
    scroll >  200 && ( $( ".header" ).css( "opacity", 1 ) );
    scroll <= 200 && ( $( ".header" ).css( "opacity", 0 ) );
    $( ".top" ).css( "transform", `translate3d(0px, ${offset}px, 0px)` );
});

/**
 * Save simpread data
 * 
 * @param {string} simpread mode
 */
function save( mode ) {
    storage.Write( ()=> {
        new Notify().Render( 0, "保存成功，页面刷新后生效！" );
    });
}

/**
 * Tabs onChange event handler
 * 
 * @param {jquery} prev jquery object
 * @param {event} current event
 */
function tabsOnChange( $prev, event ) {
    let $target = $( event.target );
    while ( !$target.is( "tab-label" ) ) { $target = $target.parent(); }
    $target = $target.find( "a" );
    Render( $target.attr( "id" ) );
}

/**
 * Tabs render
 * 
 * @param {string} header background color
 */
function tabsRender( color ) {
    const tabs = <Tabs waves="sr-tabs waves-effect waves-light"
                    headerStyle={{ transition: 'all 1000ms cubic-bezier(0.23, 1, 0.32, 1) 0ms' }}
                    bgColor={ color }
                    items={ tabsItem }
                    onChange={ ( $p, evt )=>tabsOnChange( $p, evt ) }>
                    <section>aaa</section>
                    <section>
                        <FocusOpt option={ storage.focus } />
                        <Button type="raised" backgroundColor={ topColors[1] } width="100%" waves="sr-button waves-effect waves-button" text="保 存" onClick={ ()=>save( mode.focus ) } />
                    </section>
                    <section>
                        <ReadOpt option={ storage.read } />
                        <Button type="raised" backgroundColor={ topColors[2] } width="100%" waves="sr-button waves-effect waves-button" text="保 存" onClick={ ()=>save( mode.read ) } />
                    </section>
                    <section>ddd</section>
                </Tabs>;
    ReactDOM.render( tabs, $( ".tabscontainer" )[0] );
}

/**
 * navigation Render
 */
function navRender() {
    const navClick = () => {
        console.log("adfasdfadfadf")
    };
    const button = <Button waves="sr-tabs waves-effect waves-circle" hoverColor="transparent" icon={ ss.IconPath( "sidebar_icon" ) } onClick={ ()=>navClick() } />;
    ReactDOM.render( button, $( ".header .nav" )[0] );
}

/**
 * sidebar Render
 */
function sidebarRender() {
    const sidebar = <Sidebar items={ tabsItem } header="设定" footer="关于 简悦"/>;
    ReactDOM.render( sidebar, $( ".sidebar" )[0] );
}

/**
 * Set options page style and tabs.Render()
 *
 * @param {number} headerColors index
 */
function Render( idx ) {
    $( ".top" ).css( "background-color", topColors[idx] );
    $( ".header" ).css( "background-color", topColors[idx] ).find( ".title" ).text( tabsItem[idx].name );
    tabsRender( headerColors[ idx ] );
}

/**
 * Get tabsItemID from window.location.hash exist
 */
window.location.hash && ( tabsItemID = tabsItem.findIndex( item => item.route == window.location.hash ) );
tabsItemID == -1 || tabsItemID == 0 ? tabsItemID = 0 : tabsItem.forEach( ( item, index ) => item.active = tabsItemID == index ? true : false );

/**
 * Entry:
 * - get data from chrome storage
 * - waves.Render()
 * - tooltip.Render()
 */
storage.Get( function() {
    console.log( "simpread storage get success!", storage.focus, storage.read );
    sidebarRender();
    navRender();
    Render( tabsItemID );
    tt.Render( "body" );
    waves.Render({ root: "main", name: "sr-tabs" });
});
