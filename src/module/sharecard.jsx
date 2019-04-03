console.log( "=== simpread share card load ===" )

import * as exp from 'export';
import * as ss  from 'stylesheet';

import Button   from 'button';

class ShareCard extends React.Component {

    download() {
        exp.PNG( $("sharecard-card")[0] , `simpread-${ this.props.title }.png`, result => {
            !result && new Notify().Render( 2, "下载失败，请稍后再试！" );
            result  && this.exit();
        });
    }

    exit() {
        ReactDOM.unmountComponentAtNode( $( "sharecard-bg" )[0] );
    }

    componentWillUnmount() {
        $( "sharecard-bg" ).remove();
    }

    render() {
        return (
            <sharecard>
                <sharecard-head>
                    <sharecard-card>
                        <sharecard-top><span className="logos"></span>简 悦</sharecard-top>
                        <sharecard-content dangerouslySetInnerHTML={{__html: this.props.content }}></sharecard-content>
                        <sharecard-via>摘自 《{ this.props.title }》</sharecard-via>
                        <sharecard-footer><div><span className="qrcode"></span><span style={{ display: "none" }} dangerouslySetInnerHTML={{__html: "长按扫码<br>获取简悦" }}></span></div><div>还原阅读本质 · 提升阅读体验</div></sharecard-footer>
                    </sharecard-card>
                </sharecard-head>
                <sharecard-control>
                    <Button type="raised" text="保 存" width="100%"
                            color="#fff" backgroundColor="#2196F3"
                            icon={ ss.IconPath( "save_icon" ) }
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.download() } />
                    <Button type="raised" text="关 闭" width="100%"
                            fontIcon={ `<i class="fas fa-window-close"></i>` }
                            color="#fff" backgroundColor="#2196F3"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.exit() } />
                </sharecard-control>
            </sharecard>
        )
    }
}

function Render( root, title, txt ) {
    $( root ).append( `<sharecard-bg></sharecard-bg>` );
    ReactDOM.render( <ShareCard title={ title } content={ txt.replace("\n", "<br>")} />, $( "sharecard-bg" )[0] )
}

export {
    Render
}