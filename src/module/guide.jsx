console.log( "===== simpread option guide load =====" )

export default class Guide extends React.Component {

    componentDidMount() {
        $( ".guide" ).scroll( event => {
            if ( $( event.target ).scrollTop() > 35 ) {
                $( ".guide .title" )
                    .css({"box-shadow": "2px 4px 10px rgba(0,0,0,.2)" })
                    .find( "span" ).text( "帮助中心 > 快捷答案" ).css({"font-weight": "normal", "animation": ".1s reverse fadein,235ms cubic-bezier(.4,0,.2,1) popup" });
            } else {
                $( ".guide .title" )
                    .removeAttr( "style" )
                    .find( "span" ).text( "帮助中心" ).removeAttr( "style" );
            }
        });
    }

    render() {
        return (
            <div className="guide">
                <div className="title">
                    <span>帮助中心</span>
                </div>
                <div className="subtitle">
                    <span>快捷答案</span>
                </div>
                <div className="group">
                    <guid-card>
                        <guid-card-tips>
                            <i className="fas fa-info-circle"></i>
                            <span>说明文档请看这里</span>
                        </guid-card-tips>
                    </guid-card>
                    <guid-card>
                        <guid-card-tips>
                            <i className="fas fa-file-word"></i>
                            <span>新手入门可以看这篇文章</span>
                        </guid-card-tips>
                    </guid-card>
                    <guid-card>
                        <guid-card-tips>
                            <i className="fas fa-bug"></i>
                            <span>请通过 Github issues 提问</span>
                        </guid-card-tips>
                    </guid-card>
                    <guid-card>
                        <guid-card-tips>
                            <i className="fas fa-folder-open"></i>
                            <span>查看当前版本新增功能</span>
                        </guid-card-tips>
                    </guid-card>
                    <guid-card>
                        <guid-card-tips>
                            <i className="fas fa-binoculars"></i>
                            <span>查看当前页的功能描述</span>
                        </guid-card-tips>
                    </guid-card>
                </div>
            </div>
        )
    }
}