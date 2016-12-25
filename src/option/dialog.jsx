console.log( "=== simpread option dialog ===" )

const optbgcls = "ks-simpread-option-bg",
      optbg    = '<div class="' + optbgcls + '"></div>';

export default class Dialog extends React.Component {
    render() {
        return (
            <div className="ks-simpread-option-dialog">
                Hello React world!
            </div>
        )
    }
}

export function dialogBg() {
    $( "body" ).append( optbg )
    return $( "." + optbgcls )[0];
}
