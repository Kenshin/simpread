console.log( "===== simpread option welcome page load =====" )

import '../vender/carousel/carousel.css';
import 'carousel';

import Button  from 'button';

import * as ss from 'stylesheet';

const welcbgcls   = "welcome-bg",
      welcbgclsjq = `.${welcbgcls}`,
      welcbg      = `<div class="${ welcbgcls }"></div>`;
let   curidx, max = [ 0, 0 ];

class Welcome extends React.Component {

    state = {
        style: { display: "none" },
        state: "next_icon",
    }

    prevClick() {
        $( '.carousel.carousel-slider' ).carousel( "prev" );
    }

    nextClick() {
        if ( curidx != max ) {
            $( '.carousel.carousel-slider' ).carousel( "next" );
        } else {
            $(welcbgclsjq).velocity({ opacity: 0 }, { complete: ()=>{
                ReactDOM.unmountComponentAtNode( $(welcbgclsjq)[0] );
            }});
        }
    }

    componentDidMount() {
        max = $( ".carousel-item" ).length - 1;
        $( '.carousel.carousel-slider' ).carousel({
            fullWidth: true,
            onCycleTo: idx => {
                curidx = idx;
                if ( curidx == max ) {
                    this.setState({
                        style: { display: "block" },
                        state: "right_icon",
                    });
                } else if ( curidx == 0 ) {
                    this.setState({
                        style: { display: "none" },
                        state: "next_icon",
                    });
                } else {
                    this.state.style.display != "block" && this.setState({ style: { display: "block" } });
                    this.state.state != "next_icon"     && this.setState({ state: "next_icon" });
                }
            }
        });
    }

    componentWillUnmount() {
        $( welcbgclsjq ).remove();
    }

    render() {
        return (
            <welcome>
                <div className="carousel carousel-slider" data-indicators="true">
                    <div className="carousel-item">
                        <h2>First Panel</h2>
                        <div className="desc">This is your first panel</div>
                    </div>
                    <div className="carousel-item">
                        <h2>Second Panel</h2>
                        <div className="desc">This is your second panel</div>
                    </div>
                    <div className="carousel-item">
                        <h2>Third Panel</h2>
                        <div className="desc">This is your third panel</div>
                    </div>
                    <div className="carousel-item">
                        <h2>Fourth Panel</h2>
                        <div className="desc">This is your fourth panel</div>
                    </div>
                </div>
                <footer>
                    <Button style={ this.state.style }
                        shape="circle" width="40px"
                        color="#fff" backgroundColor="#C8E6C9"
                        icon={ ss.IconPath( "prev_icon" ) }
                        waves="md-waves-effect md-waves-button"
                        onClick={ ()=>this.prevClick() } />
                    <Button
                        shape="circle" width="40px"
                        color="#fff" backgroundColor="#4CAF50"
                        icon={ ss.IconPath( this.state.state ) }
                        waves="md-waves-effect md-waves-button"
                        onClick={ ()=>this.nextClick() } />
                </footer>
            </welcome>
        )
    }
}

/**
 * Welcome Render
 * 
 * @param {string} root name
 */
export function Render( root ) {
    const $root = $( root );
    if ( $root.find( "." + welcbgcls ).length == 0 ) {
        $root.append( welcbg );
    }
    ReactDOM.render( <Welcome />, $( welcbgclsjq )[0] );
}