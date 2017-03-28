console.log( "==== simpread options page load ====" )

import '../assets/css/options_page.css';
import '../assets/css/option.css';

import Velocity   from 'velocity';

import Tabs       from 'tabs';
import * as waves from 'waves';
import * as tt    from 'tooltip';
import { storage, STORAGE_MODE as mode } from 'storage';

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
    bgColors = [
        "rgba(153, 204, 255, 1)",
        "rgba(204, 204, 255, 1)",
        "rgba(255, 153, 204, 1)",
        "rgba(204, 255, 0, 1)"
];

/**
 * Add parallax scroll
 */
$( window ).scroll( (event) => {
    const $target = $( event.target ),
          offset  = ( 0 - $target.scrollTop() ) / 2;
    $( ".top" ).css( "transform", `translate3d(0px, ${offset}px, 0px)` )
});

/**
 * Tabs onChange event handler
 * 
 * @param {jquery} prev jquery object
 * @param {event} current event 
 */
function tabsOnChange( $prev, event ) {
    let $target = $( event.target );
    while ( !$target.is( "tab-label" ) ) { $target = $target.parent(); }
    $target     = $target.find( "a" );

    const idx   = $target.attr( "id" ),
          value = $target.attr( "value" ),
          name  = $target.text();

    Render( idx );
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
                    </section>
                    <section>
                        <ReadOpt option={ storage.read } />
                    </section>
                    <section>ddd</section>
                </Tabs>;
    ReactDOM.render( tabs, $( ".tabscontainer" )[0] );
}

/**
 * Set banner and tabs.Render()
 *
 * @param {number} bgColors index
 */
function Render( idx ) {
    $( ".banner" ).css( "background-image", `url(../assets/images/banner-${idx}.png)` );
    tabsRender( bgColors[ idx ] );
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
    Render( tabsItemID );
    tt.Render( "body" );
    waves.Render({ root: "main", name: "sr-tabs" });
});
