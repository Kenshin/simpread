console.log( "=== simpread option dialog ===" )

const optbgcls = "ks-simpread-option-bg",
      optbg    = '<div class="' + optbgcls + '"></div>';

export default class Dialog extends React.Component {
    render() {
        return (
            <div className="ks-simpread-option-dialog">
                <div className="ks-simpread-option-content">
                    Hello React world!
                </div>
                <div className="ks-simpread-option-footer">
                    <a href="javascript:void(0);" className="ks-simpread-option-btn ks-simpread-option-submit">确认</a>
                    <a href="javascript:void(0);" className="ks-simpread-option-btn ks-simpread-option-cancel">取消</a>
                </div>
            </div>
        )
    }
}

export function dialogBg() {
    $( "body" ).append( optbg )
    return $( "." + optbgcls )[0];
}
