console.log( "=== simpread read: multiple load ===" )

export default class Multiple extends React.Component {

    static defaultProps = {
        include: React.PropTypes.any,
        multi  : React.PropTypes.object,
    }

    render() {
        const contents = [],
              names    = this.props.multi[ 0 ].name,
              avatars  = this.props.multi[ 1 ].avatar;
        this.props.include.each( ( idx, item ) => {
            const art = {};
            art.name    = $(names[idx]).text();
            art.avatar  = $(avatars[idx]).attr( "src" );
            art.content = $(item).html();
            contents.push( art );
        });
        const child = contents.map( item => {
            return <sr-rd-mult>
                        <sr-rd-mult-avatar>
                            <img classN="sr-rd-content-nobeautify" src={ item.avatar } />
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