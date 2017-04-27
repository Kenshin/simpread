console.log( "===== simpread option welcome page load =====" )

const welcbgcls   = "welcome-bg",
      welcbgclsjq = `.${welcbgcls}`,
      welcbg      = `<div class="${ welcbgcls }"></div>`;

class Welcome extends React.Component {

    render() {
        return (
            <welcome>
                Welcome page
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