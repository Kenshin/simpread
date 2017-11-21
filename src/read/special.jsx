console.log( "=== simpread read: special load ===" )

import Button    from 'button';

import * as kbd  from 'keyboard';

const default_src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAOVBMVEX///+AgICfn5+Hh4f39/fPz8+vr6+QkJDg4ODv7+/n5+fAwMCoqKiYmJjHx8fX19e4uLjQ0NDIyMhhw/XSAAACBUlEQVRYw6VX2ZKEIAw0ATnk8Pj/j90q3V13SSOxpl+mHEknaUKCUw9xTZnpBLu02ukV4lGoAR9Rbb4Xgii7ztxTF35/ay4p1kdzm2mI/KDn4kkB0w3iICVmbO9IDae31zMkoo8YZkJgl5IrGh1WpHaN34VdDUks//YfrNjsn/cO8NtnAedhivl+G6D9kCH8Buhl/JptLv0dLMIcuqnTBY8TGCdhelvohfGjI3mEEybYZKGdZTKokcfNipCXpg4IysgoMAwDl5KegFGwy2cEYZpfEBQkAjpnehFpQ2HRCwKeDKHdhQiQgGBcEE5NgEWwhgAm/eSo2BchmAXMPUMwBSaEYlE/0RPIGWxLb8BkwiiLam6n/kgzx+3+IOoSBGSbr5+0nN43cz0SnE9Wpr9O0/qz2psf0jCtTrqSR8zFK2lu1D5FjZtpnLX1wfGu/Pxn3e8QillUXGxa3A07J8fimjqb9tixrD8JXJJ8UQp7NcN6n7LrScvQTLAqxtEItTm0/r5wKOH/j9AgutAIc5MzE4VXBLa56UUjOsAwB2+bhuteprCIf9wr+yp7tl5H7C0TzW/tZQwaJQ+i2mX2w92M/BBpMEMhkiGzPtOXhyBCGaYZPFHBH6l2z90cRcfh3QJr8lWjsq1nn2Xe0hHCEvaUmL/btRaxyo/vFKdXiCFlPmk8u9rvdl/WWxJO0oeE7gAAAABJRU5ErkJggg==";

export class Multiple extends React.Component {

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
            !art.url && ( art.url = default_src );
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

export class Paging extends React.Component {

    static defaultProps = {
        paging: React.PropTypes.array,
    }

    state = {
        prev : this.props.paging[0].prev,
        next : this.props.paging[1].next,
    }

    onClick( state ) {
        location.href = this.state[state];
    }

    componentDidMount() {
        kbd.Bind( [ "left", "right" ], ( event, combo ) => {
            this.onClick( combo == "left" ? "prev" : "next" );
        });
    }

    render() {
        return (
            !( !this.state.prev && !this.state.next ) && <sr-page>
                <Button type="raised" text="← 前一页"
                        disable={ !this.state.prev }
                        style={{ "margin-left": "0" }}
                        color="#fff" backgroundColor="#1976D2"
                        waves="md-waves-effect md-waves-button"
                        onClick={ ()=>this.onClick( "prev" ) } />
                <Button type="raised" text="后一页 →"
                        disable={ !this.state.next }
                        style={{ "margin-right": "0" }}
                        color="#fff" backgroundColor="#1976D2"
                        waves="md-waves-effect md-waves-button"
                        onClick={ ()=>this.onClick( "next" ) } />
            </sr-page>
        )
    }
}