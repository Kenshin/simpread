console.log( "===== simpread option welcome page load =====" )

import '../vender/carousel/carousel.css';

import carousel from 'carousel';

const welcbgcls   = "welcome-bg",
      welcbgclsjq = `.${welcbgcls}`,
      welcbg      = `<div class="${ welcbgcls }"></div>`;

class Welcome extends React.Component {

    componentDidMount() {
        $( '.carousel.carousel-slider' ).carousel({
            fullWidth: true,
            onActived: idx => {
                console.log( "onActived", idx )
            }
        });
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