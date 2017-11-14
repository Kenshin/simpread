console.log( "=== simpread read toc load ===" )

class TOC extends React.Component {

    render() {
        const outline = this.props.table.map( item => {
            return <outline className={ item.level }><a className={ "toc-outline-theme-" + this.props.theme } href={ "#" + item.id}>{ item.value }</a></outline>
        });
        return (
            <toc className="simpread-font simpread-theme-root">
                { outline }
            </toc>
        )
    }

}

/**
 * Render
 * 
 * @param {string} selector name
 * @param {jquery} jquery object
 * @param {string} theme
 */
function Render( root, $target, theme ) {
    const table = [];
    $target.find( "h1, h2, h3, h4" ).map( ( idx, item) => {
        const $item = $( item ),
              tag   = $item[0].tagName.toLowerCase(),
              value = $item.text();
        let   id    = $item.attr( "id" );
        id          = id == undefined ? `sr-toc-${idx}` : `${id}-${idx}`
        $item.attr( "id", id );
        table.push({
            level: `toc-level-${tag}`,
            id,
            value,
        });
    });
    console.log( "current toc is ", table )
    $( root ).append( "<toc-bg></tocbg>" );
    table.length > 0 && ReactDOM.render( <TOC table={ table } theme={ theme } />, $( "toc-bg" )[0] );
}

export {
    Render
}