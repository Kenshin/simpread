console.log( "==== simpread focus setting load ====" )

import Dialog, { getDialogBackground, isPopup } from 'dialog'

/**
 * Setting Render
 */
function Render() {
    if ( isPopup() ) return;
    ReactDOM.render( <Dialog type="focus" />, getDialogBackground() );
}

module.exports.Render = Render;