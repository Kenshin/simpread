

class ShareCard extends React.Component{
    render() {
        return (
            <sharecard>
                <sharecard-head>
                    <sharecard-card>
                        <sharecard-top><span className="logos"></span>简 悦</sharecard-top>
                        <sharecard-content>{ this.props.content }</sharecard-content>
                        <sharecard-via>{ this.props.title }</sharecard-via>
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