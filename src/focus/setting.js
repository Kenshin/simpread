console.log( "==== simpread focus setting load ====" )

import Dialog, { getDialogBackground } from 'dialog'

/**
 * Setting Render
 */
function Render() {
    ReactDOM.render(
        <Dialog type="focus" />,
        getDialogBackground()
    )
}

module.exports.Render = Render;