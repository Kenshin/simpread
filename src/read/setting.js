console.log( "==== simpread read setting load ====" )

import Dialog, { getDialogBackground, isPopup } from 'modals';

/**
 * Setting Render
 */
function Render() {
    if ( isPopup() ) return;
    ReactDOM.render( <Dialog />, getDialogBackground( "html" ) );
}

module.exports.Render = Render;