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
            onCycleTo: () => {
                console.log("weeeeeee")
            },
            onActived: () => {
                console.log("weeeeee33e")
            }
        });
    }

    render() {
        return (
            <welcome>
                <div className="carousel carousel-slider center" data-indicators="true">
                    <div className="carousel-item red white-text" href="#one!">
                        <h2>First Panel</h2>
                        <p className="white-text">This is your first panel</p>
                    </div>
                    <div className="carousel-item amber white-text" href="#two!">
                        <h2>Second Panel</h2>
                        <p className="white-text">This is your second panel</p>
                    </div>
                    <div className="carousel-item green white-text" href="#three!">
                        <h2>Third Panel</h2>
                        <p className="white-text">This is your third panel</p>
                    </div>
                    <div className="carousel-item blue white-text" href="#four!">
                        <h2>Fourth Panel</h2>
                        <p className="white-text">This is your fourth panel</p>
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