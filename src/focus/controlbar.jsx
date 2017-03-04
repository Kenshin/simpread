console.log( "=== simpread focus controlbar load ===" )

import {browser} from 'browser';
import setting   from 'foucsetting';
import Fab       from 'fab';
import * as waves   from  'waves';

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
        "color": "#f87f76",
    },
    "top" : {
        "name" : "返回顶部",
        "icon" : path("top_icon"),
        "color": "#f99d97",
    },
},
    waves_options = {
        name    : "sr-fab",
        root    : "ks-simpread-bg",
        classes : [ "waves-circle" ],
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

    componentDidMount() {
        waves.Render( waves_options );
    }

    render() {
        return (
            <Fab ref="target" items={ items } waves={ waves_options.name } onAction={ (event, type)=>this.onAction(event, type ) } />
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