console.log( "===== simpread option guide load =====" )

export default class Guide extends React.Component {

    render() {
        return (
            <div className="guide">
                <div className="title">帮助中心</div>
                <div className="subtitle">
                    <span>快捷答案</span>
                </div>
                <div className="group">
                    <guid-card>
                        <guid-card-tips>
                            <span>说明文档请看这里</span>
                        </guid-card-tips>
                    </guid-card>
                    <guid-card>
                        <guid-card-tips>
                            <span>新手入门可以看这篇文章</span>
                        </guid-card-tips>
                    </guid-card>
                    <guid-card>
                        <guid-card-tips>
                            <span>请通过 Github issues 提问</span>
                        </guid-card-tips>
                    </guid-card>
                    <guid-card>
                        <guid-card-tips>
                            <span>查看当前页的功能描述</span>
                        </guid-card-tips>
                    </guid-card>
                    <guid-card>
                        <guid-card-tips>
                            <span>查看当前版本新增功能</span>
                        </guid-card-tips>
                    </guid-card>
                </div>
            </div>
        )
    }
}