console.log( "==== simpread options page load ====" )

import '../assets/css/options.css';

import Velocity   from 'velocity';

import Tabs       from 'tabs';
import * as waves from 'waves';

let bgidx = 0;

const tabsitem = [{
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
 * Waves render
 */
waves.Render({ root: "main", name: "sr-tabs" });

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
                    items={ tabsitem }
                    onChange={ ( $p, evt )=>tabsOnChange( $p, evt ) }>
                    <div>aaa</div>
                    <div>bbb</div>
                    <div>ccc</div>
                    <div>ddd</div>
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
 * Get bgidx from window.location.hash exist
 */
window.location.hash && ( bgidx = tabsitem.findIndex( item => item.route == window.location.hash ) );
bgidx == -1 || bgidx == 0 ? bgidx = 0 : tabsitem.forEach( ( item, index ) => item.active = bgidx == index ? true : false );

/**
 * Render
 */
Render( bgidx );