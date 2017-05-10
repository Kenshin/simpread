console.log( "==== simpread focus setting load ====" )

import Dialog, { getDialogBackground, isPopup } from 'modals'

/**
 * Setting Render
 */
function Render() {
    if ( isPopup() ) return;
    ReactDOM.render( <Dialog />, getDialogBackground() );
}

module.exports.Render = Render;