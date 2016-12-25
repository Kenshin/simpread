console.log( "==== simpread focus setting load ====" )

import Dialog from 'dialog'

function Render( $target ) {
    ReactDOM.render(
        <Dialog />,
        $target[0]
    )
}

module.exports.Render = Render;