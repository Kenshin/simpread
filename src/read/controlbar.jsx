console.log( "=== simpread read controlbar load ===" )

import setting from 'readsetting';

/**
 * Read controlbar
 * 
 * @class
 */
class ReadCtlbar extends React.Component {

    open() {
        setting.Render();
    }
    
    render() {
        return (
            <sr-read-ctl>
                <sr-ul>
                    <sr-li>
                        <span onClick={ ()=> this.open() } >弹出</span>
                    </sr-li>
                    <sr-li>
                        <span onClick={ ()=> this.props.exit() }>退出</span>
                    </sr-li>
                </sr-ul>
            </sr-read-ctl>
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