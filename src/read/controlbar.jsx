console.log( "=== simpread read controlbar load ===" )

import setting from 'readsetting';
import Fab     from 'fab';

/**
 * Read controlbar
 * 
 * @class
 */
class ReadCtlbar extends React.Component {

    open() {
        setting.Render();
    }

    onAction( event, type ) {
        console.log( "fab type is =", type )
        switch ( type ) {
            case "exit":
                this.props.exit();
                break;
            case "setting":
                action( type );
                break;
        }
    }

    render() {
        return (
            <Fab onAction={ (event, type)=>this.onAction(event, type ) } />
        )
    }
}

/**
 * Call setting adaper
 * 
 * @param {string} type, include: 'setting'
 */
function action( type ) {
    if ( type == "setting" ) {
        setting.Render();
    }
}

export {
    ReadCtlbar,
    action as ReadCtlAdapter,
}