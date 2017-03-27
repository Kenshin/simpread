console.log( "==== simpread options page load ====" )

import '../assets/css/options.css';

import Tabs       from 'tabs';
import * as waves from 'waves';

const tabsitem = [{
        name: "共通",
        value: "common",
        active : true,
    },{
        name: "聚焦模式",
        value: "focus",
    },{
        name: "阅读模式",
        value: "read",
    },{
        name: "稍后读",
        value: "later",
}];

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
    console.log( $prev, event )
}

/**
 * Tabs render
 */
const tabs =
    <Tabs waves="sr-tabs waves-effect waves-light"
        items={ tabsitem } bgColor="rgb(153,204,255)" onChange={ ( $p, evt )=>tabsOnChange( $p, evt ) }>
        <div>aaa</div>
        <div>bbb</div>
        <div>ccc</div>
        <div>ddd</div>
    </Tabs>;
ReactDOM.render( tabs, $( ".tabscontainer" )[0] );