console.log( "==== simpread options page load ====" )

import '../assets/css/options.css';

import Tabs from 'tabs';

const tabsitem = [{
        name: "共通",
        value: "common",
        icon : "",
        active : true,
        disable: false,
        route: ""
    },{
        name: "聚焦模式",
        value: "focus",
        icon : "",
        active : false,
        disable: false,
        route: ""
    },{
        name: "阅读模式",
        value: "read",
        icon : "",
        active : false,
        disable: false,
        route: ""
    },{
        name: "稍后读",
        value: "later",
        icon : "",
        active : false,
        disable: false,
        route: ""
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
 * Render Tabs
 */
const tabs = 
    <Tabs items={ tabsitem } bgColor="rgb(153,204,255)">
        <div>aaa</div>
        <div>bbb</div>
        <div>ccc</div>
        <div>ddd</div>
    </Tabs>;
ReactDOM.render( tabs, $( ".tabscontainer" )[0] );