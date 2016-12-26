console.log( "=== simpread option dialog ===" )

const optbgcls = "ks-simpread-option-bg",
      optbg    = '<div class="' + optbgcls + '"></div>';

export default class Dialog extends React.Component {

    close() {
        $( "." + optbgcls ).remove();
    }

    save() {
        console.log( "dialog click submit button." )
    }

    render() {
        return (
            <div className="ks-simpread-option-dialog">
                <div className="ks-simpread-option-content">
                    Hello React world!
                </div>
                <div className="ks-simpread-option-footer">
                    <a 
                        href="javascript:void(0);"
                        className="ks-simpread-option-btn ks-simpread-option-submit"
                        onClick={ () => this.save() }>
                        确认
                    </a>
                    <a 
                        href="javascript:void(0);"
                        className="ks-simpread-option-btn ks-simpread-option-cancel"
                        onClick={ () => this.close() }>
                        取消
                    </a>
                </div>
            </div>
        )
    }
}

export function dialogBg() {
    $( "body" ).append( optbg )
    return $( "." + optbgcls )[0];
}
