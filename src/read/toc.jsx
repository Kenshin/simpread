console.log( "=== simpread read toc load ===" )

class TOC extends React.Component {

    onClick( event ) {
        const $target = $( event.target ).parent();
        $target.parent().find( "a" ).removeClass( "toc-outline-active" );
        $target.addClass( "toc-outline-active" );

        const href     = $( event.target ).attr("href"),
             offsetTop = href === "#" ? 0 : $(href).offset().top - 5;
        $( "html" ).stop().animate({
            scrollTop: offsetTop
        }, 300 );
        event.preventDefault();
    }

    componentDidMount() {
        let lastId;
        const topMenu       = $( "toc" ),
              topMenuHeight = topMenu.outerHeight(),
              menuItems     = topMenu.find( "a" ),
              scrollItems   = menuItems.map( function() {
                const item  = $( $(this).attr("href") );
                    if ( item.length ) { return item; }
              });

        $( window ).scroll( function() {
            const fromTop = $(this).scrollTop() + topMenuHeight;
            let cur = scrollItems.map( function() {
            if ($(this).offset().top < fromTop)
                return this;
            });
            cur = cur[cur.length - 1];
            const id = cur && cur.length ? cur[0].id : "";

            if ( lastId !== id ) {
                lastId = id;
                menuItems
                    .parent().removeClass( "toc-outline-active" )
                    .end().filter("[href='#"+id+"']").parent().addClass( "toc-outline-active" );
            }
        });
    }

    render() {
        const outline = this.props.table.map( item => {
            return <outline className={ item.level }><a className={ "toc-outline-theme-" + this.props.theme } href={ "#" + item.id} onClick={ evt=>this.onClick(evt) }>{ item.value }</a></outline>
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