console.log( "=== simpread focus controlbar load ===" )

import {browser} from 'browser';
import setting   from 'foucsetting';
import Fab       from 'fab';

let timer, $root;
const path = icon=>browser.extension.getURL( `assets/images/${icon}.png` ),
    items  = {
    "exit" : {
        "name" : "关闭",
        "icon" : path("exit_icon"),
    },
    "setting" : {
        "name" : "设定",
        "icon" : path("setting_icon"),
        "color": "#03A9F4",
    },
    "top" : {
        "name" : "返回顶部",
        "icon" : path("top_icon"),
        "color": "#AED581",
    },
};

class FControl extends React.Component {

    onAction( event, type ) {
        console.log( "fab type is =", type )
        switch ( type ) {
            case "exit":
                ReactDOM.unmountComponentAtNode( getRoot() );
                break;
            case "top":
                moveTop();
                break;
            case "setting":
                setting.Render();
                break;
        }
    }

    componentWillUnmount() {
        $(this.refs.target).remove();
        $root.click();
    }

    render() {
        return (
            <Fab ref="target" items={ items } onAction={ (event, type)=>this.onAction(event, type ) } />
        )
    }
}

const fcontrol = new FControl();

/**
 * Move top
 */
function moveTop() {
    timer = setInterval( function() {
        var osTop = document.body.scrollTop;
        var speed = Math.floor( -osTop / 3 );
        document.body.scrollTop = osTop + speed;
        if( osTop == 0 ) {
            clearInterval( timer );
        }
    }, 30 );
}

/**
 * Render
 * @param {string} class name, e.g. .xxx
 */
function Render( root ) {
    $root = $(root);
    ReactDOM.render( <FControl />, getRoot() );
}

/**
 * Get root html
 * 
 * @return {object} root html
 */
function getRoot() {
    return $root[0];
}

export { fcontrol as elem, Render };