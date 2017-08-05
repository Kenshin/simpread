console.log( "=== simpread read: multiple load ===" )

export default class Multiple extends React.Component {

    static defaultProps = {
        include: React.PropTypes.any,
        avatar : React.PropTypes.array,
    }

    render() {
        const contents = [],
              names    = this.props.avatar[ 0 ].name,
              urls     = this.props.avatar[ 1 ].url;
        this.props.include.each( ( idx, item ) => {
            const art = {};
            art.name    = $( names[idx] ).text();
            art.url     = $( urls[idx]  ).attr( "src" );
            art.content = $( item       ).html();
            contents.push( art );
        });
        const child = contents.map( item => {
            return <sr-rd-mult>
                        <sr-rd-mult-avatar>
                            <img classN="sr-rd-content-nobeautify" src={ item.url } />
                            <span>{ item.name }</span>
                        </sr-rd-mult-avatar>
                        <sr-rd-mult-content dangerouslySetInnerHTML={{__html: item.content }} ></sr-rd-mult-content>
                   </sr-rd-mult>
        });
        return (
            <sr-rd-content>
                { child }
            </sr-rd-content>
        )
    }
}