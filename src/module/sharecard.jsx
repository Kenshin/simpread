

class ShareCard extends React.Component{
    render() {
        return (
            <sharecard>
                <sharecard-head>
                    <sharecard-card>
                        <sharecard-top><div><span className="logos"></span>简 悦</div><div>分享卡</div></sharecard-top>
                        <sharecard-content dangerouslySetInnerHTML={{__html: this.props.content }}></sharecard-content>
                        <sharecard-via>摘自 《{ this.props.title }》</sharecard-via>
                        <sharecard-footer></sharecard-footer>
                    </sharecard-card>
                </sharecard-head>
                <sharecard-control>
                </sharecard-control>
            </sharecard>
        )
    }
}

function Render( root, title, txt ) {
    $( root ).append( `<sharecard-bg></sharecard-bg>` );
    ReactDOM.render( <ShareCard title={ title } content={ txt } />, $( "sharecard-bg" )[0] )
}

export {
    Render
}