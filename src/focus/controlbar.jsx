console.log( "=== simpread focus controlbar load ===" )

import setting   from 'foucsetting';
import * as conf from 'config';

import Fab       from 'fab';

let timer, $root;

const tooltip_options = {
    target   : "name",
    position : "bottom",
    delay    : 50,
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
            <Fab ref="target" tooltip={ tooltip_options } waves="md-waves-effect md-waves-circle md-waves-float" items={ conf.focusItems } onAction={ (event, type)=>this.onAction(event, type ) } />
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