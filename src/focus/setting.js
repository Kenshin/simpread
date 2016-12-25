console.log( "==== simpread focus setting load ====" )

import Dialog, { dialogBg } from 'dialog'

function Render() {
    ReactDOM.render(
        <Dialog />,
        dialogBg()
    )
}

module.exports.Render = Render;